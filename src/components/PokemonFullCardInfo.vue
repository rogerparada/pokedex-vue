<template>
	<div>
		<div id="PokemonInfo" class="tw-mx-0 md:tw-mx-auto tw-flex tw-flex-col" v-if="pokemon != null">
			<div id="Card" class="tw-p-0 tw-w-full tw-h-72 tw-mx-auto tw-bg-white">
				<div id="typeFrame" class="tw-w-full tw-h-52 tw-p-2" :style="{ 'background-color': mainType.color }"></div>
				<div class="pokeNumber tw-bg-white tw-text-sm tw-font-bold" :style="{ color: mainType.color }">
					{{ pokemon.id }}
				</div>

				<div class="pokeGeneration">
					<img class="pokeGenerationSVG tw-w-8" :src="pokemon.information.generation?.image" alt="" srcset="" />
				</div>
				<ImageSelector
					:name="pokemon.name"
					:url="pokeUrl"
					:gender_differences="pokemon.information.gender_differences"
					@change="(g, m, s) => changeName(g, m, s)"
				/>
			</div>
			<div id="bodyCard">
				<div id="name" class="tw-text-center">
					<div class="tw-flex tw-flex-col">
						<router-link :to="pokeUrl" v-if="pokeUrl != null" class="link link-dark">
							<span class="tw-font-bold tw-capitalize"
								>{{ pokemon.name }}
								<font-awesome-icon :icon="icon" v-if="icon != null" />
								<font-awesome-icon :icon="shiny" v-if="shiny != null" />
							</span>
						</router-link>
						<span v-else class="tw-font-bold tw-capitalize"
							>{{ pokemon.name }}
							<font-awesome-icon :icon="icon" v-if="icon != null" />
							<font-awesome-icon :icon="shiny" v-if="shiny != null" />
						</span>
						<span class="tw-font-light">{{ pokemon.information.name }}</span>
					</div>
					<div class="tw-text-sm tw-font-thin tw-grid tw-grid-cols-3 tw-py-3 tw-capitalize">
						<div class="tw-flex tw-flex-col tw-leading-7">
							<span class="tw-text-base tw-leading-7">
								{{ pokemon.stats.weight }}
							</span>
							<span class="tw-font-semibold tw-justify-center tw-text-center">Weight</span>
						</div>
						<div class="">
							<TypeIcon :types="pokemon.types" />
						</div>
						<div class="tw-flex tw-flex-col tw-leading-7">
							<span class="tw-text-base tw-leading-7">
								{{ pokemon.stats.height }}
							</span>
							<span class="tw-font-semibold tw-justify-center tw-text-center">Height</span>
						</div>
					</div>
					<PokemonAbilities :abilities="pokemon.stats.abilities" :mainType="mainType" />
					<hr class="tw-my-0" />
					<div class="tw-mx-5 tw-font-light tw-text-sm tw-text-justify tw-italic tw-py-3">
						{{ pokemon.information.description }}
					</div>
					<hr class="tw-my-0" />
				</div>
			</div>
		</div>
		<div class="" v-else>
			<LoaderPokeBall />
		</div>
	</div>
</template>

<script>
	import Global from "../Global";
	import TypeIcon from "./TypeIcon.vue";
	import PokemonAbilities from "./PokemonAbilities.vue";
	import ImageSelector from "./ImageSelector.vue";
	import LoaderPokeBall from "./controls/LoaderPokeBall.vue";

	export default {
		name: "PokemonFullCardInfo",
		data() {
			return {
				name: null,
				url: Global.Url,
				pokemon: null,
				mainType: null,
				icon: null,
				shiny: null,
			};
		},
		props: {
			id: {
				type: Number,
				default: null,
			},
			pokeUrl: {
				type: String,
				default: null,
			},
			pokemonObj: {
				type: Object,
				default: null,
			},
		},
		components: {
			TypeIcon,
			PokemonAbilities,
			ImageSelector,
			LoaderPokeBall,
		},
		methods: {
			changeName(g, m, s) {
				if (g) {
					this.icon = m ? "fa-solid fa-venus" : "fa-solid fa-mars";
				}
				this.shiny = s ? "fa-regular fa-star" : null;
			},
			processPokemon() {},
		},
		created() {
			if (this.pokemonObj !== null) {
				this.pokemon = this.pokemonObj;
				this.mainType = this.pokemonObj.types[0];
				this.name = this.pokemonObj.name;
			}
		},
	};
</script>

<style></style>
