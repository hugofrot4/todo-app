const { Router } = require("express");
const taskController = require("../controllers/task.controller");
const {
  validateCreateTask,
  validateUpdateTask,
} = require("../middlewares/validate");

const router = Router();

router.get("/", taskController.index); // listar todas
router.get("/:id", taskController.show); // buscar por ID
router.post("/", validateCreateTask, taskController.create); // criar
router.patch("/:id", validateUpdateTask, taskController.update); // atualizar
router.delete("/:id", taskController.remove); // deletar

module.exports = router;
