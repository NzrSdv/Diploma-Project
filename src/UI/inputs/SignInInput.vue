<template lang="">
  <div class="flex flex-col">
    <label for="">{{ title }}</label>
    <input
      class="border-2 border-solid border-main-2 px-4 py-2 rounded-md duration-400 focus:scale-105 focus:outline-hidden placeholder:capitalize"
      :type="inputType"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="this.$emit('changeEmail', inputValue)"
    />
  </div>
</template>
<script>
export default {
  name: "SignInInput",
  datat() {
    return {
      inputValue: "",
    };
  },
  props: {
    title: { type: String, required: true },
    inputType: { type: String, required: true },
    placeholder: { type: String, required: true },
  },
};
</script>
<style lang=""></style>
