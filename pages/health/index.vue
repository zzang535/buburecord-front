<template>
  <div id="note">
    <div class="note_box" v-for="(health, index) in healths" :key="index">
      <div @click="onHealth(health)">
        <div>{{ health.date }}</div>
        <div>{{ health.title }}</div>
      </div>
    </div>

    <div class="wrapper">
      <div class="upload-button" @click="healthUploadModalStatus = true">
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

    <HealthUploadModal
      v-if="healthUploadModalStatus"
      @close="healthUploadModalStatus = false"
      @complete="onNoteUploaded"
    />

    <HealthModal
      v-if="healthModalStatus"
      @close="healthModalStatus = false"
      :health="health"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      healthUploadModalStatus: false,
      healths: [],
      healthModalStatus: false,
      health: {},
    };
  },
  created() {
    this.getHealthList();
  },
  methods: {
    async getHealthList() {
      try {
        const response = await this.$axios.get("/health/list");
        this.healths = response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    onHealth(health) {
      this.health = health;
      this.healthModalStatus = true;
    },
    onNoteUploaded() {
      this.healthUploadModalStatus = false;
      this.getHealthList();
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
