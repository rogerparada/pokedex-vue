<template>
	<div
		id="pokemonType"
		:class="
			tipos ? `row row-cols-${tipos.length} text-sm` : `row row-cols-1 text-sm`
		"
	>
		<div
			class="font-semibold justify-center text-center"
			v-for="tipo in tipos"
			:key="tipo.slot"
		>
			<img :src="typeImage[tipo.type.name].icon" class="m-auto w-7" alt="" />
			<br />
			<span v-if="tipo.type.transl"> {{ tipo.type.transl }} </span>
			<span v-else>{{ tipo.type.name }}</span>
		</div>
	</div>
</template>
<script>
export default {
	name: 'IconType',
	data() {
		return {
			tipos: [],
		};
	},
	props: {
		types: Array,
		lang: String,
	},
	methods: {
		async getNewType(tipo) {
			if (tipo) {
				try {
					const response = await fetch(tipo.type.url);
					const data = await response.json();
					const p = {
						slot: tipo.slot,
						type: {
							name: data.name,
							transl: data.names.find((item) => item.language.name === 'es')
								.name,
						},
					};
					return p;
				} catch (error) {
					console.log(`Error al traducir ${error}`);
				}
			}
		},
	},
	created() {
		this.tipos = this.types;
	},
	watch: {
		types() {
			this.tipos = [];

			this.types.forEach(async (item) => {
				if (this.lang === 'es') {
					const tipo = await this.getNewType(item);
					this.tipos.push(tipo);
				} else this.tipos.push(item);
			});
		},
	},
};
</script>
