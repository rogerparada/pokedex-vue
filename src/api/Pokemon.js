export class Pokemon {
  async getPokemonData(url) {
    try {
      const result = await fetch(url);
      const data = await result.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.home.front_default,
        types: data.types,
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
      } = data;
      return {
        id,
        name,
        image: sprites.other.home.front_default,
        types,
        height,
        stats,
        base_experience,
        abilities,
        weight,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
