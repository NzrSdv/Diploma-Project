<script lang="ts" setup>
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.ts";
import { useRouter } from "vue-router";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import { defineComponent } from "vue";
import UserFiller from "../../assets/icons/userFIller_Icon.svg";
import ButtonAccentTwo from "../../UI/buttons/ButtonAccentTwo.vue";
import ProfileInput from "../../UI/inputs/ProfileInput.vue";

import type User from "../../interfaces.ts";
const user: User = JSON.parse(localStorage.getItem("currentUser") || "{}");

let displayName:string = user?.displayName;
let email:string = user.email;

let changeStatus:boolean = false;
function changeName(newName:string){
  changeStatus = true;
  console.log(changeStatus);
  displayName = newName;
}

const router = useRouter();

async function signOutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem("currentUser");
    router.push("/");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
}
</script>
<template>
  <main>
    <section
      class="mt-15 w-full h-dvh gap-10 px-30 flex items-start justify-start text-main-2"
    >
      <div
        class="w-1/3 aspect-square border border-solid border-accent-1 flex items-center justify-center"
      >
        <img class="w-full h-auto" :src="user?.photoURL || UserFiller" alt="" />
      </div>
      <div
        class="topinfo w-2/3 flex flex-col items-center justify-center h-2/3 gap-9 text-xl font-main border-b border-solid border-main-2"
      >
        <div
          class="w-full h-full flex flex-col items-center justify-center gap-4" 
        >
          <ProfileInput title="name" :value="displayName" @changeInput="changeName" :readonly="false" />
          <ProfileInput title="email" :value="email" @changeInput="" :readonly="true"/>

          <ButtonAccentOne text="Выйти из аккаунта" @click="signOutUser" />
          
            <ButtonAccentTwo v-if="!changeStatus" text="Сохранить" textColor="text-main-2"/>
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
    ProfileInput,
  },
  data() {},
  created() {
    if (localStorage.getItem("currentUser") === null) {
      this.$router.push("/login");
    }
  },
});
</script>
