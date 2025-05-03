<template lang="">
  <button
    :class="[
      ' p-2 bg-accent-15 text-main-2 text-lg border-2 border-solid border-transparent duration-200 hover:scale-105',
      padding ? padding : '',
      radius ? radius : 'rounded-xl'
    ]"
  >
    {{ text }}
  </button>
</template>
<script lang="ts">
export default {
  name: "ButtonAccentOne",
  props: {
    text: { type: String, required: true },
    padding: { type: String, required: false },
    radius: { type: String, required: false },
  },
};
</script>
