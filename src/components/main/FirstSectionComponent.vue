<script setup lang="ts">
import Wines_bg from "../../assets/img/Wines_1_photo.jpg";
</script>

<template>
  <section
    :style="[`background-image:url(${Wines_bg})`]"
    class="w-full h-160 bg-cover bg-center"
  >
    <div class="w-full h-full bg-linear-to-l from-black/10 to-black/60">
      <div class="px-31 h-full flex flex-col items-start justify-center gap-2">
        <h1 class="max-w-xl text-main font-bold text-7xl">
          Порадуйте себя и гостей
        </h1>
        <p class="max-w-2xl text-3xl">
          Здесь тщательно подобранная коллекция вин, которая украсит любое
          торжество.
        </p>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "FirstSectionComponent",
};
</script>
<style lang=""></style>
