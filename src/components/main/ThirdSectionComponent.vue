<script setup lang="ts">
import ButtonAccentOne from "../../UI/buttons/ButtonAccentOne.vue";
import DeliveryInput from "../../UI/inputs/DeliveryInput.vue";
import DeliverPhoto from "../../assets/img/DeliverySection_photo.png";
</script>
<template>
  <section class="container flex flex-col items-center justify-center gap-20">
    <div class="w-full flex flex-col gap-5 px-30">
      <h2 class="text-4xl font-main font-semibold">Доставка</h2>
      <div class="h-[1px] w-full bg-accent-2"></div>
    </div>
    <div
      class="w-full bg-main-025 pl-44 flex flex-row items-stretch justify-between"
    >
      <div class="flex flex-col gap-13 items-start justify-center font-main">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-4">
            <h2 class="font-bold text-5xl">Вкус винограда — у двери</h2>
            <p>Доставка зависит от места вашего нахождения.</p>
          </div>
          <div class="w-full flex flex-row items-center justify-stretch gap-5">
            <DeliveryInput class="w-1/2" placeholder="Ваше имя" />
            <DeliveryInput class="w-1/2" placeholder="Ваш телефон" />
          </div>
        </div>
        <ButtonAccentOne
          text="ЗАКАЗАТЬ ДОСТАВКУ"
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
