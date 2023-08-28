<template>
  <div id="note">
    <div
      class="history_box"
      v-for="(note, index) in notes"
      :key="index"
    >
      <div>{{ note.date }}</div>
      <div>{{ note.content_korean }}</div>
      <div>{{ note.content_japanese }}</div>
    </div>

    
    <div class="wrapper">
      <div class="upload-button" @click="noteUploadModalStatus = true">
        <label for="input-file">
          <img src="~assets/img/plus-slim-black.svg" alt="" />
        </label>
      </div>
    </div>

    <NoteUploadModal v-if="noteUploadModalStatus" @close="noteUploadModalStatus = false"/>
  </div>
  </template>
  
  <script>    
  export default{
    data() {
      return {
        noteUploadModalStatus: false,
        notes: [],
      }
    },
    created() {
      this.getNoteList()
    },
    methods: {
      async getNoteList() {
        try {
          const response = await this.$axios.get("/note/list");
          console.log(response)
          this.notes = response.data.data
        } catch (err) {
          console.log(err);
        }
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  #note {
    padding-top: 40px;
    padding-bottom: 60px;
    background-color: #eeeeee;
    position: relative;
    
    .history_box {
      border: 1px solid black;
      margin: 16px;
      padding: 16px;
      background-color: white;
      
    }

    .wrapper {
      /* border: 1px solid red; */
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      .upload-button {
        border: 1px solid black;
        border-radius: 5px;
        position: absolute;
        right: 40px;
        bottom: 40px;
        width: 60px;
        height: 60px;
        background-color: white;
        pointer-events: auto;
        cursor: pointer;
        img {
          cursor: pointer;
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
        transform: translate(50%, -50%);
      }
    }
  }
  </style>
  