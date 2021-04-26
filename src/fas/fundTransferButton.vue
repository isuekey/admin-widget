<template>
  <div v-loading="loadingMask && loading" class="display-inline-block">
    <el-button v-bind="buttonConfig" :loading="buttonLoading" @click="handleButtonClick"/>
    <fund-transfer-dialog :showDialog.sync="showDialog" />
  </div>
</template>

<script>
import { uuid } from 'simple-uuidv4';
import fundTransferDialog from './fundTransferDialog.vue';
import buttonProps from '../base/button.prop.js';
import '../base/base.css';

const props = Object.assign({}, buttonProps, {
  loadingMask:Boolean,
  buttonData:{
    type:Object, default(){ return {}; },
  }
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
