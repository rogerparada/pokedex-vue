<template>
	<div
		class="tw-bg-white tw-mt-0 tw-w-96 tw-mx-auto md:tw-mt-5 md:tw-w-full md:tw-m-0"
	>
		<hr class="tw-mt-0" />
		<div
			class="container tw-pb-3 tw-text-gray-500 tw-flex tw-items-center tw-flex-row tw-justify-around tw-text-xs md:tw-text-sm"
		>
			<span>
				Made with
				<a href="https://pokeapi.co/" class="tw-text-gray-500 tw-font-bold"
					>PokéAPI</a
				>
			</span>

			<span> Designed by <strong>Roger Parada</strong> </span>

			<span>
				&copy; <strong>{{ year }}</strong>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FooterComponent',
	computed: {
		year() {
			const date = new Date();
			return date.getFullYear();
		},
	},
};
</script>

<style></style>
