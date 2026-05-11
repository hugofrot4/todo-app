function validateCreateTask(req, res, next) {
  const { title, description, status } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res
      .status(400)
      .json({ error: "O título é obrigatório e deve ser um texto válido." });
  }

  if (title.trim().length > 100) {
    return res
      .status(400)
      .json({ error: "O título deve ter no máximo 100 caracteres." });
  }

  // Descrição é opcional, mas se vier deve ser string
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "A descrição deve ser um texto." });
  }

  req.body.title = title.trim();
  if (description) req.body.description = description.trim();

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, description, status } = req.body;

  if (!title && !description && !status) {
    return res
      .status(400)
      .json({ error: "Informe ao menos um campo para atualizar." });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "O título deve ser um texto válido." });
    }
    if (title.trim().length > 100) {
      return res
        .status(400)
        .json({ error: "O título deve ter no máximo 100 caracteres." });
    }
    req.body.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      return res.status(400).json({ error: "A descrição deve ser um texto." });
    }
    req.body.description = description.trim();
  }

  if (status !== undefined) {
    const validStatus = ["pending", "completed"];
    if (!validStatus.includes(status)) {
      return res
        .status(400)
        .json({ error: 'Status inválido. Use "pending" ou "completed".' });
    }
  }

  next();
}

module.exports = { validateCreateTask, validateUpdateTask };
