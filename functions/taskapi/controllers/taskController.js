const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await req.catalyst.datastore().table('Tasks').getAllRows();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await req.catalyst.datastore().table('Tasks').insertRow(req.body);
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