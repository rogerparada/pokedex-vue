<template>
	<img :src="variety.icon" :alt="variety.name" v-if="varietyName" />
</template>

<script>
	import KeyStone from "@/assets/images/Stickers_KeyStone.svg";
	import Giga from "@/assets/images/Dinamax.svg";
	import Galar from "@/assets/images/Stickers_Galar.svg";
	import Hisui from "@/assets/images/Stickers_Hisui.svg";
	import Alola from "@/assets/images/Stickers_Alola.svg";
	import PokeBall from "@/assets/images/pokeball.svg";

	export default {
		name: "VarietyIcon",
		data() {
			return {
				variety: "",
			};
		},
		props: {
			varietyName: {
				type: String,
				default: undefined,
			},
		},
		methods: {
			SelectVariety(variety) {
				const VARIETIES = {
					mega: { name: "Mega", icon: KeyStone },
					gmax: { name: "Gigamax", icon: Giga },
					galar: { name: "Galar", icon: Galar },
					hisui: { name: "Hisui", icon: Hisui },
					alola: { name: "Alola", icon: Alola },
				};
				return VARIETIES[variety] || { name: "", icon: PokeBall };
			},
		},
		created() {
			this.variety = this.SelectVariety(this.varietyName);
		},
	};
</script>

<style></style>
