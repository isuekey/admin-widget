<template>
<icon :iconSrc="imageData"></icon>
</template>
<script>
import Icon from './Icon.vue';
import PauseSvg from '../assets/control-pause.svg';
export default {
  name: 'PauseControl',
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
      imageData:PauseSvg,
    };
  },
}
</script>
