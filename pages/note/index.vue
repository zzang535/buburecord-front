<template>
  <div id="note">
    <div class="note_box" v-for="(note, index) in notes" :key="index">
      <div @click="onNote(note)">
        <div>{{ note.date }}</div>
        <div>{{ note.title_korean }}</div>
        <div>{{ note.title_japanese }}</div>
      </div>
    </div>

    <div class="wrapper">
      <div class="upload-button" @click="noteUploadModalStatus = true">
        <label for="input-file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <line
              x1="14"
              y1="3"
              x2="14"
              y2="25"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="3"
              y1="14"
              x2="25"
              y2="14"
              stroke="black"
              stroke-width="1"
            />
          </svg>
        </label>
      </div>
    </div>

    <NoteUploadModal
      v-if="noteUploadModalStatus"
      @close="noteUploadModalStatus = false"
      @complete="onNoteUploaded"
    />

    <NoteModal
      v-if="noteModalStatus"
      @close="noteModalStatus = false"
      :note="note"
    />
  </div>
</template>

<script>

export default {
  data() {
    return {
      noteUploadModalStatus: false,
      notes: [],
      noteModalStatus: false,
      note: {},
    };
  },
  created() {
    this.getNoteList();
  },
  methods: {
    async getNoteList() {
      try {
        const response = await this.$axios.get("/note/list");
        this.notes = response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    onNote(note) {
      this.note = note;
      this.noteModalStatus = true;
    },
    onNoteUploaded() {
      this.noteUploadModalStatus = false;
      this.getNoteList();
    },
  },
};
</script>

<style lang="scss" scoped>
#note {
  padding-top: 40px;
  padding-bottom: 60px;
  background-color: #eeeeee;
  position: relative;

  .note_box {
    border: 1px solid black;
    margin: 16px;
    padding: 16px;
    background-color: white;
    cursor: pointer;
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

    .upload-button {
      border: 1px solid black;
      border-radius: 5px;
      position: absolute;
      right: 5px;
      top: 5px;
      width: 30px;
      height: 30px;
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
