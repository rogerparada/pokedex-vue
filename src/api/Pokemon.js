import Global from "@/Global";
export class Pokemon {
  async getPokemonData(url) {
    try {
      const result = await fetch(url);
      const data = await result.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.home.front_default,
        types: this.getTypes(data.types),
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getPokemonImage(url) {
    try {
      const result = await fetch(url);
      const data = await result.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.home.front_default,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getPokemonFullData(url) {
    try {
      const result = await fetch(url);
      const data = await result.json();
      const {
        id,
        name,
        types,
        abilities,
        height,
        stats,
        sprites,
        base_experience,
        weight,
        species,
      } = data;
      return {
        id,
        name,
        image: sprites.other.home.front_default,
        types: this.getTypes(types),
        height,
        stats,
        base_experience,
        abilities,
        weight,
        information: await this.getDescription(species.url),
      };
    } catch (error) {
      console.error(error);
    }
  }

  getTypes(types) {
    return types.map((t) => Global.Types.find((x) => x.name == t.type.name));
  }

  async getDescription(url) {
    const result = await fetch(url);
    const data = await result.json();

    const { generation, genera, flavor_text_entries, evolution_chain } = data;
    return {
      generation: this.formatGeneration(generation.name),
      name: genera.filter((x) => x.language.name === "en")[0].genus,
      description: flavor_text_entries.find((x) => x.language.name === "en")
        .flavor_text,
      evolution: await this.getEvolutions(evolution_chain.url),
    };
  }

  async getEvolutions(url) {
    const result = await fetch(url);
    const data = await result.json();
    let evo = [];
    const { chain } = data;
    evo.push(this.getEvo(chain));

    chain.evolves_to.forEach((item) => {
      evo.push(this.getEvo(item));

      item.evolves_to.forEach((item2) => {
        evo.push(this.getEvo(item2));
      });
    });
    console.log(evo);
    return evo;
  }
  getEvo(item) {
    let name = item.species.name;
    let { evolution_details } = item;
    let tr = evolution_details[0];
    return {
      name: name,
      url: Global.Url + "pokemon/" + name,
      trigger: tr != undefined ? tr.trigger.name : null,
    };
  }

  formatGeneration(generation) {
    const gen = Global.Generations;
    switch (generation) {
      case "generation-i":
        return gen[0];
      case "generation-ii":
        return gen[1];
      case "generation-iii":
        return gen[2];
      case "generation-iv":
        return gen[3];
      case "generation-v":
        return gen[4];
      case "generation-vi":
        return gen[5];
      case "generation-vii":
        return gen[6];
      case "generation-viii":
        return gen[7];

      default:
        break;
    }
  }
}
