

import AmapRoute from './waybill/amap-route.vue';
import WaybillTrack from './waybill/WaybillTrack.vue';
import * as mapUtils from './waybill/lib/map.utils.js';
import * as base from './base/index.js';
import * as widgets from './widget/index.js';

export function install(Vue) {
  if(install.installed) return;
  install.installed = true;

  Vue.component('AmapRoute', AmapRoute);
  Vue.component('WaybillTrack', WaybillTrack);
}

const waybill = {
  AmapRoute,
  WaybillTrack,
};

const plugin = {
  install,
};

let GlobalVue = null;

if (typeof window!= 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global != 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
export {
  waybill,
  mapUtils,
  base,
  widgets,
};

