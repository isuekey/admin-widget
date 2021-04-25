
import FundTransfer from './fas/fundTransfer.vue';

export function install(Vue) {
  if(install.installed) return;
  install.installed = true;
  Vue.component('FundTransfer', FundTransfer);
}

const fas = {
  FundTransfer
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
  fas
};

