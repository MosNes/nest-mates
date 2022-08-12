const router = require('express').Router();
const updateRoundRobin = require('../../utils/update-round-robin');

const {Task, Nest} = require('../../models');

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
    Task.create({
        task_name: req.body.task_name,
        nest_id: req.body.nest_id,
        task_description: req.body.task_description,
        recurs: req.body.recurs
    })
        .then(dbTaskData => {
        //re-calculate round-robin and recreate assignment records including the new task
        updateRoundRobin(dbTaskData.dataValues.id, 'newTask')
        res.json(dbTaskData);
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
        task_name: req.body.task_name,
        nest_id: req.body.nest_id,
        task_description: req.body.task_description,
        recurs: req.body.recurs
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
    Task.destroy({
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