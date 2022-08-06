const { SequentialRoundRobin } = require("round-robin-js");

//expects an array of nest mates, an array of tasks, and the number of days, weeks, or months
//to create pairings for
const roundRobin = (nestMateArr, taskArr, iterations) => {
  //create a looping table of the users in a nest
  const nestMatesTable = new SequentialRoundRobin(nestMateArr);

  //create a looping table of tasks (daily, weekly or monthly)
  const taskTable = new SequentialRoundRobin(taskArr);

  //empty array to hold the returned pairings
  const assignmentArr = [];

  //for the number of iterations specified (30 days, 3 weeks, etc) do this
  for (let i = 0; i < iterations; i++) {
    //pair the next user with the next task
    assignmentArr.push([nestMatesTable.next().value, taskTable.next().value]);
  }

  //returns array of pairings
  return assignmentArr;
};

module.exports = roundRobin;
