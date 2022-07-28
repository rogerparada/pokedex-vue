import Generation from "./models/GenerationModel";
const Global = {
  Url: "https://pokeapi.co/api/v2/",
  Generations: [
    new Generation(1, "Kanto", 1, 151),
    new Generation(2, "Johto", 152, 100),
    new Generation(3, "Hoenn", 252, 135),
    new Generation(4, "Sinnon", 387, 107),
    new Generation(5, "Teselia", 494, 156),
    new Generation(6, "Kalos", 650, 72),
    new Generation(7, "Alola", 722, 88),
    new Generation(8, "Galar", 809, 89),
  ],
};
export default Global;
