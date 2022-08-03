//index of models
//collects all models into single file to be easily imported into other files

const User = require('./User');
const Nest = require('./Nest');
const Task = require('./Task');
const Assignment = require('./Assignment');

//define assoctiations between models



//exports models
module.exports = { User, Nest, Task, Assignment };