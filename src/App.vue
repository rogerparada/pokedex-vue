<template>
	<div id="app">
		<MenuComponent />
		<section class="md:tw-mt-5">
			<router-view :key="$route.path" />
		</section>
	</div>
</template>
<script>
import MenuComponent from '@/components/MenuComponent.vue';

export default {
	name: 'App',
	components: {
		MenuComponent,
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
