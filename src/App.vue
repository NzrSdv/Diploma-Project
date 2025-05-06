<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./components/header/HeaderComponent.vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import { key } from "./store.ts";
import { useRoute } from "vue-router";
import { computed } from "vue";
import FooterComponent from "./components/footer/FooterComponent.vue";
import { auth } from "./config/firebase.ts";

export default defineComponent({
  components: { HeaderComponent, FooterComponent },
  setup() {
    const store = useStore(key);
    const route = useRoute();
    const currentUser = computed(() => store.state.currentUser);
    if (!localStorage.getItem("redWines")) {
      store.dispatch("getRedWines");
    }
    else{
      console.log("local is wine");
      
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
  <div class="min-h-dvh">
    <HeaderComponent
      v-if="route.path != '/login' && route.path != '/register'"
    />
    <RouterView />
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
