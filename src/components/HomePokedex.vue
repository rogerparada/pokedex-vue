<template>
	<div class="main tw-flex tw-flex-wrap tw-justify-center tw-gap-5">
		<div class="tw-w-96 tw-bg-white" v-if="pokemon != null">
			<router-link :to="'/pokemon/' + pokemon.name" class="link link-dark">
				<PokemonInfo :id="pokemon.id" />
			</router-link>
		</div>
		<div class="tw-w-96 tw-bg-white">
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
		<div class="tw-w-96 tw-bg-white">
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
import GenerationBanner from './GenerationBanner.vue';
import TypeBanner from './TypeBanner.vue';

import { Pokemon } from '@/api/Pokemon';
import PokemonInfo from './PokemonFullCard.vue';

export default {
	name: 'HomePokedex',
	methods: {
		getRandom(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min);
		},

		getData() {
			(async () => {
				const data = new Pokemon();
				const response = await data.getPokemonData(
					this.url + 'pokemon/' + this.random
				);
				this.pokemon = response;
			})();
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
		this.getData();
	},

	components: { PokemonInfo, GenerationBanner, TypeBanner },
};
</script>

<style>
hr {
	margin: 0;
}
</style>
