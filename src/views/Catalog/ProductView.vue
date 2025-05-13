<script setup lang="ts">
import ProductComponent from "@/components/product/ProductComponent.vue";
import { key } from "@/store/store";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore(key);

const currentProduct = computed(() => store.state.wine.pageWine);
console.log(currentProduct);
</script>

<template>
  <main class="">
    <ProductComponent :currentProduct="currentProduct" />
  </main>
</template>
<script lang="ts">
export default {
  name: "ProductView",
  components: { ProductComponent },
};
</script>
<style></style>
