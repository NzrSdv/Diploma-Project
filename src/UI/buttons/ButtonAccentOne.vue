<template lang="">
  <button
    class="rounded-full px-6 py-2 bg-accent-1 text-main-2 text-lg  border-2 border-solid border-transparent duration-200 hover:bg-transparent hover:text-accent-1 hover:border-accent-1 hover:scale-105 "
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
