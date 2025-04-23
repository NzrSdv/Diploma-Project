<script setup lang="ts">
import SignInInput from "../../UI/inputs/SignInInput.vue";
import ButtonInput from "../../UI/buttons/ButtonInput.vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <main>
    <section class="w-full h-dvh flex justify-center items-center text-main-2">
      <div
        class="size-120 rounded-2xl bg-accent-1 flex flex-col items-center justify-center gap-15"
      >
        <h2 class="text-3xl">Вход</h2>
        <div class="flex flex-col justify-center gap-10">
          <div class="flex flex-col justify-center gap-4">
            <SignInInput
              title="Email"
              placeholder="email..."
              inputType="email"
              @changeEmail="changeEmail"
            />
            <SignInInput
              title="Password"
              placeholder="password..."
              inputType="password"
              @changeEmail="inputPassword"
            />
          </div>
          <ButtonInput
            text="Войти в аккаунт"
            @click="
              async () => {
                try {
                  await createUserWithEmailAndPassword(auth, email, password);
                  router.push('/');
                } catch (e) {
                  console.error(e);
                }
              }
            "
          />
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
  created() {
    console.log(auth.currentUser);
  },
};
</script>
<style lang=""></style>
