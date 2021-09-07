<template>
<div class="workarea" ref="workarea">
  <div class="workarea-left" v-if="showDirectory" :style="contentStyle">
    <slot name="directory">目录内容</slot>
  </div>
  <div class="workarea-divider" :draggable="draggable" @dragstart="handleDragStart" @dragover="handleDragOver" @dragend="handleDragEnd">
  </div>
  <div class="workarea-right" v-if="showContent">
    <slot></slot>
  </div>
</div>
</template>

<script>
import * as simpleUUIdv4 from 'simple-uuidv4';
const calcLeftWidthPercent = (evt={}, ele={}) => {
  const {clientWidth, offsetLeft, offsetTop } = ele;
  const {pageX} = evt;
  // console.log('calc',clientWidth, offsetLeft, offsetTop, rightLeft, evt);
  const rightLeft = pageX - offsetLeft;
  const minLeft = Math.max(10, clientWidth * 0.05);
  const maxLeft = Math.max(clientWidth - 10,  clientWidth * 0.95);
  const percent = rightLeft < minLeft ? minLeft : (rightLeft > maxLeft ? maxLeft : rightLeft);
  return (percent * 100) / clientWidth;
}
export default {
  name:'WorkArea',
  data(){
    return {
      minWidth:'',
    };
  },
  props:{
    showDirectory: Boolean,
    showContent: Boolean,
    draggable:Boolean,
    dragStart:Function,
    dragOver:Function,
    dragEnd:Function,
    leftBegin:{type:String, default:'auto'},
  },
  computed: {
    contentStyle() {
      const vue = this;
      return {
        minWidth: vue.minWidth || vue.leftBegin,
        maxWidth: vue.minWidth || vue.leftBegin,
      };
    },
  },
  methods: {
    handleDragStart(evt){
      const vue = this;
      if(!vue.draggable) return;
      const uuid = simpleUUIdv4.uuid();
      vue.uuid = uuid;
      if(vue.dragStart) {
        return vue.dragStart(evt, vue.$refs.workarea);
      }
      // const data = JSON.stringify(vue.start);
      // console.log('handleDragStart', evt, 'client properties', clientWidth, offsetLeft, offsetTop, data);
    },
    handleDragOver(evt) {
      const vue = this;
      if(!vue.draggable || !vue.uuid) return;
      if(vue.dragOver) {
        return vue.dragOver(evt, vue.$refs.workarea);
      }
      vue.minWidth = calcLeftWidthPercent(evt, vue.$refs.workarea)+'%';
    },
    handleDragEnd(evt) {
      const vue = this;
      if(!vue.draggable || !vue.uuid) return;
      vue.uuid = null;
      if(vue.dragEnd) {
        return vue.dragEnd(evt, vue.$refs.workarea);
      }
      vue.minWidth = calcLeftWidthPercent(evt, vue.$refs.workarea)+'%';
    },
  },
}
</script>

<style scoped>
.workarea {
  display:flex;
  flex-direction:row;
  height:100%;
  width: 100%;
}

.workarea-left {
  height:100%;
  overflow-y:auto;
}

.workarea-divider {
  min-width:4px;
  background-color:#fff;
}

[draggable="true"].workarea-divider:hover,
[draggable="true"].workarea-divider:active{
  filter:invert(0.5);
  cursor:col-resize;
}

.workarea-right {
  height:100%;
  flex:1;
  overflow-y:auto;
}
</style>
