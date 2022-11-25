<template>
  <div id="common_modal" v-if="!!modal.state">
    <div class="common_modal_contents" v-if="modal.type === 'confirm'">
      <div class="common_modal_title">{{ modal.title }}</div>
      <div class="common_modal_confirm_double">
        <button
          class="mainBtn2"
          @click="$emit('close')"
        >
        아니오
        </button>
        <button
        class="mainBtn1"
         @click="() => { modal.func ? modalMethod() : $emit('close') }"
        >
        {{ !!modal.alert_text || '예' }}
        </button>
      </div>
    </div>
    <div class="common_modal_contents" v-else>
      <div class="common_modal_title" v-html="modal.title"></div>
      <div 
        class="common_modal_confirm" 
        @click="() => { modal.func ? modalMethod() : $emit('close') }"
      >
        {{ modal.alert_text || '예' }}
      </div>
    </div>
    <div class="common_modal_dim" @click="$emit('close')"></div>
  </div>
</template>
<script>
  export default {
    props: {
      modal: Object
    },
    data() {
      return {

      }
    },
    methods: {
      modalMethod(){
        this.modal.func();
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss">
#common_modal{
  width:100%;
  height:100vh;
  background: rgba(0,0,0, 0.5);
  position:fixed;
  top:0;
  left:0;
  z-index:5000;

  .common_modal_contents{
    width:350px;
    /* height:200px; */
    background:#fff;
    border-radius:10px;
    padding:32px 16px 66px 16px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    z-index:51;

    .common_modal_title{
      width:100%;
      font-size:16px;
      color:#151515;
      /* padding-top:40px; */
      padding-bottom:32px;
      text-align:center;
      line-height:23px;
      word-break: keep-all;
    }

    .common_modal_confirm{
      width:calc(100% - 30px);
      height:45px;
      // background:#151515;
      background: $main_color;
      
      color:#fff;
      line-height:45px;
      text-align:center;
      /* font-size:18px; */
      border-radius:5px;
      cursor:pointer;
      position:absolute;
      left:16px;
      bottom:16px;
    }

    .common_modal_confirm_double{
      width:calc(100% - 32px);
      height:45px;
      display: flex;
      justify-content: space-between;
      position:absolute;
      left:16px;
      bottom:16px;
      button{
        width: calc((100% - 16px) / 2);
      }
      div{
        width:calc(50% - 4px);
        height:45px;
        text-align:center;
        line-height:45px;
        cursor:pointer;
        border-radius:5px;
        background: #151515;

        &:first-child{
          background: #151515;
          color:#fff;
          border:none;
        }
      }
      .mainBtn2,.mainBtn1{
        padding: 0;
      }
    }
  }

  .common_modal_dim{
    width:100%;
    height:100vh;
  }
}
</style>
