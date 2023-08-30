<template>
  <div id="note_modal">
    <div class="modal_box">
      <div class="top">
        <div class="left">NOTE - {{ note.date }}</div>
        <div class="right" @click="$emit('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <line
              x1="6"
              y1="6"
              x2="22"
              y2="22"
              stroke="black"
              stroke-width="1"
            />
            <line
              x1="6"
              y1="22"
              x2="22"
              y2="6"
              stroke="black"
              stroke-width="1"
            />
          </svg>
        </div>
      </div>
      <div class="middle">
        <div class="note_title">
          <div>{{ note.title_korean }}</div>
        </div>
        <div class="note_title">
          <div>{{ note.title_japanese }}</div>
        </div>
        <div class="note_content">
          <div v-html="note.content_korean"></div>
        </div>
        <div class="note_content">
          <div v-html="note.content_japanese"></div>
        </div>
      </div>
      <div class="bottom">
        <button @click="$emit('close')">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: Object,
  },
  data() {
    return {
      date: this.$moment().format("YYYY-MM-DD"),
      comment: "",
      image: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#note_modal {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; // 모달

  .modal_box {
    border-radius: 10px;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 2000;
    border: 1px solid black;
    background: #fff;
    width: 90vw;
    max-width: 860px;
    height: 85vh;
    padding: 10px;
    overflow: scroll;
    background: #dddddd;

    .top {
      /* border: 1px solid black; */
      height: $header_height;
      line-height: $header_height;
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      .left {
        /* border: 1px solid red; */
      }
      .right {
        /* border: 1px solid blue; */
        height: $header_height;
        cursor: pointer;
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        img {
          height: 100%;
        }
      }
    }

    .middle {
      /* border: 1px solid black; */
      /* padding: 10px; */

      .note_title {
        border: 1px solid black;
        margin-top: 10px;
        padding: 10px;
        border-radius: 10px;
        background: white;
      }

      .note_content {
        border: 1px solid black;
        margin-top: 10px;
        padding: 10px;
        border-radius: 10px;
        background: white;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      button {
        border: 1px solid $color_admin_background;
        width: 100%;
        height: 44px;
        border-radius: 5px;
        background: $color_green;
        color: $color_white;
      }
    }
  }
}
</style>
