<template>
	<div class="card tw-w-40 tw-h-52 tw-bg-white tw-shadow-md tw-shadow-red-900">
		<div
			class="pokeNumber tw-text-sm tw-font-thin"
			:style="{ 'background-color': typeColor[mainType] }"
		>
			<strong>{{ id }}</strong>
		</div>
		<img :src="image" alt="" />
		<div class="tw-capitalize tw-text-center tw-text-sm">
			{{ pokemon.name }}
		</div>

		<TypeSelector :types="types" />
	</div>
</template>

<script>
import TypeSelector from './TypeSelector.vue';
import Global from '@/Global';

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
			typeColor: Global.typeColor,
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
	computed: {
		mainType() {
			return this.types != null ? this.types[0].type.name : 'grass';
		},
	},
};
</script>

<style></style>
