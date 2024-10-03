<template>
<div  class="edit_button" @click="onClickButton">
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
</template>

<script>
  export default {
    methods: {
      onClickButton(health) {
        this.$emit('onClickButton');
      },
    }
  }
</script>

<style>
     .edit_button {
        border: 1px solid black;
        border-radius: 5px;
        position: absolute;
        width: 30px;
        height: 30px;
        right: 5px;
        top: 5px;
      }
</style>