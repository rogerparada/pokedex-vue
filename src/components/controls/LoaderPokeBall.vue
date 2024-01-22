<template>
	<div id="loader" class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-h-96">
		<svg id="PokeBall" data-name="Capa 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
			<g>
				<path class="cls-3" d="m150,271.13c66.9,0,121.12-54.23,121.12-121.13H28.88c0,66.9,54.23,121.13,121.12,121.13Z" />
				<path
					class="cls-1"
					d="m184.73,157.92c-3.6,15.86-17.78,27.71-34.73,27.71s-31.13-11.84-34.73-27.71H25.26c4.09,65.34,58.37,117.08,124.74,117.08s120.66-51.74,124.74-117.08h-90.01Z"
				/>
			</g>
			<g>
				<g>
					<path class="cls-3" d="m150,28.88c-66.9,0-121.12,54.23-121.12,121.12h242.25c0-66.9-54.23-121.12-121.12-121.12Z" />
					<path
						class="cls-2"
						d="m150,114.38c16.95,0,31.13,11.84,34.73,27.71h90.01c-4.09-65.34-58.37-117.08-124.74-117.08S29.34,76.74,25.26,142.08h90.01c3.6-15.86,17.78-27.71,34.73-27.71Z"
					/>
				</g>
				<g>
					<circle class="cls-1" cx="150" cy="150" r="30.22" />
					<circle class="cls-1" cx="150" cy="150" r="21.15" />
				</g>
			</g>
		</svg>
	</div>
</template>

<script>
	export default {
		name: "LoaderPokeBall",
	};
</script>

<style>
	* {
		--size: 128px;
	}
	.cls-1 {
		fill: #fff;
	}

	.cls-1,
	.cls-2 {
		stroke: #1d1d1b;
	}

	.cls-1,
	.cls-2,
	.cls-3 {
		stroke-miterlimit: 10;
	}

	.cls-2 {
		fill: #e30613;
	}

	.cls-3 {
		fill: #1d1d1b;
		stroke: #fff;
	}

	#PokeBall {
		width: var(--size);
		height: var(--size);
		animation: spin 1.2s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
