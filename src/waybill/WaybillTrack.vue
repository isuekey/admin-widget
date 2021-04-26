<template>
  <div class="track-amap-container" v-loading="meta.loading">
    <div class="track-amap height-100p min-height-700" :id="meta.amapId" :trackInfo="trackInfo" :selectedPoint="selectedPoint"></div>
    <div class="driver-info" v-if="showDriverInfo">
      <div class="user-avatar">
        <img src="./assets/carrior_portrait.svg" alt />
      </div>
      <div class="user-info">
        <span class="user-name">{{driverInfo.driverName}}</span>
        <span class="user-phone">{{driverInfo.driverPhone}}</span>
        <div class="user-phone plate-code"><span>{{driverInfo.carPlate}}</span></div>
      </div>
      <!-- <div class="track-playback">
        <el-button plain type="default" size="mini" @click="handlePlayback" class="trackbutton margin-bottom-8">轨迹回放</el-button>
        <el-button 
         plain type="default" size="mini" @click="refreshTrack" class="trackbutton margin-bottom-8"
         v-if="baseInfo.waybillStatus == 3"
        >实时位置</el-button>
      </div> -->
    </div>
    <div class="track-tabs flex-row" v-if="showDriverTrack">
      <!-- <el-button :type="trackTypeOfVehicle" size="mini" @click="changeTrack('vehicle')">车辆轨迹</el-button>
      <el-button :type="trackTypeOfDriver" size="mini" @click="changeTrack('driver')">司机轨迹</el-button> -->
    </div>
  </div>
</template>

<script>
import passMarkerApp5 from "./assets/pass-marker-app5.svg";
import passMarkerApp5Over from "./assets/pass-marker-app5-over.svg";
import passMarkerApp6 from "./assets/pass-marker-app6.svg";
import passMarkerApp6Over from "./assets/pass-marker-app6-over.svg";
import passMarkerApp from "./assets/pass-marker-app.svg";
import passMarkerAppOver from "./assets/pass-marker-app-over.svg";
import passMarkerZjx from "./assets/pass-marker-zjx.svg";
import passMarkerZjxOver from "./assets/pass-marker-zjx-over.svg";
import passMarkerSelf from  "./assets/pass-marker-self.svg";
import passMarkerSelfOver from  "./assets/pass-marker-self-over.svg";
import loadAddressMarker from "./assets/address-load.svg";
import loadActionMarker from "./assets/action-load.svg";
import unloadAddressMarker from "./assets/address-unload.svg";
import unloadActionMarker from "./assets/action-unload.svg";
import vehicleMarker from "./assets/vehicle-marker.png";
import boatMarker from "./assets/boat-marker.png";
import carriorPortrait from './assets/carrior_portrait.svg';

import * as simpleUUIdv4 from 'simple-uuidv4';
import * as mapUtils from './lib/map.utils.js';

export default {
  name:'WaybillTrack',
  props: {
    trackInfo: { type: Object, default() { return {}; }, },
    selectedPoint: { type: Object, default(){ return {}; }, },
    showDriverInfo: { type: Boolean, default: true, },
    driverInfo: { type: Object, default() { return {}; }, },
    showDriverTrack: { type: Boolean, default: true, },
    amap: null,
    loadPoint:Array,
    unloadPoint:Array,
  },
  data(){
    const uuid = simpleUUIdv4.uuid();
    return {
      meta: {
        loading: false,
      },
      amapId: uuid,
      amapResolve: null,
      containerResolve: null,
    } 
  },
  mounted() {
    const vue = this;
    if(!vue.amap) return;
    if(!vue.amapResolve) {
      vue.amapResolve = Promise.resolve(vue.amap);
    }
    vue.drawRoute();
  },
  update() {
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
      mapUtils.renderTheRoute(vue).then(ok => {
        vue.$emit('drawRoute', ok);
      }).catch(err=>{
        console.log(err);
      });
    }
  }
}
</script>

<style>
.track-amap-container {
  flex: 1;
  width: 100%;
  height: 100%;
  background: coral;
}
.track-amap {
  min-width: 200px;
  min-height: 200px;
  flex: 1;
}
.driver-info {
  position: absolute;
  top: 20px;
  left: 20px;
  padding:8px;
  border-radius:4px;
  background:#ffffffa0;
  display:flex;
  flex-direction: row;
  align-items: center;
}
.track-tabs {
  background: transparent;
  position: absolute;
  top: 120px;
  left: 20px;
}
.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-avatar img {
  width: 100%;
  height: 100%;
  opacity: 0.95;
}
.user-info {
  width: 180px;
  height: 60px;
  padding: 0 10px;
  color:#000000a0;
}
.user-name {
  margin-right: 10px;
}
.user-phone {
  line-height: 30px;
}
.plate-code >span {
  background-color: #FAECD880;
  padding:0 4px;
  color: #61503A;
  border-radius: 2px;
}
.height-100p {
  height: 100%;
}
.min-height-400 {
  min-height: 400px;
}
.min-height-700 {
  min-height: 700px;
}
.amap-logo,
.amap-copyright {
  display: none !important;
}
.track-playback {
  color:#000000a0;
  display: flex;
  flex-direction:column;
  padding: 0 10px;
  align-items: center;
  justify-content:space-between;
}
.track-playback .el-button + .el-button {
  margin-left:0;
}
.el-button.trackbutton {
  background-color: #ffffff80;
  border-color: #409EFF40;
  color:#409EFF;
  border-radius: 6px;
  padding-bottom:5px !important;
  padding-top:5px !important;
}
.trackbutton > span {
  font-size: 12px;
  font-weight: 700;
  background: transparent;
}
.el-button.trackbutton:hover {
  background-color: #409EFF18;
  border-color: #409EFF00;
  box-shadow: unset;
}
</style>
