<script setup lang="ts">
// @ts-nocheck
import { key } from "@/store/store";
import { computed } from "vue";
import { useStore } from "vuex";
async function purchasing(): void {
  const store = useStore(key);
  const cart = computed(() => store.state.cart.cart);
  let loading = true;
  await store.dispatch(
    "purchaseCart",
    JSON.parse(localStorage.getItem("cart"))
  );
  await store.dispatch("removeCart");
  loading = false;
}
purchasing();
</script>
<template>
  <main class="h-dvh w-full flex items-center justify-center">
    <h2
      class="text-4xl font-accent flex flex-col items-center justify-center font-semibold text-main-2"
    >
      Вы успешно приобрели вино

      <router-link
        class="text-accent-2 underline hover:scale-105 duration-300"
        to="/"
        >На главную</router-link
      >
    </h2>
  </main>
</template>
<script lang="ts">
export default {
  name: "PaymentSuccess",
};
</script>
<style></style>
