<template>
  <div class="close-button" @click="$emit('onClickButton')">
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
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.close-button {
  /* border: 1px solid blue; */
  height: $header_height;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  cursor: pointer;
}
</style>