<script setup lang="ts">
import ProductComponent from "@/components/product/ProductComponent.vue";
import { key } from "@/store/store";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore(key);

</script>

<template>
  <main class="">
    <ProductComponent />
  </main>
</template>
<script lang="ts">
export default {
  name: "ProductView",
  components: { ProductComponent },
};
</script>
<style></style>
