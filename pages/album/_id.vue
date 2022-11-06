<template>
    <div id="album-detail">
        <div class="image-box">
            <img 
                :src="feed.image_url" 
                :class="{ 
                    'width-100-percent': image_width/image_height >= view_width/view_height, // 이미지가 더 넓으면 view width 에 맞춤
                    'height-100-percent': image_width/image_height < view_width/view_height // 이미지가 더 좁으면 view height 에 맞춤
                }"
            />
        </div>
        <!-- <div class="text-box">
            <div class="comment">{{ feed.comment }}</div>
            <div class="date">{{ feed.date }}</div>
        </div> -->
    </div>
</template>

<script>
export default {
    asyncData({ params }){ return { id: params.id } },
    data(){
        return{
            feed: {},
            view_width: null,
            view_height: null,
            image_width: null,
            image_height: null,
        }
    },
    created(){
        window.addEventListener("resize", this.handle_resize)
        this.init()
        this.get_item()
    },
    beforeDestroy() {
		window.removeEventListener("resize", this.handle_resize)
	},
    methods: {
        async init() {
            this.view_width = window.innerWidth
            this.view_height = window.innerHeight
            try {
                await this.get_item()
                const img = new Image()
                img.src = this.feed.image_url
                this.image_width = img.width
                this.image_height = img.height
            } catch (err) {
                console.log(err)
            }
		},
		handle_resize() {
            this.view_width = window.innerWidth
            this.view_height = window.innerHeight
		},
        async get_item() {
			try {
				const response = await this.$axios.get(`/free/item/${this.id}`)
                console.log(response)
				this.feed = response.data.data
			} catch (err) {
				console.log(err)
			}
		},
    }
}
</script>
<style lang="scss" scoped>
#album-detail {
    .image-box {
        margin-top: 30px;
        width: 100vw;
        height: calc(100vh - 30px);
        background-color: black;
        text-align: center;
        line-height: calc(100vh - 30px);
        img {
            border: 1px solid black;
            vertical-align: middle;
            margin-bottom: 3px; // inline 이미지 공백 제거
        }
    }
    .text-box {
        border: 1px solid black;
        width: 100%;
        text-align: center;
    }
    .height-100-percent {
        height: 100%;
    }
    .width-100-percent {
        width: 100%;
    }
}
</style>
