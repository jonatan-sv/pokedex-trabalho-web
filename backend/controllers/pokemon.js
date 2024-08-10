import { get } from "https";
const api_link = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";

export const getPokemons = (_, res) => {
  get(api_link, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      return res.status(200).json(JSON.parse(data).results);
    });
  }).on("error", (err) => {
    return res.status(500).json(err.message);
  });
};
