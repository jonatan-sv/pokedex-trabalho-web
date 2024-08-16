import Pokemon from "../models/pokemon.js";

/**
 * TODO:
 * - Terminar de melhorar as respostas de erro e gerais
 * - Adicionar sistema de logging de arquivos para erros do DB (winston)
 */

export const getPokemons = (_, res) => {
  Pokemon.find({})
    .select("-_id -__v")
    .then((pokemons) => {
      return res.status(200).json({ results: pokemons });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Erro interno ao obter os Pokémons"
      });
    });
};

export const getPokemonByID = (req, res) => {
  Pokemon.findOne({ number: req.params.id })
    .select("-_id -__v")
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Pokémon não encontrado!" });
      }
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.error("Erro ao procurar Pokémon:", error);
      return res
        .status(500)
        .json({ message: "Erro interno ao procurar Pokémon"});
    });
};

export const updatePokemonByID = (req, res) => {
  const updates = {
    name: req.query.name,
    type: req.query.type,
    sprite: req.query.sprite,
  };
  Pokemon.findOneAndUpdate({ number: Number(req.params.id) }, updates, {
    new: true,    // Retorna o pokémon atualizado ao invés do antigo
    upsert: true, // Cria o pokémon se ele não for encontrado
  })
    .select("-_id -__v")
    .then((updatedPokemon) => {
      if (!updatedPokemon) {
        return res.status(404).json({ message: "Pokémon não encontrado" });
      }
      return res.json(updatedPokemon);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Erro interno ao atualizar o Pokémon"});
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
      return res
      .status(500)
      .json({ message: "Erro interno ao atualizar o Pokémon"});
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
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Alguma das propriedades está no tipo errado!" });
      } else if (error.code === 11000) {
        return res.status(409).json({ error: "Este pokémon já existe!" });
      } else {
        return res
          .status(500)
          .json({ error: "Erro interno ao adicionar Pokémon!" });
      }
    });
};
