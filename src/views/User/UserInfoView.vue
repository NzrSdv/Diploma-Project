<script setup lang="ts">
import UserComponent from '@/components/user/UserComponent.vue';
</script>
<template>
  <main class="h-dvh">
<UserComponent/>
  </main>
</template>
<script lang="ts">
export default {
    name:"UserInfoView",
    components:{UserComponent}
};
</script>
<style></style>
