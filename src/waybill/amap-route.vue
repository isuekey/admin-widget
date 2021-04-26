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
import loadPointMarker from './assets/address-load.svg';
import unloadPointMarker from './assets/address-unload.svg';
import {uuid as uuidv4} from 'simple-uuidv4';

const tian_an_men = [116.397423,39.909117];
const pointRule = (distance=0, circleOption, marker) => {
  if(distance <= 10e3) {
    return [marker, Object.assign({type:'circle', radius:3000}, circleOption)];
  } else if (distance <= 30e3) {
    return [marker, Object.assign({type:'circle', radius:4000}, circleOption)];
  } else if (distance < 100e3) {
    return [
      marker,
      Object.assign({ type:'district' }, circleOption, {fillOpacity:0.4}),
      Object.assign({ type:'circle', radius:5000 }, circleOption)
    ];
  } else {
    return [
      marker,
      Object.assign({ type:'district' }, circleOption, {fillOpacity:0.4}),
      Object.assign({ type:'circle', radius:10000 }, circleOption)
    ];
  };
  
}
const defaultLoadRule = (distance=0)=>{
  const circleOption={
    fillColor: "#37A80040",
    strokeColor: "#37A80080",
    fillOpacity: 0.5, //填充透明度
    strokeOpacity: 0.5 //线透明度
  };
  // console.log('loadPointMarker', loadPointMarker);
  const marker = {
    image: URL.createObjectURL(new Blob([loadPointMarker], {type:'image/svg+xml'})),
    size:[56, 56],
    offset:[-28, -45],
    type:'marker',
  };
  return pointRule(distance, circleOption, marker);
};
const defaultUnloadRule = (distance=0) => {
  const circleOption={
    fillColor: "#E0202040",
    strokeColor: "#E0202080",
    fillOpacity: 0.5, //填充透明度
    strokeOpacity: 0.5 //线透明度
  };
  // console.log('unloadPointMarker', unloadPointMarker);
  const marker = {
    image: URL.createObjectURL(new Blob([unloadPointMarker], {type:'image/svg+xml'})),
    size:[56, 56],
    offset:[-28, -45],
    type:'marker',
  };
  return pointRule(distance, circleOption, marker);
};
const prepareMap = (vue) => {
  if(!vue.amapResolve) return Promise.reject('null amap');
  if(!vue.containerResolve) {
    vue.containerResolve = vue.amapResolve.then(amap => {
      const amapContainer = new amap.Map(vue.amapId, {
        center: tian_an_men,
        zoom:11,
      });
      return new Promise((resolve, reject) => {
        amapContainer.on("complete", ()=>{
          resolve(amapContainer);
        });
      });
    });
  };
  return Promise.resolve('ok');
};
const codeMap = {
  district:"adcode",
};
const districtMap = {};
const getKeyOfPoint = (point)=>{
  const key = `${point[0].toFixed(4)}/${point[1].toFixed(4)}`;
  return key;  
};
const drawDistrict = (amap, container, point, options={}) => {
  const key = getKeyOfPoint(point);
  return new Promise((resolve, reject) => {
    new amap.Geocoder().getAddress(new amap.LngLat(...point), (status, result) => {
      const isSuccess = status == 'complete' && result.info== 'OK';
      if (!isSuccess) return reject('unknown district,' + point);
      let code = result.regeocode.addressComponent[codeMap[options.type]];
      new amap.DistrictSearch({
        level:options.type, extensions:'all', subdistrict:0,
      }).search(code, (status, result)=>{
        if(status!='complete') return Promise.reject('unknown district,'+code);
        const districtResult = result.districtList[0];
        if(!districtResult) return Promise.reject('unknown district,'+result);
        const bounds = districtResult.boundaries;
        if(districtMap[key]){
          container.remove(districtMap[key]);
        }
        const districtOption = Object.assign({}, options, {
          type:undefined,
          map:container,
          path: bounds,
        });
        const polygon = new amap.Polygon(districtOption);
        districtMap[key] = polygon;
        // console.log("boundPoints", boundPoints, bounds);
        resolve(polygon);
      });
    });
  });
};
const circleMap = {};
const drawCircle = (amap, container, point, options={}) => {
  const key = getKeyOfPoint(point);
  if(circleMap[key]) {
    container.remove(circleMap[key]);
  };
  const circleOption = Object.assign({}, options, {
    type:undefined,
    center:point.slice(),
  });
  const circle = new amap.Circle(circleOption);
  circleMap[key] = circle;
  container.add(circle);
  return Promise.resolve(circle);
};

const markerMap = {};
const drawMarker = (amap, container, point, options={}) => {
  const key = getKeyOfPoint(point);
  if(markerMap[key]) {
    container.remove(markerMap[key]);
  };
  const [w, h] = options.size;
  const pointIcon = new amap.Icon({
    image: options.image, size: new amap.Size(w, h), imageSize:new amap.Size(w, h),
  });
  const [xo, yo] = options.offset;
  const pointMarker = new amap.Marker({
    position: point.slice(),
    offset: new amap.Pixel(xo, yo),
    icon:pointIcon,
    autoRotation:true, 
    angle:0, extData:key,
  });
  markerMap[key] = pointMarker;
  container.add(pointMarker);
  return pointMarker;
}
const drawPoint = (amap, container, point, pointRule, distance) => {
  const drawTask = pointRule(distance).map(ruleOptions => {
    switch(ruleOptions.type) {
      case "province":
      case "city":
      case "district":
        return drawDistrict(amap, container, point, ruleOptions);
      case "circle":
        return drawCircle(amap, container, point, ruleOptions);
      case 'marker':
        return drawMarker(amap, container, point, ruleOptions);
      default:
        return [point, point];
    }
  }) || [[point, point]];
  return Promise.all(drawTask);
};

const zoomMap = (amap, container, avoid=[20, 20, 20, 20]) => {
  container.setFitView(null, true, avoid, 18);
};

const renderTheRoute = (vue) => {
  return prepareMap(vue).then(ok => {
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  }).then(([amap, container]) => {
    const loadPoint = vue.loadPoint || vue.unloadPoint || tian_an_men;
    const unloadPoint = vue.unloadPoint || vue.loadPoint || tian_an_men;
    const distance = amap.GeometryUtil.distance([...loadPoint], [...unloadPoint]);
    const drawLoad =vue.loadPoint && drawPoint(amap, container, [...vue.loadPoint], vue.loadRule || defaultLoadRule, distance) || [loadPoint, loadPoint];
    const drawUnload = vue.unloadPoint && drawPoint(amap, container, [...vue.unloadPoint], vue.unloadRule || defaultUnloadRule, distance) || [unloadPoint, unloadPoint];
    return Promise.all([amap, container, drawLoad, drawUnload]);
  }).then(([amap, container])=> {
    return zoomMap(amap, container, vue.avoid);
  });
}
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
      type:Array, default(){return [20, 20, 20, 20]; },
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
      renderTheRoute(vue).then(ok => {
        vue.$emit('drawRoute', ok);
      }).catch(err=>{
        console.log(err);
      });
    }
  }
}
</script>

