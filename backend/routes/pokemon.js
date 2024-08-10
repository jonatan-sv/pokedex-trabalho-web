import express from "express";
import { getPokemons } from "../controllers/pokemon.js";

const router = express.Router();

router.get("/", getPokemons);

export default router;
