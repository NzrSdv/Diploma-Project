<script setup lang="ts">
import RegisterComponent from "../components/register/RegisterComponent.vue";
</script>
<template>
  <main class="text-main-2 font-accent">
    <RegisterComponent />
  </main>
</template>
<script lang="ts">
export default {
  name: "RegisterView",
  components: { RegisterComponent },
};
</script>
<style></style>
