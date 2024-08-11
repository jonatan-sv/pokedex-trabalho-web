import mongoose from "mongoose";

const url = "mongodb://localhost:27017/Pokedex";

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra a aplicação em caso de falha na conexão
  }
};

export default connectDB;
