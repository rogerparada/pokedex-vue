<template>
	<div class="abilities tw-pb-3 tw-capitalize" v-if="abilities != null">
		<div
			id="Abilities"
			class="tw-flex tw-flex-wrap tw-justify-center tw-mx-3 tw-gap-0"
		>
			<div
				class="tw-font-light tw-text-xs tw-p-1 tw-text-white tw-flex-1"
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
	name: "PokemonAbilities",
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
			console.log("Abilities");
			console.log(this.abilities);
			this.getInfo();
		},
	},
};
</script>
