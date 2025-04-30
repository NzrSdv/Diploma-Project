<template lang="">
  <button
    class="rounded-xl p-2 text-lg border-2 border-solid border-accent-15 duration-200 hover:scale-105 text-accent-15"
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
