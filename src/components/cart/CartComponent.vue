<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

import CartCard from "@/UI/cards/CartCard.vue";
import { key } from "@/store/store";
const store = useStore(key);

const cart = computed(() => store.state.Cart.cart);
console.log(cart);
function removeItem() {
  localStorage.removeItem("cart");
}
</script>

<template>
  <section
    class="2xl:container w-full flex flex-col items-center justify-center gap-5"
  >
    <div class="text-main-2">
      <h2 class="font-semibold text-4xl font-main">Ваша Корзина</h2>
    </div>

    <div class="w-full flex flex-col items-center justify-center px-10 gap-10">
      <template v-for="(cartItem, index) in cart" :key="index">
        <CartCard :CurrentWine="cartItem" />
      </template>
      <button @click="removeItem">udalit</button>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "CartComponent",
  components: { CartCard },
};
</script>
<style></style>
