<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import ButtonAccentTwo from "../../UI/buttons/ButtonAccentTwo.vue";
import { auth } from "../../config/firebase";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
let burgerStatus = ref(false);

function forwardLogin(): void {
  router.push("/login");
}
function forwardRegister(): void {
  router.push("/register");
}
function toggleBurgerStatus(): void {
  burgerStatus.value = !burgerStatus.value;
}
</script>
<template lang="">
  <header class="h-20 bg-main-2 flex items-center justify-center px-10 z-30">
    <div class="container flex items-center justify-between">
      <router-link to="/">
        <div class="Logo w-6/16">Vino</div>
      </router-link>

      <nav
        :class="[
          'lg:w-10/16 w-1/4 lg:flex lg:flex-row flex-col-reverse  items-center lg:justify-between justify-end',
          burgerStatus ? 'flex' : 'hidden',
        ]"
      >
        <ul
          class="flex lg:flex-row flex-col items-center lg:justify-center justify-start px-10 gap-14 bg-white lg:static border-l border-t border-solid md:border-transparent border-black fixed top-20 md:pt-0 pt-10 right-0 bottom-0 z-50"
        >
          <li
            :class="[
              'font-main text-lg border-b-2 border-solid duration-200  hover:border-accent-15',
              route.path == link.link
                ? 'border-accent-15'
                : 'border-transparent',
            ]"
            v-for="(link, index) in links"
            :key="index"
            @click="toggleBurgerStatus"
          >
            <router-link :to="link.link">{{ link.text }}</router-link>
          </li>
          <li
            v-if="signedIn"
            :class="[
              'font-main text-lg border-b-2 border-solid duration-200  hover:border-accent-15',
              route.path.includes('/user')
                ? 'border-accent-15'
                : 'border-transparent',
            ]"
            @click="toggleBurgerStatus"
          >
            <router-link to="/user/info" 
              >Мои данные</router-link
            >
          </li>
          <li
            class="w-full lg:hidden block text-center font-main text-xl rounded-lg text-accent-15 font-bold duration-300 cursor-pointer hover:bg-main-1/50"
            @click="toggleBurgerStatus"
          >
            X
          </li>
        </ul>
        <div
          v-if="!signedIn"
          class="flex flex-row items-center justify-center gap-3"
        >
          <ButtonAccentTwo text="Войти" @click="forwardLogin()" />
          <ButtonAccentOne
            text="Зарегестрироваться"
            @click="forwardRegister()"
          />
        </div>
      </nav>
      <button
        class="size-8 lg:hidden flex flex-col items-center justify-between"
        @click="toggleBurgerStatus"
      >
        <div class="w-full h-1 bg-accent-15"></div>
        <div class="w-full h-1 bg-accent-15"></div>
        <div class="w-full h-1 bg-accent-15"></div>
      </button>
    </div>
  </header>
</template>
<script lang="ts">
export default {
  name: "HeaderComponent",
  components: { ButtonAccentOne, ButtonAccentTwo },
  data() {
    return {
      links: [
        { text: "Каталог", link: "/catalog/1" },
        { text: "О нас", link: "/" },
        { text: "Корзина", link: "/cart" },
      ],
      signedIn: false,
    };
  },
  beforeCreate() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.signedIn = true;
      } else {
        this.signedIn = false;
      }
    });
  },
};
</script>
<style lang=""></style>
