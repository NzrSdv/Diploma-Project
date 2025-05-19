<script setup lang="ts">
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import DeliveryInput from "../../UI/inputs/DeliveryInput.vue";
import DeliverPhoto from "../../assets/img/DeliverySection_photo.png";
</script>
<template>
  <section
    class="2xl:container w-full flex flex-col items-center justify-center gap-20"
  >
    <div class="w-full flex flex-col gap-5 md:px-30 px-4">
      <h2 class="text-4xl font-main font-semibold">
        {{ $t("main.section3.title") }}
      </h2>
      <div class="h-[1px] w-full bg-accent-2"></div>
    </div>
    <div
      class="w-full bg-main-025 lg:pl-44 px-10 xl:pt-0 py-30 flex xl:flex-row flex-col xl:items-stretch items-center justify-between"
    >
      <div
        class="flex flex-col gap-13 md:items-start items-stretch justify-center font-main"
      >
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <h2
              class="font-bold md:text-start text-center md:text-5xl text-3xl"
            >
              {{ $t("main.section3.content.title") }}
            </h2>
            <p class="md:flex-base md:text-start text-center flex-xs">
              {{ $t("main.section3.content.subTitle") }}
            </p>
          </div>
          <div
            class="w-full flex md:flex-row flex-col items-center justify-stretch md:gap-5 gap-10"
          >
            <DeliveryInput
              class="md:w-1/2 w-full"
              :placeholder="$t('main.section3.content.namePlaceHolder')"
            />
            <DeliveryInput
              class="md:w-1/2 w-full"
              :placeholder="$t('main.section3.content.emailPlaceHolder')"
            />
          </div>
        </div>
        <ButtonAccentOne
          :text="$t('main.section3.content.orderButtonText')"
          class="uppercase"
          padding="px-14 py-4"
          radius="rounded-md"
        />
      </div>
      <div class="flex items-center">
        <img :src="DeliverPhoto" alt="" />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "ThirdSectionComponent",
  components: { ButtonAccentOne, DeliveryInput },
};
</script>
<style></style>
