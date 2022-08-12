//index for all API routes

//-------------DEPENDENCIES AND GLOBAL VARIABLES-------------------------
const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const nestRoutes = require('./nest-routes');
const taskRoutes = require('./task-routes.js');
const assignmentRoutes = require('./assignment-routes');

//use userRoutes for any request starting with /users/
router.use('/users', userRoutes);
router.use('/nests', nestRoutes);
router.use('assignments', assignmentRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;