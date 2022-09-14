<template>
	<div class="tw-capitalize">
		<div
			class="tw-flex tw-flex-row tw-justify-center tw-font-bolder tw-text-sm tw-gap-5 tw-mb-2"
		>
			<span>
				{{ title }}
			</span>
		</div>
		<div
			class="tw-flex tw-flex-row tw-justify-center tw-font-thin tw-text-xs tw-gap-3"
		>
			<div
				v-for="(d, index) in damage"
				:key="index"
				class="tw-flex tw-flex-col tw-items-center"
			>
				<img :src="d.icon" alt="d.name" class="tw-w-8 tw-mb-2" />
				<span class="tw-text-center">{{ d.name }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TypeDamageDetail",
	props: {
		title: {
			type: String,
			default: null,
		},
		damage: {
			type: Array,
			default: null,
		},
		damageValue: {
			type: Number,
			default: null,
		},
	},
};
</script>

<style></style>
