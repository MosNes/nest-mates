//index for all API routes

//-------------DEPENDENCIES AND GLOBAL VARIABLES-------------------------
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const tasksRoutes = require('./task-routes.js');

//use userRoutes for any request starting with /users/
router.use('/users', userRoutes);

router.use('/tasks', tasksRoutes);

module.exports = router;