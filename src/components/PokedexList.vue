<template>
	<div class="tw-bg-red-600 tw-pt-5">
		<div class="md:tw-mx-auto lg:tw-mx-5 tw-mb-3 tw-w-auto tw-text-red-600">
			<div id="GenerationBanner" v-if="generation != null">
				<div
					class="tw-text-white tw-text-center mb-3 tw-flex tw-flex-row tw-justify-center tw-gap-3"
				>
					<span class="tw-text-4xl tw-font-extrabold">{{ generation }}</span>
					<img :src="icon" :alt="generation" class="tw-w-10" />
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
					<span for="items" class="input-group-text tw-font-bold tw-text-black"
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
						<option v-if="max > 100 && max < 200" :value="max">
							{{ max }}
						</option>
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
			<div class="pag tw-flex tw-flex-wrap tw-justify-center">
				<PaginationControl
					:totalItems="max"
					:displayItems="numItems"
					:baseUrl="baseUrl"
					v-if="numItems < max"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import Global from '@/Global';
import PokemonCard from './PokemonCard.vue';
import PaginationControl from './controls/PaginationControl.vue';

export default {
	name: 'PokemonList',
	components: { PokemonCard, PaginationControl },
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
			icon: null,
			total: 0,
			baseUrl: this.$route.path,
		};
	},
	props: {},
	computed: {
		showing() {
			return this.numItems + this.start < this.total
				? this.numItems + this.start
				: this.total;
		},
		maxList() {
			return this.start + this.numItems >= this.total
				? this.total - this.start + 1 >= 0
					? this.total - this.start + 1
					: 0
				: this.numItems;
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
						default:
							this.pokemons = response.data.results;
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
			let p = this.$route.params.page
				? (this.$route.params.page - 1) * this.numItems
				: 0;

			this.start = gen.start + p;
			this.max = gen.pokemons;
			this.total = gen.start + gen.pokemons - 1;
			this.generation = gen.name;
			this.generationId = gen.id;
			this.icon = gen.image;
		},
		loadAll() {
			let p = this.$route.params.page
				? (this.$route.params.page - 1) * this.numItems
				: 0;

			this.start = 1 + p;
			this.max = Global.Max;
			this.total = Global.Max;
		},
		getByTypes(pokemons) {
			let pokes = pokemons.map((p) => p.pokemon);
			let page = this.$route.params.page
				? (this.$route.params.page - 1) * this.numItems
				: 0;
			this.pokemons = pokes.filter(
				(p) => Number(p.url.split('/').reverse()[1]) <= Global.Max
			);
			this.max = this.pokemons.length;

			this.pokemons = this.pokemons.slice(
				page,
				this.numItems + page < this.max ? this.numItems + page : this.max
			);

			console.log(page, this.numItems + page, this.max);
		},
		startPage() {
			this.listType = this.$route.params.listType;
			const id = this.$route.params.id;
			const baseUrl = Global.Url;
			const url = this.$route.path.split('/');
			this.baseUrl = url.slice(0, url.length - 1).join('/');
			if (this.listType) {
				switch (this.listType) {
					case 'pokedex':
						this.loadGeneration(id);
						this.url = `${baseUrl}pokemon?limit=${this.maxList}&offset=${
							this.start > 1 ? this.start - 1 : 0
						}`;
						break;
					case 'types':
						console.log(`${baseUrl}type/${id}`);
						this.url = `${baseUrl}type/${id}`;
						break;
				}
			} else {
				this.loadAll();
				console.log(
					'API URL',
					`${baseUrl}pokemon?limit=${this.maxList}&offset=${
						this.start > 1 ? this.start - 1 : 0
					}`
				);
				this.url = `${baseUrl}pokemon?limit=${this.maxList}&offset=${
					this.start > 1 ? this.start - 1 : 0
				}`;
			}

			this.getPokemonList();
		},
	},
	created() {
		let items = this.$route.query.items;
		let page = this.$route.params.page;
		console.log('🚀 ~ file: PokedexList.vue this.$route', this.$route);
		if (items) {
			this.numItems = Number(items);
		} else if (page) {
			let route = `${this.$route.path}?items=50`;
			this.$router.push(route);
		} else {
			let route = `${this.$route.path}/1?items=50`;
			this.$router.push(route);
		}
		this.startPage();
	},
	watch: {
		numItems(newValue) {
			let items = this.$route.query.items;
			console.log('Numitems', items, newValue);
			if (newValue != items) {
				console.log('Numitems', items, newValue);

				let route = this.$route.path;
				this.$router.push(`${route}?items=${newValue}`);
			}
			this.startPage();
		},
	},
};
</script>
