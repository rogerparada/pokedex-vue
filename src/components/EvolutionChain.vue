<template>
	<div class="tw-w-full tw-bg-white tw-p-3">
		<div class="tw-font-bold tw-text-center tw-mb-3">Evolution chain</div>
		<div
			class="tw-flex tw-flex-wrap tw-justify-center tw-gap-3"
			v-if="Evolutions != null"
		>
			<div class="card tw-w-24" v-for="(item, index) in pokemon" :key="index">
				<div class="">
					<router-link :to="item.url" class="link link-dark">
						<img :src="item.image" :alt="item.name" :title="item.name" />
						<div
							class="tw-capitalize tw-text-center tw-text-xs tw-font-thin tw-mb-2"
						>
							<span class="tw-font-light">{{ item.id }}</span> {{ item.name }}
						</div>
					</router-link>
				</div>

				<EvolutionTrigger :trigger="item.trigger" v-if="item.trigger != null" />

				<div class="level tw-flex tw-justify-center tw-items-center" v-else>
					<span class="tw-font-bold tw-text-xs">Base Form</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Pokemon } from '@/api/Pokemon';
import EvolutionTrigger from './EvolutionTrigger.vue';

export default {
	name: 'EvolutionChain',
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
				url: `/pokemon/${name}`,
			};
		},
		getEvolutions() {
			if (this.Evolutions != null) {
				this.Evolutions.forEach(async (item, index) => {
					const { id, name, order, image, url } = await this.getImage(
						item.url,
						index
					);
					this.pokemon.push({
						id,
						name,
						image,
						url,
						trigger: item.trigger,
						index: order,
					});
					this.pokemon = this.pokemon.sort((a, b) => a.index - b.index);
				});
			}
		},
	},
	created() {
		this.getEvolutions();
	},

	components: { EvolutionTrigger },
};
</script>

<style></style>
