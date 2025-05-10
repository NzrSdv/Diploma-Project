<script setup lang="ts">
import WineCard from "../../UI/cards/WineCard.vue";
</script>
<template>
  <section
    class="2xl:container w-full overflow-hidden  flex flex-col items-center justify-center gap-20 md:px-30 px-5"
  >
    <div class="flex flex-col w-full gap-5">
      <h2 class="text-4xl font-main font-semibold">Наш ассортимент</h2>
      <div class="h-[1px] w-full bg-accent-2"></div>
    </div>
    <div class="container flex flex-row items-center justify-between gap-4 overflow-x-scroll snap-x pb-4 snap-mandatory [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <WineCard class="snap-end" v-for="(item, index) in wineCards" :key="index" :info="item" />
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
          id: 1,
          type: "white",
          wine: "Красное вино",
          location: "Франция, Прованс",
          price: 200,
          rating: {
            average: "4.2",
          },
        },
        {
          id: 2,
          type: "red",
          wine: "Красное вино",
          location: "Франция, Прованс",
          price: 200,
          rating: {
            average: "4.7",
          },
        },
        {
          id: 3,
          type: "white",
          wine: "Красное вино",
          location: "Франция, Прованс",
          price: 200,
          rating: {
            average: "4.2",
          },
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
