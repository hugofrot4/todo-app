const taskService = require("../services/task.service");

// GET /tasks
async function index(req, res) {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
}

// GET /tasks/:id
async function show(req, res) {
  try {
    const id = Number(req.params.id);
    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tarefa." });
  }
}

// POST /tasks
async function create(req, res) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "O título é obrigatório." });
    }

    const task = await taskService.createTask({ title, description });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar tarefa." });
  }
}

// PATCH /tasks/:id
async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, description, status } = req.body;

    const exists = await taskService.getTaskById(id);
    if (!exists) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    const validStatus = ["pending", "completed"];
    if (status && !validStatus.includes(status)) {
      return res
        .status(400)
        .json({ error: 'Status inválido. Use "pending" ou "completed".' });
    }

    const task = await taskService.updateTask(id, {
      title,
      description,
      status,
    });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
}

// DELETE /tasks/:id
async function remove(req, res) {
  try {
    const id = Number(req.params.id);

    const exists = await taskService.getTaskById(id);
    if (!exists) {
      return res.status(404).json({ error: "Tarefa não encontrada." });
    }

    await taskService.deleteTask(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar tarefa." });
  }
}

module.exports = { index, show, create, update, remove };
