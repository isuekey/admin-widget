<template>
  <div class="track-amap-container" v-loading="meta.loading">
    <div class="track-amap height-100p min-height-700" :id="amapId" :trackInfo="trackInfo" :selectedPoint="selectedPoint"></div>
    <div class="driver-info" v-if="showDriverInfo">
      <div class="user-avatar">
        <img src="./assets/carrior_portrait.svg" alt />
      </div>
      <div class="user-info">
        <span class="user-name">{{driverInfo.driverName}}</span>
        <span class="user-phone">{{driverInfo.driverPhone}}</span>
        <div class="user-phone plate-code"><span>{{driverInfo.carPlate}}</span></div>
      </div>
      <div class="track-playback">
        <el-button v-if="showPlayBack" :disabled="disablePlayTrack" plain type="default" size="mini" @click="handlePlayback" class="trackbutton margin-bottom-8">轨迹回放</el-button>
        <!-- <el-button 
         plain type="default" size="mini" @click="refreshTrack" class="trackbutton margin-bottom-8"
         v-if="baseInfo.waybillStatus == 3"
        >实时位置</el-button> -->
      </div>
    </div>
    <div class="track-tabs">
      <div class="flex-row" v-if="true">
        <el-button style="width:116px" v-if="showDriverTrack" :type="trackTypeOfVehicle" size="mini" @click="changeTrack('vehicle')">车辆轨迹</el-button>
        <el-button style="width:116px" v-if="showVehicleTrack" :type="trackTypeOfDriver" size="mini" @click="changeTrack('driver')">司机轨迹</el-button>
      </div>
      <div class="flex-row padding-top-4" v-if="true">
        <el-button v-if="showDriverTrack" type="default" size="mini" @click="moveToEnd('vehicle')">车辆实时位置</el-button>
        <el-button v-if="showVehicleTrack" type="default" size="mini" @click="moveToEnd('driver')">司机实时位置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as simpleUUIdv4 from 'simple-uuidv4';
