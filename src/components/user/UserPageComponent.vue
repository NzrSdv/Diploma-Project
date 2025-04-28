<script lang="ts" setup>
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.ts";
import { useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import { defineComponent } from "vue";
import UserFiller from "../../assets/icons/userFIller_Icon.svg";
import ButtonAccentTwo from "../../UI/buttons/ButtonAccentTwo.vue";
const router = useRouter();

const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

async function signOutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem("currentUser");
    router.push("/login");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
}
</script>
<template>
  <main>
    <section
      class="mt-15 w-full h-dvh flex items-start justify-around text-main-2"
    >
      <div
        class="w-1/3 aspect-square border border-solid border-accent-1 flex items-center justify-center"
      >
        <img class="w-full h-auto" :src="user?.photoURL || UserFiller" alt="" />
      </div>
      <div
        class="topinfo flex flex-col items-center justify-center h-2/3 gap-9 text-xl font-main border-b border-solid border-main-2"
      >
        <div
          class="w-full h-full flex flex-col items-start justify-center gap-4"
        >
          <p>
            name:
            <input type="text" :value="user?.displayName || 'Guest'" readonly />
          </p>
          <p>
            email: <input type="text" :value="user?.email || ''" readonly />
          </p>

          <ButtonAccentOne text="Sign out" @click="signOutUser" />
          <ButtonAccentTwo text="Сохранить" textColor="text-main-2" focus />
        </div>
        <div class="flex items-center justify-center min-h-1/3">
          <h3>You haven't purchased yet</h3>
        </div>
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
  },
  created() {
    if (localStorage.getItem("currentUser") === null) {
      this.$router.push("/login");
    }
  },
});
</script>
<style></style>

У
