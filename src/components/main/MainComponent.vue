<script setup lang="ts">
import FirstSectionComponent from "./FirstSectionComponent.vue";
import SecondSectionComponent from "./SecondSectionComponent.vue";
import ThirdSectionComponent from "./ThirdSectionComponent.vue";
import FourthSectionComponent from "./FourthSectionComponent.vue";
import FifthSectionComponent from "./FifthSectionComponent.vue";
</script>

<template lang="">
  <main class="text-white font-main flex flex-col items-center justify-center gap-27">
    <FirstSectionComponent />
    <SecondSectionComponent />
    <ThirdSectionComponent/>
    <FourthSectionComponent/>
    <FifthSectionComponent/>
  </main>
</template>
<script lang="ts">
export default {
  name: "MainComponent",
  components: { FirstSectionComponent, SecondSectionComponent,ThirdSectionComponent,FourthSectionComponent,FifthSectionComponent },
};
</script>
<style lang=""></style>
