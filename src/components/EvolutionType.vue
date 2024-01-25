<template>
	<div
		id="evolutionTrigger"
		class="level tw-text-xs tw-flex tw-items-center tw-justify-center tw-gap-2 tw-w-full tw-h-1/2 tw-capitalize tw-flex-col"
		v-if="evolutions.length > 0"
	>
		<div class="" v-for="item in evolutions" :key="item.name">
			<img :src="img" v-for="(img, index) in images" :alt="name" :key="name + index" class="tw-shrink" />
			<span>{{ item.name }}</span>
			<span class="tw-shrink">
				{{ item.value }}
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "EvolutionType",
		data() {
			return {
				evolutions: [],
				images: [],
			};
		},
		props: {
			evolution: {
				type: Object,
				default: null,
			},
		},
		methods: {},
		created() {
			if (this.evolutionType !== null) {
				const { evolutionType } = this.evolution;
				//console.log("EvolutionType", evolutionType, trigger);
				this.evolutions = evolutionType;
			}
		},
	};
</script>

<style></style>
