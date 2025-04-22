<script setup lang="ts">
import WineCard from "../../UI/cards/WineCard.vue";
</script>
<template>
  <section
    class="w-full h-160 flex flex-col items-center justify-center gap-20"
  >
    <div class="flex flex-col w-full">
      <h2 class="">Наш ассортимент</h2>
      <div class="h-[1px] w-full bg-main-2"></div>
    </div>
    <div class="flex flex-row items-center justify-center gap-21">
      <WineCard v-for="(item, index) in wineCards" :key="index" :info="item" />
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "SecondSectionComponent",
  components: { WineCard },
  data() {
    return {
      wineCards: [
        {
          wineColor: "red",
          wineName: "Красное вино",
          winePlace: "Франция, Прованс",
          winePrice: 200,
        },
        {
          wineColor: "white",
          wineName: "Красное вино",
          winePlace: "Франция, Прованс",
          winePrice: 200,
        },
        {
          wineColor: "red",
          wineName: "Красное вино",
          winePlace: "Франция, Прованс",
          winePrice: 200,
        }
      ],
    };
  },
};
</script>
