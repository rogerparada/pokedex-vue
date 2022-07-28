<template>
	<div class="card w-40 h-52 bg-white shadow-md shadow-red-900">
		<span>{{ pokemon.name }}</span>
	</div>
</template>

<script>
export default {
	name: 'PokemonCard',
	props: {
		pokemon: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {};
	},
	methods: {
		getPokemonData() {},
	},
	created() {
		this.getPokemonData();
	},
};
</script>

<style></style>
