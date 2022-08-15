<template>
	<div class="container tw-flex tw-justify-center tw-text-5xl tw-text-white">
		<div class="tw-text-center tw-mt-10" v-if="error != null">
			<p>
				{{ error }}
			</p>
			<p class="tw-text-4xl">Please try again</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ErrorPage',
	data() {
		return {
			error: 'Page not found',
		};
	},
	created() {
		let pokemon = this.$route.query.pokemon;
		if (pokemon) {
			this.error = `Pokemon ${pokemon}\n not found`;
		}
	},
};
</script>

<style></style>
