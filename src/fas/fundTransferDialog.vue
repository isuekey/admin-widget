<template>
  <el-dialog :visible.sync="show">
    这是一个弹窗检查一下
  </el-dialog>
</template>

<script>
export default {
  name:"FundTransferDialog",
  props: {
    showDialog:Boolean,
  },
  computed: {
    show:{
      get() {
        const vue = this;
        return !!vue.showDialog;
      },
      set(val) {
        const vue = this;
        vue.$emit('update:showDialog', val);
      },
    }
  }
}
</script>

<style>

</style>