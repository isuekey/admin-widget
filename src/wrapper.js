
import FundTransferButton from './fas/fundTransferButton.vue';
import FundTransferDialog from './fas/fundTransferDialog.vue';

export function install(Vue) {
  if(install.installed) return;
  install.installed = true;
  Vue.component('FundTransferButton', FundTransferButton);
  Vue.component('FundTransferDialog', FundTransferDialog);
}

const fas = {
  FundTransferButton,
  FundTransferDialog,
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

