<template>
	<div class="card tw-w-40 tw-h-52 tw-bg-white tw-shadow-md tw-shadow-red-900">
		<img :src="image" alt="" />
		<p class="capitalize tw-text-center tw-text-sm">
			{{ pokemon.name }} <strong>{{ id }}</strong>
		</p>

		<TypeSelector :types="types" />
	</div>
</template>

<script>
import TypeSelector from './TypeSelector.vue';

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
		async getPokemonData() {
			const result = await fetch(this.pokemon.url);
			const data = await result.json();

			this.id = data.id;
			this.image = data.sprites.other.home.front_default;
			this.types = data.types;
		},
	},
	created() {
		this.getPokemonData();
	},
};
</script>

<style></style>
