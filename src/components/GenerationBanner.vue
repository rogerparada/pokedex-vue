<template>
	<div>
		<div class="tw-grid tw-grid-cols-6 tw-font-thin tw-text-sm tw-h-8">
			<div class="">{{ generation.id }}</div>
			<div class="tw-col-span-3">{{ generation.name }}</div>
			<div class="tw-text-right tw-col-span-2">
				{{
					`${generation.start} - ${generation.start + generation.pokemons - 1}`
				}}
			</div>
		</div>
	</div>
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
