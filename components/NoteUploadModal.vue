<template>
  <div class="NoteUploadModal">
    <div class="modal-box">
      <div class="top">
        <div class="left">UPLOAD NOTE</div>
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
      <div class="input-date">
        <input type="date" v-model="date" />
      </div>
      <div class="input-text">
        <input type="text" v-model="titleKR" placeholder="TITLE (KOREAN)" />
      </div>
      <div class="input-text">
        <input type="text" v-model="titleJP" placeholder="TITLE (JAPANESE)" />
      </div>
      <div class="input_editor">
        <ckeditor-nuxt v-model="contentKR" :config="editorConfig" />
      </div>
      <div class="input_editor">
        <ckeditor-nuxt v-model="contentJP" :config="editorConfig" />
      </div>
      <div class="button_box">
        <button @click="uploadNote">업로드</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      date: this.$moment().format("YYYY-MM-DD"),
      titleKR: "",
      titleJP: "",
      contentKR: "",
      contentJP: "",

      editorConfig: {
        simpleUpload: {
          uploadUrl: "path_to_image_controller",
          headers: {
            Authorization: "optional_token",
          },
        },
        removePlugins: [
          "Title",
          "Stylescombo",
          "TableToolbar",
          "RemoveFormat",
          "Strikethrough",
          "Highlight",
          "Code",
          "CodeBlock",
          "Superscript",
          "Subscript",
          "BlockQuote",
          "MathType",
          "TodoList",
          "Table",
          "Heading",
          "ImageInsert",
          "PageBreak",
          "List",
        ],
      },
    };
  },
  created() {},
  methods: {
    async uploadNote() {
      if (!this.date) {
        this.common_modal("날짜를 입력해주세요.");
        return;
      }
      if (!this.titleKR) {
        this.common_modal("제목을 입력해주세요.");
        return;
      }
      if (!this.titleJP) {
        this.common_modal("제목을 입력해주세요.");
        return;
      }
      if (!this.contentKR) {
        this.common_modal("내용을 입력해주세요.");
        return;
      }
      if (!this.contentJP) {
        this.common_modal("내용을 입력해주세요.");
        return;
      }
      try {
        const url = "/note/create";
        const payload = {
          date: this.date,
          titleKR: this.titleKR,
          titleJP: this.titleJP,
          contentKR: this.contentKR,
          contentJP: this.contentJP,
        };
        const result = await this.$axios.post(url, payload);
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
.NoteUploadModal {
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
      border-radius: 5px;
      background-color: #dddddd;
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
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        cursor: pointer;
      }
    }

    .input_editor {
      border: 1px solid black;
      margin-top: 10px;
      border-radius: 5px;
      height: calc((85vh - 260px) / 2);
      background-color: black;
      text-align: center;

      .ck-editor__editable {
        height: calc((85vh - 342px) / 2);
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

    .button_box {
      margin-top: 10px;
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
