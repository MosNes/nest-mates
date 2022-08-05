//API Routes for User CRUD operations

//------------DEPENDENCIES AND GLOBAL VARIABLES------------------------------
const router = require('express').Router();
const { User, Nest } = require('../../models');

//Get All Users
router.get('/', (req, res) => {
    // access user model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] },
        //show the nest a user belongs to
        include: [
            {
                model: Nest,
                attributes: ['id', 'nest_name', 'street', 'city', 'state', 'zip']
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get User by ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Nest,
                attributes: ['id', 'nest_name', 'street', 'city', 'state', 'zip']
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Create User
router.post('/', (req, res) => {
    // expects {username: 'user', email: 'user@user.com', password: 'password',
    // first_name: "firstname", last_name: "lastname"}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        nest_id: req.body.nest_id
    })
        .then(dbUserData => {
            //creates session using the newly created user's info
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//Update User Info

//Delete User

module.exports = router;