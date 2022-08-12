<template>
	<router-link :to="'list/pokedex/' + generation.id" class="link link-dark">
		<div class="tw-grid tw-grid-cols-6 tw-font-thin tw-text-sm tw-h-8">
			<div class="tw-w-5"><img :src="generation.image" alt="" /></div>
			<div class="tw-col-span-3">{{ generation.name }}</div>
			<div class="tw-text-right tw-col-span-2">
				{{
					`${generation.start} - ${generation.start + generation.pokemons - 1}`
				}}
			</div>
		</div>
	</router-link>
</template>
<script>
import Generation from '../models/GenerationModel';
export default {
	name: 'GenerationBanner',
	props: {
		generation: {
			type: Generation,
			default: null,
		},
	},
};
</script>

<style></style>
