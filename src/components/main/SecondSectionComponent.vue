<script setup lang="ts">
import WineCard from "../../UI/cards/WineCard.vue";
</script>
<template>
  <section class="w-full h-160">
    <h2 class="">Наш ассортимент</h2>
    <div class="h-[1px] w-full bg-main-2">
      <WineCard
        :info="{
          wineColor: 'red',
          wineName: 'Красное вино',
          winePlace: 'Франция, Прованс',
          winePrice: 200,
        }"
      />
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "SecondSectionComponent",
  components: { WineCard },
};
</script>
