<template>
	<div class="tw-flex-wrap tw-justify-center">
		<nav class="tw-pt-3 tw-px-0 tw-pb-0">
			<ul class="pagination tw-text-xs tw-font-thin" v-if="numPages <= 8">
				<li class="page-item" v-if="prev">
					<router-link
						:to="`${baseUrl}/${page - 1}?items=${displayItems}`"
						class="page-link link-danger tw-w-9 tw-text-xs md:tw-text-sm md:tw-w-10"
						><span>&laquo;</span></router-link
					>
				</li>
				<li class="page-item" v-for="n in numPages" :key="n">
					<router-link
						:to="`${baseUrl}/${n}?items=${displayItems}`"
						class="page-link link-secondary tw-font-thin tw-text-xs md:tw-text-sm md:tw-w-10"
					>
						{{ n }}
					</router-link>
				</li>

				<li class="page-item" v-if="next">
					<router-link
						:to="`${baseUrl}/${page ? page + 1 : 2}?items=${displayItems}`"
						class="page-link link-danger tw-w-9 tw-text-xs md:tw-text-sm md:tw-w-10"
					>
						<span>&raquo;</span>
					</router-link>
				</li>
			</ul>
			<ul class="pagination md:tw-text-sm tw-font-thin" v-else>
				<li class="page-item" v-if="prev">
					<router-link
						:to="`${baseUrl}/${page - 1}?items=${displayItems}`"
						class="page-link link-danger tw-w-9 tw-text-xs md:tw-text-sm md:tw-w-10"
						><span>&laquo;</span></router-link
					>
				</li>

				<li class="page-item tw-text-xs" v-for="n in pages" :key="n">
					<router-link
						:to="`${baseUrl}/${n}?items=${displayItems}`"
						class="page-link link-secondary tw-font-thin tw-text-xs md:tw-text-sm md:tw-w-10"
					>
						{{ n }}
					</router-link>
				</li>

				<li class="page-item" v-if="next">
					<router-link
						:to="`${baseUrl}/${page + 1}?items=${displayItems}`"
						class="page-link link-danger tw-text-xs md:tw-text-sm md:tw-w-10"
					>
						<span>&raquo;</span>
					</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'PaginationControl',
	data() {
		return {
			page: 1,
			pages: [],
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
	methods: {
		generatePages() {
			let arr = [];
			let d = this.numPages - this.page;

			if (this.page < 6) {
				for (let i = 1; i < 8; i++) {
					arr.push(i);
				}
			} else if (d > 3) {
				for (let i = 3; i > 0; i--) {
					arr.push(this.page - i);
				}
				for (let i = 0; i < 4; i++) {
					arr.push(i + this.page);
				}
			} else {
				for (let i = 6; i >= 0; i--) {
					arr.push(this.numPages - i);
				}
			}

			this.pages = arr;
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
		this.generatePages();
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
