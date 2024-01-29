<template>
	<div class="tw-w-full tw-bg-white md:tw-mx-5 sm:tw-p-3">
		<div class="tw-font-bold tw-text-center tw-mb-3">Evolution chain</div>
		<div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-3" v-if="Evolutions != null">
			<div class="tw-flex tw-flex-wrap tw-gap-2 tw-justify-center">
				<div class="" v-for="(item, index) in pokemon" :key="index">
					<!-- <div class="tw-flex tw-w-40 tw-h-32 tw-flex-col tw-gap-0">
					<EvolutionType :evolution="item.evolution" v-if="item.evolution != null" />
					<div class="level tw-text-xs tw-flex tw-items-center tw-justify-center tw-gap-2 tw-w-full tw-h-1/2 tw-capitalize" v-else>
						<span class="tw-font-bold tw-text-xs">Base Form</span>
					</div>
					<div
						id="cardName"
						class="tw-capitalize tw-text-center tw-font-thin tw-text-sm tw-bg-blue-600 tw-text-white tw-h-1/2 tw-flex tw-items-center tw-justify-center tw-gap-1"
					>
						<router-link :to="item.url" class="link tw-text-white">
							<span class="tw-font-light">{{ item.id }}</span> {{ item.name }}
						</router-link>
					</div>
				</div>
				<div id="pokemonCard" class="tw-h-32 tw-w-full tw-justify-center tw-place-items-center tw-flex">
					<router-link :to="item.url" class="link link-dark">
						<img :src="item.image" :alt="item.name" :title="item.name" class="tw-w-32 tw-pb-2" />
					</router-link>
				</div> -->
					<EvolutionCardVue :Pokemon="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Pokemon } from "@/api/Pokemon";
	//import EvolutionType from "./EvolutionType.vue";
	import EvolutionCardVue from "./cards/EvolutionCard.vue";

	export default {
		name: "EvolutionChain",
		data() {
			return {
				pokemon: [],
			};
		},
		props: {
			Evolutions: {
				type: Array,
				default: null,
			},
		},
		methods: {
			async getImage(url, order) {
				const p = new Pokemon();
				let poke = await p.getPokemonImage(url);
				let { id, name, image } = poke;
				return {
					order,
					id,
					name,
					image,
					url: `/pokemon/${id}`,
				};
			},
			getEvolutions() {
				if (this.Evolutions != null) {
					this.Evolutions.forEach(async (item, index) => {
						const { id, name, order, image, url } = await this.getImage(item.url, index);

						const p = {
							id,
							name,
							image,
							url,
							evolution: item.evolution,
							index: order,
							baby: item.baby,
						};
						this.pokemon.push(p);
						//console.log("PokemonEvolution", p);
						this.pokemon = this.pokemon.sort((a, b) => a.index - b.index);
					});
				}
			},
		},
		created() {
			//console.log(this.Evolutions);
			this.getEvolutions();
		},

		components: { EvolutionCardVue },
	};
</script>

<style></style>
