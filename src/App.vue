<template>
	<div id="app" class="tw-bg-white">
		<MenuComponent />
		<hr class="tw-m-0" />
		<section class="tw-bg-white">
			<router-view :key="$route.path" />
		</section>
		<FooterComponent />
	</div>
</template>
<script>
import MenuComponent from '@/components/MenuComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
	name: 'App',
	components: {
		MenuComponent,
		FooterComponent,
	},
};
</script>
<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/
</style>
