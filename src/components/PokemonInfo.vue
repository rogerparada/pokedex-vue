<template>
	<div>
		<div class="main tw-flex tw-flex-wrap tw-justify-center tw-gap-0 md:tw-pt-3" v-if="pokemon != null">
			<div class="tw-w-96 tw-bg-white">
				<PokemonFullCard :pokemonObj="pokemon" />
				<div id="stats">
					<div id="description"></div>
					<PokemonStats :stats="pokemon.stats.statistics" />
				</div>
			</div>
			<div class="tw-w-96 tw-bg-white" v-if="pokemon.evolutions.length > 1">
				<EvolutionChain :Evolutions="pokemon.evolutions" />
			</div>
		</div>
		<div class="" v-else><LoaderPokeBall /></div>
	</div>
</template>

<script>
	import PokemonFullCard from "./PokemonFullCardInfo.vue";
	import EvolutionChain from "./EvolutionChain.vue";
	import PokemonStats from "./PokemonStats.vue";
	import { Statistics } from "../models/PokemonModel";
	import { Pokemon } from "@/api/Pokemon";
	import LoaderPokeBall from "./controls/LoaderPokeBall.vue";
	import Global from "@/Global";

	export default {
		name: "PokemonInfo",
		data() {
			return {
				id: null,
				pokemon: null,
				url: Global.Url,
			};
		},
		components: {
			PokemonFullCard,
			EvolutionChain,
			PokemonStats,
			LoaderPokeBall,
		},
		methods: {
			getData() {
				const p = new Pokemon();
				(async () => {
					try {
						let poke = await p.getPokemonFullData(this.url);
						let { name, id, information, types } = poke;
						let stats = new Statistics(poke);

						this.pokemon = {
							name,
							id,
							evolutions: information.evolution,
							stats,
							types,
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
			this.url = this.id != null ? this.url + "pokemon/" + this.id : this.url + "pokemon/" + name;

			this.getData();
		},
	};
</script>

<style></style>
