<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

import CartCard from "@/UI/cards/CartCard.vue";
import { key } from "@/store/store";
import ButtonAccentOne from "@/UI/buttons/ButtonAccentOne.vue";
import FillerComponent from "../filler/FillerComponent.vue";
import ButtonAccentTwo from "@/UI/buttons/ButtonAccentTwo.vue";
const store = useStore(key);

const cart = computed(() => store.state.Cart.cart);
const total = computed(() => store.state.Cart.total);
function removeItem() {
  store.commit('removeCart')
}
</script>

<template>
  <section
  v-if="cart.length"
    class="2xl:container w-full flex flex-col items-center justify-center gap-5 md:px-0 px-4 "
  >
    <div class="text-main-2 flex flex-row items-center justify-center gap-10">
      <h2 class="font-semibold text-4xl font-main">Ваша Корзина : ${{ total }}</h2>

      <ButtonAccentOne  @click="removeItem" padding="px-10 py-2" radius="rounded-sm" text="Убрать всё"/>
      <ButtonAccentTwo class="text-main-2 px-10 py-2" text="Купить все"/>

    </div>

    <div class="w-full flex flex-col items-center justify-center md:px-10 px-2 gap-10">
      <template  v-for="(cartItem, index) in cart" :key="index">
        <CartCard :CurrentWine="cartItem" />
      </template>
      
    </div>
  </section>
  <FillerComponent v-if="!cart.length"/>
</template>
<script lang="ts">
export default {
  name: "CartComponent",
  components: { CartCard,ButtonAccentOne,ButtonAccentTwo,FillerComponent },
};
</script>
<style></style>
