const moment = require('moment');
const roundRobin = require('./round-robin');

const formatAssignments = (nestMateArr, tasksArr, taskType, startDate, iterations) => {
    //nestMateArr should be array of user objects
    //tasksArr should be array of tasks with the same recur value (daily, weekly, or monthly)
    // taskType should be 'daily' OR 'weekly' or 'monthly' matching the taskArr
    // startDate should be a date string in MM-DD-YYYY format
    // iterations should be how many days, weeks, or months into the future to schedule out the assignments

    //turns the startDate string into a moment.js object to be updated as the function runs
    let startDateObj = moment(startDate, 'MM-DD-YYYY');

    //records the number of times the same date should be used before being increased
    //for example, if there are 5 daily tasks, all 5 should be assigned before the date increases by 1 day
    //if there are 2 weekly tasks, both should be assigned before the date increases by 7 days
    const taskLimit = tasksArr.length;

    //empty array to hold the assignment objects as they are created
    const formattedAssignments = [];

    //create array of pairings of users and tasks
    const pairings = roundRobin(nestMateArr, tasksArr, iterations);
    console.log(pairings);

    for (let i = 0; i < iterations; i++) {
        formattedAssignments.push(
            {
                date: moment(startDateObj).format('MM-DD-YYYY'),
                task_id: pairings[i][1].id,
                user_id: pairings[i][0].id,
                nest_id: pairings[i][1].nest_id
            }
        );
    }

    return formattedAssignments;

}

// formatAssignments('test', 'test', 'test', new Date().toLocaleDateString());

module.exports = { formatAssignments };