const router = require('express').Router();

const {Task, Nest} = require('../../models');


// User.findAll({
//   attributes: { exclude: ['password'] }
// })
//   .then(dbUserData => res.json(dbUserData))
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });

//Task Routes

//get task by ID

router.get('/:id', (req, res) => {
    Task.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id","task_name", "task_description", "nest_id"]
    })
        .then(dbTaskData => {
            if (!dbTaskData) {
                res.status(404).json({ message: 'No task found with this id' });
                return;
            }
            res.json(dbTaskData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//get Tasks by Nest ID

router.get('/nest/:id', (req, res) => {
    Task.findAll({
        where: {
            nest_id: req.params.id
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Nest,
                attributes: ['id', 'nest_name', 'street', 'city', 'state', 'zip']
            }
        ]
    })
        .then(dbTaskData => {
            if (!dbTaskData) {
                res.status(404).json({ message: 'No task found with this id' });
                return;
            }
            res.json(dbTaskData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//create a task

router.post('/', (req, res) => {
    // expects {username: 'user', email: 'user@user.com', password: 'password'}
    Task.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        nest_id: req.body.nest_id
    })
        .then(dbTaskData => {
            //creates session using the newly created task info
            req.session.save(() => {
                req.session.user_id = dbTaskData.id;
                req.session.username = dbTaskData.username;
                req.session.loggedIn = true;

                res.json(dbTaskData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update Task Info

router.put('/:id', (req, res) => {
    Task.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbTaskData => {
        if (!dbTaskData) {
          res.status(404).json({ message: 'No task found with this id' });
          return;
        }
        res.json(dbTaskData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


//Delete a task

router.delete('/:id',  (req, res) => {
    console.log('id', req.params.id);
    Task.delete({
      where: {
        id: req.params.id
      }
    })
      .then(dbTaskData => {
        if (!dbTaskData) {
          res.status(404).json({ message: 'No task found with this id' });
          return;
        }
        res.json(dbTaskData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;