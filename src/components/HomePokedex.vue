<template>
	<div class="main tw-flex tw-flex-wrap tw-justify-center tw-gap-5">
		<div class="card tw-w-96 tw-h-96" v-if="pokemon != null">
			<router-link :to="'/pokemon/' + pokemon.name">
				<div class="">
					<img
						:src="pokemon.image"
						:alt="pokemon.name"
						:title="pokemon.name"
						class="h-64"
					/>
					<p class="pokemonName tw-text-xl tw-text-center">
						<strong>{{ pokemon.id }}</strong> {{ pokemon.name }}
					</p>
					<TypeSelector :types="pokemon.types" :size="'xl'" />
				</div>
			</router-link>
		</div>
		<div class="card tw-w-96">
			<router-link
				:to="'/pokedex/' + ge.id"
				v-for="ge in generation"
				:key="ge.id"
			>
				<div class="tw-flex tw-flex-row tw-justify-between tw-text-center">
					<div class="">{{ ge.id }} |</div>
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
import TypeSelector from './TypeSelector.vue';

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
						types: data.types,
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
	components: { TypeSelector },
};
</script>

<style></style>
