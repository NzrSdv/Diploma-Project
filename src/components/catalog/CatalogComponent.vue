<script setup lang="ts">
import CatalogPhoto from "../../assets/img/CatalogComponent_photo.jpg";
import WineCard from "../../UI/cards/WineCard.vue";
import { useStore } from "vuex";

import { computed } from "vue";
const store = useStore();

const wines = computed(() => store.state.redWines);
</script>
<template>
  <main class="flex flex-col items-center jusitfy-center font-main gap-30">
    <section
      class="container h-130 flex flex-col items-center justify-center relative bg-center bg-cover"
      :style="{ backgroundImage: `url(${CatalogPhoto})` }"
    >
      <div
        class="h-full w-full bg-gradient-to-r to-black/10 from-black/60 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center px-30"
      >
        <h1
          class="w-full text-main-2 text-8xl border-b border-solid border-accent-2 uppercase font-bold pb-5"
        >
          Вино
        </h1>
      </div>
    </section>
    <section
      class="container px-30 flex items-center justify-center flex-wrap gap-7"
    >
      <WineCard v-for="(wine, index) in wines" :key="index" :info="wine" />
    </section>
  </main>
</template>
<script lang="ts">
export default {
  name: "CatalogComponent",
  components: { WineCard },
};
</script>
<style></style>
