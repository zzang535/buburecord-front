<template>
  <div class="open_button" @click="onClickButton">
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
</style>