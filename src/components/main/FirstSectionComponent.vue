<script setup lang="ts">
import Wines_bg from "../../assets/img/Wines_1_photo.jpg";
</script>

<template>
  <section
    :style="[`background-image:url(${Wines_bg})`]"
    class="container w-full h-220 bg-cover bg-bottom"
  >
    <div class="w-full h-full flex items-center justify-center bg-linear-to-l from-black/10 to-black/60">
      <div class="max-w-3xl h-full flex flex-col items-center justify-start gap-3 text-center pt-32">
        <h1 class=" text-main font-bold text-8xl">
          Порадуйте себя и гостей
        </h1>
        <p class="max-w-3xl text-xl flex flex-col">
          <span class="font-semibold text-2xl">Твое идеальное вино — на расстоянии одного клика.</span>
           Красное, белое,
          розовое — у нас есть то, что нужно именно вам. Легкий заказ, быстрая
          доставка и только проверенные винодельни. Откройте бутылку счастья уже
          сегодня!
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
