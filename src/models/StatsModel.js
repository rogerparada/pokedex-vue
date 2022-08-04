export class Stats {
  hp = 0;
  attack = 0;
  defense = 0;
  spAttack = 0;
  spDefense = 0;
  speed = 0;

  Total() {
    return (
      this.hp +
      this.attack +
      this.defense +
      this.spAttack +
      this.spDefense +
      this.speed
    );
  }
  constructor(stats) {
    this.hp = stats.find((s) => s.stat.name == "hp")["base_stat"];
    this.attack = stats.find((s) => s.stat.name === "attack")["base_stat"];
    this.defense = stats.find((s) => s.stat.name === "defense")["base_stat"];
    this.spAttack = stats.find((s) => s.stat.name === "special-attack")[
      "base_stat"
    ];
    this.spDefense = stats.find((s) => s.stat.name === "special-defense")[
      "base_stat"
    ];
    this.speed = stats.find((s) => s.stat.name === "speed")["base_stat"];
  }
}
