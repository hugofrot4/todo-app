const taskService = require("../services/task.service");

async function index(req, res) {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tarefas." });
  }
}

async function show(req, res) {
  try {
    const id = Number(req.params.id);
    const task = await taskService.getTaskById(id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada." });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tarefa." });
  }
}

async function create(req, res) {
  try {
    const { title, description } = req.body;
    const task = await taskService.createTask({ title, description });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar tarefa." });
  }
}

async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const exists = await taskService.getTaskById(id);
    if (!exists)
      return res.status(404).json({ error: "Tarefa não encontrada." });
    const task = await taskService.updateTask(id, req.body);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar tarefa." });
  }
}

async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    const exists = await taskService.getTaskById(id);
    if (!exists)
      return res.status(404).json({ error: "Tarefa não encontrada." });
    await taskService.deleteTask(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar tarefa." });
  }
}

module.exports = { index, show, create, update, remove };
