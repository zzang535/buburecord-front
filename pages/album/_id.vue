<template>
    <div id="album-detail">
        <div class="left-button" @click="text_box_status=true">
            <img src="~assets/img/arrow-left-slim-black.svg" alt="">
        </div>
        <div class="text-box" v-if="text_box_status">
            <div class="top">
                <div class="date">{{ feed.date }}</div>
                <div class="right-button" @click="text_box_status=false">
                    <img src="~assets/img/arrow-right-slim-black.svg" alt="">
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
                <div>{{ feed.comment }}</div>
            </div>
        </div>
        <div class="screen-box">
            <img 
                :src="feed.image_url" 
                :class="{ 
                    'width-100-percent': image_ratio >= screen_ratio, // 이미지가 스크린보다 넓으면 screen width 에 맞춤
                    'height-100-percent': image_ratio < screen_ratio // 이미지가 스크린보다 좁으면 screen height 에 맞춤
                }"
            />
            
        </div>
    </div>
</template>

<script>
export default {
    asyncData({ params }){ return { id: params.id } },
    data(){
        return{
            feed: {},
            screen_width: null,
            screen_height: null,
            screen_ratio: null,
            image_width: null,
            image_height: null,
            image_ratio: null,
            text_box_status: false,
        }
    },
    created(){
        window.addEventListener("resize", this.handle_resize)
        this.init()
    },
    beforeDestroy() {
		window.removeEventListener("resize", this.handle_resize)
	},
    methods: {
        async init() {
            this.screen_width = window.innerWidth
            this.screen_height = window.innerHeight
            this.screen_ratio = window.innerWidth / ( window.innerHeight - 40 )
            try {
                await this.get_item()
            } catch (err) {
                console.log(err)
            }
            const img = new Image()
            img.src = this.feed.image_url
            this.image_width = img.width
            this.image_height = img.height
            this.image_ratio = img.width / img.height
		},
		handle_resize() {
            this.screen_width = window.innerWidth
            this.screen_height = window.innerHeight
            this.screen_ratio = window.innerWidth / ( window.innerHeight - 40 )
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
    position: relative;
    .screen-box {
        background-color: black;
        margin-top: $header_height; // 헤더 영역
        width: 100vw;
        height: calc(100vh - 40px); // 헤더, 하단바 제외
        text-align: center;
        line-height: calc(100vh - 40px); // 세로 중앙정렬
        img {
            border: 1px solid black;
            vertical-align: middle; // 세로 중앙정렬
            margin-bottom: 3px; // inline 이미지 공백 제거
        }
      
    }
    .left-button {
        cursor: pointer;
        border: 1px solid black;
        position: absolute;
        right: 0;
        top: 40px;
        background-color: white;
        width: 40px;
        height: 40px;
        img {
            width: 100%;
        }
    }

    .text-box {
        border: 1px solid black;
        position: absolute;
        right: 0;
        top: 40px;
        background-color: white;
        width: 100%;
        /* height: 40px; */
        padding-left: 10px;
        padding-right: 10px;
        .top {
            display: flex;
            justify-content: space-between;
            .date {
                line-height: 40px;
            }
            .right-button {
                cursor: pointer;
                width: 40px;
                height: 40px;
                img {
                    height: 100%;
                }
            }
            
        }
        .line {
            border-bottom: 1px solid black;
        }
        .bottom {
            /* border: 1px solid black; */
            height: 40px;
            line-height: 40px;
        }
    }
   
    .height-100-percent {
        height: 100%;
    }
    .width-100-percent {
        width: 100%;
    }
}
</style>
