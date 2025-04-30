<template lang="">
  <button
    class="rounded-xl p-2 bg-accent-15 text-main-2 text-lg  border-2 border-solid border-transparent duration-200 hover:scale-105 "
  >
    {{ text }}
  </button>
</template>
<script lang="ts">
export default {
  name: "ButtonAccentOne",
  props: {
    text: String,
  },
};
</script>
