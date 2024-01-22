import Vue from "vue";
import VueRouter from "vue-router";
import HomePokedex from "../components/HomePokedex";
import PokedexList from "../components/PokedexList";
import PokemonInfo from "../components/PokemonInfo";
import ErrorPage from "../components/ErrorPage";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomePokedex,
	},
	{
		path: "/about",
		name: "about",
		component: () => import("../views/AboutView.vue"),
	},
	{
		path: "/test",
		name: "test",
		component: () => import("../views/TestView.vue"),
	},
	{
		path: "/pokemon/:name",
		component: PokemonInfo,
	},

	{
		path: "/list/:listType?/:id?/:page?",
		component: PokedexList,
	},

	{
		path: "/all/:page?",
		component: PokedexList,
	},
	{
		path: "/error",
		name: "errorPage",
		component: ErrorPage,
	},
	{
		path: "*",
		name: "error",
		component: ErrorPage,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
