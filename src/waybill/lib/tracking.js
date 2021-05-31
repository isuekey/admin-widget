
import * as mapBase from './map.base.js';

import passMarkerApp5 from "../assets/pass-marker-app5.svg";
import passMarkerApp5Over from "../assets/pass-marker-app5-over.svg";
import passMarkerApp6 from "../assets/pass-marker-app6.svg";
import passMarkerApp6Over from "../assets/pass-marker-app6-over.svg";
import passMarkerApp from "../assets/pass-marker-app.svg";
import passMarkerAppOver from "../assets/pass-marker-app-over.svg";
import passMarkerZjx from "../assets/pass-marker-zjx.svg";
import passMarkerZjxOver from "../assets/pass-marker-zjx-over.svg";
import passMarkerSelf from  "../assets/pass-marker-self.svg";
import passMarkerSelfOver from  "../assets/pass-marker-self-over.svg";
import vehicleMarker from "../assets/vehicle-marker.png";
import boatMarker from "../assets/boat-marker.png";

const getTrackParts = (trackArray=[]) => {
  let part = 0;
  return trackArray.reduce((sum, cur) => {
    if(cur.trackDistance && cur.trackDistance > 14000) {
      part = part + 1;
    }
    sum[part] = sum[part] || [];
    sum[part].push(cur);
    return sum;
  }, [[]]);
};
const confirmAmap = (vue) => {
  return mapBase.prepareMap(vue).then(ok=>{
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  });
};
const globaTrackMap = new WeakMap();
const removeTrackLine = (vue, category='lines') => {
  return confirmAmap(vue).then(([amap, container]) => {
    const markerMap = globaTrackMap.get(vue.amapResolve) || {};
    markerMap[category] = markerMap[category] || [];
    markerMap[category].forEach(line => container.remove(line));
    markerMap[category] = [];
  });
};
const drawTrackLine = (vue, trackPartList, color="#2288ff", category='lines') => {
  return confirmAmap(vue).then(([amap, container]) => {
    const markerMap = globaTrackMap.get(vue.amapResolve) || {};
    globaTrackMap.set(vue.amapResolve, markerMap);
    markerMap[category] = markerMap[category] || [];
    markerMap[category].forEach(line => container.remove(line));
    const trackLineList = trackPartList.map((trackPart, idx) => {
      const sorted = trackPart.slice();
      const path = sorted.map(ele => [ele.lng, ele.lat]);
      const line = new amap.Polyline({
        map:container, bubble:true, path, showDir:true, 
        geodesic:false, lineJoin:'round', lineCap:'round',
        strokeColor: color, //线颜色
        strokeWeight: 6 //线宽
      });
      return line;
    });
    markerMap[category] = trackLineList;
    return trackLineList;
  });
};

