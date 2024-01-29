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
			<div class="tw-w-96 tw-bg-white tw-m-2" v-if="pokemon.evolution.length > 1">
				<EvolutionChain :Evolutions="pokemon.evolution" />
			</div>
			<div id="varieties" class="tw-w-96 m-2 tw-bg-white" v-if="pokemon.varieties.length > 1">
				<PokemonVarieties :PokemonVarieties="pokemon.varieties" />
			</div>
		</div>
		<div class="" v-else><LoaderPokeBall /></div>
	</div>
</template>

<script>
	import PokemonFullCard from "./PokemonFullCardInfo.vue";
	import EvolutionChain from "./EvolutionChain.vue";
	import PokemonStats from "./PokemonStats.vue";
	import LoaderPokeBall from "./controls/LoaderPokeBall.vue";
	import PokemonVarieties from "./PokemonVarieties.vue";
	import { Statistics } from "../models/PokemonModel";
	import { Pokemon } from "@/api/Pokemon";
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
			PokemonVarieties,
		},
		methods: {
			getData() {
				const p = new Pokemon();
				(async () => {
					try {
						let poke = await p.getPokemonFullData(this.url);

						let stats = new Statistics(poke);
						this.pokemon = { ...poke, stats };
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
