<template>
  <div :class="className" :id="amapId">
    <log v-if="false" 
      :className="className" :loadPoint="loadPoint" :unloadPoint="unloadPoint"
      :loadRule="loadRule" :unloadRule="unloadRule" :amap="amap"
      />
  </div>
</template>

<script>
import log from './components/log.vue';
import {uuid as uuidv4} from 'simple-uuidv4';
import * as mapUtils from './lib/map.utils.js';

export default {
  name:'AmapRoute',
  components:{
    log,
  },
  props:{
    className:String,
    loadPoint:Array,
    unloadPoint:Array,
    loadRule:Function,
    unloadRule:Function,
    amap:null,
    avoid:{
      type:Array, default(){return [10, 10, 10, 10]; },
    }
  },
  data(){
    // const vue = this;
    const amapId = uuidv4();
    return {
      amapResolve:null,
      amapId:amapId,
      containerResolve:null,
    };
  },
  mounted(){
    const vue = this;
    if(!vue.amap) return;
    if(!vue.amapResolve) {
      vue.amapResolve = Promise.resolve(vue.amap);
    }
    vue.drawRoute();
  },
  updated(){
    const vue = this;
    if(!vue.amap) return;
    if(!vue.amapResolve) {
      vue.amapResolve = Promise.resolve(vue.amap);
    }
    vue.drawRoute();
  },
  methods: {
    drawRoute() {
      const vue = this;
      mapUtils.loadUnload.renderTheRoute(vue).then(ok => {
        vue.$emit('drawRoute', ok);
      }).catch(err=>{
        console.log(err);
      });
    }
  }
}
</script>

