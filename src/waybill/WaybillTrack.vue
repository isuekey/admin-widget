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
        <el-button v-if="showPlayBack" :disabled="disablePlayTrack" plain type="default" size="mini" @click="listenClickPlayback" class="trackbutton margin-bottom-8">轨迹回放</el-button>
        <!-- <el-button 
         plain type="default" size="mini" @click="refreshTrack" class="trackbutton margin-bottom-8"
         v-if="baseInfo.waybillStatus == 3"
        >实时位置</el-button> -->
      </div>
    </div>
    <div class="track-tabs">
      <div class="flex-row" v-if="true">
        <el-button style="width:116px" v-if="showVehicleTrack" :type="trackTypeOfVehicle" size="mini" @click="changeTrack('vehicle')">车辆轨迹</el-button>
        <el-button style="width:116px" v-if="showDriverTrack" :type="trackTypeOfDriver" size="mini" @click="changeTrack('driver')">司机轨迹</el-button>
      </div>
      <div class="flex-row padding-top-4" v-if="true">
        <el-button v-if="showVehicleTrack" type="default" size="mini" @click="moveToEnd('vehicle')">车辆实时位置</el-button>
        <el-button v-if="showDriverTrack" type="default" size="mini" @click="moveToEnd('driver')">司机实时位置</el-button>
      </div>
    </div>
    <div class="track-playing" v-show="showPlayTrackController">
      <div class="flex-row track-control">
        <span @click="resumePlaying" v-show="playingStatus == 'pause'"><resume /></span>
        <span @click="pausePlaying" v-show="playingStatus == 'playing'"><pause /></span>
        <span @click="stopPlaying" v-show="playingStatus != 'stop'"><stop /></span>
      </div>
      <div class="flex-row" v-if="false">
        <input type="range" ref="playTrackProgressController"></input>
      </div>
    </div>
  </div>
</template>

