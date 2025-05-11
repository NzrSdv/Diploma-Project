<script setup lang="ts">
import { useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import SignInInput from "../../UI/inputs/SignInInput.vue";

import GoogleIcon from "../../assets/icons/Google_Icon.svg";

import { auth, googleProvider } from "../../config/firebase.ts";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { useStore } from "vuex";
import { key } from "../../store/store.ts";

const store = useStore(key);

const router = useRouter();

console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
</script>
<template>
    <section
      class="w-full h-dvh bg-main-025 flex flex-col items-center md:justify-center justify-start md:pt-0 pt-5 md:gap-16 gap-10 md:px-0 px-4"
    >
      <div class="flex flex-col items-center justify-center text-center md:gap-5 gap-2">
        <h2 class="text-4xl font-semibold">Регистрация</h2>
        <p class="text-xl">Пожалуйста, заполните эту форму.</p>
      </div>
      <div class="flex flex-col items-center justify-center md:gap-6 gap-2">
        <div class="w-full flex md:flex-row flex-col items-center justify-center md:gap-8 gap-2">
          <SignInInput
            class="md:w-1/2 w-full"
            title="Имя"
            placeholder="Имя"
            @modify="changeName"
          /><SignInInput
            class="md:w-1/2 w-full"
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
          <label class="text-base max-w-112 text-center" for="Policy"
            >Вы соглашаетесь с нашей дружелюбной политикой
            конфиденциальности.</label
          >
        </div>
        <ButtonAccentOne
          class="w-full"
          @click="
            async () => {
              try {
                await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                ).then(async () => {
                  await updateProfile(auth.currentUser, {
                    displayName: name,
                  });
                });
                await store.commit('setUser', {
                  ...{ displayName: surname, ...auth.currentUser },
                  cart: [],
                });
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
    },
    changeSurname(newSurname: string) {
      this.surname = newSurname;
    },
    changeEmail(newEmail: string) {
      this.email = newEmail;
    },
    changePassword(newPassword: string) {
      this.password = newPassword;
    },
  },
};
</script>
<style></style>
