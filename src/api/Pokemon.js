import Global from "@/Global";
export class Pokemon {
	async getPokemonData(url) {
		try {
			const result = await fetch(url);
			const data = await result.json();
			const home = data.sprites.other["home"];
			const official = data.sprites.other["official-artwork"];
			const images = home.front_default !== null ? home : official;
			return {
				id: data.id,
				name: data.name,
				image: images.front_default,
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
			const { id, name, sprites } = data;
			const home = sprites.other["home"];
			const official = sprites.other["official-artwork"];
			const images = home.front_default !== null ? home : official;
			return {
				id: id,
				name: name,
				image: images.front_default,
			};
		} catch (error) {
			console.error(error);
		}
	}

	async getPokemonFullData(url) {
		try {
			const result = await fetch(url);
			const data = await result.json();
			const { id, name, types, abilities, height, stats, sprites, base_experience, weight, species } = data;
			const { evolution, varieties, ...information } = await this.getDescription(species.url);
			const home = sprites.other["home"];
			const official = sprites.other["official-artwork"];
			const images = home.front_default !== null ? home : official;

			return {
				id,
				name,
				image: images.front_default,
				types: this.getTypes(types),
				height,
				stats,
				base_experience,
				abilities,
				weight,
				information: information,
				evolution,
				varieties,
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
			const { generation, genera, flavor_text_entries, evolution_chain, has_gender_differences, varieties } = data;
			const description = {
				generation: Global.Generations[generation.name] || Global.Generations["generation-i"](),
				name: genera.length > 0 ? genera.filter((x) => x.language.name === "en")[0].genus : "",
				description:
					flavor_text_entries.length > 0
						? flavor_text_entries.find((x) => x.language.name === "en").flavor_text
						: "This Pokemon doesn't have a description yet",
				evolution: await this.getEvolutions(evolution_chain.url),
				gender_differences: has_gender_differences,
				varieties: await this.getVarieties(varieties),
			};

			return description;
		} catch (error) {
			console.error(error);
		}
	}

	async getEvolutions(url) {
		const res = await fetch(url);
		//console.log("🚀 ~ Pokemon ~ getEvolutions ~ url:", url);
		const data = await res.json();
		const { chain } = data;
		const evolutions = [];

		evolutions.push(this.processPoke(chain));

		if (chain.evolves_to.length > 1) {
			chain.evolves_to.forEach((e) => {
				evolutions.push(this.processPoke(e));
			});
		} else {
			while (chain.evolves_to.length >= 1) {
				const evo = chain.evolves_to[0];
				evolutions.push(this.processPoke(evo));
				chain.evolves_to = evo.evolves_to;
			}
		}
		//console.log(evolutions);
		return evolutions;
	}

	processPoke(info) {
		const { evolution_details, is_baby, species } = info;

		const id = species.url.split("/")[6];
		const url = `${Global.Url}pokemon/${id}`;

		return {
			name: species.name,
			evolution: evolution_details.length > 0 ? this.processEvo(evolution_details[0]) : null,
			baby: is_baby,
			url,
		};
	}

	processEvo(evoData) {
		const result = {};
		if (evoData !== null) {
			Object.keys(evoData).forEach((key) => {
				if (evoData[key] != null && evoData[key]) {
					result[key] = evoData[key].name ?? evoData[key];
				}
			});

			return this.getEvolution(result);
		}
	}

	getEvolution(obj) {
		const evo = Object.keys(obj).filter((t) => t !== "trigger");
		//console.log(obj);
		//const trigger = obj.trigger.replace("-", " ");
		const EVOLUTIONS_TYPES = {
			gender: { name: "gender", value: obj.gender },
			held_item: { name: "Held", value: obj.held_item },
			item: { name: "Use Item", value: obj.item },
			known_move: { name: "Known Move", value: obj.known_move },
			known_move_type: { name: "Known", value: obj.known_move_type },
			location: { name: "Location", value: obj.location },
			min_affection: { name: "Affection", value: obj.min_affection },
			min_beauty: { name: "Beauty", value: obj.min_beauty },
			min_happiness: { name: "Happiness", value: obj.min_happiness },
			min_level: { name: "Level Up", value: obj.min_level },
			needs_overworld_rain: { name: "Rain", value: obj.needs_overworld_rain },
			party_species: { name: "PartySp", value: obj.party_species },
			party_type: { name: "Party", value: obj.party_type },
			relative_physical_stats: { name: "Physical", value: obj.relative_physical_stats },
			time_of_day: { name: "Time", value: obj.time_of_day },
			trade_species: { name: "Species", value: obj.trade_species },
			turn_upside_down: { name: "UpDown", value: obj.turn_upside_down },
		};

		// TODO Check Evolutions Triggers
		// const EVOLUTION_TRIGGERS = {
		// 	"level-up": EVOLUTIONS_TYPES[evo],
		// 	trade: {},
		// 	"use-item": EVOLUTIONS_TYPES[evo],
		// 	shed: {},
		// 	spin: {},
		// 	"tower-of-darkness": {},
		// 	"tower-of-waters": {},
		// 	"three-critical-hits": {},
		// 	"take-damage": {},
		// 	other: {},
		// 	"agile-style-move": {},
		// 	"strong-style-move": {},
		// 	"recoil-damage": {},
		// };

		if (typeof evo === "string") {
			const { name, value } = EVOLUTIONS_TYPES[evo];
			console.log(`ResultString: ${typeof evo} ${obj.trigger} ${name} ${value}`);
			return { trigger: obj.trigger, evolutionType: EVOLUTIONS_TYPES[evo] };
		}
		if (Array.isArray(evo)) {
			if (evo.length === 1) {
				return { trigger: obj.trigger, evolutionType: [EVOLUTIONS_TYPES[evo[0]]] };
			} else {
				const m = evo.map((x) => EVOLUTIONS_TYPES[x]);
				return { trigger: obj.trigger, evolutionType: m };
			}
			//console.log(`ResultArray: ${typeof evo} ${obj.trigger} `);
		}
	}

	async getVarieties(varieties) {
		const values = [];
		varieties.forEach(async (x) => {
			const { is_default, pokemon } = x;
			const p = await this.getPokemonData(pokemon.url);
			values.push({ is_default, ...p });
		});

		return values;
	}
}
