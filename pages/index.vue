<template>
	<div id="main">
		<div class="image-container">
			<div
				class="image-box"
				v-for="(feed, index) in feeds"
				:key="index"
				:style="height_variable_gen"
				@click="$router.push(`/album/${feed.id}`)"
			>
				<img :src="feed.image_url" />
			</div>
		</div>
	</div>
</template>
  
  <script>
export default {
	data() {
		return {
			feeds: [],
			dynamic_height: "0px",
		};
	},
	created() {
		window.addEventListener("resize", this.handle_resize)
		this.init()
		this.get_feeds_and_pick()
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.handle_resize)
	},
	computed: {
		height_variable_gen() {
			return { "--height-variable": `${this.dynamic_height}px` } // 데이터 -> CSS 변수 생성
		},
	},
	methods: {
		init() {
			this.dynamic_height = window.innerWidth / 4 // 동적 height 데이터 설정
		},
		handle_resize() {
			this.dynamic_height = window.innerWidth / 4 // 동적 height 데이터 설정
		},
		async get_feeds_and_pick() {
			try {
				console.log("list call")
				const response = await this.$axios.get("/free/list")
				this.feeds = response.data.data
			} catch (err) {
				console.log(err)
			}
		},
	},
}
</script>
  
<style lang="scss" scoped>
#main {
	margin-top: 30px;
	.image-container {
		/* border: 2px solid red; */
		display: flex;
		flex-wrap: wrap;
		.image-box {
			/* border: 1px solid green; */
			width: calc(100% / 4);
			height: var(--height-variable);
			img {
				border: 1px solid black;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
}
</style>
  