<script>
import * as simpleUUIdv4 from 'simple-uuidv4';
import * as mapUtils from './lib/map.utils.js';
import Pause from './components/Pause.vue';
import Resume from './components/Resume.vue';
import Stop from './components/Stop.vue';
const typeSwitch = {
  primary:'info', info:'primary'
};
const deviceMapping = mapUtils.base.glossary.deviceMapping;
export default {
  name:'WaybillTrack',
  components: {
    Pause, Resume, Stop,
  },
  props: {
    trackInfo: { type: Object, default() { return {}; }, },
    baseInfo: { type: Object, default() { return {}; }, },
    selectedPoint: Object,
    showDriverInfo: { type: Boolean, default: true, },
    driverInfo: { type: Object, default() { return {}; }, },
    amap: null,
    loadPoint:Array,
    unloadPoint:Array,
    loadRule:Function,
    unloadRule:Function,
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
    emitLastPosition:Boolean,
    pointDensity: { type: Number, default: 30 },
    trackUnionLine: Boolean,
    loadActionType: { type: [Number, String, Object], default:2 },
    unloadActionType: { type: [Number, String, Object], default:3 },
    avoid:Array,
    showPlayControlPanel: Boolean,
    getInfoWindowContentDom: Function,
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
      playingTrack:false,
      playingStatus:'stop',
      lorryMarker:null,
    };
  },
  computed:{
    disablePlayTrack() {
      const vue = this;
      const moveDriver = !!(vue.driverActive && vue.showDriverTrack);
      const moveVehicle = !!(vue.vehicleActive && vue.showVehicleTrack);
      const onlyOneSelect = moveDriver != moveVehicle;
      const couldMoveUnion = moveDriver && moveVehicle && vue.trackUnionLine;
      const disabled = !(onlyOneSelect || couldMoveUnion);
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
    showPlayTrackController() {
      const vue = this;
      if(vue.disablePlayTrack) return false;
      return vue.playingTrack && vue.showPlayControlPanel;
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
    getActionRange(){
      const vue = this;
      const driverAction = vue.trackInfo && vue.trackInfo.driverOperate;
      const startPointList = mapUtils.loadUnload.findDriverActionList(driverAction, vue.loadActionType);
      const endPointList = mapUtils.loadUnload.findDriverActionList(driverAction, vue.unloadActionType);
      return [startPointList, endPointList];
    },
    drawTrackAll() {
      const vue = this;
      mapUtils.loadUnload.renderTheRoute(vue).then(ok => {
        const [startPointList, endPointList] = vue.getActionRange();
        return Promise.all([mapUtils.loadUnload.renderTheAction(vue, startPointList, endPointList), startPointList, endPointList, vue.containerResolve]);
      }).then(([ok, startPointList, endPointList, container]) => {
        if(!vue._handleDrawPassPoint) {
          container.on('zoomend', (event) =>{
            vue.drawTrackPath(startPointList, endPointList);
          });
          vue._handleDrawPassPoint = vue.drawTrackPath;
        }
        vue.drawTrackPath(startPointList, endPointList);
      }).then(ok => {
        if(!vue.selectedPoint) return mapUtils.tracking.hideInfoWindow(vue);
        return mapUtils.tracking.showInfoWindowOfPoint(vue, vue.selectedPoint);
      }).catch(err=>{
        console.log(err);
      });
    },
    drawTrackPath(startPointList, endPointList) {
      const vue = this;
      const trackPath =  vue.trackPath;
      const copy = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      const realtime = endPointList.concat(copy).concat(startPointList).filter(ele => !!ele).reverse();
      const drawTrackPathHandle = (pathArray, pathColor, category="lines") => {
        return mapUtils.tracking.getValidPathArray(vue, pathArray).then((paths) => {
          const trackParts = mapUtils.tracking.getTrackParts(paths);
          mapUtils.tracking.drawTrackLine(vue, trackParts, pathColor, category);
          mapUtils.tracking.drawTrackPassPoint(vue, trackParts, category);
        });
      };
      if ((vue.showUnionTrack || vue.showDriverTrack)) {
        if(vue.driverActive) {
          trackPath.driver = drawTrackPathHandle(realtime.filter(ele=> ele.origin == mapUtils.base.glossary.pointType.app), vue.trackDriverColor, 'driver');
        } else {
          mapUtils.tracking.removeTrackLine(vue, 'driver');
          mapUtils.tracking.removePassPoint(vue, 'driver');
        }
      };
      if ((vue.showUnionTrack || vue.showVehicleTrack)) {
        if(vue.vehicleActive) {
          trackPath.vehicle = drawTrackPathHandle(realtime.filter(ele=> ele.origin != mapUtils.base.glossary.pointType.app), vue.trackVehicleColor, 'vehicle');
        } else {
          mapUtils.tracking.removeTrackLine(vue, 'vehicle');
          mapUtils.tracking.removePassPoint(vue, 'vehicle');
        }
      };
      return Promise.all([trackPath.all, trackPath.driver, trackPath.vehicle]);
    },
    listenClickPlayback(){
      const vue = this;
      vue.playingTrack = true;
      vue.handlePlayback().catch(err => {
        console.log('err', err);
      });
    },
    handlePlayback() {
      const vue = this;
      vue.focusedPoint = null;
      const realtime = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      const willMoveDriver = vue.showDriverTrack && vue.driverActive;
      const willMoveVehicle = vue.showVehicleTrack && vue.vehicleActive;
      const willMoveOnUnion = vue.showUnionTrack || (willMoveDriver && willMoveVehicle);
      const defineLorryMarker = (lorryMarker) => {
        vue.lorryMarker = lorryMarker;
        lorryMarker.show();
        vue.playingStatus = 'playing';
      };
      if (willMoveOnUnion) {
        return mapUtils.tracking.getValidPathArray(vue, realtime).then((paths) => {
          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType, vue.handleAlongPlaying, vue.handleStopPlaying);
        }).then(defineLorryMarker);
      } else if (willMoveDriver) {
        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin == mapUtils.base.glossary.pointType.app)).then((paths) => {
          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType, vue.handleAlongPlaying, vue.handleStopPlaying);
        }).then(defineLorryMarker);
      } else if (willMoveVehicle) {
        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin != mapUtils.base.glossary.pointType.app)).then((paths) => {
          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType, vue.handleAlongPlaying, vue.handleStopPlaying);
        }).then(defineLorryMarker);
      } else {
        return Promise.reject('未知的操作类型');
      }
    },
    resumePlaying() {
      const vue = this;
      if(!vue.lorryMarker) return;
      vue.playingStatus = 'playing';
      vue.lorryMarker.resumeMove();
    },
    pausePlaying() {
      const vue = this;
      if(!vue.lorryMarker) return;
      vue.lorryMarker.pauseMove();
      vue.playingStatus = 'pause';
    },
    stopPlaying() {
      const vue = this;
      if(!vue.lorryMarker) return;
      vue.lorryMarker.stopMove();
      vue.lorryMarker.hide();
      vue.playingStatus = '';
      vue.playingTrack = false;
    },
    handleStopPlaying(event) {
      const vue = this;
      if(!vue.lorryMarker) return;
      // vue.playingStatus = 'stop';
      console.log('stop event', event);
    },
    handleAlongPlaying(event) {
      const vue = this;
      // console.log('along event', event);
    },
    changeTrack(target){
      const vue = this;
      const [startPointList, endPointList] = vue.getActionRange();
      switch(target) {
      case 'vehicle':
        vue.trackTypeOfVehicle = typeSwitch[vue.trackTypeOfVehicle];
        vue.drawTrackPath(startPointList, endPointList);
        break;
      case 'driver':
        vue.trackTypeOfDriver = typeSwitch[vue.trackTypeOfDriver];
        vue.drawTrackPath(startPointList, endPointList);
        break;
      default:
        return;
      }
    },
    getInfoWindowContent(trackInfo){
      const vue = this;
      let velocity = [];
      if(vue.getInfoWindowContentDom && vue.getInfoWindowContentDom.call) {
        return vue.getInfoWindowContentDom(trackInfo);
      }
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
            return mapUtils.tracking.moveLorryTo(vue, paths, vue.vehicleType, vue.emitLastPosition);
          } else {
            return mapUtils.tracking.hideInfoWindow(vue);
          }
        });
      case "vehicle":
        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin != mapUtils.base.glossary.pointType.app)).then((paths) => {
          if (paths.length) {
            return mapUtils.tracking.moveLorryTo(vue, paths, vue.vehicleType, vue.emitLastPosition);            
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

.track-playing {
  background: transparent;
  position: absolute;
  left: 20px;
  bottom: 20px;
}
.track-control {
  min-width:100px;
  justify-content: space-evenly;
}
.track-control > span {
  display:inline-block;
  height:14px;
  width:14px;
  background-size:contain;
  background-repeat:no-repeat;
}
</style>
