<script setup lang="ts">
import FirstSectionComponent from "@/components/main/FirstSectionComponent.vue";
import SecondSectionComponent from "@/components/main/SecondSectionComponent.vue";
import ThirdSectionComponent from "@/components/main/ThirdSectionComponent.vue";
import FourthSectionComponent from "@/components/main/FourthSectionComponent.vue";
import FifthSectionComponent from "@/components/main/SectionFive/FifthSectionComponent.vue";
</script>
<template>
  <main
    class=" text-white font-main flex flex-col items-center justify-center gap-27"
  >
    <FirstSectionComponent />
    <SecondSectionComponent />
    <ThirdSectionComponent />
    <FourthSectionComponent />
    <FifthSectionComponent />
  </main>
</template>
<script lang="ts">
export default {
  name: "MainView",
  components: {
    FirstSectionComponent,
    SecondSectionComponent,
    ThirdSectionComponent,
    FourthSectionComponent,
    FifthSectionComponent,
  },
};
</script>
<style></style>
