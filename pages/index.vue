<template>
  <div id="main">
      <div class="com_contain">
        <h1>랜딩 페이지입니다.</h1>
        <div v-for="(feed, index) in feeds" :key="index">
          <img :src="feed.image_url" />
        </div>
      </div>
  </div>
  </template>
  
  <script>    
  export default{
    data() {
      return{
           feeds: []
      }
    },
    created() {
        this.get_feeds_and_pick()
    },
    methods: {
        async get_feeds_and_pick() {
            try {
                console.log('list call')
                const response = await this.$axios.get('/free/list')
                this.feeds = response.data.feeds
            } catch (err) {
                console.log(err)
            }
        },
    },
   
  }
  </script>
  
  <style lang="scss" scoped>
  #main {
    img {
      width: 400px;
    }
  }
  </style>
  