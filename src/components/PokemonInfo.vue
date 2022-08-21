<template>
	<div class="main tw-flex tw-flex-wrap tw-justify-center tw-gap-0">
		<div class="tw-w-96 tw-bg-white">
			<PokemonFullCard :id="id" />
		</div>
		<div class="tw-w-96 tw-bg-white" v-if="pokemon != null">
			<div id="stats" class="">
				<div id="description"></div>
				<PokemonStats :stats="pokemon.stats.stadistics" />
			</div>
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
import PokemonStats from './PokemonStats.vue';
import { Stadistics } from '../models/PokemonModel';
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
	components: { PokemonFullCard, EvolutionChain, PokemonStats },
	methods: {
		getData() {
			const p = new Pokemon();
			(async () => {
				try {
					let poke = await p.getPokemonFullData(this.url);
					let { name, id, information } = poke;
					let stats = new Stadistics(poke);
					this.pokemon = {
						name,
						id,
						evolutions: information.evolution,
						stats,
						information,
					};
				} catch (error) {
					this.$router.push(`/error?pokemon=${this.$route.params.name}`);
				}
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
