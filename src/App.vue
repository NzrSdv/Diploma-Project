<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "./components/header/HeaderComponent.vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";
import { key } from "./store.ts";
import { computed } from "vue";
export default defineComponent({
  components: { HeaderComponent },
  setup() {
    const store = useStore(key);
    const currentUser = computed(() => store.state.currentUser);
    // store.dispatch("getRedWines");
  },
});
</script>

<template>
  <HeaderComponent />
  <RouterView />
</template>
