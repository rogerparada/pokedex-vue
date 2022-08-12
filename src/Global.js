import Generation from "./models/GenerationModel";
import PokemonType from "./models/TypeModel";
const Global = {
  Url: "https://pokeapi.co/api/v2/",
  Max: 898,
  Generations: [
    new Generation(1, "Kanto", 1, 151, require("@/assets/images/Gen1.svg")),
    new Generation(2, "Johto", 152, 100, require("@/assets/images/Gen2.svg")),
    new Generation(3, "Hoenn", 252, 135, require("@/assets/images/Gen3.svg")),
    new Generation(4, "Sinnon", 387, 107, require("@/assets/images/Gen4.svg")),
    new Generation(5, "Teselia", 494, 156, require("@/assets/images/Gen5.svg")),
    new Generation(6, "Kalos", 650, 72, require("@/assets/images/Gen6.svg")),
    new Generation(7, "Alola", 722, 88, require("@/assets/images/Gen7.svg")),
    new Generation(8, "Galar", 810, 89, require("@/assets/images/Gen8.svg")),
  ],
  Types: [
    new PokemonType(
      1,
      "normal",
      135,
      "#8f99a1",
      require("@/assets/images/Icon_Normal.svg")
    ),
    new PokemonType(
      2,
      "fighting",
      82,
      "#f0a489",
      require("@/assets/images/Icon_Fighting.svg")
    ),
    new PokemonType(
      3,
      "flying",
      140,
      "#99b7e5",
      require("@/assets/images/Icon_Flying.svg")
    ),
    new PokemonType(
      4,
      "poison",
      89,
      "#b066cb",
      require("@/assets/images/Icon_Poison.svg")
    ),
    new PokemonType(
      5,
      "ground",
      84,
      "#e6703d",
      require("@/assets/images/Icon_Ground.svg")
    ),
    new PokemonType(
      6,
      "rock",
      93,
      "#c9b794",
      require("@/assets/images/Icon_Rock.svg")
    ),
    new PokemonType(
      7,
      "bug",
      97,
      "#89c207",
      require("@/assets/images/Icon_Bug.svg")
    ),
    new PokemonType(
      8,
      "ghost",
      78,
      "#4a6baa",
      require("@/assets/images/Icon_Ghost.svg")
    ),
    new PokemonType(
      9,
      "steel",
      80,
      "#4b8ca2",
      require("@/assets/images/Icon_Steel.svg")
    ),
    new PokemonType(
      10,
      "fire",
      91,
      "#ff944a",
      require("@/assets/images/Icon_Fire.svg")
    ),
    new PokemonType(
      11,
      "water",
      169,
      "#2d93d8",
      require("@/assets/images/Icon_Water.svg")
    ),
    new PokemonType(
      12,
      "grass",
      129,
      "#78C850",
      require("@/assets/images/Icon_Grass.svg")
    ),
    new PokemonType(
      13,
      "electric",
      94,
      "#fcd019",
      require("@/assets/images/Icon_Electric.svg")
    ),
    new PokemonType(
      14,
      "psychic",
      125,
      "#ff6478",
      require("@/assets/images/Icon_Psychic.svg")
    ),
    new PokemonType(
      15,
      "ice",
      59,
      "#53d1bf",
      require("@/assets/images/Icon_Ice.svg")
    ),
    new PokemonType(
      16,
      "dragon",
      83,
      "#0070c5",
      require("@/assets/images/Icon_Dragon.svg")
    ),
    new PokemonType(
      17,
      "dark",
      81,
      "#8f99a1",
      require("@/assets/images/Icon_Dark.svg")
    ),
    new PokemonType(
      18,
      "fairy",
      74,
      "#5b5366",
      require("@/assets/images/Icon_Fairy.svg")
    ),
  ],
};

export default Global;
