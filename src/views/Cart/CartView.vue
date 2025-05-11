<script setup lang="ts">
import CartComponent from "../../components/cart/CartComponent.vue";
</script>

<template>
  <main>
    <CartComponent />
  </main>
</template>

<script lang="ts">
export default {
  name: "CartView",
  components: { CartComponent },
};
</script>

<style scoped>
.cart-view {
  padding: 20px;
  text-align: center;
}
</style>
