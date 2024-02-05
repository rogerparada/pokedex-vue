<template>
	<div class="card tw-w-28 tw-h-44 tw-bg-white tw-shadow-md">
		<router-link :to="url" class="link link-dark tw-mb-2">
			<div class="pokeItem tw-text-sm tw-font-thin tw-text-black tw-w-8" v-if="variety">
				<VarietyIcon :varietyName="variety" />

				<!-- <img :src="variety.icon" :alt="variety.name" class="tw-w-6" /> -->
			</div>
			<img :src="image" :alt="name" class="tw-mb-2" />
			<div class="tw-capitalize tw-text-center tw-text-xs tw-pb-2">
				<span> {{ name }}</span>
			</div>
		</router-link>
		<TypeSelector :types="types" />
	</div>
</template>

<script>
	import TypeSelector from "../TypeSelector.vue";
	import VarietyIcon from "./VarietyIcon.vue";
	export default {
		name: "VarietyCard",
		components: {
			TypeSelector,
			VarietyIcon,
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
		methods: {
			FormatName(name) {
				const f = name.split("-");
				if (f.length > 1) {
					if (f[1] === "mega") return [f[1], f[0], f[2]].join(" ");
					if (f[1] === "gmax") return `${f[0]} Gigamax`;
				}
				return name.replaceAll("-", " ");
			},
			SelectVariety(variety) {
				if (variety.includes("alola")) return "alola";
				return variety.split("-")[1];
			},
		},
		created() {
			if (this.Pokemon !== null) {
				this.image = this.Pokemon.image;
				this.name = this.FormatName(this.Pokemon.name);
				this.id = this.Pokemon.id;
				this.url = `/Pokemon/${this.Pokemon.name}`;
				this.variety = this.SelectVariety(this.Pokemon.name);
				this.types = this.Pokemon.types;
			}
		},
		computed: {},
	};
</script>

<style></style>
