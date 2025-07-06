const getAllTasks = async (req, res, next) => {
  try {
    const user = await req.catalyst.userManagement().getCurrentUser();
    const query = {
      search: {
        column: 'user_id',
        value: user.user_id
      }
    };

    const tasks = await req.catalyst.datastore().table('Tasks').getAllRows(query);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res) => {
  try {
    const user = await req.catalyst.userManagement().getCurrentUser();
    const taskData = { ...req.body, user_id: user.user_id };

    const task = await req.catalyst.datastore().table('Tasks').insertRow(taskData);
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const table = req.catalyst.datastore().table('Tasks');
    const existing = await table.getRow(id);

    if (!existing) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    const updatedTask = await table.updateRow({ ROWID: id, ...req.body });
    res.status(200).json({ message: "Task updated", updatedTask });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const table = req.catalyst.datastore().table('Tasks');
    const existing = await table.getRow(id);

    if (!existing) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    await table.deleteRow(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };