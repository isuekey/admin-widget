
import commonjs from "@rollup/plugin-commonjs";
import vuePlugin from 'rollup-plugin-vue';
import buble from '@rollup/plugin-buble';
import image from '@rollup/plugin-image';
import css from 'rollup-plugin-import-css';
import { uglify } from 'rollup-plugin-uglify';


export default {
  input: 'src/wrapper.js',
  output: {
    name: 'DayiWidget',
    exports: 'named',
  },
  plugins:[
    css(),
    image(),
    commonjs(),
    vuePlugin({
      css:true,
      compileTemplate:true,
    }),
    buble(),
    uglify(),
  ],
};
