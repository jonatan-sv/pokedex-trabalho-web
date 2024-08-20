import mongoose from "mongoose";
import logger from "./logger.js";

const url = "mongodb://localhost:27017/Pokedex";

const connectDB = async () => {
  try {
    await mongoose.connect(url);

    const info = {
      db: mongoose.connection.name,
      state: mongoose.connection.readyState,
      server: mongoose.connection.host,
      port: mongoose.connection.port
    }

    logger.info("[DB] Conectado ao MongoDB com sucesso! ", info);
  } catch (error) {
    logger.error("[DB] Erro ao conectar ao MongoDB: ", error);
    process.exit(1); // Encerra a aplicação em caso de falha na conexão
  }
};

export default connectDB;
