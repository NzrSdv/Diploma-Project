<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./components/header/HeaderComponent.vue";
import { RouterView } from "vue-router";

export default defineComponent({
  components: { HeaderComponent },
});
</script>

<template>
  <HeaderComponent />
  <RouterView />
</template>

<style scoped></style>
