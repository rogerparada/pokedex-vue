<template>
	<div class="tw-w-96 tw-bg-white tw-p-3">
		<div class="tw-font-bold tw-text-center">Evolution chain</div>
		<div
			class="tw-flex tw-flex-wrap tw-justify-center tw-gap-3"
			v-if="Evolutions != null"
		>
			<div class="tw-w-32" v-for="(item, index) in pokemon" :key="index">
				<img :src="item.image" :alt="item.name" />
				<div class="tw-capitalize tw-text-center tw-text-sm tw-font-thin">
					<span class="tw-font-light">{{ item.id }}</span> {{ item.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Pokemon } from '@/api/Pokemon';

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
		getImage(url) {
			const p = new Pokemon();
			(async () => {
				let poke = await p.getPokemonImage(url);
				let { id, name, image } = poke;

				this.pokemon.push({
					id,
					name,
					image,
				});
			})();
		},
	},
	created() {
		if (this.Evolutions != null) {
			this.Evolutions.forEach((item) => {
				this.getImage(item.url);
			});
		}
	},
};
</script>

<style></style>
