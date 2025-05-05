<script setup lang="ts">
import ReviewCard from "../../UI/cards/ReviewCard.vue";
import { Transition } from "vue";
</script>
<template>
  <section
    class="container font-main flex flex-col items-center justify-center gap-14"
  >
    <div class="flex flex-col items-center justify-center gap-2">
      <h4 class="text-xl uppercase">что о нас говорят?</h4>
      <h2 class="font-bold text-5xl">Отзывы о нас</h2>
    </div>
    <div class="flex flex-col items-center justify-center gap-12">
      <div class="overflow-hidden flex flex-row">
        <button @click="ReviewGo()">Go Down</button>
        <Transition name="move">
          <div
            class="flex flex-row items-center jusitfy-center gap-10"
            v-if="!animationStatus"
          >
            <ReviewCard
              v-for="(review, index) in currentReviews"
              :key="index"
              :review="review"
            />
          </div>
        </Transition>
        <button
          @click="reviewTo(currentReviewSlide == 2 ? 0 : currentReviewSlide+1)"
        >
          Go UP
        </button>
      </div>
      <div class="flex flex-row items-center justify-center gap-2">
        <button
          v-for="(review, index) in reviews"
          :key="index"
          :class="[
            'size-3 rounded-full',
            index == currentReviewSlide ? 'bg-gray-1' : 'bg-light-1',
          ]"
          @click="reviewTo(index)"
        ></button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
export default {
  name: "FifthSectionComponent",
  components: { ReviewCard },
  data() {
    return {
      reviews: [
        [
          {
            review:
              "1 Это текст о компании. Он необходим для дальнейшего продвижения Вашего сайта. Вам будет необходимо предоставить исходные данные, по которым наши копирайтеры составят правильный текст, который будет содержать в себе информацию.",
            author: "Иванов Иван",
          },
          {
            review:
              "2 Это текст о компании. Он необходим для дальнейшего продвижения Вашего сайта. Вам будет необходимо предоставить исходные данные, по которым наши копирайтеры составят правильный текст, который будет содержать в себе информацию.",
            author: "Иванов Иван",
          },
        ],
        [
          {
            review:
              "3 Это текст о компании. Он необходим для дальнейшего продвижения Вашего сайта. Вам будет необходимо предоставить исходные данные, по которым наши копирайтеры составят правильный текст, который будет содержать в себе информацию.",
            author: "Иванов Иван",
          },
          {
            review:
              "4 Это текст о компании. Он необходим для дальнейшего продвижения Вашего сайта. Вам будет необходимо предоставить исходные данные, по которым наши копирайтеры составят правильный текст, который будет содержать в себе информацию.",
            author: "Иванов Иван",
          },
        ],
        [
          {
            review:
              "5 Это текст о компании. Он необходим для дальнейшего продвижения Вашего сайта. Вам будет необходимо предоставить исходные данные, по которым наши копирайтеры составят правильный текст, который будет содержать в себе информацию.",
            author: "Иванов Иван",
          },
          {
            review:
              "6 Это текст о компании. Он необходим для дальнейшего продвижения Вашего сайта. Вам будет необходимо предоставить исходные данные, по которым наши копирайтеры составят правильный текст, который будет содержать в себе информацию.",
            author: "Иванов Иван",
          },
        ],
      ],
      currentReviews: [{}],
      currentReviewSlide: 0,
      animationStatus: false,
    };
  },
  methods: {
    ReviewGo() {
      this.animationStatus = true;
      setTimeout(() => {
        if (this.currentReviewSlide == 2) {
          this.currentReviewSlide = 0;
          this.currentReviews = this.reviews[this.currentReviewSlide];
        } else {
          this.currentReviewSlide++;
          this.currentReviews = this.reviews[this.currentReviewSlide];
        }
        this.animationStatus = false;
      }, 790);
    },
    reviewTo(newPage: number) {
      this.animationStatus = true;

      setTimeout(() => {
        this.currentReviewSlide = newPage;
        this.currentReviews = this.reviews[this.currentReviewSlide];
        this.animationStatus = false;
      }, 790);
    },
  },
  created() {
    this.currentReviews = this.reviews[0];
  },
};
</script>
<style scoped>
.move-enter-active {
  animation: fade 0.8s;
}
.move-leave-active {
  animation: fade 0.8s reverse;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
