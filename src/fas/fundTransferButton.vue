<template>
  <div v-loading="loadingMask && loading" :class="buttonlClass">
    <el-button 
      :type="type":loading="buttonLoading" :size="size" 
      :plain="plain" :round="round" :circle="circle"
      :disabled="disabled" :icon="icon"
      @click="handleButtonClick"
      >{{label}}</el-button>
    <fund-transfer-dialog :showDialog.sync="showDialog" />
  </div>
</template>

<script>
import { uuid } from 'simple-uuidv4';
import fundTransferDialog from './fundTransferDialog.vue';
import buttonProps from '../base/button.prop.js';

const props = Object.assign({}, buttonProps, {
  loadingMask:Boolean,
  buttonData:{
    type:Object, default(){ return {}; },
  },
  buttonClass:String,
});
export default {
  name: 'FundTransferButton',
  uuid: uuid(),
  components: {
    fundTransferDialog,
  },
  props,
  data() {
    const vue = this;
    return {
      loadig:false,
      buttonLoading:false,
      showDialog:false,
    }
  },
  methods:{
    handleButtonClick(){
      const vue = this;
      vue.showDialog = true;
    }
  }
}
</script>
