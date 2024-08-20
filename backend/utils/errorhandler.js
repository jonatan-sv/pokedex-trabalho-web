import logger from "../logger.js";

const handleMongooseError = (error, req, res, action) => {
  // Violação de unicidade
  if (error.code === 11000) {
    const errors = Object.keys(error.keyValue).reduce((acc, key) => {
      acc[key] = error.keyValue[key];
      return acc;
    }, {});
    return res.status(400).json({
      message: "Já existe um Pokémon com o seguinte dado:",
      errors,
    });
  }
  // Erro de validação
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).reduce((acc, key) => {
      acc[key] = error.errors[key].message;
      return acc;
    }, {});
    return res.status(400).json({
      message: "Erro ao inserir os seguintes dados do Pokémon:",
      errors,
    });
  // Outros
  } else {
    const errorLog = {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
      params: { ...req.params },
      queries: { ...req.query },
      errorMessage: error.message,
      stack: error.stack,
    };

    logger.error(`[DB] Erro ao ${action} Pokémon: `, errorLog);
    return res
      .status(500)
      .json({ message: `Erro interno ao ${action} o Pokémon.` });
  }
};

export default handleMongooseError;