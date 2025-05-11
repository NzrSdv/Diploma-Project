<script setup lang="ts">
import LoginComponent from "@/components/login/LoginComponent.vue";
</script>
<template>
  <main class="">
    <LoginComponent />
  </main>
</template>
<script lang="ts">
export default {
  name: "LoginView",
  components: { LoginComponent },
};
</script>
