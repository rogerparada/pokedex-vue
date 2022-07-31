import Generation from "./models/GenerationModel";
const Global = {
  Url: "https://pokeapi.co/api/v2/",
  Max: 898,
  Generations: [
    new Generation(1, "Kanto", 1, 151),
    new Generation(2, "Johto", 152, 100),
    new Generation(3, "Hoenn", 252, 135),
    new Generation(4, "Sinnon", 387, 107),
    new Generation(5, "Teselia", 494, 156),
    new Generation(6, "Kalos", 650, 72),
    new Generation(7, "Alola", 722, 88),
    new Generation(8, "Galar", 810, 89),
  ],
  typeColor: {
    grass: "#78C850",
    poison: "#b066cb",
    fire: "#ff944a",
    flying: "#99b7e5",
    water: "#2d93d8",
    bug: "#89c207",
    normal: "#8f99a1",
    electric: "#fcd019",
    ground: "#e6703d",
    fairy: "#f089dd",
    fighting: "#f0a489",
    psychic: "#ff6478",
    steel: "#4b8ca2",
    rock: "#c9b794",
    ghost: "#4a6baa",
    dragon: "#0070c5",
    ice: "#53d1bf",
    dark: "#5b5366",
  },
  //Types: getPokemonTypes(),
};

export default Global;
