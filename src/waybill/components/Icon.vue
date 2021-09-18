<template>
<img :src="iconSrc" :width="iconWidth" :height="iconHeight" :class="iconClass"/>
</template>
<script>
export default {
  name:'IconContainer',
  props: {
    iconSrc: String,
    iconWidth:{
      type:[String, Number],
      default: 24
    },
    iconHeight:{
      type:[String, Number],
      default: 24
    },
    iconClass: String,
  },
}
</script>
