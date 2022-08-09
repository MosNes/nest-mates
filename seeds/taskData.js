const { Task } = require('../models');

const taskData = [
    {
        task_name: 'Do the Dishes',
        task_description: 'Wash them dishes',
        nest_id: 1,
        recurs: 'daily' 
    },
    {
        task_name: 'Walk Pepito',
        task_description: 'The dog needs to poop',
        nest_id: 1,
        recurs: 'daily' 
    },
    {
        task_name: 'Clean Downstairs Bathroom',
        task_description: 'Make sure we have TP',
        nest_id: 1,
        recurs: 'weekly'
    },
    {
        task_name: 'Clean the Kitchen',
        task_description: 'Use the drying rack',
        nest_id: 2,
        recurs: 'daily'
    },
    {
        task_name: 'Clean the upstairs bathroom',
        task_description: 'Make sure to get the tub',
        nest_id: 2,
        recurs: 'daily'
    },
    {
        task_name: 'Mow the Lawn',
        task_description: 'Use the drying rack',
        nest_id: 2,
        recurs: 'weekly'
    },
    {
        task_name: 'Clean up dog poo',
        task_description: 'Front and back yard',
        nest_id: 2,
        recurs: 'monthly'
    },
    {
        task_name: 'Walk the Doggo',
        task_description: 'At least 30min',
        nest_id: 2,
        recurs: 'daily'
    }
];

const seedTask = () => Task.bulkCreate(taskData);

module.exports = seedTask;