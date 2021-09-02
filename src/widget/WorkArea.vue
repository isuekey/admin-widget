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
export default {
  name:'WorkArea',
  data(){
    return {
      minWidth:'auto',
    };
  },
  props:{
    showDirectory: Boolean,
    showContent: Boolean,
    draggable:Boolean,
    dragStart:Function,
    dragOver:Function,
    dragEnd:Function,
  },
  computed: {
    contentStyle() {
      const vue = this;
      return {
        minWidth: vue.minWidth,
        maxWidth: vue.minWidth,
      };
    },
  },
  methods: {
    handleDragStart(evt){
      const vue = this;
      if(!vue.draggable) return;
      if(vue.dragStart) {
        return vue.dragStart(evt, vue.$refs.workarea);
      }
      // const data = JSON.stringify(vue.start);
      // console.log('handleDragStart', evt, 'client properties', clientWidth, offsetLeft, offsetTop, data);
    },
    handleDragOver(evt) {
      const vue = this;
      if(!vue.draggable) return;
      if(vue.dragOver) {
        return vue.dragOver(evt, vue.$refs.workarea);
      }
      const {clientWidth, offsetLeft, offsetTop } = vue.$refs.workarea;
      const rightLeft = clientWidth + offsetLeft - evt.clientX;
      const minLeft = Math.max(10, clientWidth * 0.05);
      const maxLeft = Math.max(clientWidth - 10,  clientWidth * 0.95);
      const percent = rightLeft < minLeft ? minLeft : (rightLeft > maxLeft ? maxLeft : rightLeft);
      vue.minWidth = (100-(percent * 100) / clientWidth) + '%';
    },
    handleDragEnd(evt) {
      const vue = this;
      if(!vue.draggable) return;
      if(vue.dragEnd) {
        return vue.dragEnd(evt, vue.$refs.workarea);
      }
      const {clientWidth, offsetLeft, offsetTop } = vue.$refs.workarea;
      const rightLeft = clientWidth + offsetLeft - evt.clientX;
      const minLeft = Math.max(10, clientWidth * 0.05);
      const maxLeft = Math.max(clientWidth - 10,  clientWidth * 0.95);
      const percent = rightLeft < minLeft ? minLeft : (rightLeft > maxLeft ? maxLeft : rightLeft);
      vue.minWidth = (100 - (percent * 100) / clientWidth) + '%';
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
