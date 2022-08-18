
const tian_an_men = [116.397423,39.909117];
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
const callOnInitLifeCircle = (vue) => {
  if(!vue.amap) return Promise.reject('amap is not prepared');
  if(!vue.amapResolve) {
    vue.amapResolve = Promise.resolve(vue.amap);
  }
  return vue.amapResolve;
};
const glossary = {
  pathType: {
    union: 0b000,
    driver: 0b001,
    vehicle: 0b010,
    full: 0b011,
  },
  pointType: {
    app:1, zjxl: 2, selfGPS: 3, mmsi: 4, handle5: 5, handle6: 6,
  },
  lorryType: {
    lorry:'lorry', boat:'boat',
  },
  deviceMapping: {
    1:"APP", 2:"辅助设备", 3:"辅助设备", 4:"辅助设备", 5:"APP", 6:"App",
  },
};

const keyOfPointHandler = {
  defaultKeyOfPoint: (point, prefix='', suffix="")=>{
    const key =[prefix, (point[0]*1).toFixed(4), (point[1]*1).toFixed(4), suffix].filter(ele => !!ele).join('/');
    return key;
  }
};
const setKeyOfPointGenerator = (other=keyOfPointHandler.defaultKeyOfPoint) => {
  keyOfPointHandler.handler = other;
};
setKeyOfPointGenerator();
const getKeyOfPoint = (point, prefix, suffix ) => {
  return keyOfPointHandler.handler(point, prefix, suffix);
};
export {
  prepareMap,
  callOnInitLifeCircle,
  tian_an_men,
  glossary,
  getKeyOfPoint,
  setKeyOfPointGenerator,
}
