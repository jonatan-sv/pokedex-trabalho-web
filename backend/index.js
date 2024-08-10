import express from "express";
import pokeRoutes from "./routes/pokemon.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/pokemons", pokeRoutes) // http://localhost:8800/pokemons

app.listen(8800);
