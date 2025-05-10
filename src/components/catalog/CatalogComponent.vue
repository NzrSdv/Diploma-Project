<script setup lang="ts">
import CatalogPhoto from "../../assets/img/CatalogComponent_photo.jpg";
import WineCard from "../../UI/cards/WineCard.vue";

const wines = JSON.parse(localStorage.getItem("currentWines") || "[]");
</script>
<template>
  <section
    class="2xl:container w-full  h-130 flex flex-col items-center justify-center relative bg-center bg-cover"
    :style="{ backgroundImage: `url(${CatalogPhoto})` }"
  >
    <div
      class="h-full w-full bg-gradient-to-r to-black/10 from-black/60 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center md:px-30 px-4"
    >
      <h1
        class="w-full text-main-2 md:text-8xl text-6xl md:text-start text-center border-b border-solid border-accent-2 uppercase font-bold pb-5"
      >
        Вино
      </h1>
    </div>
  </section>
  <section class="2xl:container w-full md:px-30 px-0 flex-col flex items-center justify-center">
    <div class="">
      <select name="" id=""></select>
    </div>
    <div class="w-full h-max flex items-center justify-center flex-wrap gap-7">
      <WineCard v-for="(wine, index) in wines" :key="index" :info="wine" />
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "CatalogComponent",
  components: { WineCard },
};
</script>
<style></style>
