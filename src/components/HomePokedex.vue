<template>
	<div class="main grid md:grid-cols-2 sd:grid-cols-1 gap-y-10">
		<div class="col1" v-if="pokemon != null">
			<router-link :to="'/pokemon/' + pokemon.name">
				<div class="pokemonData w-80 h-80 shadow-lg shadow-red-900">
					<img
						:src="pokemon.image"
						:alt="pokemon.name"
						:title="pokemon.name"
						class="h-64"
					/>
					<h1 class="pokemonName">{{ pokemon.id }} {{ pokemon.name }}</h1>
				</div>
			</router-link>
		</div>
		<div
			class="gene grid grid-flow-row w-80 h-80 text-sm p-2 shadow-lg shadow-red-900"
		>
			<router-link
				:to="'/pokedex/' + ge.id"
				v-for="ge in generation"
				:key="ge.id"
			>
				<div class="gen grid grid-cols-3 p-2">
					<div class="text-center">{{ ge.id }}</div>
					<div class="text-center">{{ ge.name }}</div>
					<div class="text-center">
						{{ `${ge.start} - ${ge.start + ge.pokemons - 1}` }}
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import Global from '../Global';

export default {
	name: 'HomePokedex',
	methods: {
		getRandom(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min);
		},

		getPokemonData() {
			const fetchUrl = this.url + 'pokemon/' + this.random;
			console.log(fetchUrl);

			fetch(fetchUrl)
				.then((result) => result.json())
				.then((data) => {
					console.log(data);
					this.pokemon = {
						id: data.id,
						name: data.name,
						image: data.sprites.other.home.front_default,
					};
				})
				.catch((err) => {
					console.error(err);
				});
		},
	},
	data() {
		return {
			pokemon: null,
			random: this.getRandom(1, 897),
			url: Global.Url,
			generation: Global.Generations,
		};
	},
	created() {
		this.getPokemonData();
	},
};
</script>

<style></style>
