<script setup lang="ts">
// @ts-nocheck
import { signOut, updateEmail, updateProfile } from "firebase/auth";
import ProfileInput from "../../../UI/inputs/ProfileInput.vue";
import { auth } from "../../../config/firebase";
import { useStore } from "vuex";
import { key } from "../../../store/store";
import ButtonAccentOne from "../../../UI/buttons/ButtonAccentOne.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore(key);
async function signOutUser() {
  try {
    await signOut(auth);
    store.commit("setCart", []);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    router.push("/");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
}
</script>
<template>
  <div class="w-full">
    <div
      class="bg-main-2 md:p-10 py-10 px-2 rounded-md flex flex-col items-center justify-center gap-13"
    >
      <h2 class="font-semibold text-2xl">
        {{ $t("profile.myInfo.pageTitle") }}
      </h2>
      <div class="flex flex-col items-center justify-center gap-6">
        <ProfileInput
          :title="$t('profile.myInfo.inputs.nameLabel')"
          :mainValue="email"
          :value="displayName"
          @changeInput="
            async (newName: string) => {
              await updateProfile(auth.currentUser, { displayName: newName });
              store.commit('setUser', auth.currentUser);
              console.log('yes');
            }
          "
        />
        <ProfileInput
          :title="$t('profile.myInfo.inputs.emailLabel')"
          :mainValue="email"
          :value="email"
          @changeInput="
            async (newEmail: string) => {
              await updateEmail(auth.currentUser, newEmail).then(() => {
                console.log('Login updated');
              });
              store.commit('setUser', {
                ...auth.currentUser,
              });
            }
          "
        />
        <ButtonAccentOne
          radius="rounded-md"
          padding="px-6 py-2"
          :text="$t('profile.myInfo.buttons.signout')"
          @click="signOutUser"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "InfoComponent",
  data() {
    return {
      user: "",
      displayName: "",
      email: "",
    };
  },
  methods: {},
  components: { ProfileInput, ButtonAccentOne },
  created() {
    this.user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    this.displayName = this.user.displayName;
    this.email = this.user.email;
  },
};
</script>
<style></style>
