<script setup lang="ts">
// @ts-nocheck
import { key } from "@/store/store";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore(key);

const purchased = store.getters.getOrders
  .then((data) => data)
  .catch(() => null);
</script>
<template>
  <div class="w-full h-full p-10">
    <div
      v-if="orders != null"
      v-for="(orders, index) in purchased"
      :key="index"
    >
      <div v-for="product in orders.products" :key="product">
        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "CardComponent",
  
};
</script>
<style></style>
