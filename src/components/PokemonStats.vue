<template>
	<div id="Stats" class="tw-font-thin tw-text-sm tw-m-5" v-if="stats != null">
		<div class="tw-w-full tw-flex tw-flex-row">
			<div class="tw-w-2/6">Hp</div>
			<td class="tw-w-1/6">{{ hp }}</td>
			<td class="tw-w-3/6 tw-my-auto"><ProgresssBar :value="hp" /></td>
		</div>
		<div class="tw-w-full tw-flex tw-flex-row">
			<div class="tw-w-2/6">Attack</div>
			<td class="tw-w-1/6">{{ attack }}</td>
			<td class="tw-w-3/6 tw-my-auto">
				<ProgresssBar :value="attack" />
			</td>
		</div>
		<div class="tw-w-full tw-flex tw-flex-row">
			<div class="tw-w-2/6">Defense</div>
			<td class="tw-w-1/6">{{ defense }}</td>
			<td class="tw-w-3/6 tw-my-auto">
				<ProgresssBar :value="defense" />
			</td>
		</div>
		<div class="tw-w-full tw-flex tw-flex-row">
			<div class="tw-w-2/6">Speed</div>
			<td class="tw-w-1/6">{{ speed }}</td>
			<td class="tw-w-3/6 tw-my-auto"><ProgresssBar :value="speed" /></td>
		</div>
		<div class="tw-w-full tw-flex tw-flex-row">
			<div class="tw-w-2/6">Sp. Attack</div>
			<td class="tw-w-1/6">{{ spAttack }}</td>
			<td class="tw-w-3/6 tw-my-auto">
				<ProgresssBar :value="spAttack" />
			</td>
		</div>
		<div class="tw-w-full tw-flex tw-flex-row">
			<div class="tw-w-2/6">Sp. Defense</div>
			<td class="tw-w-1/6">{{ spDefense }}</td>
			<td class="tw-w-3/6 tw-my-auto">
				<ProgresssBar :value="spDefense" />
			</td>
		</div>
		<div class="tw-w-full tw-flex tw-flex-row">
			<div class="tw-w-2/6">Total</div>
			<td class="tw-w-1/6">{{ total }}</td>
			<td class="tw-w-3/6 tw-my-auto">
				<ProgresssBar :value="total" :max="800" />
			</td>
		</div>
	</div>
</template>

<script>
import ProgresssBar from './controls/ProgresssBar.vue';
export default {
	name: 'PokemonStats',
	data() {
		return {
			hp: 0,
			attack: 0,
			defense: 0,
			speed: 0,
			spAttack: 0,
			spDefense: 0,
		};
	},
	props: {
		stats: {
			type: Object,
			default: null,
		},
	},
	computed: {
		total() {
			return (
				this.hp +
				this.attack +
				this.defense +
				this.spAttack +
				this.spDefense +
				this.speed
			);
		},
	},
	created() {
		if (this.stats != null) {
			console.log('watcher');
			const { hp, attack, defense, spAttack, spDefense, speed } = this.stats;
			this.hp = hp;
			this.attack = attack;
			this.defense = defense;
			this.spAttack = spAttack;
			this.spDefense = spDefense;
			this.speed = speed;
		}
	},
	components: { ProgresssBar },
};
</script>

<style></style>