const globalMarkerMap = new WeakMap();
const pointType = mapBase.glossary.pointType;
const loadPointIconSetting = {
  pass: {
    [pointType.app]: passMarkerApp,
    [pointType.zjxl]: passMarkerZjx,
    [pointType.selfGPS]: passMarkerSelf,
    [pointType.mmsi]: passMarkerSelf,
    [pointType.handle5]: passMarkerApp5,
    [pointType.handle6]: passMarkerApp6,
  },
  passOver: {
    [pointType.app]: passMarkerAppOver,
    [pointType.zjxl]: passMarkerZjxOver,
    [pointType.selfGPS]: passMarkerSelfOver,
    [pointType.mmsi]: passMarkerSelfOver,
    [pointType.handle5]: passMarkerApp5Over,
    [pointType.handle6]: passMarkerApp6Over,
  },
  lorry: {
    [mapBase.glossary.lorryType.lorry]: {
      image: vehicleMarker,
      size: [32, 16],
      imageSize: [32, 16],
      offset:[-5, -8],
    },
    [mapBase.glossary.lorryType.boat]: {
      image: boatMarker,
      size: [36, 12],
      imageSize: [36, 12],
      offset:[-9, -4]
    }
  }
}
const drawPassPointMarker = (map={}, trackEle, amap, container, vue, still=false) => {
  const pointIcon = new amap.Icon({
    image: loadPointIconSetting.pass[trackEle.origin],
    size: new amap.Size(12, 12),
    imageSize: new amap.Size(12, 12),
  });
  const pointIconOver = new amap.Icon({
    image: loadPointIconSetting.passOver[trackEle.origin],
    size: new amap.Size(20, 20),
    imageSize: new amap.Size(20, 20),
  });
  // if(trackEle.isDangerous) {
  //   pointIcon.image = loadPointIconSetting.pass[6];
  //   pointIconOver.image = loadPointIconSetting.passOver[6];
  // }
  const position = [trackEle.lng, trackEle.lat];
  const newTrackMarker = new amap.Marker({
    position: [trackEle.lng, trackEle.lat],
    icon: pointIcon,
    bubble: true,
    offset: new amap.Pixel(-6, -6)
  });
  const key = trackEle.key || mapBase.getKeyOfPoint(position);
  map[key] = newTrackMarker;
  newTrackMarker.trackInfo = trackEle;
  // newTrackMarker.setIcon(pointIcon);
  // const infoWindow = drawInfoWindow(trackEle, amap, vue);
  newTrackMarker.on("mouseover", event => {
    newTrackMarker.setIcon(pointIconOver);
    newTrackMarker.setOffset(new amap.Pixel(-10, -10));
    vue.focusedPoint = trackEle;
    newInfoWindow(vue, trackEle).then(([infoWindow, amap, container])=>{
      if(!infoWindow.getIsOpen()){
        infoWindow.open(container, position);
      }else {
        infoWindow.setPosition(position);
      }
    });
    // infoWindow.open(container, [trackEle.lng, trackEle.lat]);
    // vue.onShowPointerInfoWindow = true;
  });
  newTrackMarker.on("mouseout", event => {
    newTrackMarker.setIcon(pointIcon);
    newTrackMarker.setOffset(new amap.Pixel(-6, -6));
    vue.focusedPoint = null;
    newInfoWindow(vue, trackEle).then(([infoWindow, amap, container]) => {
      if(infoWindow.getIsOpen()){
        infoWindow.close();
      }
    });
    // infoWindow.close();
    // vue.onShowPointerInfoWindow = false;
  });
  newTrackMarker.on('click', event =>{
    vue.$emit('clickPoint', trackEle);
  });
  return newTrackMarker;
};
const drawTrackPassPoint = (vue, trackPartList, category="lines") => {
  return confirmAmap(vue).then(([amap, container]) => {
    const markerMap = globalMarkerMap.get(vue.amapResolve) || {};
    globalMarkerMap.set(vue.amapResolve, markerMap);
    const categoryMarkerMap = markerMap[category] = markerMap[category] || {};
    clearPartMakerList(categoryMarkerMap, container);
    const passPointList = trackPartList.map((trackPart=[], idx) => {
      const validTrack = trackPart.filter(ele => ele.lng && ele.lat);
      let drawTrack = [];
      const resolution = container.getResolution();
      const pathLength = amap.GeometryUtil.distanceOfLine(validTrack.map(ele => [ele.lng, ele.lat]));
      const points = Math.floor(pathLength / (resolution * 30)) || 1;
      const trackLength = validTrack.length;
      const lastIndex = trackLength - 1;
      let step = Math.floor(trackLength / points) || 1;
      drawTrack = validTrack.filter((ele, idx) => idx % step == 0 || idx == lastIndex || ele.isDangerous);
      return drawTrack.map(trackEle => {
        const newTrackMarker = drawPassPointMarker(categoryMarkerMap, trackEle, amap, container, vue);
        container.add(newTrackMarker);
        return newTrackMarker;
      });
  
    });
    return passPointList;
  })
};
const clearPartMakerList = (map={}, container) => {
  return Object.entries(map).filter(([_,marker]) => !!marker).forEach(([key, marker]) => {
    container.remove(marker);
    delete map[key];
  });
};
const removePassPoint = (vue, category='lines') => {
  return confirmAmap(vue).then(([amap, container]) => {
    const markerMap = globalMarkerMap.get(vue.amapResolve) || {};
    globalMarkerMap.set(vue.amapResolve, markerMap);
    const categoryMarkerMap = markerMap[category] = markerMap[category] || {};
    return clearPartMakerList(categoryMarkerMap, container);
  });
}
const getDistance = (point, prePoint, amap) => {
  if (!prePoint) return 0;
  const distance = amap.GeometryUtil.distance(
    [point.lng, point.lat],
    [prePoint.lng, prePoint.lat]
  );
  return distance;
};
const validPointMap = new WeakMap();
const getValidPathArray = (vue, passPointArray=[], isAscend=1) => {
  const pointMap = {};
  return confirmAmap(vue).then(([amap, container]) => {
    const weakMap = validPointMap.get(vue.amapResolve) || {};
    validPointMap.set(vue.amapResolve, weakMap);
    const validPassPointArray = passPointArray.filter(ele => {
      const key = ele.key || mapBase.getKeyOfPoint([ele.lng, ele.lat]);
      const dupPoint = pointMap[key];
      if(dupPoint) return false;
      weakMap[ele.uid] = ele;
      pointMap[ele.key] = ele;
      return true;
    }).sort((a, b) => (a.timeSec - b.timeSec) * isAscend).map((ele, idx, arr) => {
      return Object.assign({}, ele, {
        trackDistance: getDistance(ele, arr[idx - 1], amap)
      });
    });
    return validPassPointArray
  });
};
const shinningMap = new WeakMap();
const clearShinning = (marker) => {
  if(!marker) return;
  if(shinningMap.has(marker)) {
    const interval = shinningMap.get(marker);
    clearInterval(interval);
  }
};
const shinningTheMarker = (marker) => {
  if(!marker) return;
  clearShinning(marker);
  const interval = setInterval(()=>{
    const now = Date.now() % 3000;
    if(now < 2500) {
      marker.show();
    }else {
      marker.hide();
    }
  }, 100);
  shinningMap.set(marker, interval);
};
const lorryMap = new WeakMap();
const prepareLorryMarker = (vue, passPointArray=[], type="lorry") => {
  return confirmAmap(vue).then(([amap, container]) => {
    let lorryMarker = lorryMap.get(vue.amapResolve);
    const trackEle = passPointArray[0];
    const position = [trackEle.lng, trackEle.lat];
    if(!lorryMap.has(vue.amapResolve)) {
      const config = loadPointIconSetting.lorry[type];
      lorryMarker = new amap.Marker({
        position,
        icon: new amap.Icon({
          image:config.image, 
          size: new (Function.prototype.bind.apply(amap.Size, [amap.Size, ...config.size])),
          imageSize: new (Function.prototype.bind.apply(amap.Size, [amap.Size, ...config.size])),
        }),
        bubble: true,
        autoRotation:true,
        angle:0,
        offset: new (Function.prototype.bind.apply(amap.Pixel,[amap.Pixel, ...config.offset])),
        extData:type,
      });
      lorryMarker.on('movealong', function(event){
        if(vue.isRunning) {
          shinningTheMarker(lorryMarker);
        }
      });
      lorryMarker.on('moveend', function(event){
        // vue.handleMoveOnPoint(event);
        // console.log('event end', event.target.get)
        const weakMap = validPointMap.get(vue.amapResolve) || {};
        validPointMap.set(vue.amapResolve, weakMap);
        const position = event.target.getPosition();
        const uid = mapBase.getKeyOfPoint([position.lng, position.lat]);
        const trackEle = weakMap[uid];
        // console.log('move end', event, uid, trackEle);
        if(vue.selectedPoint || vue.focusedPoint) return;
        newInfoWindow(vue, trackEle).then(([infoWindow, amap, container]) =>{
          if(!infoWindow.getIsOpen()){
            infoWindow.open(container, position);
          }else {
            infoWindow.setPosition(position);
          }
        });
      });
      container.add(lorryMarker);
      lorryMarker.show();
      lorryMap.set(vue.amapResolve, lorryMarker);
    };
    return [lorryMarker, amap, container, position];
  });
};
const drawLorryMove = (vue, passPointArray=[], type="lorry") => {
  return prepareLorryMarker(vue, passPointArray, type).then(([lorryMarker, amap, container, position]) => {
    // console.log('lorry marker move', lorryMarker, lorryMap.has(vue.amapResolve));
    clearShinning(lorryMarker);
    lorryMarker.stopMove();
    let resolution = container.getResolution(position);
    lorryMarker.moveAlong(passPointArray.map(ele => [ele.lng, ele.lat]), resolution*100);
    return lorryMarker;
  });
};

