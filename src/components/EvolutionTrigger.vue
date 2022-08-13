<template>
	<div class="level" v-if="name != null">
		<div class="tw-text-sm">
			<span class="tw-font-bold">{{ name }}</span>
			<span class="tw-capitalize">{{ value }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EvolutionTrigger',
	data() {
		return {
			name: null,
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
			let s = str.split('-');
			return s.join(' ');
		},
		getLevelTrigger(tr) {
			switch (tr.evolution.id) {
				case 1:
					console.log(tr);
					this.name = 'Level up + Affection: ';
					this.value = tr.evolution.min_affection;
					break;
				case 2:
					this.name = 'Level up + Beauty: ';
					this.value = tr.evolution.min_beauty;
					break;
				case 3:
					this.name = 'Level up + Happiness: ';
					this.value = tr.evolution.min_happiness;
					break;
				case 4:
					this.name = 'Level ';
					this.value = tr.evolution.min_level;
					break;
				case 5:
					this.name = 'Level up in: ';
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
				case 3:
					this.name = '+ ';
					this.value = this.formatName(this.trigger.evolution.name);
					break;
			}
		}
	},
};
</script>

<style></style>
