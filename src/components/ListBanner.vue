<template>
	<div id="GenerationBanner" v-if="generation != null">
		<div
			class="tw-text-white tw-text-center mb-3 tw-flex tw-flex-row tw-justify-center tw-gap-3"
		>
			<span class="tw-text-4xl tw-font-extrabold">{{ generation.name }}</span>
			<img :src="generation.icon" :alt="generation.name" class="tw-w-10" />
		</div>
	</div>
	<div
		class="tw-text-white tw-text-center mb-3 tw-flex tw-flex-row tw-justify-center tw-gap-3"
		v-else-if="pokeType != null"
	>
		<span class="tw-text-4xl tw-font-extrabold tw-capitalize">
			{{ pokeType.name }}
		</span>
		<img :src="pokeType.icon" :alt="pokeType.name" class="tw-w-10" />
	</div>
</template>

<script>
export default {
	name: 'ListBanner',
	data() {
		return {
			fullType: null,
		};
	},
	props: {
		pokeType: {
			type: Object,
			default: null,
		},
		generation: {
			type: Object,
			default: null,
		},
	},
};
</script>

<style></style>
