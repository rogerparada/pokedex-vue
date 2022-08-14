import Vue from "vue";
import VueRouter from "vue-router";
import HomePokedex from "../components/HomePokedex";
import PokedexList from "../components/PokedexList";
import PokemonInfo from "../components/PokemonInfo";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
