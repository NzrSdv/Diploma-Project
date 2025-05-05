<template>
  <input
    type="text"
    :placeholder="placeholder"
    class="outline-hidden border-b border-b-solid border-b-accent-2 text-main-2 pb-4"
  />
</template>
<script lang="ts">
export default {
  name: "DeliveryInput",
  props: { placeholder: { type: String, required: true } },
};
</script>
<style></style>
