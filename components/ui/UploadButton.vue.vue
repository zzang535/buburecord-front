<template>
  <div class="upload-button" @click="$emit('onClickButton')">
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
</template>

<script>
</script>

<style>
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
</style>