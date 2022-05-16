<template>
<icon :iconSrc="imageData"></icon>
</template>
<script>
import Icon from './Icon.vue';
import StopSvg from '../assets/control-stop.svg';
export default {
  name: 'StopControl',
  components: {
    Icon,
  },
  props: {
    configs: {
      type:Object, default() { return {}; },
    },
  },
  data() {
    return {
      imageData:StopSvg,
    };
  },
}
</script>
