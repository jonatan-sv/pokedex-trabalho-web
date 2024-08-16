import express from "express";
import * as controllers from "../controllers/pokemon.js";
Object.assign(global, controllers); // Permite acessar todos os imports sem o apelido

const router = express.Router();

router.get("/", getPokemons);
router.get("/:id", getPokemonByID);
router.post("/", postPokemon);
router.put("/:id", updatePokemonByID);
router.delete("/:id", deletePokemonByID);

export default router;
