
import FundTransferButton from './fas/fundTransferButton.vue';
import FundTransferDialog from './fas/fundTransferDialog.vue';

import AmapRoute from './waybill/amap-route.vue';
import WaybillTrack from './waybill/WaybillTrack.vue';
import * as mapUtils from './waybill/lib/map.utils.js';

export function install(Vue) {
  if(install.installed) return;
  install.installed = true;
  Vue.component('FundTransferButton', FundTransferButton);
  Vue.component('FundTransferDialog', FundTransferDialog);
  Vue.component('AmapRoute', AmapRoute);
  Vue.component('WaybillTrack', WaybillTrack);
}

const fas = {
  FundTransferButton,
  FundTransferDialog,
};
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
  fas,
  waybill,
  mapUtils,
};

