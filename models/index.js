//index of models
//collects all models into single file to be easily imported into other files

const User = require('./User');
const Nest = require('./Nest');
const Task = require('./Task');
const Assignment = require('./Assignment');

//define assoctiations between models
Nest.hasMany(User, {
    foreignKey: 'nest_id',
    //when nest is deleted, set nest ID of all affected users to null
    onDelete: 'SET NULL'
});

User.belongsTo(Nest, {
    foreignKey: 'nest_id',
    onDelete: 'SET NULL'
});

Nest.hasMany(Task, {
    foreignKey: 'nest_id',
    //when nest is deleted, delete all associated tasks
    onDelete: 'CASCADE'
});

Task.belongsTo(Nest, {
    foreignKey: 'nest_id',
    onDelete: 'CASCADE'
});

Nest.hasMany(Assignment, {
    foreignKey: 'nest_id',
    //when nest is deleted, delete all associated assignments
    onDelete: 'CASCADE'
});

Assignment.belongsTo(Nest, {
    foreignKey: 'nest_id',
    onDelete: 'CASCADE'
});

User.hasMany(Assignment, {
    foreignKey: 'user_id',
    //when user is deleted, remove them from all associated assigments
    //but don't delete assignments
    onDelete: 'SET NULL'
});

Assignment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Task.hasMany(Assignment, {
    foreignKey: 'task_id',
    //when task is deleted, delete all associated assignments
    onDelete: 'CASCADE'
});

Assignment.belongsTo(Task, {
    foreignKey: 'task_id',
    onDelete: 'CASCADE'
});

//exports models
module.exports = { User, Nest, Task, Assignment };