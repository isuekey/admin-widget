<template>
<div role="ratio-container" class="ratio-container" :style="ratioStyle">
  <div role="realcontainer" class="realcontainer">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name:"RatioContainer",
  props: {
    ratio:{
      type: Number, default: 0.75,
    },
  },
  data() {
    return {};
  },
  computed: {
    ratioStyle() {
      const vue = this;
      return {
        ['padding-bottom']: `${vue.ratio * 100}%`,
      };
    },
  }
}
</script>

<style>
[role="ratio-contaienr"].ratio-container {
  position:relative;
  width:100%;
}
[role="ratio-contaienr"].ratio-container > [role="realcontainer"].realcontainer {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
