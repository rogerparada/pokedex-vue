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
    this.forms = pokemon.forms;
    this.stadistics = new Stats(pokemon.stats);
    this.abilities = pokemon.abilities.map((a) => {
      return {
        name: a.ability.name,
        url: a.ability.url,
        slot: a.slot,
        is_hidden: a.is_hidden,
      };
    });
  }
}
