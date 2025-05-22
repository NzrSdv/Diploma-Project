<script setup lang="ts">
// @ts-nocheck
import SignInInput from "@/UI/inputs/SignInInput.vue";
import ButtonInput from "@/UI/buttons/ButtonInput.vue";

import GoogleIcon from "../../assets/icons/Google_Icon.svg";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "../../store/store.ts";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
const router = useRouter();
const store = useStore(key);
</script>
<template>
  <section
    class="w-full h-dvh bg-main-025 flex flex-col justify-center items-center gap-16 font-accent text-main-2 sm:px-0 px-4"
  >
    <div class="flex flex-col items-center justify-center text-center gap-5">
      <h2 class="text-4xl font-semibold">Вход</h2>
      <p class="text-xl">Пожалуйста, заполните эту форму.</p>
    </div>
    <div
      class="xl:w-1/4 md:w-1/2 sm:w-3/4 w-full flex flex-col justify-center gap-10"
    >
      <div class="flex flex-col justify-center gap-5">
        <SignInInput
          title="Email"
          placeholder="email..."
          inputType="email"
          @modify="changeEmail"
        />
        <SignInInput
          title="Password"
          placeholder="password..."
          inputType="password"
          @modify="inputPassword"
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
                await store.commit('setUser', auth.currentUser);
                await store.dispatch('setUserCart');
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
                signInWithPopup(auth, googleProvider);
                await store.commit('setUser', auth.currentUser);
                await store.dispatch('setUserCart');
                router.push('/');
              } catch (e) {
                console.error(e);
              }
            }
          "
        >
          <div class="size-10">
            <img :src="GoogleIcon" alt="" /></div
        ></ButtonAccentOne>
      </div>
    </div>
  </section>
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
