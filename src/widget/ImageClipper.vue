<template>
<div class="image-clipper" :square="square">
  <img class="image-clipper-item" ref="imgurl" :src="localUrl"/>
  <canvas ref="canvas" class="image-clipper-item" :width="canvas.width" :height="canvas.height">
  </canvas>
</div>
</template>

<script>

const accumulateOffset = (ele, base=rect) => {
  if(!ele) return base;
  const {offsetLeft, offsetTop} = ele;
  base.offsetLeft += offsetLeft;
  base.offsetTop += offsetTop;
  return accumulateOffset(ele.offsetParent, base);
};
const dashWidth = 4;
export default {
  name:"ImageClipper",
  props:{
    square:{type:Boolean, default:false},
    url:String,
  },
  data() {
    return {
      localUrl:null,
    };
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
    vue.imageCache = {};
    vue.oldUrl = vue.url;
    vue.localLoadImage(vue.url);
    // console.log('mounted');
    vue.clipperBase = {};
    vue.clipperBase.ctx2d = vue.$refs.canvas.getContext('2d');
    vue.$refs.imgurl.onload = (...args) => {
      // console.log('image clipper', vue.url, args);
      // URL.revokeObjectURL(vue.svgUrl);
      vue.updateCanvas();
    };
    vue.$refs.canvas.onmousedown = (evt) => {
      // console.log('onmousedown', evt, vue.$refs);
      const {clientWidth, clientHeight } = vue.$refs.canvas;
      const rect = {clientWidth, offsetLeft:0, clientHeight, offsetTop:0};
      // accumulateOffset(vue.$refs.canvas, rect);
      vue.clipperBase.start = evt;
      vue.clipperBase.end = evt;
      vue.clipperBase.rect = rect;
      vue.beginDrawRect();
    };
    vue.$refs.canvas.onmousemove = (evt) => {
      if(!vue.clipperBase.start) return void 0;
      // console.log('onmousemove', evt);
      vue.clipperBase.end = evt;
      vue.drawRect();
    };
    vue.$refs.canvas.onmouseup = (evt) => {
      // console.log('onmouseup', evt);
      if(vue.clipperBase.leave) {
        vue.clipperBase.start = undefined;
        vue.clipperBase.end = undefined;
        return vue.clearRect();
      }
      vue.clipperBase.end = evt;
      vue.endDrawRect();
    };
    vue.$refs.canvas.onmouseleave = (evt) => {
      //console.log('onmouseleave', evt);
      vue.clipperBase.leave = true;
      return vue.clearRect();
    };
    vue.$refs.canvas.onmouseenter = (evt) => {
      //console.log('onmouseenter');
      vue.clipperBase.leave = false;
    };
    vue.offcanvas = document.createElement('canvas');
    vue.offcanvas.width = vue.canvas.width;
    vue.offcanvas.height = vue.canvas.height;
  },
  updated(){
    const vue = this;
    // console.log('update');
    vue.offcanvas.width = vue.canvas.width;
    vue.offcanvas.height = vue.canvas.height;
    if(vue.oldUrl != vue.url) {
      vue.oldUrl = vue.url;
      vue.localLoadImage(vue.url);
    }
  },
  methods:{
    updateClipper(){
      const vue = this;
    },
    updateCanvas() {
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
      vue.offcanvas.ctx = vue.offcanvas.getContext('2d');
      vue.offcanvas.ctx.beginPath();
      vue.offcanvas.ctx.drawImage(vue.$refs.imgurl, 0, 0, vue.canvas.width, vue.canvas.height);
      vue.offcanvas.ctx.save();
      ctx2d.beginPath();
      ctx2d.drawImage(vue.offcanvas, 0, 0);
      ctx2d.save();
      // console.log('updateCanvas');
    },
    beginDrawRect(){
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
      ctx2d.save();
      ctx2d.clearRect(0,0, vue.canvas.width, vue.canvas.height);
      ctx2d.drawImage(vue.offcanvas, 0, 0);
      // ctx2d.fill();
    },
    drawRect(){
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
      ctx2d.restore();
      ctx2d.beginPath();
      ctx2d.clearRect(0,0, vue.canvas.width, vue.canvas.height);
      ctx2d.drawImage(vue.offcanvas, 0, 0);
      ctx2d.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx2d.fillRect(0, 0, vue.canvas.width, vue.canvas.height);
      const clientWidth = vue.$refs.canvas.clientWidth || 1;
      const clientHeight = vue.$refs.canvas.clientHeight || 1;
      const x = Math.round((vue.clipperBase.start.layerX) * vue.canvas.width / clientWidth);
      const y = Math.round((vue.clipperBase.start.layerY) * vue.canvas.height/ clientHeight);
      const wx = Math.round((vue.clipperBase.end.layerX - vue.clipperBase.start.layerX) * vue.canvas.width / clientWidth);
      const wy = Math.round((vue.clipperBase.end.layerY - vue.clipperBase.start.layerY) * vue.canvas.height/ clientHeight);
      const startX = Math.min(x, x+wx);
      const startY = Math.min(y, y+wy);
      const drawX = Math.abs(wx);
      const drawY = Math.abs(wy);
      vue.clipperBase.clip = {startX,startY, drawX, drawY};
      ctx2d.setLineDash([5, 15]);
      ctx2d.lineWidth = dashWidth;
      ctx2d.strokeStyle = 'blue';
      ctx2d.strokeRect(startX- dashWidth, y - dashWidth, wx + dashWidth*2, wy + dashWidth * 2);
      ctx2d.drawImage(vue.offcanvas, startX, startY, drawX, drawY, startX, startY, drawX, drawY);
      ctx2d.closePath();
    },
    endDrawRect(){
      const vue = this;
      // console.log('end draRect', vue.clipperBase);
      if(!vue.clipperBase.clip) return;
      const {startX,startY, drawX, drawY} = vue.clipperBase.clip;
      try{
        const imageData = vue.offcanvas.ctx.getImageData(startX, startY, drawX, drawY);
        vue.$emit('clipped', imageData);
      } catch (e) {
        console.log('e', e);
      }
      vue.clearRect();
    },
    clearRect(){
      const vue = this;
      const ctx2d = vue.clipperBase.ctx2d;
      vue.clipperBase.start = undefined;
      vue.clipperBase.end = undefined;
      vue.clipperBase.clip = undefined;
      ctx2d.clearRect(0,0, vue.canvas.width, vue.canvas.height);
      ctx2d.drawImage(vue.offcanvas, 0, 0);
    },
    localLoadImage(url) {
      const vue = this;
      vue.localUrl = url;
      // if(vue.imageCache[url]) {
      //  vue.localUrl = vue.imageCache[url];
      //  return;
      // }
      // const xhr = new XMLHttpRequest();
      // xhr.open('GET', url);
      // xhr.onload = (resp)=>{
      //   const buffer = resp.response;
      //   const objUrl = URL.createObjeURL(new Blob(buffer, {type:'image/*'}));
      //   vue.imageCache[url] = objUrl;
      //   vue.localUrl = objUrl;
      // };
      // xhr.responseType = 'arraybuffer';
      // xhr.send();
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
