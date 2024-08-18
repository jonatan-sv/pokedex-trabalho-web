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
    required: [true, "O nome do Pokémon é obrigatório!"],
    unique: true,
  },
  number: {
    type: Number,
    required: [true, "O número do Pokémon é obrigatório!"],
    unique: true,
  },
  type: {
    type: [String],
    enum: {
      values: pokeTypes,
      message: "O tipo `{VALUE}` não existe!",
    },
    required: [true, "O tipo do Pokémon é obrigatório!"],
    validate: {
      validator: (v) => v.length > 0,
      message: "O Pokémon deve ter pelo menos um tipo!",
    },
  },
  sprite: {
    type: String,
    required: [true, "O sprite do Pokémon é obrigatório!"],
    unique: true,
  },
}, {
  toJSON: {
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export default model("pokemons", PokemonSchema);
