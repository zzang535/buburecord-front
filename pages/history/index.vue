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

      <div class="wrapper">
        <UploadButton @onClickButton="onClickUpload()" />
      </div>

      <HistoryUploadModal
        v-if="historyUploadModalStatus"
        @close="historyUploadModalStatus = false"
        @complete="onHistoryUploaded"
      />
  </div>
  </template>

  
  
  <script>    

import EditButton from '~/components/ui/EditButton.vue';
import UploadButton from '~/components/ui/UploadButton.vue';
import ListOpenButton from '~/components/ui/ListOpenButton.vue';


  export default {
    components: {
      EditButton,
      UploadButton,
      ListOpenButton
    },
    data() {
      return{
        historyList: [],
        historyUploadModalStatus: false,
      }
    },
    created() {
      this.getHistoryList()
    },
    methods: {
      onHistoryUploaded() {
        this.historyUploadModalStatus = false;
        this.getHistoryList();
      },
      onClickUpload() {
        this.historyUploadModalStatus = true
      },
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

    .wrapper {
      /* border: 1px solid red; */
      z-index: 2000;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
  
      .upload-modal {
        border: 1px solid black;
        position: absolute;
        background-color: white;
        right: 50%;
        top: 50%;
        height: calc(100vh - 40px);
        width: calc(100vw - 20px);
        transform: translate(50%, -50%);
      }
    }
  }
  </style>
  