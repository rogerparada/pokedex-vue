<template>
	<div>
		<div class="tw-grid tw-grid-cols-6 tw-font-thin tw-text-sm tw-h-8">
			<div class="">
				<img :src="pokemonType.icon" :alt="pokemonType.name" class="tw-h-6" />
			</div>
			<div class="tw-col-span-3 tw-capitalize tw-flex tw-flex-row">
				{{ pokemonType.name }}
			</div>
			<div class="tw-text-right tw-col-span-2">
				{{ pokemonType.pokemons }}
			</div>
		</div>
	</div>
</template>
<script>
import Global from '@/Global';

export default {
	name: 'TypeBanner',
	data() {
		return {
			types: Global.Types,
		};
	},
	props: {
		pokemonType: {
			type: Object,
			default: null,
		},
	},
};
</script>

<style></style>
