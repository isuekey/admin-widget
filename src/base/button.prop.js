const buttonProps = {
  type:{
    type:String, default:'text'
  },
  label: {
    type:String, default:'按钮', required:true,
  },
  size: {
    type:String, default:'small'
  },
  plain:Boolean,
  round:Boolean,
  circle:Boolean,
  disabled:Boolean,
  icon:String,
}
export default buttonProps;
export {
  buttonProps
};
