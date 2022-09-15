
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
  
};
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
const drawDistrict = (amap, container, pointList=[], options={}) => {
  const point = pointList.slice(0, 2);
  const key = getKeyOfPoint(point);
  return new Promise((resolve, reject) => {
    return new amap.Geocoder().getAddress(new amap.LngLat(...point), (status, result) => {
      const isSuccess = status == 'complete' && result.info== 'OK';
      if (!isSuccess) return reject('unknown district,' + point);
      let code = result.regeocode.addressComponent[codeMap[options.type]];
      return new amap.DistrictSearch({
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
        return resolve(polygon);
      });
    });
  });
};
const circleMap = {};
const drawCircle = (amap, container, pointList, options={}) => {
  const point = pointList.slice(0, 2);
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
const drawMarker = (amap, container, pointList, options={},prefix="") => {
  const reorgPointList = pointList.reduce((sum, cur, idx, arr) => {
    if(idx % 2 == 0) {
      const point = [cur, arr[idx+1]];
      sum.push(point);
    }
    return sum;
  }, []).map(point => {
    const key = `${prefix}/${getKeyOfPoint(point)}`;
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
  });
};
const drawPoint = (amap, container, point, drawPointRule, distance) => {
  const drawTask = drawPointRule(distance).map(ruleOptions => {
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
    const distance = (vue.trackInfo && vue.trackInfo.realDistance) || amap.GeometryUtil.distance(ld, un);
    // console.log('distance in admin-widget', distance);
    const drawLoad = vue.loadPoint && drawPoint(amap, container, vue.loadPoint.slice(), vue.loadRule || defaultLoadRule, distance) || [void 0, void 0];
    const drawUnload = vue.unloadPoint && drawPoint(amap, container, vue.unloadPoint.slice(), vue.unloadRule || defaultUnloadRule, distance) || [void 0, void 0];
    return Promise.all([amap, container, drawLoad, drawUnload]);
  }).then(([amap, container])=> {
    return zoomMap(amap, container, vue.avoid);
  });
};

const renderTheAction = (vue, startPointList=[], endPointList=[], otherPointList=[]) => {
  return mapBase.prepareMap(vue).then(ok => {
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  }).then(([amap, container]) => {
    const actionMarkerKeySet = {};
    let xoff = 0;
    const hasGeoAxisFilter = ele => {
      return !!ele.lng && !!ele.lat;
    };
    const pointMapper = (markerImage) => (point) => {
      const geoAxis = [point.lng, point.lat];
      const key = getKeyOfPoint(geoAxis);
      console.log('has duplicate', key, point);
      if(actionMarkerKeySet[key]) {
        xoff += 10;
      }
      actionMarkerKeySet[key] = true;
      return drawMarker(amap, container, geoAxis, Object.assign({
        size:[41, 62],
        offset:[-21 + xoff, -61],
      }, markerImage(point)), point.$type);
    };
    const startMapper = pointMapper(()=>({image:loadActionMarker}));
    const startMarkerDrawingList = startPointList.filter(hasGeoAxisFilter).map(startMapper).flat();
    const endMapper = pointMapper(()=>({image:unloadActionMarker}));
    const endMarkerDrawingList = endPointList.filter(hasGeoAxisFilter).map(endMapper).flat();
    const otherMapper = pointMapper((point) => vue.otherActionType[point.$type](point));
    const otherMarkerDrawingList = otherPointList.filter(hasGeoAxisFilter).map(otherMapper).flat();
    return Promise.all(startMarkerDrawingList.concat(endMarkerDrawingList).concat(otherMarkerDrawingList)).catch(err => {
      console.log('err', err);
      return Promise.reject(err);
    });
  });
};
const findDriverActionList = (driverOperateList=[], type=-1) => {
  return driverOperateList.filter(ele => ele.operateTypeLm == type || type[ele.operateTypeLm]).map(ele => {
    return Object.assign({}, ele, {
      lng:ele.operateLon, lat:ele.operateLat,
      "$type":ele.operateTypeLm,
    });
  });
};

export {
  renderTheRoute,
  renderTheAction,
  findDriverActionList,
}
