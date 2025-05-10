<script setup lang="ts">
import RedWhine from "../../assets/img/RedWine_photo.png";
import WhiteWine from "../../assets/img/WhiteWine_photo.png";

import ActiveStar from "../../assets/icons/Star_active_icon.svg";
import DisabledStar from "../../assets/icons/Star_disabled_icon.svg";

import ActiveHeart from "../../assets/icons/Heart_active_icon.svg";
import DisabledHeart from "../../assets/icons/Heart_disabled_icon.svg";
</script>

<template>
  <router-link :to="`/redWines/${info.id}`">
    <div
      :class="[
        'xl:w-88 w-70 xl:h-98 h-90 flex flex-col rounded-xl font-accent relative pt-10',
        info.type == 'red' || info.type == 'rose' ? 'bg-main-2' : 'bg-main-3',
      ]"
    >
      <div
        class="absolute size-8 right-1 top-2 flex items-center justify-center duration-200 hover:scale-110 cursor-pointer"
      >
        <img :src="DisabledHeart" alt="" />
      </div>
      <div
        class="flex h-full flex-col items-center justify-between text-main-05"
      >
        <div class="xl:w-12 w-10 xl:h-50 h-45">
          <img
            :src="
              info.type == 'red' || info.type == 'rose' ? RedWhine : WhiteWine
            "
            alt=""
          />
        </div>
        <div class="w-full flex flex-col items-start justify-center pl-6 pb-6">
          <h3>{{ info.wine }}</h3>
          <p class="font-semibold text-lg">
            ${{ info.price }}
          </p>
          <div class="flex items-center justify-center gap-2">
            <div class="flex items-center justify-center">
              <div
                class="size-4"
                v-for="(star, index) in ratingStars"
                :key="index"
              >
                <img :src="star ? ActiveStar : DisabledStar" alt="" />
              </div>
            </div>
            {{ info.rating.average }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script lang="ts">
export default {
  name: "WineCard",
  props: {
    info: { type: Object, required: true },
  },
  data() {
    return {
      ratingStars: [0, 0, 0, 0, 0],
    };
  },
  created() {
    this.ratingStars.forEach((element, index) => {
      if (Math.round(Number(this.info.rating.average)) >= index + 1) {
        this.ratingStars[index] = 1;
      } else {
        this.ratingStars[index] = 0;
      }
    });
  },
};
</script>
<style lang=""></style>
