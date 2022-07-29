<template>
	<div v-if="types != null">
		<div :class="`tw-grid tw-grid-cols-${types.length}`">
			<div
				class="tw-text-white tw-text-center tw-text-sm tw-capitalize"
				v-for="ptype in types"
				:key="ptype.slot"
				:style="{ 'background-color': typeColor[ptype.type.name] }"
			>
				{{ ptype.type.name }}
			</div>
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
