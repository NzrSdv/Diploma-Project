<script setup lang="ts">
</script>
<template>
  <div class="w-1/2 px-11 py-12 bg-main-025 font-main flex flex-col items-start justify-center gap-11">
    <p class="sm:text-base text-sm">{{ review.review }}</p>
    <h5 class="font-semibold sm:text-base text-sm">{{ review.author }}</h5>

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
