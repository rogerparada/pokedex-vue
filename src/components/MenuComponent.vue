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
							<router-link class="nav-link active" aria-current="page" to="/"
								>Home</router-link
							>
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
									<router-link class="dropdown-item" :to="`/pokedex/${gen.id}`">
										{{ `${gen.id}. ${gen.name}` }}
									</router-link>
								</li>

								<li><hr class="dropdown-divider" /></li>
								<li>
									<router-link class="dropdown-item" to="/"
										>All Pokemons</router-link
									>
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
	name: 'SidebarComponent',
	data() {
		return {
			generations: Global.Generations,
		};
	},
};
</script>

<style></style>
