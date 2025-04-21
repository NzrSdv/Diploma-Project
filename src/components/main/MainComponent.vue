<script setup lang="ts">
import FirstSectionComponent from "./FirstSectionComponent.vue";
</script>

<template lang="">
  <main class="text-white flex flex-col items-stretch justify-center">
    <FirstSectionComponent />
  </main>
</template>
<script lang="ts">
export default {
  name: "MainComponent",
  components: { FirstSectionComponent },
};
</script>
<style lang=""></style>
