<script setup lang="ts">
import SliderComponent from "./SliderComponent.vue";
</script>
<template>
  <section
    class="container overflow-hidden font-main flex flex-col items-center justify-center gap-14"
  >
    <div class="flex flex-col items-center justify-center text-center gap-2">
      <h4 class="text-xl uppercase">{{ $t('main.section5.subTitle') }}</h4>
      <h2 class="font-bold text-5xl">{{$t('main.section5.title')}}</h2>
    </div>
    <SliderComponent />
  </section>
</template>
<script lang="ts">
export default {
  name: "FifthSectionComponent",
  components: { SliderComponent },
};
</script>
<style scoped></style>
