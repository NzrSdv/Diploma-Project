<template>
  <button
    class="px-5 py-2 rounded-lg border-2 border-solid border-main-2"
    
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "ButtonInput",
  props: {
    text: { type: String, required: true },
  },
};
</script>
<style></style>
