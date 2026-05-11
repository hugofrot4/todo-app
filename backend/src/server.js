const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");

const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerSpec = require("./swagger");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API To-Do funcionando! Documentação em /docs" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/docs`);
});
