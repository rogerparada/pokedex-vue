<template>
	<div
		id="evolutionTrigger"
		class="level tw-text-xs tw-flex tw-items-center tw-justify-center tw-gap-2 tw-w-full tw-h-1/2 tw-capitalize"
		v-if="name != null"
	>
		<img :src="img" v-for="(img, index) in images" :alt="name" :key="name + index" class="tw-shrink" />
		<span class="tw-shrink">
			{{ value }}
		</span>
	</div>
</template>

<script>
	import levelUp from "../assets/images/level-up.svg";
	import trade from "../assets/images/trade.svg";

	export default {
		name: "EvolutionTrigger",
		data() {
			return {
				name: null,
				images: [],
				value: null,
			};
		},
		props: {
			trigger: {
				type: Object,
				default: null,
			},
		},
		methods: {
			formatName(str) {
				let s = str.split("-");
				return s.join(" ");
			},
			getLevelTrigger(tr) {
				switch (tr.evolution.id) {
					case 1:
						console.log(tr);
						this.name = "Level up + Affection: ";
						this.images.push(levelUp);
						this.value = tr.evolution.min_affection;
						break;
					case 2:
						this.images.push(levelUp);
						this.name = "Level up + Beauty: ";
						this.value = tr.evolution.min_beauty;
						break;
					case 3:
						this.images.push(levelUp);
						this.name = "Level up + Happiness: ";
						this.value = tr.evolution.min_happiness;
						break;
					case 4:
						this.images.push(levelUp);
						this.name = "Level ";
						this.value = tr.evolution.min_level;
						break;
					case 5:
						this.images.push(levelUp);
						this.name = "Level up in: ";
						this.value = this.formatName(tr.evolution.location.name);
						break;
				}
			},
		},
		created() {
			if (this.trigger != null) {
				//console.log(this.trigger);
				switch (this.trigger.id) {
					case 1:
						this.getLevelTrigger(this.trigger);
						break;
					case 2:
						this.name = "Trade";
						this.images.push(trade);
						this.value = "Trade";
						break;
					case 3:
						this.name = "Item";
						this.value = "+ " + this.formatName(this.trigger.evolution.name);
						break;
				}
			}
		},
	};
</script>

<style></style>
