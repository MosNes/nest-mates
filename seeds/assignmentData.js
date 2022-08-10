//captures env variables
require('dotenv').config();

const { Assignment } = require('../models');
const { formatAssignments } = require('../utils/format-assignments');

const nestMateJSON = `[
  {
      "id": 5,
      "username": "misstake",
      "email": "accidentalMillionaire@gmail.com",
      "first_name": "Francine",
      "last_name": "Kibble",
      "role": "Nestmate",
      "nest_id": 2
  },
  {
      "id": 6,
      "username": "noble420",
      "email": "blazeit@gmail.com",
      "first_name": "Mordecai",
      "last_name": "Montague",
      "role": "Nestmate",
      "nest_id": 2
  },
  {
      "id": 7,
      "username": "fweeb",
      "email": "weeblbleeb@gmail.com",
      "first_name": "Sousuke",
      "last_name": "WithTheMosuke",
      "role": "Nestmate",
      "nest_id": 2
  }
]`
const nestMateArr = JSON.parse(nestMateJSON);

const dailyTasksJSON = `[
  {
      "id": 4,
      "task_name": "Clean the Kitchen",
      "task_description": "Use the drying rack",
      "nest_id": 2
  },
  {
    "id": 8,
    "task_name": "Walk the Doggo",
    "task_description": "At least 30min",
    "nest_id": 2
  }
]`
const dailyTasksArr = JSON.parse(dailyTasksJSON);

const weeklyTasksJSON = `[
  {
    "id": 6,
    "task_name": "Mow the Lawn",
    "task_description": "Use the weedeater too",
    "nest_id": 2
},
{
  "id": 5,
  "task_name": "Clean the upstairs bathroom",
  "task_description": "Make sure to get the tub",
  "nest_id": 2
}
]`
const weeklyTasksArr = JSON.parse(weeklyTasksJSON);

const monthlyTasksJSON = `[
  {
    "id": 7,
    "task_name": "Clean up dog poo",
    "task_description": "Front and back yard",
    "nest_id": 2
}
]`
const monthlyTasksArr = JSON.parse(monthlyTasksJSON);

const dailyAssignmentData = formatAssignments(nestMateArr, dailyTasksArr, 'daily', '08/07/2022', 60);
const weeklyAssignmentData = formatAssignments(nestMateArr, weeklyTasksArr, 'weekly', '08/08/2022', 8);
const monthlyAssignmentData = formatAssignments(nestMateArr, monthlyTasksArr, 'monthly', '08/09/2022', 2);

const seedDailyAssignment = () => Assignment.bulkCreate(dailyAssignmentData);
const seedWeeklyAssignment = () => Assignment.bulkCreate(weeklyAssignmentData);
const seedMonthlyAssignment = () => Assignment.bulkCreate(monthlyAssignmentData);

const seedAllAssignment = () => {
  seedDailyAssignment();
  seedWeeklyAssignment();
  seedMonthlyAssignment();
}

seedAllAssignment();

