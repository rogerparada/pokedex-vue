<template>
	<div class="tw-flex tw-flex-wrap tw-justify-center">
		<PokemonFullCard />
		<EvolutionChain />
	</div>
</template>

<script>
import PokemonFullCard from './PokemonFullCard.vue';
import EvolutionChain from './EvolutionChain.vue';
export default {
	name: 'PokemonInfo',
	data() {
		return {
			key: null,
		};
	},
	components: { PokemonFullCard, EvolutionChain },
	props: {
		id: {
			type: Number,
			default: null,
		},
	},
};
</script>

<style></style>
