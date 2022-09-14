<template>
	<div class="container tw-justify-center tw-text-5xl tw-text-black tw-my-10">
		<div
			class="tw-text-center tw-mt-10 tw-flex tw-flex-row tw-justify-center"
			v-if="error != null"
		>
			{{ error }}
		</div>
		<div
			class="tw-text-center tw-text-4xl tw-flex tw-flex-row tw-justify-center tw-my-2"
		>
			Please try again or choose a Pokéball
		</div>

		<div
			class="pokeballs tw-flex tw-flex-wrap tw-justify-center tw-gap-5 tw-my-5"
		>
			<div v-for="(pokeball, index) in pokeballs" :key="index">
				<router-link :to="'/pokemon/' + pokeball.pokemon">
					<img :src="pokeball.icon" alt="" class="pokeball tw-w-32" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import poke from "@/assets/images/pokeball.svg";
import superb from "@/assets/images/pokeball-super.svg";
import ultrab from "@/assets/images/pokeball-ultra.svg";
import masterb from "@/assets/images/pokeball-master.svg";
import Global from "@/Global";

export default {
	name: "ErrorPage",
	data() {
		return {
			items: Global.Max / 4,
			error: "Page not found",
			pokeballs: [],
		};
	},
	methods: {
		getRandom(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min) + min);
		},
	},
	created() {
		let pokemon = this.$route.query.pokemon;
		if (pokemon) {
			this.error = `Pokemon ${pokemon}\n not found`;
		}
		console.log(this.items);

		this.pokeballs = [
			{ icon: poke, pokemon: this.getRandom(1, this.items) },
			{ icon: superb, pokemon: this.getRandom(this.items, this.items * 2) },
			{
				icon: ultrab,
				pokemon: this.getRandom(this.items * 2, this.items * 3),
			},
			{ icon: masterb, pokemon: this.getRandom(this.items * 3, Global.Max) },
		];
	},
};
</script>

<style>
.pokeballs {
	position: relative;
}
.pokeball {
	width: 8rem;
	transition: 0.2s all ease-in-out;
}
.pokeball:hover {
	transform: scale(1.5);
}
</style>
