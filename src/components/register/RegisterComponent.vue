<script setup lang="ts">
import { useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import SignInInput from "../../UI/inputs/SignInInput.vue";

import GoogleIcon from "../../assets/icons/Google_Icon.svg";

import { auth, googleProvider } from "../../config/firebase.ts";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { useStore } from "vuex";
import { key } from "../../store.ts";

const store = useStore(key);

const router = useRouter();

console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
</script>
<template>
  <main class="text-main-2 font-accent">
    <section
      class="w-full h-dvh bg-main-025 flex flex-col items-center justify-center gap-16"
    >
      <div class="flex flex-col items-center justify-center text-center gap-5">
        <h2 class="text-4xl font-semibold">Регистрация</h2>
        <p class="text-xl">Пожалуйста, заполните эту форму.</p>
      </div>
      <div class="flex flex-col items-center justify-center gap-6">
        <div class="w-full flex flex-row items-center justify-center gap-8">
          <SignInInput
            class="w-1/2"
            title="Имя"
            placeholder="Имя"
            @modify="changeName"
          /><SignInInput
            class="w-1/2"
            title="Фамилия"
            placeholder="Фамилиля"
            @modify="changeSurname"
          />
        </div>
        <SignInInput
          class="w-full"
          title="email"
          inputType="email"
          placeholder="Email"
          @modify="changeEmail"
        />
        <SignInInput
          class="w-full"
          title="Пароль"
          inputType="password"
          placeholder="Пароль"
          @modify="changePassword"
        />
        <div class="w-full flex flex-row items-center justify-start gap-3">
          <input type="checkbox" id="Policy" v-model="policyAgree" />
          <label class="text-base max-w-112" for="Policy"
            >Вы соглашаетесь с нашей дружелюбной политикой
            конфиденциальности.</label
          >
        </div>
        <ButtonAccentOne
          class="w-full"
          @click="
            async () => {
              try {
                console.log(email);
                console.log(password);
                await createUserWithEmailAndPassword(auth, email, password);
                store.commit('setUser', { ...auth.currentUser, cart: [] });
                router.push('/');
              } catch (e) {
                console.error(e);
              }
            }
          "
          text="Зарегестрироваться"
          radius="rounded-sm"
          inputType="password"
          padding="py-3"
          :disabled="!policyAgree"
        ></ButtonAccentOne>
        <ButtonAccentOne
          class="w-full"
          @click="
            async () => {
              try {
                await signInWithPopup(auth, googleProvider);
                store.commit('setUser', { ...auth.currentUser, cart: [] });
                router.push('/');
              } catch (e) {
                console.error(e);
              }
            }
          "
          text="Используя Google"
          radius="rounded-sm"
          padding="py-3"
          ><div class="size-10"><img :src="GoogleIcon" alt="" /></div
        ></ButtonAccentOne>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
export default {
  name: "RegisterComponent",
  components: { SignInInput, ButtonAccentOne },
  data() {
    return {
      policyAgree: false,
      name: "",
      surname: "",
      email: "",
      password: "",
    };
  },
  methods: {
    changeName(newName: string) {
      this.name = newName;
      console.log(newName);
    },
    changeSurname(newSurname: string) {
      this.surname = newSurname;
      console.log(newSurname);
    },
    changeEmail(newEmail: string) {
      this.email = newEmail;
      console.log(newEmail);
    },
    changePassword(newPassword: string) {
      this.password = newPassword;
      console.log(newPassword);
    },
  },
};
</script>
<style></style>
