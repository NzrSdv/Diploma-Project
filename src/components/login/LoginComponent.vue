<script setup lang="ts">
import SignInInput from "../../UI/inputs/SignInInput.vue";
import ButtonInput from "../../UI/buttons/ButtonInput.vue";

import GoogleIcon from "../../assets/icons/Google_Icon.svg";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "../../store.ts";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
const router = useRouter();
const store = useStore(key);
</script>
<template>
  <main>
    <section class="w-full h-dvh bg-main-025 flex flex-col justify-center items-center gap-16 font-accent text-main-2">
      
       <div class="flex flex-col items-center justify-center text-center gap-5">
        <h2 class="text-4xl font-semibold">Вход</h2>
        <p class="text-xl ">Пожалуйста, заполните эту форму.</p>
       </div>
        <div class="w-1/4 flex flex-col justify-center gap-10">
          <div class="flex flex-col justify-center gap-5">
            <SignInInput
              title="Email"
              placeholder="email..."
              inputType="email"
              @change="changeEmail"
            />
            <SignInInput
              title="Password"
              placeholder="password..."
              inputType="password"
              @change="inputPassword"
            />
          </div>
         <div class="flex flex-col items-cennter justify-center gap-5">
          <ButtonAccentOne
          class="w-full"
            text="Войти"
            radius="rounded-sm"
            padding="py-3"
            @click="
              async () => {
                try {
                  await signInWithEmailAndPassword(auth, email, password);
                  store.commit('setUser', { ...auth.currentUser, cart: [] });
                  router.push('/');
                } catch (e) {
                  console.error(e);
                }
              }
            "
          />
          <ButtonAccentOne
            text="Войти с Google"
            radius="rounded-sm"
            padding="py-3"
            @click="
              async () => {
                try {
                  await signInWithPopup(auth, googleProvider);
                  // store.commit('setUser', { ...auth.currentUser, cart: [] });
                  router.push('/');
                } catch (e) {
                  console.error(e);
                }
              }
            "
          >
        <div class="size-10">
          <img :src="GoogleIcon" alt="">
        </div></ButtonAccentOne>
         </div>
        </div>
    </section>
  </main>
</template>
<script lang="ts">
export default {
  name: "LoginComponent",
  components: { SignInInput, ButtonAccentOne },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    changeEmail(newText: string) {
      this.email = newText;
    },
    inputPassword(newText: string) {
      this.password = newText;
    },
  },
};
</script>
<style lang=""></style>
