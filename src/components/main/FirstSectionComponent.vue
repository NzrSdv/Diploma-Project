<script setup lang="ts">
import Wines_bg from "../../assets/img/Wines_1_photo.jpg";
</script>

<template>
  <section
    :style="[`background-image:url(${Wines_bg})`]"
    class="2xl:container w-full md:h-220 sm:h-150 h-120 bg-cover bg-bottom"
  >
    <div
      class="w-full h-full flex items-center justify-center bg-linear-to-l from-black/10 to-black/60"
    >
      <div
        class="max-w-3xl h-full flex flex-col items-center justify-start gap-3 text-center md:pt-32 pt-16"
      >
        <h1 class="text-main font-bold md:text-8xl sm:text-6xl text-4xl">{{$t("main.section1.title")}}</h1>
        <p class="max-w-3xl md:text-xl sm:text-lg text-base flex flex-col">
          <span class="font-semibold md:text-2xl sm:text-xl text-lg"
            >{{$t("main.section1.subTitle")}}</span
          >
          {{$t("main.section1.description")}}
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
