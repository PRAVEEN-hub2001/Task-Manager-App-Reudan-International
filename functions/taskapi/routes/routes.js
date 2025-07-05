const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { taskCreateSchema, taskUpdateSchema } = require('../validations/taskSchema');
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.get('/tasks/', getAllTasks);
router.post('/tasks/', validate(taskCreateSchema), createTask);
router.put('/tasks/:id', validate(taskUpdateSchema), updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
