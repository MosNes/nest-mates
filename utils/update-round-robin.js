//When a new task is created or a new user is added to the nest, the future round robin assignments need to be recalculated

//TRIGGER: when a new task is created or a new user is added to the nest
// params are recordId and eventType
//recordId should be the id of the new task or user record. eventType should be 'newTask' or 'newUser'
const updateRoundRobin = async (recordId, eventType) {

//get the date of the task creation or user creation
    //if eventType is newTask, query task db for record

    //if eventType is newUser, query user db for record

//if eventType is newTask, get the recur value


//query the DB to get the new array of tasks sorted by creation date

//query the DB to get new array of users sorted by creation date

//query the DB to get the the array of assignments for the past 31 days (this covers daily weekly and monthly)

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
