<script setup lang="ts">
import ButtonProfile from "../buttons/ButtonProfile.vue";
</script>
<template>
  <div class="flex items-center justify-center gap-3">
    {{ title }}:
    <input
      class="border border-solid border-main-1 px-4 py-2 rounded-md"
      type="text"
      v-model="currentText"
      @input="
        (event) => {
          if (event?.target?.value.trim() == '' || currentText == mainText) {
            isChanged(false);
          } else {
            isChanged(true);
          }
        }
      "
    />
    <ButtonProfile
      v-if="changed"
      @click="
        () => {
          $emit('changeInput', currentText);
          isChanged(false);
        }
      "
      >Изменить</ButtonProfile
    >
    <ButtonProfile v-if="changed" @click="isChanged(false)"
      >Сбросить</ButtonProfile
    >
  </div>
</template>
<script lang="ts">
export default {
  name: "ProfileInput",
  components: { ButtonProfile },
  data() {
    return {
      currentText: this.value,
      changed: false,
      mainText: this.value,
    };
  },
  methods: {
    isChanged(newValue: boolean) {
      this.changed = newValue;
    },
    changedText(newText: string) {
      this.currentText = newText;
    },
  },
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    mainValue: { type: String, required: true },
  },
  updated() {},
};
</script>
