<template>
  <div class="flex items-center justify-center gap-3">
    {{ title }}:
    <input :readonly="readonly" class="border border-solid border-main-2/10 px-4 py-2 rounded-md " type="text" :value="value" @input="(text) => {$emit('changeInput')}" />
  </div>
</template>
<script lang="ts">

export default {
    name:"ProfileInput",
    props:{
        title:{type:String,required:true},
        value:{type:String,required:true},
        readonly:{type:Boolean,required:true}
    }
}
</script>
