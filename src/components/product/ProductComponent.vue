<script setup lang="ts">
import RedWinePhoto from "../../assets/img/RedWine_photo.png";
import WhiteWinePhoto from "../../assets/img/WhiteWine_photo.png";
import RoseWinePhoto from "../../assets/img/RoseWine_photo.jpg";

import ActiveStar from "../../assets/icons/Star_active_icon.svg";
import DisabledStar from "../../assets/icons/Star_disabled_icon.svg";

import ActiveHeart from "../../assets/icons/Heart_active_icon.svg";
import DisabledHeart from "../../assets/icons/Heart_disabled_icon.svg";
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";

interface Rating {
  average: number;
  reviews: number;
}
interface Wine {
  id: string;
  name: string;
  location: string;
  rating: Rating;
  image: string;
  price: number;
  type: string;
}
</script>
<template>
  <section
    class="2xl:section w-full mt-25 bg-main-025 xl:py-20 py-4 xl:px-30 px-4 flex xl:flex-row flex-col items-center justify-between xl:gap-40 gap-4"
  >
    <div
      class="xl:w-1/2 md:w-2/3 w-full xl:h-160 h-120 bg-main-2 flex flex-col items-center justify-center relative"
    >
      <div class="size-6 absolute top-5 right-5 duration-300 hover:scale-110">
        <img class="w-full h-auto" :src="DisabledHeart" alt="" />
      </div>
      <div class="xl:mt-0 mt-10 xl:w-28 w-20 xl:h-120 h-110">
        <img
          class=""
          :src="
            currentProduct.type == 'red'
              ? RedWinePhoto
              : currentProduct.type == 'rose'
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
      class="xl:w-1/2 w-full font-main text-main-2 flex flex-col xl:items-start items-center justify-center gap-7"
    >
      <h1 class="md:text-6xl text-4xl md:text-start text-center">
        {{ currentProduct.wine }}
      </h1>
      <p class="md:text-6xl text-4xl font-semibold">
        ${{
          currentProduct.price < 10
            ? currentProduct.price * 100
            : currentProduct.price
        }}
      </p>

      <div
        class="flex flex-col xl:items-start items-center justify-center gap-15"
      >
        <p
          class="xl:max-w-full md:max-w-2/3 max-w-full xl:text-start text-center text-base"
        >
          Мини-описание. Это текст о компании. Он необходим для дальнейшего
          продвижения Вашего сайта. Вам будет необходимо предоставить исходные
          данные, по которым наши копирайтеры составят правильный текст
        </p>
        <ButtonAccentOne
          class="sm:w-auto w-full"
          text="ЗАКАЗАТЬ ДОСТАВКУ"
          padding="py-4 sm:px-17 px-auto"
          radius="rounded-md"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "ProductComponent",
  components: { ButtonAccentOne },
  data() {
    return {
      currentProduct: {
        id: "",
        name: "",
        location: "",
        rating: {
          average: 0,
          reviews: 0,
        },
        image: "",
        price: 0,
        type: "",
      },
      ratingStars: [0, 0, 0, 0, 0],
    };
  },
  created() {
    if (this.$route.params.wineType == "rose") {
      this.currentProduct = JSON.parse(
        localStorage.getItem("roseWines") || "{}"
      ).filter((wine: Wine) => wine.id == this.$route.params.WineId)[0];
    } else if (this.$route.params.wineType == "red") {
      this.currentProduct = JSON.parse(
        localStorage.getItem("redWines") || "{}"
      ).filter((wine: Wine) => wine.id == this.$route.params.WineId)[0];
    } else if (this.$route.params.wineType == "white") {
      this.currentProduct = JSON.parse(
        localStorage.getItem("whiteWines") || "{}"
      ).filter((wine: Wine) => wine.id == this.$route.params.WineId)[0];
    }
    
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
