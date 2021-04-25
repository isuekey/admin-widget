
import commonjs from "@rollup/plugin-commonjs";
import vuePlugin from 'rollup-plugin-vue';
import buble from '@rollup/plugin-buble';
import svg from 'rollup-plugin-svg';


export default {
  input: 'src/wrapper.js',
  output: {
    name: 'DayiWidget',
    exports: 'named',
  },
  plugins:[
    svg(),
    commonjs(),
    vuePlugin({
      css:true,
      compileTemplate:true,
    }),
    buble(),
  ],
};
