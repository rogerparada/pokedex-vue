<template>
	<header>
		<nav class="navbar navbar-expand-lg bg-light">
			<div class="container-fluid">
				<router-link class="brand navbar-brand" to="/">PokedexVue</router-link>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<router-link class="nav-link" to="/">Home</router-link>
						</li>
						<li class="nav-item dropdown">
							<router-link
								class="nav-link dropdown-toggle"
								to="/pokedex"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Generations
							</router-link>
							<ul class="dropdown-menu">
								<li v-for="gen in generations" :key="gen.name">
									<router-link
										class="dropdown-item tw-text-sm"
										:to="`/list/pokedex/${gen.id}`"
									>
										<span class="tw-font-bold">{{ gen.id }}. </span>
										<span class="tw-font-light">{{ gen.name }}</span>
									</router-link>
								</li>

								<li><hr class="dropdown-divider" /></li>
								<li>
									<router-link class="dropdown-item" to="/">
										<span class="tw-font-bold tw-text-sm">All Pokemons</span>
									</router-link>
								</li>
							</ul>
						</li>
						<li class="nav-item dropdown">
							<router-link
								class="nav-link dropdown-toggle"
								to="/pokedex"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Types
							</router-link>
							<ul class="dropdown-menu">
								<li v-for="ty in types" :key="ty.name">
									<router-link
										class="dropdown-item tw-text-sm"
										:to="`/list/types/${ty.name}`"
									>
										<span class="tw-font-semibold">{{ ty.id }}. </span>
										<span class="tw-font-light tw-capitalize">{{
											ty.name
										}}</span>
									</router-link>
								</li>

								<li><hr class="dropdown-divider" /></li>
								<li>
									<router-link class="dropdown-item" to="/">
										<span class="tw-font-bold tw-text-sm">All Pokemons</span>
									</router-link>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/About">About</router-link>
						</li>
					</ul>
					<form class="d-flex" role="search">
						<input
							class="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button class="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import Global from '@/Global';
export default {
	name: 'MenuComponent',
	data() {
		return {
			generations: Global.Generations,
			types: null,
		};
	},
	methods: {
		getPokemonTypes() {
			fetch(Global.Url + 'type/')
				.then((response) => response.json())
				.then((data) => {
					this.types = [];
					data.results
						.filter((f) => f.name != 'shadow' && f.name != 'unknown')
						.forEach((t, index) => {
							this.types.push({
								id: index + 1,
								name: t.name,
							});
						});
				});
		},
	},
	created() {
		this.getPokemonTypes();
	},
};
</script>

<style></style>
