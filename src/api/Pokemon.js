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
			//(data);
			const { id, name, types, abilities, height, stats, sprites, base_experience, weight, species } = data;
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

		try {
			const { generation, genera, flavor_text_entries, evolution_chain, has_gender_differences } = data;
			const description = {
				generation: this.formatGeneration(generation.name),
				name: genera.length > 0 ? genera.filter((x) => x.language.name === "en")[0].genus : "",
				description:
					flavor_text_entries.length > 0
						? flavor_text_entries.find((x) => x.language.name === "en").flavor_text
						: "This Pokemon doesn't have a description yet",
				evolution: await this.getEvolutions(evolution_chain.url),
				gender_differences: has_gender_differences,
			};
			return description;
		} catch (error) {
			console.error(error);
		}
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
		return evo;
	}

	getEvo(item) {
		let name = item.species.name;
		let { evolution_details } = item;
		let tr = evolution_details[0];
		return {
			name: name,
			url: Global.Url + "pokemon/" + name,
			trigger: tr != undefined ? this.getEvolutionTrigger(tr) : null,
		};
	}

	getEvolutionTrigger(obj) {
		const name = obj.trigger.name;
		let id;
		let evolution;
		switch (name) {
			case "level-up":
				id = 1;
				evolution = this.selectLevelUpTrigger(obj);
				break;
			case "trade":
				id = 2;
				break;
			case "use-item":
				id = 3;
				evolution = obj.item;
				break;
		}
		return { id, name, evolution };
	}

	selectLevelUpTrigger(obj) {
		return obj.min_affection != null
			? { min_affection: obj.min_affection, id: 1 }
			: obj.min_beauty != null
			? { min_beauty: obj.min_beauty, id: 2 }
			: obj.min_happiness != null
			? { min_happiness: obj.min_happiness, id: 3 }
			: obj.min_level != null
			? { min_level: obj.min_level, id: 4 }
			: location != null
			? { location: obj.location, id: 5 }
			: null;
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
			case "generation-ix":
				return gen[8];

			default:
				break;
		}
	}
}
