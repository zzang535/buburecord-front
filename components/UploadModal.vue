<template>
  <div class="UploadModal">
    <div class="modal-box">
      <div class="top">
        <div class="left">UPLOAD MEMORY</div>
        <div class="right" @click="$emit('close')">
          <img src="~assets/img/close-slim-black.svg" alt="" />
        </div>
      </div>
      <div class="image-box">
        <img :src="url" />
      </div>
      <div class="input-date">
        <input type="date" v-model="date" />
      </div>
      <div class="input-text">
        <input type="text" v-model="comment" placeholder="COMMENT" />
      </div>
      <div class="buttonBox">
        <button @click="create">업로드</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: File,
    url: String,
  },
  data() {
    return {
      date: this.$moment().format("YYYY-MM-DD"),
      comment: "",
      image: "",
    };
  },
  created() {
    console.log(this.file);
  },
  methods: {
    async create() {
      if (!this.date) {
        this.common_modal("날짜를 입력해주세요.");
        return;
      }
      if (!this.comment) {
        this.common_modal("코멘트를 입력해주세요.");
        return;
      }
      try {
        const url = "/feed/create";
        const payload = new FormData();
        payload.append("comment", this.comment);
        payload.append("date", this.date);
        payload.append("image", this.file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const result = await this.$axios.post(url, payload, config);
        console.log(result);
        this.$emit("complete");
      } catch (err) {
        console.log(err);
      }
    },

    // module
    common_modal(title, type = "alert", func = null) {
      this.$nuxt.$emit("popup", { state: true, title, type, func });
    },
  },
};
</script>

<style lang="scss">
.UploadModal {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; // 모달

  .modal-box {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 2000;
    border: 1px solid black;
    border-radius: 2px;
    background: #fff;
    width: 90vw;
    max-width: 860px;
    height: 85vh;
    padding: 10px;
    border-radius: 10px;

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
        img {
          height: 100%;
        }
      }
    }

    .image-box {
      border: 1px solid black;
      border-radius: 5px;
      height: calc(85vh - 195px);
      background-color: black;
      text-align: center;
      line-height: calc(85vh - 195px); // 세로 중앙정렬
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle; // 세로 중앙정렬
        margin-bottom: 4px; // inline 이미지 공백 제거
      }
    }

    .input-date {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .input-text {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .buttonBox {
      display: flex;
      justify-content: space-between;
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
