<script setup lang="ts">
import ProductComponent from "../components/product/ProductComponent.vue";
</script>

<template>
  <main class="">
    <ProductComponent/>
  </main>
</template>
<script lang="ts">
export default {
  name: "ProductView",
  components: { ProductComponent },
};
</script>
<style></style>
