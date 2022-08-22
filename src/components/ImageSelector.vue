<template>
	<div
		id="pokeImage"
		class="tw-mx-auto tw-w-full tw-h-72 ml-5 mr-5 tw-flex tw-justify-center"
	>
		<router-link :to="url" v-if="url != null" class="tw-flex tw-justify-center">
			<img class="tw-h-full" :src="image" />
		</router-link>
		<img class="tw-h-full" :src="image" v-else />
		<div v-if="gender_differences">
			<div id="genSelector" v-if="genreImg != null">
				<img :src="genreImg" alt="Genre" class="tw-w-10" @click="changeGen()" />
			</div>
		</div>
		<div id="shiny" v-if="shinyImg != null">
			<img :src="shinyImg" alt="Shiny" class="tw-w-10" @click="changeShiny()" />
		</div>
	</div>
</template>

<script>
import Global from '@/Global';
import imgShiny from '../assets/images/shiny.svg';
import imgGenre from '../assets/images/genre.svg';

export default {
	name: 'ImageSelector',
	data() {
		return {
			image: null,
			images: null,
			male: true,
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

			this.images = data.sprites.other.home;
			this.image = this.images.front_default;
		},
		changeGen() {
			this.male = !this.male;
			this.changeImage();
		},
		changeShiny() {
			this.shiny = !this.shiny;
			this.changeImage();
		},
		changeImage() {
			this.image =
				this.images != null
					? this.shiny
						? this.male
							? this.images.front_shiny
							: this.images.front_shiny_female
						: this.male
						? this.images.front_default
						: this.images.front_female
					: null;

			this.$emit('change', this.gender_differences, this.male, this.shiny);
		},
	},

	created() {
		this.getImages();
	},
};
</script>

<style></style>