const infoWindowMap = new WeakMap();
const newInfoWindow = (vue, trackPoint) => {
  return confirmAmap(vue).then(([amap, container]) => {
    if(!vue.getInfoWindowContent) {
      return Promise.reject("Don't known how to show the info window");
    };
    const content = vue.getInfoWindowContent(trackPoint);
    let infoWindow = null;
    if(infoWindowMap.has(vue.amapResolve)) {
      infoWindow = infoWindowMap.get(vue.amapResolve);
      infoWindow.setContent(content);
    } else {
      infoWindow = new amap.InfoWindow({
        content,
        offset:new amap.Pixel(0, -8),
      });
      infoWindowMap.set(vue.amapResolve, infoWindow);
    }
    return [infoWindow, amap, container];
  });
};
const moveLorryTo = (vue, passPointArray=[], type="lorry", emit=false) => {
  const lastPointArray = passPointArray.reverse();
  return prepareLorryMarker(vue, lastPointArray, type).then(([lorryMarker, amap, container, position]) => {
    // console.log('lorry marker move', lorryMarker, lorryMap.has(vue.amapResolve));
    clearShinning(lorryMarker);
    lorryMarker.stopMove();
    const lastPoint = lastPointArray[0];
    if(!lastPoint) return lorryMarker;
    lorryMarker.setPosition(position);
    if(emit){vue.$emit('clickPoint', lastPoint)}
    newInfoWindow(vue, lastPoint).then(([infoWindow, amap, container]) =>{
      if(!infoWindow.getIsOpen()){
        infoWindow.open(container, position);
      } else {
        infoWindow.setPosition(position);
      }
    });
    return lorryMarker;
  });
};
const showInfoWindowOfPoint = (vue, trackEle) => {
  return newInfoWindow(vue, trackEle).then(([infoWindow, amap, container]) =>{
    const position = [trackEle.lng, trackEle.lat];
    if(!infoWindow.getIsOpen()){
      infoWindow.open(container, position);
    } else {
      infoWindow.setPosition(position);
    }
  });
};
const hideInfoWindow = (vue) => {
  return confirmAmap(vue).then(() => {
    if(infoWindowMap.has(vue.amapResolve)) {
      const infoWindow = infoWindowMap.get(vue.amapResolve);
      if(infoWindow.getIsOpen()) {
        infoWindow.close();
      }
    }
    return 'ok';
  });
}
export {
  removeTrackLine,
  drawTrackLine,
  getValidPathArray,
  getTrackParts,
  drawTrackPassPoint,
  drawLorryMove,
  moveLorryTo,
  showInfoWindowOfPoint,
  hideInfoWindow,
  removePassPoint,
}
