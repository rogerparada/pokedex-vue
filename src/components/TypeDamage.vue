<template>
	<div id="Damages" class="tw-m-5">
		<div
			v-if="damages != null"
			class="tw-flex tw-flex-wrap tw-justify-center tw-gap-10"
		>
			<TypeDamageDetail :damage="damages.dt2x" :title="'Damage 2x to:'" />
			<TypeDamageDetail :damage="damages.df2x" :title="'Damage 2x from:'" />
			<TypeDamageDetail :damage="damages.df05x" :title="'Damage 0.5x from:'" />
			<TypeDamageDetail :damage="damages.dt05x" :title="'Damage 0.5x to:'" />
			<TypeDamageDetail :damage="damages.df0x" :title="'No damage from:'" />
			<TypeDamageDetail :damage="damages.dt0x" :title="'No damage to:'" />
		</div>
	</div>
</template>

<script>
import Global from "@/Global";
import TypeDamageDetail from "./TypeDamageDetail.vue";
import noneImg from "../assets/images/NoneWhite.svg";

export default {
	name: "TypeDamage",
	data() {
		return {
			damages: null,
		};
	},
	methods: {
		async getDamages(url) {
			const response = await fetch(url);
			const data = await response.json();
			const {
				double_damage_from,
				double_damage_to,
				half_damage_from,
				half_damage_to,
				no_damage_to,
				no_damage_from,
			} = await data.damage_relations;
			this.damages = {
				df2x: this.formatDamage(double_damage_from),
				dt2x: this.formatDamage(double_damage_to),
				df0x: this.formatDamage(no_damage_from),
				dt0x: this.formatDamage(no_damage_to),
				df05x: this.formatDamage(half_damage_from),
				dt05x: this.formatDamage(half_damage_to),
			};
		},
		formatDamage(damage) {
			const types = Global.Types;
			const result = damage.map((item) => {
				return types.find((f) => f.name === item.name);
			});

			return result.length > 0 ? result : [{ name: "none", icon: noneImg }];
		},
	},
	props: {
		pokemonType: {
			type: String,
			default: null,
		},
	},
	created() {
		if (this.pokemonType != null) {
			const url = "https://pokeapi.co/api/v2/type/" + this.pokemonType;
			this.getDamages(url);
		}
	},
	components: { TypeDamageDetail },
};
</script>

<style></style>
