<script setup lang="ts">
import SignInInput from "../../UI/inputs/SignInInput.vue";
import ButtonInput from "../../UI/buttons/ButtonInput.vue";

import GoogleIcon from "../../assets/icons/Google_Icon.svg";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "../../store.ts";
const router = useRouter();
const store = useStore(key);
</script>
<template>
  <main>
    <section class="w-full h-dvh flex justify-center items-center text-main-2">
      <div
        class="size-120 rounded-2xl bg-accent-1 flex flex-col items-center justify-center gap-10"
      >
        <h2 class="text-3xl">Вход</h2>
        <div class="flex flex-col justify-center gap-8">
          <div class="flex flex-col justify-center gap-4">
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
         <div class="flex flex-col items-cennter justify-center gap-4">
          <ButtonInput
            text="Войти"
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
          <ButtonInput
            text="Войти с Google"
            :icon="GoogleIcon"
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
          />
         </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
export default {
  name: "LoginComponent",
  components: { SignInInput, ButtonInput },
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
