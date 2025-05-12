<script setup lang="ts">
import FooterLinks from "./FooterLinks.vue";
</script>
<template>
  <footer
    class="sm:max-2xl:static fixed bottom-0 w-full bg-main-025 py-15 xl:px-43 flex flex-col items-center justify-center mt-37"
  >
    <div
      class="w-full pb-19 border-b border-solid border-main-1 flex xl:flex-row flex-col xl:gap-0 gap-10 xl:flex-nowrap flex-wrap items-center xl:justify-between justify-center"
    >
      <div class="flex flex-col items-start justify-center">
        <router-link to="/">
          <div class="Logo w-6/16 text-main-2">Vino</div>
        </router-link>
      </div>
      <div class="w-2/3 flex flex-row items-center justify-center xl:flex-nowrap flex-wrap">
        <FooterLinks
          v-for="(footerLink, index) in FooterLinki"
          :key="index"
          :footerLink="footerLink"
        />
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
export default {
  name: "FooterComponent",
  components: { FooterLinks },
  data() {
    return {
      FooterLinki: [
        {
          title: "About us",
          links: [
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
          ],
        },
        {
          title: "FAQ",
          links: [
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
          ],
        },
        {
          title: "Products",
          links: [
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
            { text: "abc", link: "/" },
          ],
        },
      ],
    };
  },
};
</script>
<style></style>
