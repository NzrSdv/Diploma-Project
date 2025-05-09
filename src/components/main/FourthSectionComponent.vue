<script setup lang="ts">
import Photo1 from "../../assets/img/FourthSection1_photo.png";
import Photo2 from "../../assets/img/FourthSection2_photo.png";
</script>
<template>
  <section class="">
    <div class="container-md flex md:flex-row px-4 flex-col-reverse justify-center items-center gap-25">
      <div class="flex flex-col gap-2 items-center justify-center">
        <div><img :src="Photo1" alt="" /></div>
        <div><img :src="Photo2" alt="" /></div>
      </div>
      <div class="max-w-150 flex flex-col 2xl:items-start items-center justify-center gap-7 font-main">
        <h3 class="font-medium text-6xl xl:text-start text-center">Вино для особенных моментов</h3>
        <p class="max-w-119 xl:text-start text-center ">
          Мы объединили страсть к виноделию и современный сервис, чтобы сделать
          покупку вина простой, быстрой и приятной. На нашем сайте вы найдете
          тщательно подобранную коллекцию вин из разных уголков планеты: от
          знаменитых французских шато до молодых виноделен Нового Света.
        </p>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "FourtSectionComponent",
};
</script>
<style></style>
