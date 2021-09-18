<template>
<icon :iconSrc="imageData"></icon>
</template>
<script>
import Icon from './Icon.vue';
import ResumeSvg from '../assets/control-resume.svg';
export default {
  name: 'ResumeControl',
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
      imageData:ResumeSvg,
    };
  },
}
</script>
