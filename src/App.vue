<script lang="ts">
// @ts-nocheck
import { defineComponent, watch } from "vue";
import HeaderComponent from "./common/header/HeaderComponent.vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import { key } from "./store/store.ts";
import { useRoute } from "vue-router";
import { computed } from "vue";
import FooterComponent from "./common/footer/FooterComponent.vue";
import { auth } from "./config/firebase.ts";
import { Toaster } from "./UI/sonner/index.ts";


const store = useStore(key);

auth.authStateReady().then(() => {
  if (auth.currentUser) {
    store.commit("setUserCart");
    console.log("logged in", auth.currentUser);
  } else {
    console.log("not logged in");
  }
});

const route = useRoute();

export default defineComponent({
  components: { HeaderComponent, FooterComponent, Toaster },
  setup() {
    const store = useStore(key);
    const route = useRoute();
    const currentUser = computed(() => store.state.currentUser);
    if (!localStorage.getItem("roseWines")) {
      store.dispatch("wine/getRoseWines");
    }
    if (!localStorage.getItem("whiteWines")) {
      store.dispatch("wine/getWhiteWines");
    }
    if (!localStorage.getItem("redWines")) {
      store.dispatch("wine/getRedWines");
    }
    console.log(auth.currentUser);
    return {
      currentUser,
      route,
    };
  },
});
</script>

<template>
  <Toaster class="pointer-event-auto" />
  <div class="min-h-dvh">
    <HeaderComponent
      v-if="route.path != '/login' && route.path != '/register'"
    />
    <RouterView />
    <div class="text-main-2"></div>
    <FooterComponent
      v-if="
        route.path != '/login' &&
        route.path != '/register' &&
        !route.path.startsWith('/user')
      "
      class="static bottom-0"
    />
  </div>
</template>
