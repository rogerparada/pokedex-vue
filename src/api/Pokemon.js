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

    const { generation, genera, flavor_text_entries } = data;
    return {
      generation: this.formatGeneration(generation.name),
      name: genera.filter((x) => x.language.name === "en")[0].genus,
      description: flavor_text_entries.find((x) => x.language.name === "en")
        .flavor_text,
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
