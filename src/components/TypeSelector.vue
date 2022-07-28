<template>
	<div :class="`grid grid-cols-${types.length}`">
		<div
			class="text-white text-center text-sm capitalize"
			v-for="ptype in types"
			:key="ptype.slot"
			:style="{ 'background-color': typeColor[ptype.type.name] }"
		>
			{{ ptype.type.name }}
		</div>
	</div>
</template>

<script>
import Global from '@/Global';

export default {
	name: 'TypeSelector',
	data() {
		return {
			typeColor: Global.typeColor,
		};
	},
	props: {
		types: {
			type: Array,
			default: null,
		},
	},
	methods: {
		getClass() {
			return;
		},
	},
};
</script>

<style></style>
