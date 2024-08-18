import logger from "../logger.js";

const handleMongooseError = (error, res, action) => {
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
    logger.error(`[DB] Erro ao ${action} Pokémon: `, error);
    return res
      .status(500)
      .json({ message: `Erro interno ao ${action} o Pokémon.` });
  }
};

export default handleMongooseError;