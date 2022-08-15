<template>
	<div class="card tw-w-40 tw-h-52 tw-bg-white tw-shadow-md tw-shadow-red-900">
		<router-link :to="`/pokemon/${pokemon.name}`" class="link link-dark">
			<div
				class="pokeNumber tw-text-sm tw-font-thin"
				:style="{ 'background-color': mainType.color }"
			>
				<strong>{{ id }}</strong>
			</div>
			<img :src="image" :alt="pokemon.name" />
			<div class="tw-capitalize tw-text-center tw-text-xs tw-pb-2">
				{{ pokemon.name }}
			</div>
		</router-link>

		<TypeSelector :types="types" />
	</div>
</template>

<script>
import TypeSelector from './TypeSelector.vue';
import { Pokemon } from '@/api/Pokemon';

export default {
	name: 'PokemonCard',
	components: {
		TypeSelector,
	},
	props: {
		pokemon: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			image: null,
			types: null,
			id: 0,
		};
	},
	methods: {
		getData() {
			(async () => {
				const data = new Pokemon();
				const response = await data.getPokemonData(this.pokemon.url);
				const { image, types, id } = response;
				this.image = image;
				this.types = types;
				this.id = id;
			})();
		},
	},
	created() {
		this.getData();
	},
	computed: {
		mainType() {
			return this.types != null ? this.types[0] : 'normal';
		},
	},
};
</script>

<style></style>
