//API Routes for User CRUD operations

//------------DEPENDENCIES AND GLOBAL VARIABLES------------------------------
const router = require('express').Router();
const { User } = require('../../models');

//Get All Users
router.get('/', (req, res) => {
    // access user model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get User by ID

//Get Users by Nest ID

//Create User

//Add User to Nest

//Update User Info

//Delete User

module.exports = router;