//index for all API routes

//-------------DEPENDENCIES AND GLOBAL VARIABLES-------------------------
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

//use userRoutes for any request starting with /users/
router.use('/users', userRoutes);

module.exports = router;