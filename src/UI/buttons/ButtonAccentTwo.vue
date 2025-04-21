<template lang="">
  <button
    class="rounded-full px-6 py-2 text-lg text-accent-1 border-2 border-solid border-accent-1 duration-200 hover:scale-105"
  >
    {{ text }}
  </button>
</template>
<script lang="ts">
export default {
  name: "ButtonAccentTwo",
  props: {
    text: String,
  },
};
</script>
<style lang=""></style>
