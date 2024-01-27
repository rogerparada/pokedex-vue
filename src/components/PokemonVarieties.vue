<template>
	<div class="tw-w-full tw-bg-white tw-pt-3">
		<div class="tw-font-bold tw-text-center tw-mb-3">Varieties</div>
		<div class="tw-flex tw-flex-wrap tw-gap-4 tw-justify-center">
			<div class="" v-for="item in varieties" v-bind:key="item.id">
				<VarietyCard :Pokemon="item" v-if="!item.is_default" />
			</div>
		</div>
	</div>
</template>

<script>
	import VarietyCard from "./cards/VarietyCard.vue";

	export default {
		name: "PokemonVarieties",
		data() {
			return {
				varieties: [],
			};
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
		created() {
			if (this.PokemonVarieties != null) {
				this.varieties = this.PokemonVarieties;
			}
		},
	};
</script>

<style></style>
