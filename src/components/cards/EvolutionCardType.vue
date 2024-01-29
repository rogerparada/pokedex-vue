<template>
	<div class="tw-text-xs tw-text-center">
		<span>{{ evolution.name }}</span>
		<span> {{ evolution.value }}</span>
	</div>
</template>

<script>
	export default {
		name: "EvolutionCardType",
		data() {
			return {
				image: null,
			};
		},
		props: {
			evolution: {
				type: Object,
				default: null,
			},
		},
		methods: {
			getEvolution() {},
		},
	};
</script>

<style></style>
