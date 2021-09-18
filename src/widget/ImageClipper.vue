<template>
<div class="image-clipper" :square="square">
  <img class="image-clipper-item" ref="imgurl" :src="url"/>
  <canvas ref="canvas" class="image-clipper-item" :width="canvas.width" :height="canvas.height">
  </canvas>
</div>
</template>

<script>

export default {
  name:"ImageClipper",
  props:{
    square:{type:Boolean, default:false},
    url:String,
  },
  computed: {
    canvas() {
      const vue = this;
      if(vue.square) { 
        return { width:1920, height: 1920 };
      }
      return { width:1920, height:1280 };
    },
  },
  mounted(){
    const vue = this;
    console.log('mounted');
    vue.clipperBase = {};
    vue.clipperBase.ctx2d = vue.$refs.canvas.getContext('2d');
    vue.$refs.imgurl.onload = (...args) => {
      console.log('image clipper', vue.url, args);
      vue.updateCanvas();
    };
    vue.$refs.canvas.onmousedown = (evt) => {
      console.log('onmousedown', evt);
      const {clientWidth, clientHeight } = vue.$refs.canvas;
      const rect = {clientWidth, offsetLeft:0, clientHeight, offsetTop:0};
      const accumulateOffset = (ele, base=rect) => {
        if(!ele) return base;
        const {offsetLeft, offsetTop} = ele;
        base.offsetLeft += offsetLeft;
        base.offsetTop += offsetTop;
        return accumulateOffset(ele.offsetParent, base);
      };
      accumulateOffset(vue.$refs.canvas, rect);
      vue.clipperBase.start = evt;
      vue.clipperBase.end = evt;
      vue.clipperBase.rect = rect;
      vue.beginDrawRect();
    };
    vue.$refs.canvas.onmousemove = (evt) => {
      if(!vue.clipperBase.start) return void 0;
      console.log('onmousemove', evt);
      vue.clipperBase.end = evt;
      vue.drawRect();
    };
    vue.$refs.canvas.onmouseup = (evt) => {
      console.log('onmouseup', evt);
      if(vue.clipperBase.leave) {
        vue.clipperBase.start = undefined;
        vue.clipperBase.end = undefined;
        return vue.clearRect();
      }
      vue.clipperBase.end = evt;
      vue.endDrawRect();
    };
    vue.$refs.canvas.onmouseleave = (evt) => {
      console.log('onmouseleave');
      vue.clipperBase.leave = true;
    };
    vue.$refs.canvas.onmouseenter = (evt) => {
      console.log('onmouseenter');
      vue.clipperBase.leave = false;
    }
  },
  updated(){
    const vue = this;
    console.log('update');
  },
  methods:{
    updateClipper(){
      const vue = this;
    },
    updateCanvas() {
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
      ctx2d.drawImage(vue.$refs.imgurl, 0, 0, vue.canvas.width, vue.canvas.height);
      ctx2d.save();
      console.log('updateCanvas');
    },
    beginDrawRect(){
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
      ctx2d.fillStyle = `rgba(0,0,0,0.3)`;
      ctx2d.fill();
      console.log('beginDrawRect', vue.clipperBase, vue.$refs);
    },
    drawRect(){
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
      ctx2d.rect()
    },
    endDrawRect(){
      const vue = this;
      vue.clearRect();
      const ctx2d = vue.clipperBase.ctx2d;
      vue.clipperBase.start = undefined;
      vue.clipperBase.end = undefined;
    },
    clearRect(){
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
    }
  },
}
</script>

<style scoped>

[square="true"].image-clipper {
  width:100%;
  padding-bottom:100%;
}
.image-clipper {
  width:100%;
  position: relative;
}
.image-clipper > img {
  visibility: hidden;
}
.image-clipper > .image-clipper-item {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height: 100%;
}

</style>
