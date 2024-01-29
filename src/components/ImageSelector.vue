<template>
	<div id="pokeImage" class="tw-mx-auto tw-w-full tw-h-72 tw-p-2 tw-flex tw-justify-center">
		<router-link :to="url" v-if="url != null" class="tw-flex tw-justify-center">
			<img class="tw-h-full" :src="image" />
		</router-link>
		<img class="tw-h-full" :src="image" v-else />
		<div v-if="gender_differences">
			<div id="genSelector" v-if="genreImg != null">
				<img :src="genreImg" alt="Genre" class="tw-w-10" />
				<input id="" name="" type="checkbox" title="Male/Female" v-model="genre" />
			</div>
		</div>
		<div id="shiny" v-if="shinyImg != null" class="">
			<img :src="shinyImg" alt="Shiny" class="tw-w-10" />
			<input id="" name="" type="checkbox" title="Shiny" v-model="shiny" />
		</div>
	</div>
</template>

<script>
	import Global from "@/Global";
	import imgShiny from "../assets/images/shiny.svg";
	import imgGenre from "../assets/images/genre.svg";

	export default {
		name: "ImageSelector",
		data() {
			return {
				image: null,
				images: null,
				genre: false,
				shiny: false,
				genreImg: null,
				shinyImg: null,
			};
		},
		props: {
			name: {
				type: String,
				default: null,
			},
			url: {
				type: String,
				default: null,
			},
			gender_differences: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			async getImages() {
				this.shinyImg = imgShiny;
				this.genreImg = imgGenre;

				const response = await fetch(`${Global.Url}pokemon/${this.name}`);
				const data = await response.json();
				const home = data.sprites.other["home"];
				const official = data.sprites.other["official-artwork"];
				this.images = home.front_default !== null ? home : official;
				this.image = this.images.front_default;
			},
			changeImage() {
				this.image =
					this.images !== null
						? this.shiny
							? this.genre
								? this.images.front_shiny_female
								: this.images.front_shiny
							: this.genre
							? this.images.front_female
							: this.images.front_default
						: null;
				if (!this.image) {
					this.image = !this.shiny ? this.images.front_default : this.images.front_shiny;
				}

				this.$emit("change", this.gender_differences, this.genre, this.shiny);
			},
		},
		watch: {
			shiny() {
				this.changeImage();
			},
			genre() {
				this.changeImage();
			},
		},
		created() {
			this.getImages();
		},
	};
</script>

<style>
	input[type="checkbox"] {
		font-size: 10px;
		appearance: none;
		width: 40px !important;
		height: 20px !important;
		background-color: #eee;
		border-radius: 10px !important;
		position: relative !important;
		cursor: pointer;
		outline: none;
		transition: 0.2s all ease-in-out;
	}

	input[type="checkbox"]:checked {
		background-color: rgb(255, 0, 0) !important;
	}

	input[type="checkbox"]::after {
		width: 20px;
		height: 20px;
		content: "";
		position: absolute !important;
		border-radius: 100%;
		background-color: #fff !important;
		box-shadow: 0 0 3px rgb(0, 0, 0.3);
		transform: scale(0.7);
		left: 0;
		transition: 0.2s all ease-in-out;
	}

	input[type="checkbox"]:checked::after {
		left: calc(100% - 20px);
	}
</style>
