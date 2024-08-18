import Pokemon from "../models/pokemon.js";
import errorHandler from "../utils/errorhandler.js";

export const getPokemons = (_, res) => {
  Pokemon.find({})
    .then((pokemons) => {
      return res.status(200).json({ results: pokemons });
    })
    .catch((error) => {
      errorHandler(error, res, "obter")
    });
};

export const getPokemonByID = (req, res) => {
  Pokemon.findOne({ number: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Pokémon não encontrado!" });
      }
      return res.status(200).json(data);
    })
    .catch((error) => {
      errorHandler(error, res, "procurar")
    });
};

/**
 * TODO:
 * - Fazer com que também peguem os dados pelo corpo da request
 */
export const postPokemon = (req, res) => {
  const novoPokemon = new Pokemon({
    name: req.query.name,
    number: req.query.number,
    type: req.query.type,
    sprite: req.query.sprite,
  });

  novoPokemon
    .save()
    .then((poke) => res.status(201).json(poke))
    .catch((error) => {
      errorHandler(error, res, "adicionar");
    });
};

export const updatePokemonByID = (req, res) => {
  const updates = {
    name: req.query.name,
    type: req.query.type,
    sprite: req.query.sprite,
  };
  Pokemon.findOneAndUpdate({ number: Number(req.params.id) }, updates, {
    new: true,           // Retorna o pokémon atualizado ao invés do antigo
    upsert: true,        // Cria o pokémon se ele não for encontrado
    runValidators: true, // Aplica as validações do modelo no update
  })
    .then((updatedPokemon) => {
      if (!updatedPokemon) {
        return res.status(404).json({ message: "Pokémon não encontrado!" });
      }
      return res.status(200).json(updatedPokemon);
    })
    .catch((error) => {
      errorHandler(error, res, "atualizar");
    });
};

export const deletePokemonByID = (req, res) => {
  Pokemon.deleteOne({ number: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        return res
          .status(204)
          .json({ message: "Pokémon apagado com sucesso!" });
      }
      return res.status(404).json({ message: "Pokémon não encontrado!" });
    })
    .catch((error) => {
      errorHandler(error, res, "apagar")
    });
};
