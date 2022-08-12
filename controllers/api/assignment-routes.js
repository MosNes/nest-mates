//Assignment Routes
const router = require('express').Router();

const {Task, Assignment, User} = require('../../models');

//get assignment by ID
router.get('/:id', (req, res) => {
    Assignment.findOne({
        where: {
            id: req.params.id
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
            if (!dbAssignmentData) {
                res.status(404).json({ message: 'No assignment found with this id' });
                return;
            }
            res.json(dbAssignmentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get Assignments by Nest ID
router.get('/nest/:nest_id', (req, res) => {
    Assignment.findAll({
        where: {
            nest_id: req.params.nest_id
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
            if (!dbAssignmentData) {
                res.status(404).json({ message: 'No assignment found with this id' });
                return;
            }
            res.json(dbAssignmentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get Assignments by User ID
router.get('/user/:user_id', (req, res) => {
    Assignment.findAll({
        where: {
            user_id: req.params.user_id
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
            if (!dbAssignmentData) {
                res.status(404).json({ message: 'No assignment found with this id' });
                return;
            }
            res.json(dbAssignmentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//bulk create assignments from array of pairings? 

//update assignment
router.put('/:id', (req, res) => {
    Assignment.update(
        {
            status: req.body.status,
            completed_date: req.body.completed_date,
            note: req.body.note
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbAssignmentData => {
            if (!dbAssignmentData) {
                res.status(404).json({ message: 'No assignment found with this id' });
                return;
            }
            res.json(dbAssignmentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete Assignment?

module.exports = router;