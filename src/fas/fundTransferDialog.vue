<template>
  <el-dialog 
    :visible.sync="show" append-to-body
    :close-on-click-modal="false"
    v-loading="loading" center
    :title="dialogTitle"
    >
    <el-form ref="fundTransferForm" :model="widthdrawInfo" class="inline-form">
      <el-row>
        <el-col>
          <el-form-item label="转出虚户名称" prop="outer.accountInfo">
            <el-input v-model="widthdrawInfo.outer.accountInfo"/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="选择转出账户" prop="outer.accountInfo">
            <el-input v-model="widthdrawInfo.outer.accountInfo"/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="转出虚户名称" prop="outer.accountInfo">
            <el-input v-model="widthdrawInfo.outer.accountInfo"/>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="转出虚户名称" prop="outer.accountInfo">
            <el-input v-model="widthdrawInfo.outer.accountInfo"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name:"FundTransferDialog",
  props: {
    showDialog:Boolean,
    dialogTitle:String,
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
