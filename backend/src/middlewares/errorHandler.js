// Middleware de erro global — captura qualquer erro não tratado
function errorHandler(err, req, res, next) {
  console.error("Erro não tratado:", err);

  // Erros do Prisma (ex: violação de constraint)
  if (err.code === "P2002") {
    return res
      .status(409)
      .json({ error: "Já existe um registro com esses dados." });
  }

  // Erro genérico
  return res.status(500).json({ error: "Erro interno do servidor." });
}

module.exports = errorHandler;
