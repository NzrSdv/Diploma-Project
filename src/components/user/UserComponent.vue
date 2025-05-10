<script lang="ts" setup>
import { auth } from "../../config/firebase.ts";
import { useRoute, useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import UserFiller from "../../assets/icons/userFIller_Icon.svg";
import ButtonAccentTwo from "../../UI/buttons/ButtonAccentTwo.vue";
import ProfileInput from "../../UI/inputs/ProfileInput.vue";

import SettingsIcon from "../../assets/icons/Settings_Icon.svg";
import CreditCardIcon from "../../assets/icons/CreditCard_Icon.svg";
import InfoIcon from "../../assets/icons/Information_Icon.svg";

import { RouterView } from "vue-router";

import type User from "../../interfaces.ts";
const user: User = JSON.parse(localStorage.getItem("currentUser") || "{}");
let displayName: string = user?.displayName;
let email: string = user.email;

let changeStatus: boolean = false;
function changeName(newName: string) {
  changeStatus = true;
  console.log(changeStatus);
  displayName = newName;
}
const route = useRoute();
const router = useRouter();
auth.authStateReady().then(() => {
  if (!auth.currentUser) {
    router.push("/");
  } else {
  }
});
</script>
<template>
  <section
    class="2xl:container w-full h-full gap-10 flex md:flex-row flex-col items-start justify-between text-main-2 relative"
  >
    <div
      class="2xl:w-5/14 md:w-101 w-full md:h-full h-101 bg-main-2 flex flex-col items-center md:justify-start justify-end"
    >
      <div
        class="w-full flex md:flex-col flex-row items-center md:justify-center justify-evenly gap-5 shadow-sm py-7 z-20"
      >
        <div
          class="size-20 rounded-full border border-solid border-accent-1 overflow-hidden flex items-center justify-center"
        >
          <img
            class="w-full h-auto"
            :src="user.photoURL ? user.photoURL : UserFiller"
            alt=""
          />
        </div>
        <div
          class="flex flex-col items-center justify-center gap-3 text-main-1 font-main"
        >
          <h3 class="font-medium text-xl text-main-1">
            {{ user.displayName }}
          </h3>
          <p class="text-base text-main-1/50">{{ user.email }}</p>
        </div>
      </div>
      <nav class="w-full flex flex-col items-center justify-center">
        <ul class="w-full flex md:flex-col flex-row items-start justify-start">
          <li
            :class="[
              'md:w-full w-1/3 font-accent font-semibold md:px-8 text-main-1 flex items-stretch md:justify-start justify-stretch md:text-start text-center md:text-xl text-sm',
              currentNavLink == navigat.link ? 'bg-main-25' : 'bg-main-2',
            ]"
            v-for="(navigat, index) in navigationProfile"
            :key="index"
            @click="
              () => {
                changeNav(navigat.link);
              }
            "
          >
            <router-link
              class="w-full h-full flex items-center justify-center py-5"
              :to="`${baseUrl}${navigat.link}`"
            >
              <p class="md:flex hidden">{{ navigat.text }}</p>
              <div class="size-7">
                <img
                  class="w-full h-auto md:hidden flex"
                  :src="navigat.icon"
                  alt=""
                />
              </div>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <RouterView
      class="w-full h-full flex items-center justify-center text-main-1"
    />
  </section>
</template>
<script lang="ts">
export default {
  name: "UserComponent",
  components: {
    ButtonAccentOne,
    ButtonAccentTwo,
    ProfileInput,
  },
  data() {
    return {
      baseUrl: "/user",
      navigationProfile: [
        { text: "Мои данные", link: `/info`, icon: InfoIcon },
        { text: "Карта", link: `/card`, icon: CreditCardIcon },
        { text: "Настройки", link: `/settings`, icon: SettingsIcon },
      ],
      currentNavLink: "/",
    };
  },
  methods: {
    changeNav(newNav: string) {
      this.currentNavLink = newNav;
    },
  },
  created() {
    this.currentNavLink = `/${this.$route.path.split("/")[2]}`;
    if (localStorage.getItem("currentUser") === null) {
      // this.$router.push("/login");
    }
  },
};
</script>
