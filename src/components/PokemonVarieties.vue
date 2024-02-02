<template>
	<div class="tw-w-full tw-bg-white md:tw-mx-5 sm:tw-p-3">
		<div class="tw-font-bold tw-text-center tw-mb-3">Varieties</div>
		<div class="tw-flex tw-flex-wrap tw-gap-3 tw-justify-center">
			<div class="" v-for="item in PokemonVarieties" v-bind:key="item.id">
				<VarietyCard :Pokemon="item" />
			</div>
		</div>
	</div>
</template>

<script>
	import VarietyCard from "./cards/VarietyCard.vue";

	export default {
		name: "PokemonVarieties",
		data() {
			return {};
		},
		props: {
			PokemonVarieties: {
				type: Array,
				default: null,
			},
		},
		components: {
			VarietyCard,
		},
	};
</script>

<style></style>
