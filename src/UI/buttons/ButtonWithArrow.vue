<script setup lang="ts">
import SliderArrow from "@/assets/icons/ArrowSlider_Icon.svg";
</script>
<template>
  <button
    :class="[
      'h-100 xl:px-10 xl:w-auto w-full flex items-center justify-center duration-200 group hover:bg-white/20',
      reverse ? 'rotate-180' : '',
    ]"
  >
    <img
      class="size-4 duration-200 group-hover:scale-120"
      :src="SliderArrow"
      alt=""
    />
  </button>
</template>
<script lang="ts">
export default {
  name: "ButtonWithArrow",
  props: {
    reverse: { type: Boolean, required: true, default: "false" },
  },
};
</script>
<style></style>
