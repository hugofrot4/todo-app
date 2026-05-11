const prisma = require("../prisma");

async function getAllTasks() {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function getTaskById(id) {
  return prisma.task.findUnique({
    where: { id },
  });
}

async function createTask(data) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description, // opcional, pode ser undefined
      // status já tem default "pending" no banco
    },
  });
}

async function updateTask(id, data) {
  return prisma.task.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      status: data.status,
    },
  });
}

async function deleteTask(id) {
  return prisma.task.delete({
    where: { id },
  });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
