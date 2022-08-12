const router = require('express').Router();
const {Task, Assignment, User} = require('../models');

//display homepage
//if user is logged in, redirect to myNest page
router.get("/", (req, res) => {
    if (req.session.loggedIn){
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
router.get('/mynest', (req, res) => {

        if (!req.session.loggedIn) {
            res.redirect('/login');
            return;
        }

        Assignment.findAll({
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
                    attributes: ['username', 'email', 'first_name','last_name']
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

                console.log("rendering mynest page")
                //serialize the data into an array of objects
                const assignments = dbAssignmentData.map( assignment => assignment.get({ plain: true }));
                console.log(assignments)

                const dailyAssignments = assignments.filter( assignment => assignment.task.recurs === 'daily');
                const weeklyAssignments = assignments.filter( assignment => assignment.task.recurs === 'weekly');
                const monthlyAssignments = assignments.filter( assignment => assignment.task.recurs === 'monthly');

                console.log("monthly assignments", monthlyAssignments)

                //pass array of formatted assignment objects to the mynest template
                //session.loggedIn is passed to the template so the template can render
                //differently depending on whether a user is logged in
                res.render('mynest', {
                    dailyAssignments, weeklyAssignments, monthlyAssignments,
                    loggedIn: req.session.loggedIn
                })

            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });


module.exports= router;