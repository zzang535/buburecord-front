<template>
  <div id="history">
    <div
        class="history_box"
        v-for="(history, index) in historyList"
        :key="index"
      >
        <div>{{ history.date }}</div>
        <div>{{ history.content_korean }}</div>
        <div>{{ history.content_japanese }}</div>
      </div>
  </div>
  </template>
  
  <script>    
  export default{
    data() {
      return{
        historyList: []
      }
    },
    created() {
      this.getHistoryList()
    },
    methods: {
      async getHistoryList() {
        try {
          const response = await this.$axios.get("/history/list");
          console.log(response)
          this.historyList = response.data.data
        } catch (err) {
          console.log(err);
        }
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  #history {
    padding-top: 40px;
    padding-bottom: 60px;
    background-color: #eeeeee;
    .history_box {
      border: 1px solid black;
      margin: 16px;
      padding: 16px;
      background-color: white;
      
    }
  }
  </style>
  