<script setup lang="ts">
import RedWinePhoto from "../../assets/img/RedWine_photo.png";
import WhiteWinePhoto from "../../assets/img/WhiteWine_photo.png";
import RoseWinePhoto from "../../assets/img/RoseWine_photo.jpg";
import ButtonAccentTwo from "../buttons/ButtonAccentTwo.vue";

import { useStore } from "vuex";
import { key } from "@/store/store";

const store = useStore(key);
</script>

<template>
  <div
    class="w-full font-main text-main-2 flex flex-row items-center justify-between"
  >
    <div
      class="size-100 flex flex-col items-center justify-center bg-main-2 rounded-md"
    >
      <div class="w-full flex items-center justify-center">
        <img
          class="w-1/7 h-auto"
          :src="
            CurrentWine?.type == 'red'
              ? RedWinePhoto
              : CurrentWine?.type == 'rose'
              ? RoseWinePhoto
              : WhiteWinePhoto
          "
          alt=""
        />
      </div>
    </div>
    <div
      class="w-full h-full flex flex-col items-center justify-between text-main-2 font-main"
    >
      <h2 class="font-semibold text-3xl">{{ CurrentWine?.wine }}</h2>
      <p class="">{{ CurrentWine?.winery }}</p>
      <div class="flex flex-row items-center justify-center gap-4">
        <ButtonAccentTwo
          @click="
            () => {
              if (CurrentWine?.quantity - 1 > 1) {
                store.commit(
                  'setCartQuantityById',
                  {
                Id: CurrentWine?.id,
                newQ: CurrentWine?.quantity - 1,
              }
                );
              }
            }
          "
          class="px-5 text-main-2"
          text="-"
        />
        <p>{{ CurrentWine?.quantity }}</p>
        <ButtonAccentTwo
          @click="
            () => {
              store.commit('setCartQuantityById', {
                Id: CurrentWine?.id,
                newQ: CurrentWine?.quantity + 1,
              });
            }
          "
          class="px-5 text-main-2"
          text="+"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "CartCard",
  components: {
    ButtonAccentTwo,
  },
  props: {
    CurrentWine: { type: Object, requried: true },
  },
};
</script>
<style></style>
