<template>
	<div class="card w-40 h-52 bg-white shadow-md shadow-red-900">
		<img :src="image" alt="" />
		<p class="capitalize text-center text-sm">
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
			console.log(
				'🚀 ~ file: PokemonCard.vue ~ line 27 ~ getPokemonData ~ data',
				data
			);

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