import * as mapUtils from './lib/map.utils.js';
const typeSwitch = {
  primary:'info', info:'primary'
};
const deviceMapping = mapUtils.base.glossary.deviceMapping;
export default {
  name:'WaybillTrack',
  props: {
    trackInfo: { type: Object, default() { return {}; }, },
    baseInfo: { type: Object, default() { return {}; }, },
    selectedPoint: Object,
    showDriverInfo: { type: Boolean, default: true, },
    driverInfo: { type: Object, default() { return {}; }, },
    amap: null,
    loadPoint:Array,
    unloadPoint:Array,
    showTrackType:{
      type: Number, default: mapUtils.base.glossary.pathType.full
    },
    trackVehicleColor:{ type:String, default:"#2288FF", },
    trackDriverColor:{ type:String, default:"#D01F1F", },
    trackUnionColor:{ type:String, default:"#2288FF", },
    showPlayBack:{ type:Boolean, default:true },
    vehicleType:{ type:String, default:'lorry', },
    moveTriggerInfoWindow:{ type:Boolean, default: true, },
    isRunning:{ type:Boolean, default:false, },
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
      trackTypeOfVehicle:'primary',
      trackTypeOfDriver:'primary',
      trackPath:{},
      focusedPoint:null,
    } 
  },
  computed:{
    disablePlayTrack() {
      const vue = this;
      const moveDriver = !!(vue.driverActive && vue.showDriverTrack);
      const moveVehicle = !!(vue.vehicleActive && vue.showVehicleTrack);
      const disabled = (moveDriver + moveVehicle)%2 == 0;
      return disabled;
    },
    showUnionTrack(){
      const vue = this;
      return vue.showTrackType == mapUtils.base.glossary.pathType.union;
    },
    showDriverTrack() {
      const vue = this;
      return (vue.showTrackType & mapUtils.base.glossary.pathType.driver);
    },
    showVehicleTrack(){
      const vue = this;
      return (vue.showTrackType & mapUtils.base.glossary.pathType.vehicle);
    },
    driverActive() {
      const vue = this;
      return vue.trackTypeOfDriver == 'primary';
    },
    vehicleActive() {
      const vue = this;
      return vue.trackTypeOfVehicle == 'primary';
    },
  },
  mounted() {
    const vue = this;
    mapUtils.base.callOnInitLifeCircle(vue).then(()=>{
      vue.drawTrackAll();
    });
  },
  updated() {
    const vue = this;
    mapUtils.base.callOnInitLifeCircle(vue).then(()=>{
      vue.drawTrackAll();      
    })
  },
  methods: {
    getAciontRange(){
      const vue = this;
      const driverAction = vue.trackInfo && vue.trackInfo.driverOperate;
      const startPoint = mapUtils.loadUnload.findDriverAction(driverAction, 2);
      const endPoint = mapUtils.loadUnload.findDriverAction(driverAction, 3);
      return [startPoint, endPoint];
    },
    drawTrackAll() {
      const vue = this;
      mapUtils.loadUnload.renderTheRoute(vue).then(ok => {
        const [startPoint, endPoint] = vue.getAciontRange();
        return Promise.all([mapUtils.loadUnload.renderTheAction(vue, startPoint, endPoint), startPoint, endPoint]);
      }).then(([ok, startPoint, endPoint]) => {
        vue.drawTrackPath(startPoint, endPoint);
      }).then(ok => {
        console.log('selectedPoint', vue.selectedPoint);
        if(!vue.selectedPoint) return mapUtils.tracking.hideInfoWindow(vue);
        return mapUtils.tracking.showInfoWindowOfPoint(vue, vue.selectedPoint);
      }).catch(err=>{
        console.log(err);
      });
    },
    drawTrackPath(startPoint, endPoint) {
      const vue = this;
      const trackPath =  vue.trackPath;
      const copy = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      const realtime = [endPoint].concat(copy).concat([startPoint]).reverse();
      const drawTrackPathHandle = (pathArray, pathColor, category="lines") => {
        return mapUtils.tracking.getValidPathArray(vue, pathArray).then((paths) => {
          const trackParts = mapUtils.tracking.getTrackParts(paths);
          mapUtils.tracking.drawTrackLine(vue, trackParts, pathColor, category);
          mapUtils.tracking.drawTrackPassPoint(vue, trackParts);
        });
      };
      if ((vue.showUnionTrack || vue.showDriverTrack)) {
        if(vue.driverActive) {
          trackPath.driver = drawTrackPathHandle(realtime.filter(ele=> ele.origin == mapUtils.base.glossary.pointType.app), vue.trackDriverColor, 'driver');          
        } else {
          mapUtils.tracking.removeTrackLine(vue, 'driver')
        }
      };
      if ((vue.showUnionTrack || vue.showVehicleTrack)) {
        if(vue.vehicleActive) {
          trackPath.vehicle = drawTrackPathHandle(realtime.filter(ele=> ele.origin != mapUtils.base.glossary.pointType.app), vue.trackVehicleColor, 'vehicle');
        } else {
          mapUtils.tracking.removeTrackLine(vue, 'vehicle')
        }
      };
      return Promise.all([trackPath.all, trackPath.driver, trackPath.vehicle]);
    },
    handlePlayback() {
      const vue = this;
      vue.focusedPoint = null;
      const realtime = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      const willMoveDriver = vue.showDriverTrack && vue.driverActive;
      const willMoveVehicle = vue.showVehicleTrack && vue.vehicleActive;
      const willMoveOnUnion = vue.showUnionTrack || (willMoveDriver && willMoveVehicle);
      if (willMoveOnUnion) {
        return mapUtils.tracking.getValidPathArray(vue, realtime).then((paths) => {
          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType);
        });
      } else if (willMoveDriver) {
        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin == mapUtils.base.glossary.pointType.app)).then((paths) => {
          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType);
        });
      } else if (willMoveVehicle) {
        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin != mapUtils.base.glossary.pointType.app)).then((paths) => {
          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType);
        });
      }
    },
    changeTrack(target){
      const vue = this;
      const [startPoint, endPoint] = vue.getAciontRange();
      switch(target) {
      case 'vehicle':
        vue.trackTypeOfVehicle = typeSwitch[vue.trackTypeOfVehicle];
        vue.drawTrackPath(startPoint, endPoint);
        break;
      case 'driver':
        vue.trackTypeOfDriver = typeSwitch[vue.trackTypeOfDriver];
        vue.drawTrackPath(startPoint, endPoint);
        break;
      default:
        return;
      }
    },
    getInfoWindowContent(trackInfo){
      const vue = this;
      let velocity = [];
      // console.log('velocity in track', trackInfo);
      if (trackInfo.velocity) {
        velocity=[
          '<div style="display:flex;padding-top:4px;"><div style="width:60px;text-align:left;font-size:12px">速度</div><span style="font-size:12px">',
          trackInfo.velocityLabel,
          '</span></div>'
        ];
      };
      return [`
      <div style="width:220px;padding:8px">
        <div style="display:flex;padding-top:4px;"><div style="width:60px;text-align:left;font-size:12px">经度</div><span style="font-size:12px">${(trackInfo.lng*1 || 0).toFixed(6)}</span></div>
        <div style="display:flex;padding-top:4px;"><div style="width:60px;text-align:left;font-size:12px">纬度</div><span style="font-size:12px">${(trackInfo.lat*1 || 0).toFixed(6)}</span></div>
        <div style="display:flex;padding-top:4px;"><div style="width:60px;text-align:left;font-size:12px">时间</div><span style="font-size:12px">${trackInfo.trackTimeLabel}</span></div>
        <div style="display:flex;padding-top:4px;"><div style="width:60px;text-align:left;font-size:12px">设备</div><span style="font-size:12px">${deviceMapping[trackInfo.origin]}</span></div>
        ${velocity.join('')}
      `, vue.baseInfo && vue.baseInfo.type != 4 ?`
        <div style="display:flex;padding-top:4px;"><div style="width:60px;text-align:left;"><div style="width:30px;font-size:12px;">实时位置</div></div><div style="flex:1"><span style="font-size:12px">${trackInfo.addressInfo}</span></div></div>
      `:'',`
      </div>
      `].join('');
    },
    moveToEnd(type){
      const vue = this;
      vue.focusedPoint = type;
      const realtime = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      switch(type) {
      case "driver":
        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin == mapUtils.base.glossary.pointType.app)).then((paths) => {
          if(paths.length) {
            return mapUtils.tracking.moveLorryTo(vue, paths, vue.vehicleType);
          } else {
            return mapUtils.tracking.hideInfoWindow(vue);
          }
        });
      case "vehicle":
        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin != mapUtils.base.glossary.pointType.app)).then((paths) => {
          if (paths.length) {
            return mapUtils.tracking.moveLorryTo(vue, paths, vue.vehicleType);            
          } else {
            return mapUtils.tracking.hideInfoWindow(vue);
          }
        });
      };
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
