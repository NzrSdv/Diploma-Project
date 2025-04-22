<script setup lang="ts">
import RedWhine from "../../assets/img/RedWine_photo.png";
import WhiteWine from "../../assets/img/WhiteWine_photo.png";
</script>

<template>
  <div class="relative pt-40 w-80">
    <div class="w-15 h-64 absolute top-0 left-[50%] -translate-x-[50%] z-10">
      <img v-if="info.wineColor == 'red'" :src="RedWhine" alt="" />
      <img v-if="info.wineColor == 'white'" :src="WhiteWine" alt="" />
    </div>
    <div
      :class="[
        'relative w-full h-45 rounded-4xl flex flex-col items-center justify-center gap-7 font-main z-20',
        info.wineColor == 'white'
          ? 'bg-accent-2 text-accent-15'
          : 'bg-accent-1 text-main-2',
      ]"
    >
      <div class="flex flex-col items-center justify-center gap">
        <h4 class="font-semibold text-3xl">{{ info.wineName }}</h4>
        <p class="opacity-60 text-lg">{{ info.winePlace }}</p>
      </div>
      <div
        :class="[
          'border-[2px] border-solid rounded-lg px-5 py-1 text-xl cursor-pointer duration-200 hover:scale-110',
          info?.wineColor == 'white' ? 'border-accent-15' : ' border-main-2',
        ]"
      >
        {{ info?.winePrice }}$
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "WineCard",
  props: {
    info: { type: Object, required: true },
  },
};
</script>
<style lang=""></style>
