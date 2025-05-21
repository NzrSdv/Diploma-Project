<script setup lang="ts">
// @ts-nocheck
import ButtonWithArrow from "@/UI/buttons/ButtonWithArrow.vue";
import ReviewCard from "@/UI/cards/ReviewCard.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import { TransitionGroup, watch } from "vue";

const breakpoints = useBreakpoints(breakpointsTailwind);

const xl = breakpoints.greaterOrEqual("xl");

</script>

<template lang="">
  <div class="flex h-full flex-col items-center justify-center gap-12">
    <div
      class="overflow-hidden h-full flex flex-row items-center justify-center gap-4"
    >
      <ButtonWithArrow
        @click="
          () => {
            updateAnimationName('moveRight');
            reviewTo(currentReviewSlide == 0 ? 5 : currentReviewSlide - 1);
          }
        "
        :reverse="true"
      />
      <TransitionGroup
        tag="div"
        class="flex xl:flex-row flex-col gap-10"
        :name="animationName"
      >
        <ReviewCard
          class="w-full"
          v-for="(item, index) in currentReviews"
          :key="item"
          :review="item"
          :data-index="index"
        />
      </TransitionGroup>

      <ButtonWithArrow
        @click="
          () => {
            updateAnimationName('moveLeft');
            reviewTo(currentReviewSlide == 5 ? 0 : currentReviewSlide + 1);
          }
        "
        :reverse="false"
      />
    </div>
    <div class="flex flex-row items-center justify-center gap-2">
      <button
        v-for="(review, index) in reviews"
        :key="index"
        :class="[
          'size-3 rounded-full',
          index == currentReviewSlide ? 'bg-white/50' : 'bg-white/90',
        ]"
        @click="
          () => {
            reviewTo(index);
          }
        "
      ></button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "SliderComponent",
  components: { ButtonWithArrow, ReviewCard },
  data() {
    return {
      reviews: [
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
      currentReviews: [{}],
      currentReviewSlide: 0,
      animationName: "moveLeft",
      isAnimationGoingLeft: false,
    };
  },
  methods: {
    updateAnimationName(newName: string) {
      this.animationName = newName;
    },
    reviewTo(newPage: number) {
      this.currentReviewSlide = newPage;
      this.currentReviews = [];
      if (this.animationName == "moveLeft") {
        this.currentReviews.push(
          this.reviews[this.currentReviewSlide % this.reviews.length]
        );

        this.currentReviews.push(
          this.reviews[(this.currentReviewSlide + 1) % this.reviews.length]
        );
      } else if (this.animationName == "moveRight") {
        this.currentReviews = [];
        this.currentReviews.unshift(
          this.reviews[(this.currentReviewSlide + 1) % this.reviews.length]
        );
        this.currentReviews.unshift(
          this.reviews[this.currentReviewSlide % this.reviews.length]
        );
      }
    },
  },
  created() {
    this.currentReviews = [];
    this.currentReviews.push(this.reviews[0]);
    this.currentReviews.push(this.reviews[1]);
  },
};
</script>
<style scoped>
.moveLeft-move,
.moveLeft-enter-active,
.moveLeft-leave-active {
  transition: opacity ease-in-out 0.5s, transform 0.8s ease-in-out,
    position ease-in-out 0.1s;
  opacity: 1;
  z-index: 2;

  transform: scale(1) translateX(0);
}
.moveLeft-enter-from {
  transform: scale(0.1) translateX(100%);
  opacity: 0;
}
.moveLeft-leave-to {
  transform: scale(0.1) translateX(-100%);
  opacity: 0;
}
.moveLeft-leave-active {
  position: absolute;
  z-index: 1;
}

.moveRight-move,
.moveRight-enter-active,
.moveRight-leave-active {
  transition: opacity ease-in-out 0.5s, transform 0.8s ease-in-out;
  z-index: 2;

  transform: scale(1) translateX(0);
  opacity: 1;
}
.moveRight-enter-from {
  transform: scale(0.1) translateX(-100%);
  opacity: 0;
}
.moveRight-leave-to {
  transform: scale(0.1) translateX(100%);
  opacity: 0;
}
.moveRight-leave-active {
  position: absolute;
  z-index: 1;
}
</style>
