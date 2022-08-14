<template>
	<nav class="tw-pt-3 tw-px-0 tw-pb-0 tw-flex tw-justify-center">
		<ul class="pagination tw-text-sm tw-font-thin" v-if="numPages <= 8">
			<li class="page-item" v-if="prev">
				<router-link
					:to="`${baseUrl}/${page - 1}?items=${displayItems}`"
					class="page-link link-danger"
					><span>&laquo;</span></router-link
				>
			</li>
			<li class="page-item" v-for="n in numPages" :key="n">
				<router-link
					:to="`${baseUrl}/${n}?items=${displayItems}`"
					class="page-link link-secondary"
				>
					{{ n }}
				</router-link>
			</li>

			<li class="page-item" v-if="next">
				<router-link
					:to="`${baseUrl}/${page ? page + 1 : 2}?items=${displayItems}`"
					class="page-link link-danger"
				>
					<span>&raquo;</span>
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'PaginationControl',
	data() {
		return {
			page: 1,
		};
	},
	computed: {
		numPages() {
			return Math.ceil(this.totalItems / this.displayItems);
		},
		prev() {
			if (this.page != null) {
				if (this.page == 1) {
					return false;
				} else return true;
			}
			return false;
		},
		next() {
			if (this.page != null) {
				if (this.page == this.numPages) {
					return false;
				} else return true;
			}
			return true;
		},
	},
	props: {
		totalItems: {
			type: Number,
			default: 0,
		},
		displayItems: {
			type: Number,
			default: 1,
		},
		baseUrl: {
			type: String,
			default: '',
		},
	},
	created() {
		this.page = Number(this.$route.params.page);
	},
	updated() {
		this.page = Number(this.$route.params.page);
	},
	watch: {
		page(newValue) {
			if (newValue > this.numPages) {
				this.$router.push(this.baseUrl);
			}
		},
	},
};
</script>

<style></style>
