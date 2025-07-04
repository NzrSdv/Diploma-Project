<script setup lang="ts">
// @ts-nocheck
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

function languageChange($event: any): void {
  localStorage.setItem("lang", $event.target.value);
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
            <router-link :to="link.link" v-if="link.signed ? signedIn : true">{{
              $t(`header.nav.${link.text}`)
            }}</router-link>
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
            <router-link to="/user/info">{{
              $t("header.nav.myInfo")
            }}</router-link>
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
          <ButtonAccentTwo :text="$t('header.login')" @click="forwardLogin()" />
          <ButtonAccentOne
            :text="$t('header.register')"
            @click="forwardRegister()"
          />
        </div>
        <select
          class="bg-transparent p-2 rounded border border-solid border-main-2"
          v-model="$i18n.locale"
          @change="($event) => languageChange($event)"
        >
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
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
        {
          text: "catalog",
          link: "/catalog/red/1",
          signed: false,
        },
        { text: "aboutUs", link: "/", signed: false },
        { text: "cart", link: "/cart", signed: true },
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
