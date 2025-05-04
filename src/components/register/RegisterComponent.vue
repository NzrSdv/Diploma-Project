<script setup lang="ts">
import { useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import SignInInput from "../../UI/inputs/SignInInput.vue";

import GoogleIcon from "../../assets/icons/Google_Icon.svg";

import { auth, googleProvider } from "../../config/firebase.ts";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";

import { useStore } from "vuex";
import { key } from "../../store.ts";

const store = useStore(key);

const router = useRouter();
async function registerWithGoogle() {
  try {
    await signInWithPopup(auth, googleProvider);
    store.commit("setUser", { ...auth.currentUser, cart: [] });
    router.push("/");
  } catch (e) {
    console.error(e);
  }
}
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
            @change="changeName"
          /><SignInInput
            class="w-1/2"
            title="Фамилия"
            placeholder="Фамилиля"
            @change="changeSurname"
          />
        </div>
        <SignInInput
          class="w-full"
          title="email"
          inputType="email"
          placeholder="Email"
          @change="changeEmail"
        />
        <SignInInput
          class="w-full"
          title="Пароль"
          inputType="phone"
          placeholder="Пароль"
          @change="changePassword"
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
          padding="py-3"
          :disabled="!policyAgree"
        ></ButtonAccentOne>
        <ButtonAccentOne
          class="w-full"
          @click="registerWithGoogle"
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
