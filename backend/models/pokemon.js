import { mongoose, model } from "mongoose";

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

export default model("pokemons", PokemonSchema);
