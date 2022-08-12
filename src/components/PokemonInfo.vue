<template>
	<div class="main tw-flex tw-flex-wrap tw-justify-center tw-gap-0">
		<div class="">
			<PokemonFullCard :id="id" />
		</div>
		<div class="" v-if="pokemon != null">
			<EvolutionChain
				v-if="pokemon.evolutions.length > 1"
				:Evolutions="pokemon.evolutions"
			/>
		</div>
	</div>
</template>

<script>
import PokemonFullCard from './PokemonFullCard.vue';
import EvolutionChain from './EvolutionChain.vue';
import { Pokemon } from '@/api/Pokemon';
import Global from '@/Global';

export default {
	name: 'PokemonInfo',
	data() {
		return {
			id: null,
			pokemon: null,
			url: Global.Url,
		};
	},
	components: { PokemonFullCard, EvolutionChain },
	methods: {
		getData() {
			const p = new Pokemon();
			(async () => {
				let poke = await p.getPokemonFullData(this.url);
				let { name, id, information } = poke;

				this.pokemon = {
					name,
					id,
					evolutions: information.evolution,
				};
			})();
		},
	},
	created() {
		let name = this.$route.params.name;
		this.url =
			this.id != null
				? this.url + 'pokemon/' + this.id
				: this.url + 'pokemon/' + name;

		this.getData();
	},
};
</script>

<style></style>
