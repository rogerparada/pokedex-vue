<template>
	<div>
		<div class="container tw-md:mx-auto tw-w-auto">
			<div id="GenerationBanner" v-if="generation != null">
				<div class="tw-text-white tw-text-center mb-5">
					<span class="tw-text-4xl tw-font-extrabold">{{ generation }}</span>
					<span class="tw-text-3xl tw-font-bold">
						(Generation {{ generationId }})</span
					>
				</div>
				<div class="tw-text-white tw-text-center mb-3">
					Showing from <span class="tw-font-bold">{{ start }}</span>
					to
					<span class="tw-font-bold">{{ showing }}</span> | Pokemons in this
					generation
					<span class="tw-font-bold">{{ max }}</span>
				</div>
				<div class="tw-text-center tw-mb-3" v-if="pokemons !== null"></div>
			</div>
			<div class="tw-w-4/5 tw-mx-auto tw-pb-3">
				<div class="input-group">
					<span for="items" class="input-group-text tw-font-bold tw-text-white"
						>Items:</span
					>
					<select
						name=""
						id=""
						v-model.number="numItems"
						class="form-control form-select w-32"
					>
						<option value="10">10</option>
						<option value="50">50</option>
						<option v-if="max >= 100" :value="'100'">100</option>
						<option v-else :value="max">{{ max }}</option>
						<option v-if="max > 100" :value="max">{{ max }}</option>
					</select>
				</div>
			</div>
			<div class="tw-flex tw-flex-wrap tw-gap-4 tw-justify-center">
				<div v-for="pokemon in pokemons" :key="pokemon.name">
					<PokemonCard
						:pokemon="pokemon"
						v-on:changePokemon="changePokemon($event)"
					/>
				</div>
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
			start: 0,
			numItems: 50,
			max: 0,
			url: null,
			listType: null,
		};
	},
	props: {},
	computed: {
		showing: function () {
			return this.numItems + this.start < this.max + this.start
				? this.numItems + this.start
				: this.max + this.start - 1;
		},
	},
	methods: {
		getPokemonList() {
			axios
				.get(this.url)
				.then((response) => {
					switch (this.listType) {
						case 'pokedex':
							this.pokemons = response.data.results;
							break;
						case 'types':
							this.getByTypes(response.data.pokemon);
							break;
					}
				})
				.catch((error) => {
					console.error(error);
					this.$router.push('/');
				});
		},
		loadGeneration(id) {
			const gen = Global.Generations.find((x) => x.id == id);
			if (gen === undefined) {
				this.$router.push('/');
			}
			this.start = gen.start;
			this.max = gen.pokemons;
			this.generation = gen.name;
			this.generationId = gen.id;
		},
		getByTypes(pokemons) {
			let pokes = pokemons.map((p) => p.pokemon);
			this.max = pokes.length;
			this.pokemons = pokes
				.filter((p) => Number(p.url.split('/').reverse()[1]) <= Global.Max)
				.slice(0, this.numItems);
		},
		startPage() {
			this.listType = this.$route.params.listType;
			const id = this.$route.params.id;
			const baseUrl = Global.Url;

			switch (this.listType) {
				case 'pokedex':
					this.loadGeneration(id);
					this.url = `${baseUrl}pokemon?limit=${this.numItems}&offset=${
						this.start > 1 ? this.start - 1 : 0
					}`;
					break;
				case 'types':
					this.url = `${baseUrl}type/${id}`;
					break;
			}
			this.getPokemonList();
		},
	},
	created() {
		this.startPage();
	},
	watch: {
		numItems() {
			console.log(this.numItems);
			console.log(this.url);
			this.startPage();
		},
	},
};
</script>
