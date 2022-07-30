<template>
	<div v-if="types != null">
		<div class="tw-flex tw-flex-row doubleType" v-if="types.length > 1">
			<div
				:class="getSize"
				v-for="ptype in types"
				:key="ptype.slot"
				:style="{ 'background-color': typeColor[ptype.type.name] }"
			>
				{{ ptype.type.name }}
			</div>
		</div>
		<div class="tw-flex tw-flex-row" v-else>
			<div
				:class="`singleType ${getSize}`"
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
		size: {
			type: String,
			default: 'sm',
		},
	},
	computed: {
		getSize() {
			switch (this.size) {
				case 'sm':
					return `tw-text-${this.size} tw-p-1`;
				case 'md':
					return `tw-text-${this.size} tw-p-2`;
				case 'lg':
					return `tw-text-${this.size} tw-p-3`;
				case 'xl':
					return `tw-text-${this.size} tw-p-5`;
				default:
					return '';
			}
		},
	},
};
</script>

<style></style>
