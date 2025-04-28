<template>
  <button class="flex flex-row items-center justify-center gap-5 px-5 py-2 rounded-lg border-2 border-solid border-main-2 duration-300 hover:scale-105">
    
    <div v-if="icon" class="size-8">
      <img class="w-full h-auto" :src="icon" alt="">
    </div>
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "ButtonInput",
  props: {
    text: { type: String, required: true },
    icon: { type: String, required: false },
  },
};
</script>
<style></style>
