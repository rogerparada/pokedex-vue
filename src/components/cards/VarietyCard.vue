<template>
	<div class="card tw-w-28 tw-h-40 tw-bg-white tw-shadow-md">
		<router-link :to="url" class="link link-dark">
			<!-- <div class="pokeNumber tw-text-sm tw-font-thin" :style="{ 'background-color': 'red' }">
				<strong>{{ id }}</strong>
			</div> -->
			<img :src="image" :alt="name" />
			<div class="tw-capitalize tw-text-center tw-text-xs tw-pb-2">
				<span> {{ name }}</span>
			</div>
		</router-link>
		<TypeSelector :types="types" />
	</div>
</template>

<script>
	import TypeSelector from "../TypeSelector.vue";

	export default {
		name: "VarietyCard",
		components: {
			TypeSelector,
		},
		props: {
			Pokemon: {
				type: Object,
				default: null,
			},
		},
		data() {
			return {
				image: null,
				name: null,
				id: 0,
				url: null,
				variety: null,
				types: null,
			};
		},
		methods: {},
		created() {
			if (this.Pokemon !== null) {
				this.image = this.Pokemon.image;
				this.name = this.Pokemon.name.replaceAll("-", " ");
				this.id = this.Pokemon.id;
				this.url = `/pokemon/${this.Pokemon.name}`;
				this.variety = this.Pokemon.name.split("-")[1];
				this.types = this.Pokemon.types;
			}
		},
		computed: {},
	};
</script>

<style></style>
