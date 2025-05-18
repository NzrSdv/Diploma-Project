<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

import CartCard from "@/UI/cards/CartCard.vue";
import { key } from "@/store/store";
import ButtonAccentOne from "@/UI/buttons/ButtonAccentOne.vue";
import FillerComponent from "../filler/FillerComponent.vue";
import ButtonAccentTwo from "@/UI/buttons/ButtonAccentTwo.vue";
import { useRouter } from "vue-router";

import { createStripeProducts } from "@/config/stripe";

const store = useStore(key);

const cart = computed(() => store.state.cart.cart);
const total = computed(() => store.state.cart.total);

const router = useRouter();

function removeItem() {
  store.dispatch("removeCart");
}
</script>

<template>
  <section
    v-if="cart.length"
    class="2xl:container w-full flex flex-col items-center justify-center gap-5 md:px-10 px-4 py-10"
  >
    <div
      class="w-full text-main-2 flex md:flex-row flex-col items-center justify-between gap-10"
    >
      <div class="flex flex-col items-start justify-center gap-2">
        <h2 class="font-semibold text-4xl font-main">Корзина</h2>
        <p class="text-center">
          Общая сумма: <span class="font-semibold text-2xl">${{ total }}</span>
        </p>
      </div>

      <div class="flex flex-row items-center justify-center gap-4">
        <ButtonAccentTwo
          class="text-main-2 px-10 py-2"
          text="Купить все"
          @click="
            () => {
              createStripeProducts(
                cart,
                'http://localhost:5173'
              );
              // router.push('/purchase');
            }
          "
        />
        <ButtonAccentOne
          @click="removeItem"
          padding="px-10 py-2"
          radius="rounded-sm"
          text="Убрать всё"
        />
      </div>
    </div>

    <div class="w-full flex flex-col items-center justify-center gap-10">
      <template v-for="(cartItem, index) in cart" :key="index">
        <CartCard :CurrentWine="cartItem" />
      </template>
    </div>
  </section>
  <FillerComponent v-if="!cart.length" />
</template>
<script lang="ts">
export default {
  name: "CartComponent",
  components: { CartCard, ButtonAccentOne, ButtonAccentTwo, FillerComponent },
};
</script>
<style></style>
