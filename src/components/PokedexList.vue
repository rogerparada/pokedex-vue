<template>
	<div class="container md:mx-auto">
		<div class="text-white text-center mb-5">
			<span class="text-4xl font-extrabold">{{ generation }}</span>
			<span class="text-3xl font-bold"> (Generation {{ generationId }})</span>
		</div>
		<div class="text-white text-center mb-3">
			Showing from <span class="font-bold">{{ start }}</span>
			to
			<span class="font-bold">{{ showing }}</span> pokemons in this generation
			<span class="font-bold">{{ max }}</span>
		</div>
		<div class="text-center mb-3" v-if="pokemons !== null">
			<label for="items" class="font-bold mr-2 text-white">Items:</label>
			<select name="" id="" v-model.number="numItems" class="w-32">
				<option :value="10">10</option>
				<option value="50">50</option>
				<option v-if="max >= 100" value="100">100</option>
				<option v-else :value="max">{{ max }}</option>
				<option v-if="max > 100" :value="max">{{ max }}</option>
			</select>
		</div>
		<div class="flex flex-wrap gap-4 justify-center">
			<div v-for="pokemon in pokemons" :key="pokemon.name">
				<PokemonCard
					:pokemon="pokemon"
					v-on:changePokemon="changePokemon($event)"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import Global from '@/Global';
import PokemonCard from './PokemonCard.vue';

export default {
	name: 'PokemonList',
	components: { PokemonCard },
	data() {
		return {
			generation: null,
			generationId: 0,
			pokemons: null,
			start: 1,
			numItems: 50,
			max: 898,
		};
	},
	props: {},
	computed: {
		showing: function () {
			console.log(this.numItems + this.start);
			return this.numItems + this.start < this.max + this.start
				? this.numItems + this.start
				: this.start > 1
				? this.max + this.start
				: this.max;
		},
	},
	methods: {
		getPokemonList() {
			let pokes = `${Global.Url}pokemon?limit=${this.numItems}&offset=${
				this.start - 1
			}`;

			axios.get(pokes).then((response) => {
				this.pokemons = response.data.results;
			});
		},
		loaded(id) {
			const gen = Global.Generations.find((x) => x.id == id);
			if (gen === undefined) {
				this.$router.push('/');
			}
			this.start = gen.start;
			this.max = gen.pokemons;
			this.generation = gen.name;
			this.generationId = gen.id;
			this.getPokemonList();
		},
	},
	created() {
		const id = this.$route.params.id;
		this.loaded(id);
	},
	watch: {
		numItems() {
			this.getPokemonList();
		},
	},
};
</script>
