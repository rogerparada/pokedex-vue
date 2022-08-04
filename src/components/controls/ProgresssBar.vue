<template>
	<div id="barContainer">
		<div id="fullBar" class="tw-mx-2"></div>
		<div
			id="bar"
			:class="`${color} tw-mx-2`"
			:style="{ width: `${divWidth}%` }"
		></div>
	</div>
</template>

<script>
export default {
	name: 'ProgressBar',
	props: {
		value: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 255,
		},
	},
	computed: {
		divWidth() {
			return Math.ceil((this.value * 100) / this.max);
		},
		color() {
			return this.value < 10
				? 'red'
				: this.value < 50
				? 'dark orange'
				: this.value < 80
				? 'orange'
				: this.value < 100
				? 'yellow'
				: 'green';
		},
	},
};
</script>

<style>
#barContainer {
	position: relative;
}

#bar {
	height: 10px;
	border-radius: 5px;
	position: absolute;
	top: 0;
}

#fullBar {
	height: 10px;
	background-color: rgb(236, 233, 233);
	width: 100%;
	border-radius: 5px;
}

.red {
	background-color: rgb(153, 20, 24);
	border: 1px solid rgb(120, 14, 18);
}
.yellow {
	background-color: rgb(255, 251, 126);
	border: 1px solid rgb(193, 189, 58);
}
.darkOrange {
	background-color: rgb(154, 65, 17);
	border: 1px solid rgb(193, 117, 58);
}
.orange {
	background-color: rgb(244, 174, 113);
	border: 1px solid rgb(172, 105, 17);
}
.green {
	background-color: rgb(174, 242, 135);
	border: 1px solid rgb(95, 188, 37);
}
</style>
