<script setup lang="ts">
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import ButtonAccentTwo from "../../UI/buttons/ButtonAccentTwo.vue";
</script>
<template lang="">
  <header class="h-20 bg-main-2 flex items-center justify-between px-10">
    <router-link to="/">
      <div class="Logo">Vino</div>
    </router-link>
    <nav class="flex flex-row items-center justify-center gap-20">
      <ul class="flex flex-row items-center justify-center gap-15">
        <li
          class="text-main text-lg border-b-2 px-2 border-solid duration-200 border-transparent hover:border-accent-1"
          v-for="(link, index) in links"
          :key="index"
        >
          <router-link to="">{{ link }}</router-link>
        </li>
      </ul>
      <div class="flex items-center justify-center gap-4">
        <ButtonAccentTwo text="Войти"/>
        <ButtonAccentOne text="Зарегестрироваться" />
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
export default {
  name: "HeaderComponent",
  components: { ButtonAccentOne,ButtonAccentTwo },
  data() {
    return {
      links: ["Каталог", "О нас", "Корзина"],
    };
  },
};
</script>
<style lang=""></style>
