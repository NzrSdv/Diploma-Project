<script setup lang="ts">
// @ts-nocheck
import { useStore } from "vuex";
import CatalogPhoto from "../../assets/img/CatalogComponent_photo.jpg";
import WineCard from "../../UI/cards/WineCard.vue";
import { key } from "../../store/store";
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
import ButtonAccentOne from "@/UI/buttons/ButtonAccentOne.vue";
import ButtonAccentTwo from "@/UI/buttons/ButtonAccentTwo.vue";
import { Route } from "lucide-vue-next";
import FillerComponent from "../filler/FillerComponent.vue";
const store = useStore(key);

const route = useRoute();

const currentWines = computed(() => store.state.wine.pagination.currentWines);
console.log(route.params.page);
console.log(route.params.wineType);
store.dispatch("setCurrentPageWine", route.params.page);
store.dispatch("setWineType", route.params.wineType);

watch(
  () => route.params.wineType,
  (newType, oldType) => {
    console.log(newType);
    store.dispatch("setWineType", newType);
  }
);
watch(
  () => route.params.page,
  (newPage, oldPage) => {
    store.dispatch("setCurrentPageWine", newPage);
  }
);

const AllPages = computed(() => store.getters.getWinesPages);
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
        {{ $t(`catalog.wineType.${route.params.wineType}`) }}
      </h1>
    </div>
  </section>
  <section
    class="2xl:container w-full md:px-30 px-0 flex-col flex items-center justify-center gap-10"
  >
    <div class="flex flex-row items-center justify-center gap-3">
      <router-link to="/catalog/red/1">
        <ButtonAccentOne
          class="px-5"
          v-if="route.params.wineType == 'red'"
          :text="$t('catalog.wineTypeButtons.red')"
        />
        <ButtonAccentTwo
          class="text-main-2 px-5"
          v-if="route.params.wineType != 'red'"
          :text="$t('catalog.wineTypeButtons.red')"
        />
      </router-link>
      <router-link to="/catalog/white/1">
        <ButtonAccentOne
          class="px-5"
          v-if="route.params.wineType == 'white'"
          :text="$t('catalog.wineTypeButtons.white')"
        />
        <ButtonAccentTwo
          class="text-main-2 px-5"
          v-if="route.params.wineType != 'white'"
          :text="$t('catalog.wineTypeButtons.white')"
        />
      </router-link>
      <router-link to="/catalog/rose/1">
        <ButtonAccentOne
          class="px-5"
          v-if="route.params.wineType == 'rose'"
          :text="$t('catalog.wineTypeButtons.rose')"
        />
        <ButtonAccentTwo
          class="text-main-2 px-5"
          v-if="route.params.wineType != 'rose'"
          :text="$t('catalog.wineTypeButtons.rose')"
        />
      </router-link>
    </div>
    <div class="text-white flex md:flex-row flex-col items-center gap-3">
      <input
        class="p-2 rounded border border-solid border-main-2"
        type="text"
        placeholder="Поиск..."
        v-model="searchText"
        @input="
          () => {
            store.commit('setSearchText', searchText);
            store.commit('setSortedAndSearched');
            store.commit('setCurrentWines');
          }
        "
      />
      <div class="flex flex-row flex-wrap items-center justify-center gap-3">
        <select
          class="bg-transparent p-2 rounded border border-solid border-main-2"
          name=""
          id=""
          v-model="searchKey"
          @change="
            () => {
              store.commit('setFilterKey', searchKey);
              store.commit('setSortedAndSearched');
              store.commit('setCurrentWines');
            }
          "
        >
          <template v-for="(item, index) in searchKeyList" :key="index">
            <option class="bg-transparent text-main-1" :value="item.key">
              {{ $t(`catalog.inputs.searchKeys.${item.key}`) }}
            </option>
          </template>
        </select>
        <select
          class="p-2 rounded border border-solid border-main-2"
          v-model="ascending"
          @change="
            () => {
              store.commit('setAscending', ascending);
              store.commit('setSortedAndSearched');
              store.commit('setCurrentWines');
            }
          "
          name=""
          id=""
        >
          <template v-for="(item, index) in ascendingKeyList" :key="index">
            <option class="text-main-1" :value="item.key">
              {{
                $t(
                  `catalog.inputs.filterOrderKeys.${
                    item.key == "true" ? "ascending" : "descending"
                  }`
                )
              }}
            </option>
          </template>
        </select>
      </div>
    </div>
    <div class="w-full h-max flex items-center justify-center flex-wrap gap-7">
      <WineCard
        v-if="currentWines?.length"
        v-for="(wine, index) in currentWines"
        :key="index"
        :info="wine"
      />
      <FillerComponent v-if="!currentWines?.length" />
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
        <PaginationFirst
          @click="() => router.push(`/catalog/${route.params.wineType}/1`)"
        />
        <PaginationPrevious
          @click="
            () =>
              router.push(
                `/catalog/${route.params.wineType}/${
                  Number(route.params.page) - 1
                }`
              )
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
              @click="
                () =>
                  router.push(`/catalog/${route.params.wineType}/${item.value}`)
              "
            >
              {{ item.value }}
            </Button>
          </PaginationItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>
        <PaginationNext
          @click="
            () =>
              router.push(
                `/catalog/${route.params.wineType}/${
                  Number(route.params.page) + 1
                }`
              )
          "
        />
        <PaginationLast
          @click="
            () =>
              router.push(
                `/catalog/${route.params.wineType}/${Math.ceil(AllPages / 20)}`
              )
          "
        />
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

    ButtonAccentOne,
    ButtonAccentTwo,

    FillerComponent,
  },
  props: { wines: Array<Object> },
  data() {
    return {
      searchText: "",
      searchKey: "wine",
      ascending: true,

      searchKeyList: [
        { key: "wine" },
        { key: "winery" },
        { key: "price" },
        { key: "location" },
      ],
      ascendingKeyList: [{ key: "true" }, { key: "false" }],
    };
  },
};
</script>
<style></style>
