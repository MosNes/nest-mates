require('dotenv').config();

//When a new task is created or a new user is added to the nest, the future round robin assignments need to be recalculated

const { Task, User } = require("../models");
const moment = require('moment');

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
                id: recordId
            },
            attributes: ['id', 'created_at', 'recurs', 'nest_id']
        })
        .then(dbRecord => JSON.parse(JSON.stringify(dbRecord)))
        .catch(err => {
            console.log(err);
            return;
        });

    //if eventType is newUser, query user db for record
    } else if (eventType === 'newUser') {

        record = await User.findOne({
            where: {
                id: recordId
            },
            attributes: ['id', 'created_at', 'nest_id']
        })
        .then(dbRecord => dbRecord.dataValues)
        .catch(err => {
            console.log(err);
            return;
        });
        
    } else {
        console.log("invalid parameters, expected 'newTask' or  'newUser'");
        return;
    }

    console.log("Input Task", record);

//query the DB to get the new array of tasks sorted by creation date
const taskArray = await Task.findAll({
    where: {
        nest_id: record.nest_id
    },
    order: [ ['created_at','ASC'] ]
})
.then(taskDbData => JSON.parse(JSON.stringify(taskDbData)))
.catch(err => {
    console.log(err);
    return;
});

console.log('Task Array',taskArray);

//query the DB to get new array of users sorted by creation date
const userArray = await User.findAll({
    where: {
        nest_id: record.nest_id
    },
    order: [ ['created_at','ASC'] ]
})
.then(userDbData => JSON.parse(JSON.stringify(userDbData)))
.catch(err => {
    console.log(err);
    return;
});

console.log('User Array',userArray);

//query the DB to get the the array of assignments for the past 31 days (this covers daily weekly and monthly)
const createdDateMinus31 = '';

//create roundRobin instance from tasks and users

//if the eventType is newTask

    //get the id of the last user who was assigned given an assignment of the same type ('daily', 'weekly', 'monthly')
    //this will allow us to calculate who in the array should receive the next assignment

    //remove all assignment records from the DB of the same type ('daily', 'weekly, or 'monthly') that come after
    //createdAt date of new record where nest_id = current nest and recur = taskType

    //cycle thru the roundRobin of users until result = last user

    //create pairings of tasks and users starting with the .next() user

    //format pairings into array of assignment records

    //bulk create the new assignments in the DB


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