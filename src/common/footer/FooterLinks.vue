<script setup lang="ts"></script>
<template>
  <div
    class="w-full flex flex-col xl:items-start items-center justify-center gap-13 font-main text-main-2"
  >
    <h3 class="font-semibold text-3xl">{{ footerLink.title }}</h3>
    <ul class="flex max-h-45 flex-col xl:items-start items-center justify-start gap-4 flex-wrap">
      <li v-for="(link, index) in footerLink.links" :key="index">
        <router-link :to="`${link.link}`">{{ link.text }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: "FooterLinks",
  props: {
    footerLink: { type: Object, required: true },
  },
};
</script>
<style></style>
