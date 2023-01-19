<template>
	<div id="main">
		<div class="com_contain" v-if="!$store.state.is_login">
            <div class="login_box">
                <div class="logo">
                	<h1>ALBUM.BIRD89</h1>
                </div>
            </div>
        </div>
		<div class="image-container" v-if="$store.state.is_login">
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
		<div class="wrapper" v-if="$store.state.is_login">
			<div class="upload-button">
				<label for="input-file">
					<img src="~assets/img/plus-slim-black.svg" alt="">
				</label>
				<input 
					id="input-file" 
					type="file" 
					style="display: none;"
					accept=".png, .gif, .jpg, .jpeg"
					@change="upload_file"
				>
			</div>
		</div>
		<UploadModal 
			v-if="upload_modal_status"
			:file="file"
			:url="url"
			@close="upload_modal_status = false"
			@complete="complete"
		/>
	</div>
</template>
  
<script>
export default {
	data() {
		return {
			feeds: [],
			dynamic_height: 0,
			upload_modal_status: true,
			file: null,
			url: null
		};
	},
	created() {
		window.addEventListener("resize", this.handle_resize)
		this.init()
		if(this.$store.state.is_login) {
			this.get_feeds_and_pick()
		}
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
		complete() {
			this.upload_modal_status = false
			this.get_feeds_and_pick()
		},
		upload_file(e) {
			this.file = e.target.files[0]
			this.url = URL.createObjectURL(e.target.files[0])
			this.upload_modal_status = true
		},
		init() {
			this.dynamic_height = window.innerWidth / 4 // 동적 height 데이터 설정
		},
		handle_resize() {
			this.dynamic_height = window.innerWidth / 4 // 동적 height 데이터 설정
		},
		async get_feeds_and_pick() {
			try {
				console.log("list call")
				const response = await this.$axios.get("/feed/list")
				this.feeds = response.data.data
			} catch (err) {
				console.log(err)
			}
		},
		on_upload() {
			console.log('upload click')
		},

		// module
		common_modal(title, type = 'alert', func = null){
            this.$nuxt.$emit('popup', { state: true, title, type, func })
		},
	},
}
</script>
  
<style lang="scss" scoped>
#main {
	margin-top: $header_height;
	position: relative;
	
	.com_contain{
        max-width: 600px;
        height: calc(100vh - 40px); // 헤더 제외
        display: flex;
        align-items: center;
        .login_box{
            display: flex;
            flex-direction: column;
            width: 100%;
            .logo{
                text-align: center;
                margin-bottom: 10px;
            }
		}
	}

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

	.wrapper {
		/* border: 10px solid black; */
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		pointer-events: none; 
		display: flex;
        align-items: center;
		.upload-button {
			border: 1px solid black;
			position: absolute;
			right: 10px;
			top: 50px;
			width: 45px;
			height: 45px;
			background-color: white;
			pointer-events: auto;
			cursor: pointer;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.upload-modal {
			border: 1px solid black;
			position: absolute;
			background-color: white;
			right: 50%;
			top: 50%;
			height: calc(100vh - 40px);
			width: calc(100vw - 20px);
			transform: translate(50%, -50%)
		}
	}
}
</style>
  