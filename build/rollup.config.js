
import commonjs from "@rollup/plugin-commonjs";
import vuePlugin from 'rollup-plugin-vue';
import buble from '@rollup/plugin-buble';
import svg from 'rollup-plugin-svg';
import css from 'rollup-plugin-import-css';


export default {
  input: 'src/wrapper.js',
  output: {
    name: 'DayiWidget',
    exports: 'named',
  },
  plugins:[
    css(),
    svg(),
    commonjs(),
    vuePlugin({
      css:true,
      compileTemplate:true,
    }),
    buble(),
  ],
};
