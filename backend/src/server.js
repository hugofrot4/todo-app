const express = require("express");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API To-Do funcionando!" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
