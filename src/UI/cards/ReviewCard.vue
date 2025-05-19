<script setup lang="ts"></script>
<template>
  <div
    class="w-2xl md:px-11 px-5 py-12 bg-main-025 font-main flex flex-col items-start justify-center gap-11"
  >
    <p class="sm:text-base text-sm">{{ review.review }}</p>
    <h5 class="font-semibold sm:text-base md:text-sm text-xs">{{ review.author }}</h5>
  </div>
</template>
<script lang="ts">
export default {
  name: "ReviewCard",
  props: {
    review: { type: Object, required: true },
  },
};
</script>
<style></style>
