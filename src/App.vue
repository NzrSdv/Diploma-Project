<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./components/header/HeaderComponent.vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import { key } from "./store.ts";
import { useRoute } from "vue-router";
import { computed } from "vue";
import FooterComponent from "./components/footer/FooterComponent.vue";

export default defineComponent({
  components: { HeaderComponent, FooterComponent },
  setup() {
    const store = useStore(key);
    const route = useRoute();
    const currentUser = computed(() => store.state.currentUser);
    // store.dispatch("getRedWines");
    return {
      currentUser,
      route,
    };
  },
});
</script>

<template>
  <HeaderComponent v-if="route.path != '/login' && route.path != '/register'" />
  <RouterView />
  <FooterComponent
    v-if="route.path != '/login' && route.path != '/register'"
    class="static bottom-0"
  />
</template>
