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
            <img :src="feed.image_url" />
        </div>
    </div>
</template>

<script>
export default {
    asyncData({ params }){ return { id: params.id } },
    data(){
        return{
            feed: {},
            text_box_status: false,
            cloudFrontUrl: process.env.CLOUD_FRONT_URL
        }
    },
    created(){
        this.init()
    },
    beforeDestroy() {
	},
    methods: {
        async init() {
            try {
                await this.get_item()
            } catch (err) {
                console.log(err)
            }
		},
        async get_item() {
			try {
				const response = await this.$axios.get(`/open/item/${this.id}`)
                console.log(response)
                const feed = response.data.data
				this.feed = {
                    ...feed,
                    image_url: `${this.cloudFrontUrl}${feed.image_url}`
                }
			} catch (err) {
				console.log(err)
			}
		},

        // module
		cloudFrontUrlGen(image_url, width, height) {
			return `${this.cloudFrontUrl}${image_url}?w=${width}&h=${height}`
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
            max-width: 100%;
            max-height: 100%;
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
}
</style>
