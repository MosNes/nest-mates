const router = require('express').Router();
const { Task, Assignment, User, Nest } = require('../models');

//display homepage
//if user is logged in, redirect to myNest page
router.get("/", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/mynest');
        return;
    }

    res.render('homepage');
});

//display login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/mynest');
        return;
    }

    res.render('loginpage');
})

//display myNest page
router.get('/mynest', async (req, res) => {

    //if user is not logged in, redirect to login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    //get assignment data for the user's nest
    const assignmentData = await Assignment.findAll({
        where: {
            nest_id: req.session.nest_id
        },
        attributes: [
            'id',
            'date',
            'completion_date',
            'status',
            'note',
            'task_id',
            'user_id',
            'nest_id'
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'email', 'first_name', 'last_name']
            },
            {
                model: Task,
                attributes: ['task_name', 'task_description', 'recurs']
            }
        ]
    })
        .then(dbAssignmentData => {
            if (!dbAssignmentData[0]) {
                res.status(404).json({ message: 'No assignment found with this id' });
                console.log("no assignments found")
                return;
            }

            //serialize the data into an array of objects
            const assignments = dbAssignmentData.map(assignment => assignment.get({ plain: true }));
            return assignments;
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

    //do something if no assignments are found
    console.log(assignmentData)
    if (!assignmentData) {
        console.log("nothing found")
        return;
    }

    //filter assignment data into daily, weekly, and monthly arrays
    const dailyAssignments = assignmentData.filter(assignment => assignment.task.recurs === 'daily');
    const weeklyAssignments = assignmentData.filter(assignment => assignment.task.recurs === 'weekly');
    const monthlyAssignments = assignmentData.filter(assignment => assignment.task.recurs === 'monthly');

    console.log("monthly assignments", monthlyAssignments)

    //get nest data
    const nestData = await Nest.findOne({
        where: {
            id: req.session.nest_id
        },
        attributes: [
            'id',
            'nest_name',
            'street',
            'city',
            'state',
            'zip',
            'share_id'
        ]
    })
    .then(dbNestData => {
        if (!dbNestData) {
            res.status(404).json({ message: 'No nest found with this id' });
            console.log("no nest found")
            return;
        }
        
        //serialize the nest data into an object
        const nestData = dbNestData.get({ plain: true });
        console.log(nestData);
        return nestData;
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

    //get users associated with this nest
    const nestmates = await User.findAll({
        where: {
            nest_id: req.session.nest_id
        },
        attributes: ['id', 'first_name', 'last_name', 'email', 'role']
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No users found' });
            console.log("no users found")
            return;
        }
        
        //serialize the user data into an array of objects
        const users = dbUserData.map(user => user.get({ plain: true }));
        console.log(users)
        return users;
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });


    //pass array of formatted assignment objects to the mynest template
    res.render('mynest', {
        dailyAssignments, weeklyAssignments, monthlyAssignments, nestData, nestmates
    })
});


module.exports = router;