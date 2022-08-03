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
			<h4 class="tw-px-7 tw-pt-5">Generations</h4>
			<hr />
			<div class="tw-py-6 tw-px-7">
				<router-link
					:to="'list/pokedex/' + ge.id"
					v-for="ge in generation"
					:key="ge.id"
					class="link link-dark"
				>
					<GenerationBanner :generation="ge" />
				</router-link>
			</div>
		</div>
		<div class="card tw-w-96">
			<h4 class="tw-px-7 tw-pt-5">Types</h4>
			<hr />
			<div class="tw-py-6 tw-px-7">
				<router-link
					:to="'list/types/' + ty.name"
					v-for="ty in types"
					:key="ty.id"
					class="link link-dark"
				>
					<TypeBanner :pokemonType="ty" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Global from '../Global';
import TypeSelector from './TypeSelector.vue';
import GenerationBanner from './GenerationBanner.vue';
import TypeBanner from './TypeBanner.vue';

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
			random: this.getRandom(1, 898),
			url: Global.Url,
			generation: Global.Generations,
			types: Global.Types,
		};
	},
	created() {
		this.getPokemonData();
	},
	components: { TypeSelector, GenerationBanner, TypeBanner },
};
</script>

<style>
hr {
	margin: 0;
}
</style>
