<template>
	<div
		id="PokemonInfo"
		class="tw-w-96 tw-mx-auto tw-flex tw-flex-col"
		v-if="pokemon != null"
	>
		<div id="Card" class="tw-p-0 tw-w-96 tw-h-72 tw-mx-auto bg-white">
			<div
				id="typeFrame"
				class="tw-w-full tw-h-52"
				:style="{ 'background-color': mainType.color }"
			></div>
			<div
				class="pokeNumber tw-bg-white tw-text-sm tw-font-bold"
				:style="{ color: mainType.color }"
			>
				{{ pokemon.id }}
			</div>
			<div
				id="pokeImage"
				class="tw-mx-auto tw-w-full tw-h-72 ml-5 mr-5 tw-flex tw-justify-center"
			>
				<img class="tw-h-full" :src="pokemon.image" />
			</div>
		</div>
		<div id="bodyCard">
			<div id="name" class="tw-capitalize tw-text-center tw-font-bold">
				{{ pokemon.name }}
				<div class="tw-text-sm tw-font-thin tw-grid tw-grid-cols-3 tw-pt-3">
					<div class="tw-flex tw-flex-col tw-leading-7">
						<span class="tw-text-base tw-leading-7">
							{{ pokemon.stats.weight }}
						</span>
						<span class="tw-font-semibold tw-justify-center tw-text-center"
							>Weight</span
						>
					</div>
					<div class="">
						<TypeIcon :types="pokemon.types" />
					</div>
					<div class="tw-flex tw-flex-col tw-leading-7">
						<span class="tw-text-base tw-leading-7">
							{{ pokemon.stats.height }}
						</span>
						<span class="tw-font-semibold tw-justify-center tw-text-center"
							>Height</span
						>
					</div>
				</div>
			</div>
			<div id="stats">
				<div class=""></div>
				<hr />
				<div id="stats" class="">
					<div id="description"></div>
					<PokemonStats :stats="pokemon.stats.stadistics" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Pokemon } from '@/api/Pokemon';
import Global from '../Global';
import { Stadistics } from '../models/PokemonModel';
import PokemonStats from './PokemonStats.vue';
import TypeIcon from './TypeIcon.vue';
export default {
	name: 'PokemonInfo',
	data() {
		return {
			name: null,
			url: Global.Url,
			pokemon: null,

			mainType: null,
		};
	},
	props: {
		id: {
			type: Number,
			default: null,
		},
	},
	components: {
		PokemonStats,
		TypeIcon,
	},
	methods: {
		getData() {
			const p = new Pokemon();
			(async () => {
				let poke = await p.getPokemonFullData(this.url);
				let { name, id, image, base_experience, types } = poke;
				let stats = new Stadistics(poke);
				this.pokemon = {
					name,
					id,
					image,
					base_experience,
					stats,
					types,
				};
				this.mainType = types[0];
			})();
		},
	},
	created() {
		this.name = this.$route.params.name;
		this.url =
			this.id != null
				? this.url + 'pokemon/' + this.id
				: this.url + 'pokemon/' + this.name;
		this.getData();
	},
};
</script>

<style></style>
