import express from "express";
import pokeRoutes from "./routes/pokemon.js";
import cors from "cors";
import connectDB from "./db.js";

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/pokemons", pokeRoutes);

app.listen(8800);
