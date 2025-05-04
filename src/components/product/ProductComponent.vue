<script setup lang="ts">
import RedWinePhoto from "../../assets/img/RedWine_photo.png";
import WhiteWinePhoto from "../../assets/img/WhiteWine_photo.png";

import ActiveStar from "../../assets/icons/Star_active_icon.svg";
import DisabledStar from "../../assets/icons/Star_disabled_icon.svg";

import ActiveHeart from "../../assets/icons/Heart_active_icon.svg";
import DisabledHeart from "../../assets/icons/Heart_disabled_icon.svg";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
</script>
<template>
  <main class="">
    <section
      class="section mt-25 bg-main-025 py-20 px-30 flex flex-row items-center justify-between gap-40"
    >
      <div
        class="w-1/2 h-160 bg-main-2 flex flex-col items-center justify-center relative"
      >
        <div class="size-6 absolute top-5 right-5 duration-300 hover:scale-110">
          <img class="w-full h-auto" :src="DisabledHeart" alt="" />
        </div>
        <div class="w-28 h-120">
          <img
            class=""
            :src="currentProduct.type == 'red' ? RedWinePhoto : WhiteWinePhoto"
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
        class="w-1/2 font-main text-main-2 flex flex-col items-start justify-center gap-7"
      >
        <h1 class="text-6xl">{{ currentProduct.wine }}</h1>
        <p class="text-6xl font-semibold">
          ${{
            currentProduct.price < 10
              ? currentProduct.price * 100
              : currentProduct.price
          }}
        </p>

        <div class="flex flex-col items-start justify-center gap-15">
          <p class="text-base">
            Мини-описание. Это текст о компании. Он необходим для дальнейшего
            продвижения Вашего сайта. Вам будет необходимо предоставить исходные
            данные, по которым наши копирайтеры составят правильный текст
          </p>
          <ButtonAccentOne text="ЗАКАЗАТЬ ДОСТАВКУ" padding="py-4 px-17" radius="rounded-md"/>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
export default {
  name: "ProductComponent",
  components: { ButtonAccentOne },
  data() {
    return {
      currentProduct: {},
      ratingStars: [0, 0, 0, 0, 0],
    };
  },
  created() {
    this.currentProduct = JSON.parse(
      localStorage.getItem("redWines") || "[]"
    ).filter((wine) => wine.id == this.$route.params.WineId)[0];
    console.log(this.currentProduct);
    this.ratingStars.forEach((element, index) => {
      if (Math.round(Number(this.currentProduct.rating.average)) >= index + 1) {
        this.ratingStars[index] = 1;
      } else {
        this.ratingStars[index] = 0;
      }
    });
  },
};
</script>
<style></style>
