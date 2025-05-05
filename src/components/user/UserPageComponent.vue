<script lang="ts" setup>
import { auth } from "../../config/firebase.ts";
import { useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import { defineComponent } from "vue";
import UserFiller from "../../assets/icons/userFIller_Icon.svg";
import ButtonAccentTwo from "../../UI/buttons/ButtonAccentTwo.vue";
import ProfileInput from "../../UI/inputs/ProfileInput.vue";

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

const router = useRouter();


</script>
<template>
  <main class="h-dvh">
    <section
      class="w-full h-full gap-10 flex items-start justify-between text-main-2 relative"
    >
      <div
        class="w-101 h-full bg-main-2 flex flex-col items-center justify-start"
      >
        <div
          class="w-full flex flex-col items-center justify-center gap-5 shadow-sm py-7 z-20"
        >
          <div class="size-20 rounded-full border border-solid border-accent-1 overflow-hidden flex items-center justify-center">
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
          <ul class="w-full flex flex-col items-start justify-start">
            <li
              :class="[
                'w-full font-accent font-semibold px-8 py-5 text-main-1 text-start text-xl',
                currentNavLink == navigat.link ? 'bg-main-25' : 'bg-main-2',
              ]"
              v-for="(navigat, index) in navigationProfile"
              :key="index"
            >
              <router-link :to="`${baseUrl}${navigat.link}`">{{ navigat.text }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <RouterView class="w-full h-full flex items-center justify-center text-main-1" />
      <div>

      </div>
    </section>
    
  </main>
</template>
<script lang="ts">
export default defineComponent({
  name: "UserPageComponent",
  components: {
    ButtonAccentOne,
    ButtonAccentTwo,
    ProfileInput,
  },
  data() {
    return {
      baseUrl: "/user",
      navigationProfile: [
        { text: "Мои данные", link: `/info` },
        { text: "Карта", link: `/card` },
        { text: "Настройки", link: `/settings` },
      ],
      currentNavLink: "/",
    };
  },
  created() {
    this.currentNavLink = `/${this.$route.path.split('/')[2]}`;
    if (localStorage.getItem("currentUser") === null) {
      // this.$router.push("/login");
    }
  },
  updated(){
    this.currentNavLink = `/${this.$route.path.split('/')[2]}`;
    console.log(this.currentNavLink)
  }
});
</script>
