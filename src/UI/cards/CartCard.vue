<script setup lang="ts">
import RedWinePhoto from "../../assets/img/RedWine_photo.png";
import WhiteWinePhoto from "../../assets/img/WhiteWine_photo.png";
import RoseWinePhoto from "../../assets/img/RoseWine_photo.jpg";
import ButtonAccentTwo from "../buttons/ButtonAccentTwo.vue";

import DisabledHeart from "../../assets/icons/Heart_disabled_icon.svg";
import ActiveStar from "../../assets/icons/Star_active_icon.svg";
import DisabledStar from "../../assets/icons/Star_disabled_icon.svg";

import { useStore } from "vuex";
import { key } from "@/store/store";
import ButtonAccentOne from "../buttons/ButtonAccentOne.vue";
import { toast } from "vue-sonner";

const store = useStore(key);
</script>

<template>
  <div
    class="w-full font-main text-main-2 flex flex-row items-center justify-between"
  >
    <div
      class="size-110 bg-main-2 flex flex-col items-center justify-center relative"
    >
      <div class="size-6 absolute top-5 right-5 duration-300 hover:scale-110">
        <img class="w-full h-auto" :src="DisabledHeart" alt="" />
      </div>
      <div class="w-1/5 h-auto">
        <img
          class=""
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
      <div class="flex items-center justify-center absolute bottom-5 left-5">
        <div class="size-6" v-for="(star, index) in ratingStars" :key="index">
          <img
            class="w-full h-auto"
            :src="star ? ActiveStar : DisabledStar"
            alt=""
          />
        </div>
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
              if (CurrentWine?.quantity - 1 >= 1) {
                store.commit('setCartQuantityById', {
                  Id: CurrentWine?.id,
                  newQ: CurrentWine?.quantity - 1,
                });
                store.commit('setTotal');
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
              store.commit('setTotal');
            }
          "
          class="px-5 text-main-2"
          text="+"
        />
      </div>
      ${{ CurrentWine?.price }}
      <ButtonAccentOne
        @click="
          () => {
            store.commit('removeFromCartById', CurrentWine?.id);
            store.commit('setTotal');
            toast(`Вино ${CurrentWine?.wine} удалено из корзины`, {
              description: '',
              action: {
                label: 'ОК',
                onClick: () => console.log('ок'),
              },
            });
          }
        "
        padding="px-10 py-2"
        radius="rounded-sm"
        text="Удалить из корзины"
      />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "CartCard",
  components: {
    ButtonAccentTwo,
    ButtonAccentOne,
  },
  props: {
    CurrentWine: { type: Object, requried: true },
  },
  data(vm) {
    return {
      ratingStars: [0, 0, 0, 0, 0],
    };
  },
  created() {
    this.ratingStars.forEach((element, index) => {
      if (Math.round(Number(this.CurrentWine?.rating?.average)) >= index + 1) {
        this.ratingStars[index] = 1;
      } else {
        this.ratingStars[index] = 0;
      }
    });
  },
};
</script>
<style></style>
