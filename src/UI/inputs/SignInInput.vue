<template lang="">
  <div class="flex flex-col font-accent gap-2">
    <label class="capitalize" for="">{{ title }}</label>
    <input
      class="border-2 border-solid border-main-2 px-4 py-2 rounded-md focus:outline-hidden placeholder:capitalize"
      :type="inputType ? inputType : 'text'"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="this.$emit('change', inputValue)"
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
    inputType: { type: String, required: false },
    placeholder: { type: String, required: true },
  },
};
</script>
<style lang=""></style>
