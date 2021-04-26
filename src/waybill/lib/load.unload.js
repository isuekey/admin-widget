
import loadPointMarker from '../assets/address-load.svg';
import unloadPointMarker from '../assets/address-unload.svg';
import loadActionMarker from "../assets/action-load.svg";
import unloadActionMarker from "../assets/action-unload.svg";
import * as mapBase from './map.base.js';

const tian_an_men = mapBase.tian_an_men;
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
    image: loadPointMarker,
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
    image: unloadPointMarker,
    size:[56, 56],
    offset:[-28, -45],
    type:'marker',
  };
  return pointRule(distance, circleOption, marker);
};
const codeMap = {
  district:"adcode",
};
const districtMap = {};
const getKeyOfPoint = mapBase.getKeyOfPoint;
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
const drawMarker = (amap, container, point, options={},prefix="") => {
  const key = `${prefix}${getKeyOfPoint(point)}`;
  if(markerMap[key]){
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
  // console.log('drawMarker cache', key, pointMarker, point);
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
  return mapBase.prepareMap(vue).then(ok => {
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  }).then(([amap, container]) => {
    const ld = (vue.loadPoint || vue.unloadPoint || tian_an_men).slice();
    const un = (vue.unloadPoint || vue.loadPoint || tian_an_men).slice();
    const distance = amap.GeometryUtil.distance(ld, un);
    const drawLoad = vue.loadPoint && drawPoint(amap, container, vue.loadPoint.slice(), vue.loadRule || defaultLoadRule, distance) || [loadPoint, loadPoint];
    const drawUnload = vue.unloadPoint && drawPoint(amap, container, vue.unloadPoint.slice(), vue.unloadRule || defaultUnloadRule, distance) || [unloadPoint, unloadPoint];
    return Promise.all([amap, container, drawLoad, drawUnload]);
  }).then(([amap, container])=> {
    return zoomMap(amap, container, vue.avoid);
  });
};

const renderTheAction = (
vue, 
startPoint={},
endPoint={}) => {
  return mapBase.prepareMap(vue).then(ok => {
    return Promise.all([vue.amapResolve, vue.containerResolve])
  }).then(([amap, container]) => {
    const actionMarker = {};
    if(!!startPoint.lng && !!startPoint.lat) {
      actionMarker.startKey = getKeyOfPoint([startPoint.lng, startPoint.lat]);
      actionMarker.start = drawMarker(amap, container, [startPoint.lng, startPoint.lat], {
        image: loadActionMarker,
        size:[41, 62],
        offset:[-21, -61],
      }, 'start');
    };
    if(!!endPoint.lng && !!endPoint.lat) {
      actionMarker.endKey = getKeyOfPoint([endPoint.lng, endPoint.lat]);
      const xoff = actionMarker.startKey == actionMarker.endKey ? 10 : 0;
      actionMarker.end = drawMarker(amap, container, [endPoint.lng, endPoint.lat], {
        image: unloadActionMarker,
        size:[41, 62],
        offset:[-21 + xoff, -61],
      }, 'end');
    };
    return Promise.all([actionMarker.start, actionMarker.end]);
  });
};
const findDriverAction = (driverOperateList=[], type=-1) => {
  return driverOperateList.filter(ele => ele.operateTypeLm == type).map(ele => {
    return Object.assign({}, ele, {
      lng:ele.operateLon, lat:ele.operateLat,
    });
  })[0];
};

export {
  renderTheRoute,
  renderTheAction,
  findDriverAction,
}