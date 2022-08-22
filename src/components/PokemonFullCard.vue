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
			<div class="pokeGeneration">
				<img
					class="pokeGenerationSVG tw-w-8"
					:src="pokemon.information.generation.image"
					alt=""
					srcset=""
				/>
			</div>
			<ImageSelector
				:name="pokemon.name"
				:url="pokeUrl"
				:gender_differences="pokemon.information.gender_differences"
			/>
		</div>
		<div id="bodyCard">
			<div id="name" class="tw-capitalize tw-text-center">
				<div class="tw-flex tw-flex-col">
					<router-link
						:to="pokeUrl"
						v-if="pokeUrl != null"
						class="link link-dark"
					>
						<span class="tw-font-bold">{{ pokemon.name }}</span>
					</router-link>
					<span v-else class="tw-font-bold">{{ pokemon.name }}</span>
					<span class="tw-font-light">{{ pokemon.information.name }}</span>
				</div>
				<div class="tw-text-sm tw-font-thin tw-grid tw-grid-cols-3 tw-py-3">
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
				<PokemonAbilities
					:abilities="pokemon.stats.abilities"
					:mainType="mainType"
				/>
				<hr class="tw-my-0" />
				<div
					class="tw-mx-5 tw-font-light tw-text-sm tw-text-justify tw-italic tw-py-3"
				>
					{{ pokemon.information.description }}
				</div>
				<hr class="tw-my-0" />
			</div>
			<div id="stats"></div>
		</div>
	</div>
</template>

<script>
import { Pokemon } from '@/api/Pokemon';
import Global from '../Global';
import { Statistics } from '../models/PokemonModel';
import TypeIcon from './TypeIcon.vue';
import PokemonAbilities from './PokemonAbilities.vue';
import ImageSelector from './ImageSelector.vue';

export default {
	name: 'PokemonFullCard',
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
		pokeUrl: {
			type: String,
			default: null,
		},
	},
	components: {
		TypeIcon,
		PokemonAbilities,
		ImageSelector,
	},
	methods: {
		getData() {
			const p = new Pokemon();
			(async () => {
				let poke = await p.getPokemonFullData(this.url);
				let { name, id, image, base_experience, types, information } = poke;
				let stats = new Statistics(poke);
				this.pokemon = {
					name,
					id,
					image,
					base_experience,
					stats,
					types,
					information,
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
