<template>
  <div id="note">
    <div class="note_box" v-for="(health, index) in healths" :key="index">
      <div
        class="note_title"
        @click="onHealth(index)"
        :class="{ open: health.open }"
      >
        <div>{{ health.date }}</div>
        <div>{{ health.title }}</div>
      </div>
      <div class="note_content" v-if="health.open">
        <div class="edit_button" @click="onClickEdit(health)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <line
              x1="14"
              y1="3"
              x2="3"
              y2="25"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="24"
              y1="3"
              x2="13"
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
        </div>
        <div v-html="health.content"></div>
      </div>
    </div>

    <div class="wrapper">
      <div class="upload-button" @click="healthUploadModalStatus = true">
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
      </div>
      <div class="open_button" @click="onClickOpen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <line x1="3" y1="5" x2="25" y2="5" stroke="black" stroke-width="1" />
          <line x1="3" y1="7" x2="25" y2="7" stroke="black" stroke-width="1" />
          <line x1="3" y1="9" x2="25" y2="9" stroke="black" stroke-width="1" />
          <line
            x1="3"
            y1="11"
            x2="25"
            y2="11"
            stroke="black"
            stroke-width="1"
          />
        </svg>
      </div>
    </div>

    <HealthUploadModal
      v-if="healthUploadModalStatus"
      :healthModalType="healthModalType"
      :targetHealth="targetHealth"
      @close="initPage"
      @complete="initPage"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      healthUploadModalStatus: false,
      healthModalType: "CREATE",
      targetHealth: {},
      healths: [],
      health: {},
      openStatus: false,
    };
  },
  created() {
    this.getHealthList();
  },
  methods: {
    onClickEdit(health) {
      console.log(health);
      this.healthModalType = "UPDATE";
      this.healthUploadModalStatus = true;
      this.targetHealth = health;
    },
    onClickOpen() {
      this.healths = this.healths.map((item) => {
        return {
          ...item,
          open: !this.openStatus,
        };
      });
      this.openStatus = !this.openStatus;
    },
    async getHealthList() {
      try {
        const response = await this.$axios.get("/health/list");
        this.healths = response.data.data.map((item) => {
          return {
            ...item,
            open: false,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
    onHealth(targetIndex) {
      this.healths = this.healths.map((item, index) => {
        if (index == targetIndex) {
          return {
            ...item,
            open: !item.open,
          };
        } else {
          return item;
        }
      });
    },
    initPage() {
      this.healthUploadModalStatus = false;
      this.targetHealth = {};
      this.healthModalType = "CREATE";
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
    margin: 16px;
    background-color: white;
    cursor: pointer;
    position: relative;
    .note_title {
      border: 1px solid black;
      padding: 16px;
    }
    .note_content {
      border: 1px solid black;
      padding: 16px;
      position: relative;
      .edit_button {
        border: 1px solid black;
        border-radius: 5px;
        position: absolute;
        width: 30px;
        height: 30px;
        right: 5px;
        top: 5px;
      }
    }
    .open {
      background-color: black;
      color: white;
    }
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
    }

    .open_button {
      border: 1px solid black;
      border-radius: 5px;
      position: absolute;
      right: 40px;
      top: 5px;
      width: 30px;
      height: 30px;
      background-color: white;
      pointer-events: auto;
      cursor: pointer;
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
