<script setup lang="ts">
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
const router = useRouter();

const user = auth?.currentUser;
console.log(user);
</script>
<template>
  <main>
    <section
      class="mt-15 pr-20 w-full h-dvh flex items-start justify-center text-main-2"
    >
      <div
        class="w-1/3 aspect-square border border-solid border-accent-1 flex items-center justify-center"
      >
        Profile picture
      </div>
      <div class="w-2/3 h-full">
        <div class="topinfo flex flex-col items-center justify-center h-2/3 gap-9 text-xl font-main capitalize border-b border-solid border-main-2">
          <p>name:Your name</p>
          <p>email: Your email</p>
          <p>password: Your password</p>

          <ButtonAccentOne
            text="Sign out"
            @click="
              async () => {
                try {
                  await signOut(auth);
                  router.push('/');
                } catch (error) {
                  console.error(error);
                }
              }
            "
          />
        </div>
        <div class="flex items-center justify-center min-h-1/3">
          <h3>You haven't purchased yet</h3>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
export default {
  name: "UserPageComponent",
  components: { ButtonAccentOne },
};
</script>
<style></style>
