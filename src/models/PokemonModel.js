import { Stats } from "./StatsModel";

export class Stadistics {
  height = 0;
  weight = 0;
  abilities = [];
  forms = [];
  stadistics;

  constructor(pokemon) {
    this.id = pokemon.id;
    this.height = `${(pokemon.height / 10).toFixed(1)}m`;
    this.weight = `${(pokemon.weight / 10).toFixed(1)}kg`;
    this.abilities = pokemon.abilities;
    this.forms = pokemon.forms;
    this.stadistics = new Stats(pokemon.stats);
  }
}
