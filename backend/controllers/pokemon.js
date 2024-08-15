import Pokemon from "../models/pokemon.js";

/**
 * TODO:
 * - Melhorar as respostas de erro e gerais
 */

export const getPokemons = (_, res) => {
  Pokemon.find({})
    .select("-_id -__v")
    .then((pokemons) => {
      return res.status(200).json({ results: pokemons });
    })
    .catch((error) => {
      console.error("Erro ao obter os Pokémon:", error);
      return res.status(500).json({
        message: "Erro ao obter os Pokémon",
        error: error.message,
      });
    });
};

export const getPokemonByID = (req, res) => {
  Pokemon.findOne({ number: req.params.id })
    .select("-_id -__v")
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error("Erro ao procurar Pokémon:", error);
      return res
        .status(500)
        .json({ message: "Erro ao procurar Pokémon:", error: error.message });
    });
};

export const updatePokemonByID = (req, res) => {
  const updates = {
    name: req.query.name,
    type: req.query.type,
    sprite: req.query.sprite,
  };
  Pokemon.findOneAndUpdate({ number: req.query.number }, updates)
    .then((updatedPokemon) => {
      if (!updatedPokemon) {
        return res.status(404).json({ message: "Pokémon não encontrado" });
      }
      return res.json(updatedPokemon);
    })
    .catch((error) => {
      console.error("Erro ao atualizar o Pokémon:", error);
      return res
        .status(500)
        .json({ message: "Erro ao atualizar o Pokémon", error: error.message });
    });
};

export const deletePokemonByID = (req, res) => {
  Pokemon.deleteOne({ number: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        return res.status(204).json("Pokémon apagado com sucesso");
      }
    })
    .catch((error) => {
      return res.json(error);
    });
};

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
      console.error("Erro ao salvar o pokémon:", error);
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Alguma das propriedades está no tipo errado!" });
      } else if (error.code === 11000) {
        return res
          .status(409)
          .json({ error: "Já existe este pokémon já existe!" });
      } else {
        return res
          .status(500)
          .json({ error: "Ocorreu algum erro no servido!" });
      }
    });
};
