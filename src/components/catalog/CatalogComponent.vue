<script setup lang="ts">
import { useStore } from "vuex";
import CatalogPhoto from "../../assets/img/CatalogComponent_photo.jpg";
import WineCard from "../../UI/cards/WineCard.vue";
import { key } from "../../store";
import { computed, ref, watch } from "vue";
import Button from "@/UI/pagination/button/Button.vue";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  PaginationItem,
} from "../../UI/pagination/pagination";
import router from "@/router";
import { useRoute } from "vue-router";
const store = useStore(key);

const route = useRoute();

const currentWines = computed(() => store.state.currentWines);
store.dispatch("setCurrentPageWine", route.params.page);
watch(
  () => route.params.page,
  (newPage, oldPage) => {
    store.dispatch("setCurrentPageWine", newPage);
  }
);

const AllPages = computed(() => store.getters.getRedWinesPages);
console.log(AllPages);
</script>
<template>
  <section
    class="2xl:container w-full h-130 flex flex-col items-center justify-center relative bg-center bg-cover"
    :style="{ backgroundImage: `url(${CatalogPhoto})` }"
  >
    <div
      class="h-full w-full bg-gradient-to-r to-black/10 from-black/60 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center md:px-30 px-4"
    >
      <h1
        class="w-full text-main-2 md:text-8xl text-6xl md:text-start text-center border-b border-solid border-accent-2 uppercase font-bold pb-5"
      >
        Вино
      </h1>
    </div>
  </section>
  <section
    class="2xl:container w-full md:px-30 px-0 flex-col flex items-center justify-center gap-10"
  >
    <div class="">
      <select name="" id=""></select>
    </div>
    <div class="w-full h-max flex items-center justify-center flex-wrap gap-7">
      <WineCard
        v-for="(wine, index) in currentWines"
        :key="index"
        :info="wine"
      />
    </div>
    <Pagination
      v-slot="{ page }"
      :items-per-page="20"
      :total="AllPages"
      :sibling-count="1"
      show-edges
      :default-page="Number(route.params.page)"
    >
      <PaginationContent v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="() => router.push(`/catalog/1`)" />
        <PaginationPrevious
          @click="
            () => router.push(`/catalog/${Number(route.params.page) - 1}`)
          "
        />
        <template v-for="(item, index) in items">
          <PaginationItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'outline' : 'default'"
              @click="() => router.push(`/catalog/${item.value}`)"
            >
              {{ item.value }}
            </Button>
          </PaginationItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>
        <PaginationNext
          @click="
            () => router.push(`/catalog/${Number(route.params.page) + 1}`)
          "
        />
        <PaginationLast @click="() => router.push(`/catalog/${Math.ceil(AllPages / 20)}`)" />
      </PaginationContent>
    </Pagination>
  </section>
</template>
<script lang="ts">
export default {
  name: "CatalogComponent",
  components: {
    WineCard,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
  },
  props: { wines: Array<Object> },
};
</script>
<style></style>
