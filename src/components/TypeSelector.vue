<template>
	<div v-if="types != null">
		<div class="tw-flex tw-flex-row doubleType" v-if="types.length > 1">
			<div
				:class="getSize"
				v-for="ptype in types"
				:key="ptype.name"
				:style="{ 'background-color': ptype.color }"
			>
				<router-link :to="`/list/types/${ptype.name}`" class="link-light">
					{{ ptype.name }}
				</router-link>
			</div>
		</div>
		<div class="tw-flex tw-flex-row" v-else>
			<div
				:class="`singleType ${getSize}`"
				v-for="ptype in types"
				:key="ptype.slot"
				:style="{ 'background-color': ptype.color }"
			>
				<router-link
					:to="`/list/types/${ptype.name}`"
					class="link-light tw-capitalize"
				>
					{{ ptype.name }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TypeSelector',

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
					return `tw-text-${this.size} tw-p-1 tw-font-light`;
				case 'md':
					return `tw-text-${this.size} tw-p-2 tw-font-normal`;
				case 'lg':
					return `tw-text-${this.size} tw-p-3 tw-font-medium`;
				case 'xl':
					return `tw-text-${this.size} tw-p-5 tw-font-semi-bold`;
				default:
					return '';
			}
		},
	},
};
</script>

<style></style>
