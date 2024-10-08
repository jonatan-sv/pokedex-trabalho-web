/**
 * Esse é um script que deve ser rodado separadamente para popular o
 * banco de dados com os Pokémons vindos da PokéApi.
 * No VSCode, ele pode ser rodado utilizado CodeRunner.
 */

import Pokedex from "pokedex-promise-v2";
import mongoose from "mongoose";
import { model } from "mongoose";

const url = "mongodb://localhost:27017/Pokedex";

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra a aplicação em caso de falha na conexão
  }
};

const { Schema } = mongoose;

const pokeTypes =   [
  'normal',   'fighting', 'flying',
  'poison',   'ground',   'rock',
  'bug',      'ghost',    'steel',
  'fire',     'water',    'grass',
  'electric', 'psychic',  'ice',
  'dragon',   'dark',     'fairy',
  'stellar',  'unknown',  'shadow'
]

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: [String],
    enum: pokeTypes,
    required: true,
    unique: false,
  },
  sprite: {
    type: String,
    required: true,
    unique: true,
  },
});

const Pokemon = model("pokemons", PokemonSchema);
const P = new Pokedex();

async function addEntry(name, number, type, sprite) {
  try {
    const novoPokemon = new Pokemon({
      name: name,
      number: number,
      type: type,
      sprite: sprite,
    });

    const savedPokemon = await novoPokemon.save();
    console.log("Pokémon salvo com sucesso:", savedPokemon);
  } catch (error) {
    console.error("Erro ao salvar o pokémon:", error);
  }
}

async function checkLastPokemon() {
  const maxNumber = await Pokemon.aggregate([
    {
      $group: {
        _id: null,
        maxNumber: { $max: "$number" },
      },
    },
  ]);
  return maxNumber.length > 0 ? maxNumber[0].maxNumber : 0;
}

async function dumpPokemons(delay) {
  try {
    const resp = await P.getPokemonsList();
    const results = resp.results;
    const last = await checkLastPokemon();

    for (let i = last; i < results.length; i++) {
      try {
        // Adiciona um delay de 1 segundo
        if (delay) await new Promise((resolve) => setTimeout(resolve, 1000));

        const p = await P.getPokemonByName(results[i].name);
        const type = p.types.map((i) => i.type.name);
        await addEntry(p.name, p.id, type, p.sprites.front_default);
      } catch (error) {
        console.error(
          `Erro ao obter dados do Pokémon ${results[i].name}:`,
          error
        );
      }
    }

    console.log("DUMP COM SUCESSO!");
  } catch (error) {
    console.error("Erro ao fazer dump dos Pokémons:", error);
  }
}

connectDB();
// Mude para false caso não queira delay entre as requests
// O motivo do delay é para evitar abusos da API.
// Apesar dela não ter limite explícito, é bom se prevenir...
dumpPokemons(true);
