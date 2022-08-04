<template>
	<div id="pokemonType">
		<div
			class="tw-flex tw-flex-row tw-justify-center tw-text-center tw-font-semibold tw-gap-2"
			v-if="types.length > 1"
		>
			<div class="" v-for="ty in types" :key="ty.id">
				<img :src="ty.icon" class="tw-mx-auto tw-w-7" :alt="ty.name" />
				<span class="tw-leading-7">{{ ty.name }}</span>
			</div>
		</div>
		<div
			class="tw-flex tw-flex-row tw-justify-center tw-text-center tw-font-semibold"
			v-else
		>
			<div class="" v-for="ty in types" :key="ty.id">
				<img :src="ty.icon" class="tw-mx-auto tw-w-7" :alt="ty.name" />
				<span class="tw-leading-7">{{ ty.name }}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'TypeIcon',

	props: {
		types: Array,
	},

	created() {},
};
</script>
