<script setup lang="ts">
import CatalogComponent from '../components/catalog/CatalogComponent.vue';
const wines = JSON.parse(localStorage.getItem("currentWines") || "[]");

</script>
<template>
    <main class="flex flex-col items-center jusitfy-center font-main gap-30">
    <CatalogComponent :wines="wines"/>
  </main>
</template>
<script lang="ts">

export default {
    name:"CatalogView",
    components:{CatalogComponent}
}
</script>
<style>
    
</style>