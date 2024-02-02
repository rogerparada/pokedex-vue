<template>
	<div class="tw-w-full tw-bg-white md:tw-mx-5 sm:tw-p-3">
		<div class="tw-font-bold tw-text-center tw-mb-3">Evolution chain</div>
		<div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-3" v-if="Evolutions != null">
			<div class="tw-flex tw-flex-wrap tw-gap-2 tw-justify-center">
				<div class="" v-for="(item, index) in Evolutions" :key="index">
					<EvolutionCardVue :Pokemon="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import EvolutionCardVue from "./cards/EvolutionCard.vue";

	export default {
		name: "EvolutionChain",
		data() {
			return {};
		},
		props: {
			Evolutions: {
				type: Array,
				default: null,
			},
		},

		components: { EvolutionCardVue },
	};
</script>

<style></style>
