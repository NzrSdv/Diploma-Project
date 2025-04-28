<template lang="">
  <button
    :class="['rounded-full px-6 py-2 text-lg  border-2 border-solid border-accent-1 duration-200 hover:scale-105', textColor]"
  >
    {{ text }}
  </button>
</template>
<script lang="ts">
export default {
  name: "ButtonAccentTwo",
  props: {
    text: String,
    textColor:{
      type: String,
      default: "text-accent-1",
    }
  },
};
</script>
<style lang=""></style>
