import Pokemon from "../models/pokemon.js";
import errorHandler from "../utils/errorhandler.js";
import logger from "../logger.js";

export const getPokemons = (req, res) => {
  Pokemon.find({})
    .then((result) => {
      return res.status(200).json({ results: result });
    })
    .catch((error) => {
      errorHandler(error, req, res, "obter");
    });
};

export const getPokemonByID = (req, res) => {
  Pokemon.findOne({ number: req.params.id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Pokémon não encontrado!" });
      }
      return res.status(200).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res, "procurar");
    });
};

export const postPokemon = (req, res) => {
  const novoPokemon = new Pokemon({
    ...req.query,
    ...req.body,
  });

  novoPokemon
    .save()
    .then((result) => {
      logger.warn("[DB] Um Pokémon foi adicionado: ", result);
      res.status(201).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res, "adicionar");
    });
};

export const updatePokemonByID = (req, res) => {
  const updates = {
    ...req.query,
    ...req.body,
  };
  Pokemon.findOneAndUpdate({ number: Number(req.params.id) }, updates, {
    new: true,    // Retorna o pokémon atualizado ao invés do antigo
    upsert: true, // Cria o pokémon se ele não for encontrado
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Pokémon não encontrado!" });
      }
      logger.warn("[DB] Um Pokémon foi atualizado ou adicionado: ", result);
      return res.status(200).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res, "atualizar");
    });
};

export const deletePokemonByID = (req, res) => {
  Pokemon.findOneAndDelete({ number: req.params.id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Pokémon não encontrado!" });
      }
      logger.warn("[DB] Um Pokémon foi removido: ", result);
      return res.status(200).json(result);
    })
    .catch((error) => {
      errorHandler(error, req, res, "apagar");
    });
};
