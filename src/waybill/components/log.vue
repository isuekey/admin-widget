<template>
<div class="log">
  <div>className:{{className}}</div>
  <div>logPoint:{{logPoint}}</div>
  <div>unloadPoint:{{unloadPoint}}</div>
  <div>loadRule:{{loadRule}}</div>
  <div>unloadRule:{{unloadRule}}</div>
  <div>amap:{{amap}}</div>
</div>
</template>

<script>
export default {
  name:'log',
  props:{
    className:String,
    loadPoint:Array,
    unloadPoint:Array,
    loadRule:Function,
    unloadRule:Function,
    amap:Object,
  },
}
</script>

<style scoped>
div.log {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>