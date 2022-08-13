//Nest API CRUD Routes
const router = require('express').Router();
const { User, Nest, Task } = require('../../models');
const updateRoundRobin = require('../../utils/update-round-robin');

//Get all Nests
router.get('/', (req, res) => {
    Nest.findAll({
        //do not return personal info on findAll
        attributes: { exclude: ['street', 'city', 'state', 'zip', 'share_id']}
    })
    .then(dbNestData => res.json(dbNestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get Nest info by ID - REQUIRES AUTH AND NEST MEMBERSHIP
router.get('/:id', (req, res) => {
    Nest.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'nest_name',
            'street',
            'city',
            'state',
            'zip',
            'share_id'
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'email', 'first_name','last_name', 'role']
            },
            {
                model: Task,
                attributes: ['id', 'task_name','task_description']
            }
        ]
    })
    .then(dbNestData => res.json(dbNestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get Nest by Share ID
router.get('/share/:id', (req, res) => {
    Nest.findOne({
        where: {
            share_id: req.params.id
        },
        attributes: [
            'id',
            'nest_name',
            'street',
            'city',
            'state',
            'zip'
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'email', 'first_name','last_name', 'role']
            },
        ]
    })
    .then(dbNestData => res.json(dbNestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get Daily, Weekly, or Monthly tasks by Nest ID -- REQUIRES AUTH
router.post('/tasks/', (req, res) => {
    //expects {nest_id: 'id', task_type: 'daily OR weekly OR monthly'}
    Nest.findOne({
        where: {
            id: req.body.nest_id
        },
        attributes: ['id'],
        include: [
            {
                model: Task,
                attributes: ['id', 'task_name','task_description'],
                where: {
                    recurs: req.body.task_type
                }
            }
        ]
    })
    .then(dbNestData => {
        if (!dbNestData) {
            res.status(400).json({ message: 'No nest found with that ID' })
            return;
        }
        res.json(dbNestData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create Nest
router.post('/', (req, res) => {
    //expects {nest_name: 'name', street: 'street address', city: 'city', state: 'NC', zip: 'zip code'}
    Nest.create({
        nest_name: req.body.nest_name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    })
    .then(dbNestData => res.json(dbNestData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Add User to Nest
router.put('/add-user', (req, res)=> {

    const user_id = req.body.user_id;
    const nest_id = req.body.nest_id;

    //expects {nest_id: 'nest id', user_id: 'user's id'}
    User.update(
        {
            nest_id: req.body.nest_id
        },
        {
            where: {
                id: req.body.user_id
            }
        }
    )
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with that ID' })
            return;
        }
        //re-calculate assignments with new user
        updateRoundRobin(user_id, 'newUser');

        //save nest ID to user's session
        req.session.nest_id = nest_id;
        
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update Nest info
router.put('/:id', (req, res) => {
    //expects {nest_name: 'name', street: 'street address', city: 'city', state: 'state', zip: 'zip code'}
    Nest.update(
        {
            nest_name: req.body.nest_name,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbNestData => {
            if (!dbNestData) {
                res.status(400).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbNestData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete Nest
router.delete('/:id', (req, res) => {
    Nest.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbNestData => {
            if (!dbNestData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbNestData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;