import mongoose from "mongoose";
import logger from "./logger.js";

const url = "mongodb://localhost:27017/Pokedex";

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    logger.info("[DB] Conectado ao MongoDB com sucesso!");
  } catch (error) {
    logger.error("[DB] Erro ao conectar ao MongoDB: ", error);
    process.exit(1); // Encerra a aplicação em caso de falha na conexão
  }
};

export default connectDB;
