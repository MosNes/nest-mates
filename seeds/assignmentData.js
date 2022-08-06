//captures env variables
require('dotenv').config();

const { Assignment } = require('../models');

const assignmentData= [
    { date: '8/6/2022', task_id: 4, user_id: 5, nest_id: 2 },
    { date: '8/6/2022', task_id: 5, user_id: 6, nest_id: 2 },
    { date: '8/6/2022', task_id: 6, user_id: 7, nest_id: 2 },
    { date: '8/6/2022', task_id: 7, user_id: 5, nest_id: 2 },
    { date: '8/7/2022', task_id: 4, user_id: 6, nest_id: 2 },
    { date: '8/7/2022', task_id: 5, user_id: 7, nest_id: 2 },
    { date: '8/7/2022', task_id: 6, user_id: 5, nest_id: 2 },
    { date: '8/7/2022', task_id: 7, user_id: 6, nest_id: 2 },
    { date: '8/8/2022', task_id: 4, user_id: 7, nest_id: 2 },
    { date: '8/8/2022', task_id: 5, user_id: 5, nest_id: 2 },
    { date: '8/8/2022', task_id: 6, user_id: 6, nest_id: 2 },
    { date: '8/8/2022', task_id: 7, user_id: 7, nest_id: 2 }
  ];

const seedAssignment = () => Assignment.bulkCreate(assignmentData);

seedAssignment();