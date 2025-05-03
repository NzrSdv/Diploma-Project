<script setup lang="ts">
import WineCard from "../../UI/cards/WineCard.vue";
</script>
<template>
  <section
    class="container flex flex-col items-center justify-center gap-20 px-30"
  >
    <div class="flex flex-col w-full gap-5">
      <h2 class="text-4xl font-main font-semibold">Наш ассортимент</h2>
      <div class="h-[1px] w-full bg-main-2"></div>
    </div>
    <div
      class="container flex flex-row items-center justify-between"
    >
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
          type: "white",
          wine: "Красное вино",
          location: "Франция, Прованс",
          price: 200,
          rating:{
            average:"4.2"
          }
        },
        {
          type: "red",
          wine: "Красное вино",
          location: "Франция, Прованс",
          price: 200,
          rating:{
            average:"4.7"
          }
        },
        {
          type: "white",
          wine: "Красное вино",
          location: "Франция, Прованс",
          price: 200,
          rating:{
            average:"4.2"
          }
        },
        // {
        //   type: "red",
        //   wine: "Красное вино",
        //   location: "Франция, Прованс",
        //   price: 200,
        //   rating:{
        //     average:"4.2"
        //   }
        // },
      ],
    };
  },
};
</script>
