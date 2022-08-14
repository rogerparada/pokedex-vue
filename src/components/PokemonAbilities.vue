<template>
	<div class="abilities tw-pb-3" v-if="abilities != null">
		<div
			id="Abilities"
			:class="
				abilities
					? `tw-grid tw-grid-cols-${abilities.length} tw-flex tw-mx-3 tw-gap-0`
					: ''
			"
		>
			<div
				class="tw-font-light tw-text-sm tw-p-1 tw-text-white"
				v-for="ability in abilities"
				:key="ability.slot"
				:style="{ 'background-color': mainType.color }"
			>
				<span>{{ ability.name }} </span>
				<span class="tw-font-light" v-if="ability.is_hidden">(H)</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'PokemonAbilities',
	data() {
		return {};
	},
	props: {
		abilities: {
			type: Array,
			default: null,
		},
		mainType: {
			type: Object,
			default: null,
		},
	},
	methods: {},
	watch: {
		abilities() {
			console.log('Abilities');
			console.log(this.abilities);
			this.getInfo();
		},
	},
};
</script>
