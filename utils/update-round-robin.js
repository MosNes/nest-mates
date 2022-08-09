require('dotenv').config();

//When a new task is created or a new user is added to the nest, the future round robin assignments need to be recalculated

const { Task, User, Assignment } = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');
const { SequentialRoundRobin } = require('round-robin-js');
const sequelize = require('../config/connection');

//TRIGGER: when a new task is created or a new user is added to the nest
// params are recordId and eventType
//recordId should be the id of the new task or user record. eventType should be 'newTask' or 'newUser'
const updateRoundRobin = async (recordId, eventType) => {
	//get the date of the task creation or user creation
	let record = null;

	//if eventType is newTask, query task db for record
	if (eventType === 'newTask') {
		record = await Task.findOne({
			where: {
				id: recordId,
			},
			attributes: ['id', 'created_at', 'recurs', 'nest_id'],
		})
			.then((dbRecord) => JSON.parse(JSON.stringify(dbRecord)))
			.catch((err) => {
				console.log(err);
				return;
			});

		//if eventType is newUser, query user db for record
	} else if (eventType === 'newUser') {
		record = await User.findOne({
			where: {
				id: recordId,
			},
			attributes: ['id', 'created_at', 'nest_id'],
		})
			.then((dbRecord) => dbRecord.dataValues)
			.catch((err) => {
				console.log(err);
				return;
			});
	} else {
		console.log("invalid parameters, expected 'newTask' or  'newUser'");
		return;
	}

	console.log('Input Task', record);

	//query the DB to get the new array of tasks sorted by creation date
	const taskArray = await Task.findAll({
		where: {
			nest_id: record.nest_id,
		},
		order: [['created_at', 'ASC']],
	})
		.then((taskDbData) => JSON.parse(JSON.stringify(taskDbData)))
		.catch((err) => {
			console.log(err);
			return;
		});

	console.log('Task Array', taskArray);

	//query the DB to get new array of users sorted by creation date
	const userArray = await User.findAll({
		where: {
			nest_id: record.nest_id,
		},
		order: [['created_at', 'ASC']],
	})
		.then((userDbData) => JSON.parse(JSON.stringify(userDbData)))
		.catch((err) => {
			console.log(err);
			return;
		});

	console.log('User Array', userArray);

	//query the DB to get the the array of assignments for the past 31 days (this covers daily weekly and monthly)
	const createdDateMinus31 = moment(record.created_at)
		.subtract(31, 'days')
		.format('MM-DD-YYYY');
	const assignmentArray = await Assignment.findAll({
		where: {
			nest_id: record.nest_id,
			date: {
				[Op.between]: [
					createdDateMinus31,
					moment(record.created_at).format('MM-DD-YYYY'),
				],
			},
		},
		include: [
			{
				model: Task,
				attributes: ['id', 'recurs'],
			},
		],
	})
		.then((assignmentDbData) =>
			JSON.parse(JSON.stringify(assignmentDbData))
		)
		.catch((err) => {
			console.log(err);
			return;
		});

	console.log('Assignment Array', assignmentArray);

	//create roundRobin instance from tasks and users
	const taskTable = new SequentialRoundRobin(taskArray);
	const userTable = new SequentialRoundRobin(userArray);

	//if the eventType is newTask
	if (eventType === 'newTask') {
		//get the id of the last user who was assigned given an assignment of the same type ('daily', 'weekly', 'monthly')
		//this will allow us to calculate who in the array should receive the next assignment
		const filteredAssignmentArr = assignmentArray
			.reverse()
			.filter((assignment) => assignment.task.recurs === record.recurs);
		const lastUserId = filteredAssignmentArr[0].user_id;
		console.log('ID of Last User:', lastUserId);

		//remove all assignment records from the DB of the same type ('daily', 'weekly, or 'monthly') that come after
		//createdAt date of new record where nest_id = current nest and recur = taskType
		const deleteRecordResponse = await sequelize.query(`
        DELETE assignment
        FROM assignment
        LEFT JOIN task on assignment.task_id = task.id
        WHERE task.recurs = '${record.recurs}' AND assignment.date > '${moment(record.created_at).format('YYYY-MM-DD')}';`);
        console.log('Delete Record Resp', deleteRecordResponse);

		//cycle thru the roundRobin of users until result = last user
        for (let i of userArray) {
            let userId = userTable.next().value.id;
            if (userId === lastUserId) {
                break;
            }
        }

        //set Iterations
        let iterations = null;
        if (record.recurs === 'daily') {
            //generate records a year into the future (365 days)
            iterations = 365;
        } else if (record.recurs === 'weekly') {
            //generate records a year into the future (52 weeks)
            iterations = 52;
        } else {
            //generate records a year into the future (12mo)
            iterations = 12;
        }

        //create empty array to hold new assignment pairs
        const pairings = [];

		//create pairings of tasks and users starting with the .next() user
        for (let i = 0; i < iterations; i++) {
            //pair the next user with the next task
            // [this user, this task]
            pairings.push([
                userTable.next().value,
                taskTable.next().value,
            ]);
        }

        //create empty array to hold formatted assignments
        const formattedAssignments = [];
        let startDateObj = moment(record.created_at, 'MM-DD-YYYY')
        const taskLimit = taskArray.length;
    
		//format pairings into array of assignment records
        for (let i = 0; i < iterations; i++) {
            //create an assigment object from the pairings and add it to
            //the formattedAssignments array
            formattedAssignments.push({
                date: moment(startDateObj).format('M/D/YYYY'),
                task_id: pairings[i][1].id,
                user_id: pairings[i][0].id,
                nest_id: pairings[i][1].nest_id,
            });
    
            if (taskType === 'daily') {
                if ((i + 1) % taskLimit === 0) {
                    //whenever the taskLimit is reached, add 1 day
                    startDateObj.add(1, 'days');
                }
            } else if (taskType === 'weekly') {
                if ((i + 1) % taskLimit === 0) {
                    //whenever the taskLimit is reached, add 1 week
                    startDateObj.add(1, 'weeks');
                }
            } else {
                if ((i + 1) % taskLimit === 0) {
                    //whenever the taskLimit is reached, add 1 month
                    startDateObj.add(1, 'months');
                }
            }
        }

		//bulk create the new assignments in the DB
        Assignment.bulkCreate(formattedAssignments);

	}
	//if the eventType is newUser

	//remove all assignment records from the DB that come after createAt date of new record

	//cycle thru the roundRobin of all users i times, where i = array.length -2
	//this will force the .next() user to be the newUser

	//create pairings of daily tasks and users starting with newUser
	//filter taskArray for daily tasks
	//create pairings

	//create pairings of weekly tasks and users starting with newUser
	//filter taskArray for weekly tasks
	//create pairings

	//create pairings of monthly tasks and users starting with newUser
	//filter taskArray for monthly tasks
	//create pairings

	//combine arrays

	//format pairings into array of assignment records

	//bulk create the new assignments in the DB
};

updateRoundRobin(8, 'newTask');
