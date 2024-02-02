<template>
	<div class="card tw-w-28 tw-h-44 tw-bg-white tw-shadow-md tw-overflow-auto">
		<router-link :to="url" class="link link-dark">
			<div class="pokeItem tw-text-sm tw-font-thin tw-text-black">
				<strong>{{ id }}</strong>
			</div>
			<img :src="image" :alt="name" />
			<div class="tw-capitalize tw-text-center tw-text-xs tw-pb-2">
				<span> {{ name }}</span>
			</div>
			<EvolutionCardType :evolution="evolution" />
		</router-link>
	</div>
</template>

<script>
	import EvolutionCardType from "./EvolutionCardType.vue";

	export default {
		name: "EvolutionCard",
		components: {
			EvolutionCardType,
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
				evolution: null,
				types: null,
			};
		},
		methods: {},
		created() {
			try {
				if (this.Pokemon !== null) {
					//console.log("🚀 ~ created ~ this.Pokemon :", this.Pokemon);
					this.image = this.Pokemon.image;
					this.name = this.Pokemon.name.replaceAll("-", " ");
					this.id = this.Pokemon.id;
					this.url = `/Pokemon/${this.Pokemon.name}`;
					this.evolution =
						this.Pokemon.evolution?.evolutionType?.length > 0
							? this.Pokemon.evolution.evolutionType[0]
							: this.Pokemon.baby
							? { name: "Baby" }
							: { name: "Initial" };
					this.types = this.Pokemon.types;
				}
			} catch (error) {
				console.log(error);
			}
		},
		computed: {},
	};
</script>

<style></style>
