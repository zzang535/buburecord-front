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

        <EditButton @onClickButton="onClickEdit(health)" />

        <div class="note_content_item">
          <div class="note_content_item_label">KOREAN</div>
          <div class="note_content_item_content" v-html="health.content"></div>
        </div>
        <div class="note_content_item">
          <div class="note_content_item_label">JAPANESE</div>
          <div class="note_content_item_content" v-html="health.content2"></div>
        </div>
      </div>
    </div>

    <div class="wrapper">
      <UploadButton @onClickButton="onClickUpload()" />
      <ListOpenButton @onClickButton="onClickListOpen()" />
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
    onClickUpload() {
      this.healthUploadModalStatus = true
    },
    onClickEdit(health) {
      this.healthModalType = "UPDATE";
      this.healthUploadModalStatus = true;
      this.targetHealth = health;
    },
    onClickListOpen() {
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
      display: grid;

      grid-template-columns: 1fr;
      row-gap: 16px;

      @include tablet {
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
      }

      .note_content_item {
        .note_content_item_label {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          padding: 16px;
          margin-bottom: 10px;
        }
        .note_content_item_content {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          padding: 16px;
        }
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
