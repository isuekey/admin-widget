import { uuid } from 'simple-uuidv4';

//
//
//
//
//
//
//
//
//
//
//

var script = {
  name:'log',
  props:{
    className:String,
    loadPoint:Array,
    unloadPoint:Array,
    loadRule:Function,
    unloadRule:Function,
    amap:Object,
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "log" }, [
    _c("div", [_vm._v("className:" + _vm._s(_vm.className))]),
    _vm._v(" "),
    _c("div", [_vm._v("logPoint:" + _vm._s(_vm.logPoint))]),
    _vm._v(" "),
    _c("div", [_vm._v("unloadPoint:" + _vm._s(_vm.unloadPoint))]),
    _vm._v(" "),
    _c("div", [_vm._v("loadRule:" + _vm._s(_vm.loadRule))]),
    _vm._v(" "),
    _c("div", [_vm._v("unloadRule:" + _vm._s(_vm.unloadRule))]),
    _vm._v(" "),
    _c("div", [_vm._v("amap:" + _vm._s(_vm.amap))])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-627e1c07_0", { source: "\ndiv.log[data-v-627e1c07] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n", map: {"version":3,"sources":["/media/liuhanru/mywork/apps/dayi/admin-widget/src/waybill/components/log.vue"],"names":[],"mappings":";AA0BA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;AACA","file":"log.vue","sourcesContent":["<template>\n<div class=\"log\">\n  <div>className:{{className}}</div>\n  <div>logPoint:{{logPoint}}</div>\n  <div>unloadPoint:{{unloadPoint}}</div>\n  <div>loadRule:{{loadRule}}</div>\n  <div>unloadRule:{{unloadRule}}</div>\n  <div>amap:{{amap}}</div>\n</div>\n</template>\n\n<script>\nexport default {\n  name:'log',\n  props:{\n    className:String,\n    loadPoint:Array,\n    unloadPoint:Array,\n    loadRule:Function,\n    unloadRule:Function,\n    amap:Object,\n  },\n}\n</script>\n\n<style scoped>\ndiv.log {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-627e1c07";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='56px' height='56px' viewBox='0 0 56 56' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 10%3c/title%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-747.000000%2c -654.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-10' transform='translate(747.000000%2c 654.000000)'%3e %3cpath d='M3.02083333%2c25.0568182 C1.36397908%2c25.0568182 0.0208333333%2c23.7136724 0.0208333333%2c22.0568182 L0.0208333333%2c3 C0.0208333333%2c1.34314575 1.36397908%2c-1.53269159e-12 3.02083333%2c-1.53299595e-12 L52.1458333%2c-1.53299595e-12 C53.8026876%2c-1.52888557e-12 55.1458333%2c1.34314575 55.1458333%2c3 L55.1458333%2c22.0568182 C55.1458333%2c23.7136724 53.8026876%2c25.0568182 52.1458333%2c25.0568182 L32.5265152%2c25.0568182 L27.5833333%2c30 L22.6401515%2c25.0568182 L3.02083333%2c25.0568182 Z' id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88' fill='%2337A800'%3e%3c/path%3e %3ctext id='%e8%a3%85%e8%b4%a7%e5%9c%b0' font-family='PingFang-SC-Heavy%2c PingFang SC' font-size='14' font-weight='600' line-spacing='13' letter-spacing='-1.07692308' fill='white'%3e %3ctspan x='8.08333333' y='16.5284091'%3e%e8%a3%85%e8%b4%a7%e5%9c%b0%3c/tspan%3e %3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-764.000000%2c -689.000000)' fill-rule='nonzero'%3e %3cg id='%e7%bc%96%e7%bb%84-15' transform='translate(764.000000%2c 689.000000)'%3e %3ccircle id='%e6%a4%ad%e5%9c%86%e5%bd%a2' fill='%23BBE8A7' cx='28' cy='45' r='11'%3e%3c/circle%3e %3ccircle id='%e6%a4%ad%e5%9c%86%e5%bd%a2' fill='%2337A800' cx='28' cy='45' r='6'%3e%3c/circle%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='56px' height='56px' viewBox='0 0 56 56' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 10%3c/title%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-331.000000%2c -1026.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-10' transform='translate(331.476117%2c 1026.748301)'%3e %3cpath d='M3.02083333%2c25.0568182 C1.36397908%2c25.0568182 0.0208333333%2c23.7136724 0.0208333333%2c22.0568182 L0.0208333333%2c3 C0.0208333333%2c1.34314575 1.36397908%2c-1.53269159e-12 3.02083333%2c-1.53299595e-12 L52.1458333%2c-1.53299595e-12 C53.8026876%2c-1.53330031e-12 55.1458333%2c1.34314575 55.1458333%2c3 L55.1458333%2c22.0568182 C55.1458333%2c23.7136724 53.8026876%2c25.0568182 52.1458333%2c25.0568182 L32.5265152%2c25.0568182 L27.5833333%2c30 L22.6401515%2c25.0568182 L3.02083333%2c25.0568182 Z' id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88' fill='%23E02020'%3e%3c/path%3e %3ctext id='%e5%8d%b8%e8%b4%a7%e5%9c%b0' font-family='PingFang-SC-Heavy%2c PingFang SC' font-size='14' font-weight='600' line-spacing='13' letter-spacing='-1.07692308' fill='white'%3e %3ctspan x='8.08333333' y='16.5284091'%3e%e5%8d%b8%e8%b4%a7%e5%9c%b0%3c/tspan%3e %3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-348.000000%2c -1060.000000)' fill-rule='nonzero'%3e %3cg id='%e7%bc%96%e7%bb%84-40' transform='translate(348.000000%2c 1060.000000)'%3e %3ccircle id='22' fill='%23FFA6A6' cx='28' cy='45' r='11'%3e%3c/circle%3e %3ccircle id='%e6%a4%ad%e5%9c%86%e5%bd%a2%e5%a4%87%e4%bb%bd-12' fill='%23E02020' cx='28' cy='45' r='6'%3e%3c/circle%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var img$2 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='41px' height='62px' viewBox='0 0 41 62' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 7%3c/title%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-810.000000%2c -646.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-7' transform='translate(812.866894%2c 648.000000)'%3e %3cellipse id='%e6%a4%ad%e5%9c%86%e5%bd%a2%e5%a4%87%e4%bb%bd-2' fill-opacity='0.2' fill='black' cx='18.3012368' cy='51.3314119' rx='10.5981615' ry='8.3345881'%3e%3c/ellipse%3e %3cpath d='M16.9593067%2c-0.976116808 C22.3919129%2c-1.24439367 27.3222956%2c0.761385037 30.9029773%2c4.17155805 C34.5086806%2c7.60556122 36.746576%2c12.465442 36.746576%2c17.8683295 C36.746576%2c24.0566555 33.7908519%2c29.440619 29.2157607%2c32.9392182 C24.4902463%2c36.4531751 21.450293%2c41.7668045 21.450293%2c47.6960814 L21.450293%2c47.6960814 L21.450293%2c48.4608955 C21.450293%2c49.4369752 21.0520644%2c50.3249572 20.4085193%2c50.9685023 C19.7649742%2c51.6120474 18.8769921%2c52.010276 17.9009125%2c52.010276 C16.9248329%2c52.010276 16.0368509%2c51.6120474 15.3933058%2c50.9685023 C14.7497607%2c50.3249572 14.351532%2c49.4369752 14.351532%2c48.4608955 L14.351532%2c48.4608955 L14.351532%2c47.6960814 C14.351532%2c42.0312519 11.710791%2c36.4786611 7.00671149%2c33.2219906 C1.75505514%2c29.5862285 -1.48054408%2c23.393076 -0.941097633%2c16.3807691 C-0.537957782%2c11.677471 1.60858985%2c7.44288599 4.81514677%2c4.33276687 C8.03230539%2c1.21236491 12.3142867%2c-0.774176798 16.9593067%2c-0.976116808 Z' id='%e5%bd%a2%e7%8a%b6' stroke='white' stroke-width='2' fill='%2300A19C' fill-rule='nonzero'%3e%3c/path%3e %3ctext id='%e6%8f%90%e8%b4%a7' font-family='PingFang-SC-Heavy%2c PingFang SC' font-size='14' font-weight='600' line-spacing='14' letter-spacing='-0.7' fill='white'%3e %3ctspan x='3.565288' y='23.630223'%3e%e6%8f%90%e8%b4%a7%3c/tspan%3e %3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var img$3 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='41px' height='62px' viewBox='0 0 41 62' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 7%3c/title%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-385.000000%2c -1026.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-7' transform='translate(387.476117%2c 1028.000000)'%3e %3cellipse id='%e6%a4%ad%e5%9c%86%e5%bd%a2%e5%a4%87%e4%bb%bd-2' fill-opacity='0.2' fill='black' cx='18.3012368' cy='51.3314119' rx='10.5981615' ry='8.3345881'%3e%3c/ellipse%3e %3cpath d='M16.9593067%2c-0.976116808 C22.3919129%2c-1.24439367 27.3222956%2c0.761385037 30.9029773%2c4.17155805 C34.5086806%2c7.60556122 36.746576%2c12.465442 36.746576%2c17.8683295 C36.746576%2c24.0566555 33.7908519%2c29.440619 29.2157607%2c32.9392182 C24.4902463%2c36.4531751 21.450293%2c41.7668045 21.450293%2c47.6960814 L21.450293%2c47.6960814 L21.450293%2c48.4608955 C21.450293%2c49.4369752 21.0520644%2c50.3249572 20.4085193%2c50.9685023 C19.7649742%2c51.6120474 18.8769921%2c52.010276 17.9009125%2c52.010276 C16.9248329%2c52.010276 16.0368509%2c51.6120474 15.3933058%2c50.9685023 C14.7497607%2c50.3249572 14.351532%2c49.4369752 14.351532%2c48.4608955 L14.351532%2c48.4608955 L14.351532%2c47.6960814 C14.351532%2c42.0312519 11.710791%2c36.4786611 7.00671149%2c33.2219906 C1.75505514%2c29.5862285 -1.48054408%2c23.393076 -0.941097633%2c16.3807691 C-0.537957782%2c11.677471 1.60858985%2c7.44288599 4.81514677%2c4.33276687 C8.03230539%2c1.21236491 12.3142867%2c-0.774176798 16.9593067%2c-0.976116808 Z' id='%e5%bd%a2%e7%8a%b6' stroke='white' stroke-width='2' fill='%23008EDD' fill-rule='nonzero'%3e%3c/path%3e %3ctext id='%e5%8d%b8%e8%b4%a7' font-family='PingFang-SC-Heavy%2c PingFang SC' font-size='14' font-weight='600' line-spacing='14' letter-spacing='-0.7' fill='white'%3e %3ctspan x='3.565288' y='23.630223'%3e%e5%8d%b8%e8%b4%a7%3c/tspan%3e %3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var tian_an_men = [116.397423,39.909117];
var prepareMap = function (vue) {
  if(!vue.amapResolve) { return Promise.reject('null amap'); }
  if(!vue.containerResolve) {
    vue.containerResolve = vue.amapResolve.then(function (amap) {
      var amapContainer = new amap.Map(vue.amapId, {
        center: tian_an_men,
        zoom:11,
      });
      return new Promise(function (resolve, reject) {
        amapContainer.on("complete", function (){
          resolve(amapContainer);
        });
      });
    });
  }  return Promise.resolve('ok');
};
var callOnInitLifeCircle = function (vue) {
  if(!vue.amap) { return Promise.reject('amap is not prepared'); }
  if(!vue.amapResolve) {
    vue.amapResolve = Promise.resolve(vue.amap);
  }
  return vue.amapResolve;
};
var glossary = {
  pathType: {
    union: 0,
    driver: 1,
    vehicle: 2,
    full: 3,
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

var keyOfPointHandler = {
  defaultKeyOfPoint: function (point, prefix, suffix){
    if ( prefix === void 0 ) prefix='';
    if ( suffix === void 0 ) suffix="";

    var key =[prefix, point[0].toFixed(4), point[1].toFixed(4), suffix].filter(function (ele) { return !!ele; }).join('/');
    return key;
  }
};
var setKeyOfPointGenerator = function (other) {
  if ( other === void 0 ) other=keyOfPointHandler.defaultKeyOfPoint;

  keyOfPointHandler.handler = other;
};
setKeyOfPointGenerator();
var getKeyOfPoint = function (point, prefix, suffix ) {
  return keyOfPointHandler.handler(point, prefix, suffix);
};

var map_base = /*#__PURE__*/Object.freeze({
  __proto__: null,
  prepareMap: prepareMap,
  callOnInitLifeCircle: callOnInitLifeCircle,
  tian_an_men: tian_an_men,
  glossary: glossary,
  getKeyOfPoint: getKeyOfPoint,
  setKeyOfPointGenerator: setKeyOfPointGenerator
});

var tian_an_men$1 = tian_an_men;
var pointRule = function (distance, circleOption, marker) {
  if ( distance === void 0 ) distance=0;

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
  }  
};
var defaultLoadRule = function (distance){
  if ( distance === void 0 ) distance=0;

  var circleOption={
    fillColor: "#37A80040",
    strokeColor: "#37A80080",
    fillOpacity: 0.5, //填充透明度
    strokeOpacity: 0.5 //线透明度
  };
  // console.log('loadPointMarker', loadPointMarker);
  var marker = {
    image: img,
    size:[56, 56],
    offset:[-28, -45],
    type:'marker',
  };
  return pointRule(distance, circleOption, marker);
};
var defaultUnloadRule = function (distance) {
  if ( distance === void 0 ) distance=0;

  var circleOption={
    fillColor: "#E0202040",
    strokeColor: "#E0202080",
    fillOpacity: 0.5, //填充透明度
    strokeOpacity: 0.5 //线透明度
  };
  // console.log('unloadPointMarker', unloadPointMarker);
  var marker = {
    image: img$1,
    size:[56, 56],
    offset:[-28, -45],
    type:'marker',
  };
  return pointRule(distance, circleOption, marker);
};
var codeMap = {
  district:"adcode",
};
var districtMap = {};
var getKeyOfPoint$1 = getKeyOfPoint;
var drawDistrict = function (amap, container, point, options) {
  if ( options === void 0 ) options={};

  var key = getKeyOfPoint$1(point);
  return new Promise(function (resolve, reject) {
    return new amap.Geocoder().getAddress(new (Function.prototype.bind.apply( amap.LngLat, [ null ].concat( point) )), function (status, result) {
      var isSuccess = status == 'complete' && result.info== 'OK';
      if (!isSuccess) { return reject('unknown district,' + point); }
      var code = result.regeocode.addressComponent[codeMap[options.type]];
      return new amap.DistrictSearch({
        level:options.type, extensions:'all', subdistrict:0,
      }).search(code, function (status, result){
        if(status!='complete') { return Promise.reject('unknown district,'+code); }
        var districtResult = result.districtList[0];
        if(!districtResult) { return Promise.reject('unknown district,'+result); }
        var bounds = districtResult.boundaries;
        if(districtMap[key]){
          container.remove(districtMap[key]);
        }
        var districtOption = Object.assign({}, options, {
          type:undefined,
          map:container,
          path: bounds,
        });
        var polygon = new amap.Polygon(districtOption);
        districtMap[key] = polygon;
        // console.log("boundPoints", boundPoints, bounds);
        return resolve(polygon);
      });
    });
  });
};
var circleMap = {};
var drawCircle = function (amap, container, point, options) {
  if ( options === void 0 ) options={};

  var key = getKeyOfPoint$1(point);
  if(circleMap[key]) {
    container.remove(circleMap[key]);
  }  var circleOption = Object.assign({}, options, {
    type:undefined,
    center:point.slice(),
  });
  var circle = new amap.Circle(circleOption);
  circleMap[key] = circle;
  container.add(circle);
  return Promise.resolve(circle);
};

var markerMap = {};
var drawMarker = function (amap, container, point, options,prefix) {
  if ( options === void 0 ) options={};
  if ( prefix === void 0 ) prefix="";

  var key = "" + prefix + (getKeyOfPoint$1(point));
  if(markerMap[key]){
    container.remove(markerMap[key]);
  }  var ref = options.size;
  var w = ref[0];
  var h = ref[1];
  var pointIcon = new amap.Icon({
    image: options.image, size: new amap.Size(w, h), imageSize:new amap.Size(w, h),
  });
  var ref$1 = options.offset;
  var xo = ref$1[0];
  var yo = ref$1[1];
  var pointMarker = new amap.Marker({
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
};
var drawPoint = function (amap, container, point, pointRule, distance) {
  var drawTask = pointRule(distance).map(function (ruleOptions) {
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

var zoomMap = function (amap, container, avoid) {
  if ( avoid === void 0 ) avoid=[20, 20, 20, 20];

  container.setFitView(null, true, avoid, 18);
};

var renderTheRoute = function (vue) {
  return prepareMap(vue).then(function (ok) {
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  }).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var ld = (vue.loadPoint || vue.unloadPoint || tian_an_men$1).slice();
    var un = (vue.unloadPoint || vue.loadPoint || tian_an_men$1).slice();
    var distance = (vue.trackInfo && vue.trackInfo.realDistance) || amap.GeometryUtil.distance(ld, un);
    // console.log('distance in admin-widget', distance);
    var drawLoad = vue.loadPoint && drawPoint(amap, container, vue.loadPoint.slice(), vue.loadRule || defaultLoadRule, distance) || [void 0, void 0];
    var drawUnload = vue.unloadPoint && drawPoint(amap, container, vue.unloadPoint.slice(), vue.unloadRule || defaultUnloadRule, distance) || [void 0, void 0];
    return Promise.all([amap, container, drawLoad, drawUnload]);
  }).then(function (ref){
    var amap = ref[0];
    var container = ref[1];

    return zoomMap(amap, container, vue.avoid);
  });
};

var renderTheAction = function (vue, startPoint, endPoint) {
  if ( startPoint === void 0 ) startPoint={};
  if ( endPoint === void 0 ) endPoint={};

  return prepareMap(vue).then(function (ok) {
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  }).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var actionMarker = {};
    if(!!startPoint.lng && !!startPoint.lat) {
      actionMarker.startKey = getKeyOfPoint$1([startPoint.lng, startPoint.lat]);
      actionMarker.start = drawMarker(amap, container, [startPoint.lng, startPoint.lat], {
        image: img$2,
        size:[41, 62],
        offset:[-21, -61],
      }, 'start');
    }    if(!!endPoint.lng && !!endPoint.lat) {
      actionMarker.endKey = getKeyOfPoint$1([endPoint.lng, endPoint.lat]);
      var xoff = actionMarker.startKey == actionMarker.endKey ? 10 : 0;
      actionMarker.end = drawMarker(amap, container, [endPoint.lng, endPoint.lat], {
        image: img$3,
        size:[41, 62],
        offset:[-21 + xoff, -61],
      }, 'end');
    }    return Promise.all([actionMarker.start, actionMarker.end]);
  });
};
var findDriverAction = function (driverOperateList, type) {
  if ( driverOperateList === void 0 ) driverOperateList=[];
  if ( type === void 0 ) type=-1;

  return driverOperateList.filter(function (ele) { return ele.operateTypeLm == type; }).map(function (ele) {
    return Object.assign({}, ele, {
      lng:ele.operateLon, lat:ele.operateLat,
    });
  })[0];
};

var load_unload = /*#__PURE__*/Object.freeze({
  __proto__: null,
  renderTheRoute: renderTheRoute,
  renderTheAction: renderTheAction,
  findDriverAction: findDriverAction
});

var img$4 = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%234b8ee6' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$5 = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%234b8ee6' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$6 = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%23a0a000' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$7 = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%23a0a000' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$8 = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%2300b564' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$9 = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%2300b564' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$a = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%23eb1717' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$b = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%23eb1717' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$c = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%23f5a500' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$d = "data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3csvg width='200' height='200' version='1.1' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='100' cy='100' r='50' stroke='%23f5a500' fill='transparent' stroke-width='100'/%3e %3ccircle cx='100' cy='100' r='75' stroke='white' fill='transparent' stroke-width='50'/%3e%3c/svg%3e";

var img$e = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAASCAYAAAAg9DzcAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAAEgAAAADif+FEAAAE6ElEQVRIDb1Vz2slRRCunh957yUxCTFLjEjAg3jzsoIgePKweFjXmyCLoH+AB69ePQreBI+KoIgX3YPnPbjocVFclMXFNVmIkt3gy3sz82a62++r7p5MkmVBEAtmqrq6fnxVXT1jJJLfe+t9WXvmPfFQGCOBp92zHPtD0mXUeQTo/c/YDX16mTb56+axd7/sVRAuv7h95dqNg6+HOsoa0d+69IaUKx/IhYs7asCEJIJX4loriR4ny5P9IOk7up/2j/vD2Mluvv+9zO7VKcJsZlen83ZzfWf7o8lk/LlslQ+M+bDivvE3Lr4mTr6Q7d0pAG8lp1N8mIQ1DvCrXSpM7WJhwwAJmNoN/ePG9PcDOd7fDu1LxiKffHXQvvn2c7kRnyFpI7l/urh7Z/bp7lPLI5FuIXaBNMOAMWvCkICpOgV+iP0QrHfiFk2Iy3eWiymXBhbwd86KbQe6IB49qF1XzbuyMBNoRhi15eLwb1fscu5sNxZ33im081ysM4oEPqrZ6VikbyrJRsxHCna+ngI0epROzlknbSNd04l3XvJRKRn6Kt5bu6jbUnIEQECXjQvJMhfi+FJ852EUs5OlliY5bg2Sq5jQqRl9eIJgrQXHmidnMvGLCqzULvvmGKDHATRwdfNaFtVCmN1UtSxvTMQ64J1X7dgUIU2eTwonmQ1W0HkPD4/SSQlskonA4SEnDffjntZ6InuHXhSFuAaAcer0MROA5ImqO+LRh51sF9J1OGGs0TXxLQp0zqGITpboS/diXHhhh9ERdmW0UYONNJgeF5MzMjmZBqegS32lY034kw24seyFkWxCP84yPgTjFbgDTD0XM14OMav7Cw+wtu0QknBBXU4fdLjuZAUd1rHNAdhknQIucBEyh9sRj5Nu6ZuaZAVKsD06Bg1JmSTVoRw2GQReOM6wD5dNu+6tZOi8UvB3HmNjO8xw0GI6c45E11S1FUyxYskwwz7LA+AMARxGwvDYQeyUdmsAqAce9zU87FgYSVmUkz/1/AIYAM4DSN806C4vInOxOuML0wXAcM9RaOYAxVrXzGsnHewYNvOYYYMZ5kjk7LDhDIcgyiEraHKouUWijguuVeS+JuZuoOhvRrgSGA20LODLMoDFHA/9sSilk80VL4vWy2QEPCjSudYuqhZfkAg4x0hggBGJgLXtbEUIlngqIOLQfdVBcQosC4jAE6cPZYDsC6dT8td9xgkAgUBKvnhBGcqLraoGgHkyULSGl65oNRgBG99q17B9QkQFGiYJGo2RxJ4PwWqw2ICH+WvFOnKG3+FQFCJFlxz3q5njw9yxABYu6LA3ASRHop3+gdtw1Hv0KJIQI6Wl8liQyujUIynZIrmiorGR2eHh6p/7xS95hvahu/iG4C9s5fKztlxbLzel7WYwDH861Bc63B5fl/avVxiip4Qv5ek3opDykiudUfTzHwOk7vfdht67w59+uP14NV2TEjOwZCweJ78dLATfCXn1CcS8j0ntuqmU9hpnGIBlJrd+fCmccUJJBEmOCQOq/+7NC3/hydUXnt8hIFy0k2f3qJH1ES8bLyv+wNZeNVdu/1xMZ352Z6+e4D99/jwHePGPOg/0TEMfVXBo6mmHydbm3e++vbd3LjCN+Zckt14218fXX37n5je0M1cvbe0sb2ygxP+XTJnZjz/79ea/zfoPmrxX/fCo28YAAAAASUVORK5CYII=";

var img$f = "data:image/png;base64,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";

var obj, obj$1, obj$2;

var getTrackParts = function (trackArray) {
  if ( trackArray === void 0 ) trackArray=[];

  var part = 0;
  return trackArray.reduce(function (sum, cur) {
    if(cur.trackDistance && cur.trackDistance > 14000) {
      part = part + 1;
    }
    sum[part] = sum[part] || [];
    sum[part].push(cur);
    return sum;
  }, [[]]);
};
var confirmAmap = function (vue) {
  return prepareMap(vue).then(function (ok){
    return Promise.all([vue.amapResolve, vue.containerResolve]);
  });
};
var globaTrackMap = new WeakMap();
var removeTrackLine = function (vue, category) {
  if ( category === void 0 ) category='lines';

  return confirmAmap(vue).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var markerMap = globaTrackMap.get(vue.amapResolve) || {};
    markerMap[category] = markerMap[category] || [];
    markerMap[category].forEach(function (line) { return container.remove(line); });
    markerMap[category] = [];
  });
};
var drawTrackLine = function (vue, trackPartList, color, category) {
  if ( color === void 0 ) color="#2288ff";
  if ( category === void 0 ) category='lines';

  return confirmAmap(vue).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var markerMap = globaTrackMap.get(vue.amapResolve) || {};
    globaTrackMap.set(vue.amapResolve, markerMap);
    markerMap[category] = markerMap[category] || [];
    markerMap[category].forEach(function (line) { return container.remove(line); });
    var trackLineList = trackPartList.map(function (trackPart, idx) {
      var sorted = trackPart.slice();
      var path = sorted.map(function (ele) { return [ele.lng, ele.lat]; });
      var line = new amap.Polyline({
        map:container, bubble:true, path: path, showDir:true, 
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

var globalMarkerMap = new WeakMap();
var pointType = glossary.pointType;
var loadPointIconSetting = {
  pass: ( obj = {}, obj[pointType.app] = img$8, obj[pointType.zjxl] = img$a, obj[pointType.selfGPS] = img$c, obj[pointType.mmsi] = img$c, obj[pointType.handle5] = img$4, obj[pointType.handle6] = img$6, obj ),
  passOver: ( obj$1 = {}, obj$1[pointType.app] = img$9, obj$1[pointType.zjxl] = img$b, obj$1[pointType.selfGPS] = img$d, obj$1[pointType.mmsi] = img$d, obj$1[pointType.handle5] = img$5, obj$1[pointType.handle6] = img$7, obj$1 ),
  lorry: ( obj$2 = {}, obj$2[glossary.lorryType.lorry] = {
      image: img$e,
      size: [32, 16],
      imageSize: [32, 16],
      offset:[-5, -8],
    }, obj$2[glossary.lorryType.boat] = {
      image: img$f,
      size: [36, 12],
      imageSize: [36, 12],
      offset:[-9, -4]
    }, obj$2 )
};

var drawPassPointMarker = function (map, trackEle, amap, container, vue, still) {
  if ( map === void 0 ) map={};

  var pointIcon = new amap.Icon({
    image: loadPointIconSetting.pass[trackEle.origin],
    size: new amap.Size(12, 12),
    imageSize: new amap.Size(12, 12),
  });
  var pointIconOver = new amap.Icon({
    image: loadPointIconSetting.passOver[trackEle.origin],
    size: new amap.Size(20, 20),
    imageSize: new amap.Size(20, 20),
  });
  // if(trackEle.isDangerous) {
  //   pointIcon.image = loadPointIconSetting.pass[6];
  //   pointIconOver.image = loadPointIconSetting.passOver[6];
  // }
  var position = [trackEle.lng, trackEle.lat];
  var newTrackMarker = new amap.Marker({
    position: [trackEle.lng, trackEle.lat],
    icon: pointIcon,
    bubble: true,
    offset: new amap.Pixel(-6, -6)
  });
  var key = trackEle.key || getKeyOfPoint(position);
  map[key] = newTrackMarker;
  newTrackMarker.trackInfo = trackEle;
  // newTrackMarker.setIcon(pointIcon);
  // const infoWindow = drawInfoWindow(trackEle, amap, vue);
  newTrackMarker.on("mouseover", function (event) {
    newTrackMarker.setIcon(pointIconOver);
    newTrackMarker.setOffset(new amap.Pixel(-10, -10));
    vue.focusedPoint = trackEle;
    newInfoWindow(vue, trackEle).then(function (ref){
      var infoWindow = ref[0];
      var amap = ref[1];
      var container = ref[2];

      if(!infoWindow.getIsOpen()){
        infoWindow.open(container, position);
      }else {
        infoWindow.setPosition(position);
      }
    });
    // infoWindow.open(container, [trackEle.lng, trackEle.lat]);
    // vue.onShowPointerInfoWindow = true;
  });
  newTrackMarker.on("mouseout", function (event) {
    newTrackMarker.setIcon(pointIcon);
    newTrackMarker.setOffset(new amap.Pixel(-6, -6));
    vue.focusedPoint = null;
    newInfoWindow(vue, trackEle).then(function (ref) {
      var infoWindow = ref[0];
      var amap = ref[1];
      var container = ref[2];

      if(infoWindow.getIsOpen()){
        infoWindow.close();
      }
    });
    // infoWindow.close();
    // vue.onShowPointerInfoWindow = false;
  });
  newTrackMarker.on('click', function (event) {
    vue.$emit('clickPoint', trackEle);
  });
  return newTrackMarker;
};
var drawTrackPassPoint = function (vue, trackPartList, category) {
  if ( category === void 0 ) category="lines";

  return confirmAmap(vue).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var markerMap = globalMarkerMap.get(vue.amapResolve) || {};
    globalMarkerMap.set(vue.amapResolve, markerMap);
    var resolution = container.getResolution();
    var categoryMarkerMap = markerMap[category] = markerMap[category] || {};
    var handleDrawPassPoint = function () {
      clearPartMakerList(categoryMarkerMap, container);
      var bounds = container.getBounds();
      var passPointList = trackPartList.map(function (trackPart, idx) {
        if ( trackPart === void 0 ) trackPart=[];

        var validTrack = trackPart.filter(function (ele) { return ele.lng && ele.lat; });
        var trackLength = validTrack.length;
        var lastIndex = trackLength - 1;
        var step = 1;
        var drawTrack = [];
        switch(vue.pointDensity) {
        case 0:
        case 'nopass':
          step = Infinity;
          break;
        case 1:
        case 'everypass':
          step = 0;
          break;
        default:
          var px = parseFloat(vue.pointDensity) > 1 ? vue.pointDensity * 5: 72;
          // const pathLength = amap.GeometryUtil.distanceOfLine(validTrack.map(ele => [ele.lng, ele.lat]));
          // const points = Math.floor(pathLength / (resolution * 30)) || 1;
          // step = Math.floor(trackLength / points) || 1;
          step = resolution * px;
        }
        var accumulateDistance = 0;
        drawTrack = validTrack.filter(function (ele, idx) {
          var isSpecial = idx == 0 || idx == lastIndex || ele.isDangerous;
          accumulateDistance += (ele.trackDistance || 0);
          var isOver = accumulateDistance >= step;
          if(isOver) {
            accumulateDistance = 0;
          }
          // console.log('accumulateDistance', accumulateDistance, 'isOver', isOver, ele.trackDistance, ele);
          return isSpecial || isOver;
        });
        // console.log('drawTrack', resolution, step, drawTrack);
        return drawTrack.map(function (trackEle) {
          var newTrackMarker = drawPassPointMarker(categoryMarkerMap, trackEle, amap, container, vue);
          container.add(newTrackMarker);
          return newTrackMarker;
        });
        
      });
      return passPointList;
    };
    return handleDrawPassPoint();
  });
};
var clearPartMakerList = function (map, container) {
  if ( map === void 0 ) map={};

  return Object.entries(map).filter(function (ref) {
    var _ = ref[0];
    var marker = ref[1];

    return !!marker;
  }).forEach(function (ref) {
    var key = ref[0];
    var marker = ref[1];

    container.remove(marker);
    delete map[key];
  });
};
var removePassPoint = function (vue, category) {
  if ( category === void 0 ) category='lines';

  return confirmAmap(vue).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var markerMap = globalMarkerMap.get(vue.amapResolve) || {};
    globalMarkerMap.set(vue.amapResolve, markerMap);
    var categoryMarkerMap = markerMap[category] = markerMap[category] || {};
    return clearPartMakerList(categoryMarkerMap, container);
  });
};
var getDistance = function (point, prePoint, amap) {
  if (!prePoint) { return 0; }
  var distance = amap.GeometryUtil.distance(
    [point.lng, point.lat],
    [prePoint.lng, prePoint.lat]
  );
  return distance;
};
var validPointMap = new WeakMap();
var getValidPathArray = function (vue, passPointArray, isAscend) {
  if ( passPointArray === void 0 ) passPointArray=[];
  if ( isAscend === void 0 ) isAscend=1;

  var pointMap = {};
  return confirmAmap(vue).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var weakMap = validPointMap.get(vue.amapResolve) || {};
    validPointMap.set(vue.amapResolve, weakMap);
    var validPassPointArray = passPointArray.filter(function (ele) {
      var key = ele.key || getKeyOfPoint([ele.lng, ele.lat]);
      var dupPoint = pointMap[key];
      if(dupPoint) { return false; }
      weakMap[ele.uid] = ele;
      pointMap[ele.key] = ele;
      return true;
    }).sort(function (a, b) { return (a.timeSec - b.timeSec) * isAscend; }).map(function (ele, idx, arr) {
      return Object.assign({}, ele, {
        trackDistance: getDistance(ele, arr[idx - 1], amap)
      });
    });
    return validPassPointArray;
  });
};
var shinningMap = new WeakMap();
var clearShinning = function (marker) {
  if(!marker) { return; }
  if(shinningMap.has(marker)) {
    var interval = shinningMap.get(marker);
    clearInterval(interval);
  }
};
var shinningTheMarker = function (marker) {
  if(!marker) { return; }
  clearShinning(marker);
  var interval = setInterval(function (){
    var now = Date.now() % 3000;
    if(now < 2500) {
      marker.show();
    }else {
      marker.hide();
    }
  }, 100);
  shinningMap.set(marker, interval);
};
var lorryMap = new WeakMap();
var prepareLorryMarker = function (vue, passPointArray, type) {
  if ( passPointArray === void 0 ) passPointArray=[];
  if ( type === void 0 ) type="lorry";

  return confirmAmap(vue).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    var lorryMarker = lorryMap.get(vue.amapResolve);
    var trackEle = passPointArray[0];
    var position = [trackEle.lng, trackEle.lat];
    if(!lorryMap.has(vue.amapResolve)) {
      var config = loadPointIconSetting.lorry[type];
      lorryMarker = new amap.Marker({
        position: position,
        icon: new amap.Icon({
          image:config.image, 
          size: new (Function.prototype.bind.apply(amap.Size, [amap.Size ].concat( config.size))),
          imageSize: new (Function.prototype.bind.apply(amap.Size, [amap.Size ].concat( config.size))),
        }),
        bubble: true,
        autoRotation:true,
        angle:0,
        offset: new (Function.prototype.bind.apply(amap.Pixel,[amap.Pixel ].concat( config.offset))),
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
        var weakMap = validPointMap.get(vue.amapResolve) || {};
        validPointMap.set(vue.amapResolve, weakMap);
        var position = event.target.getPosition();
        var uid = getKeyOfPoint([position.lng, position.lat]);
        var trackEle = weakMap[uid];
        // console.log('move end', event, uid, trackEle);
        if(vue.selectedPoint || vue.focusedPoint) { return; }
        newInfoWindow(vue, trackEle).then(function (ref) {
          var infoWindow = ref[0];
          var amap = ref[1];
          var container = ref[2];

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
    }    return [lorryMarker, amap, container, position];
  });
};
var drawLorryMove = function (vue, passPointArray, type) {
  if ( passPointArray === void 0 ) passPointArray=[];
  if ( type === void 0 ) type="lorry";

  return prepareLorryMarker(vue, passPointArray, type).then(function (ref) {
    var lorryMarker = ref[0];
    var amap = ref[1];
    var container = ref[2];
    var position = ref[3];

    // console.log('lorry marker move', lorryMarker, lorryMap.has(vue.amapResolve));
    clearShinning(lorryMarker);
    lorryMarker.stopMove();
    var resolution = container.getResolution(position);
    lorryMarker.moveAlong(passPointArray.map(function (ele) { return [ele.lng, ele.lat]; }), resolution*100);
    return lorryMarker;
  });
};

var infoWindowMap = new WeakMap();
var newInfoWindow = function (vue, trackPoint) {
  return confirmAmap(vue).then(function (ref) {
    var amap = ref[0];
    var container = ref[1];

    if(!vue.getInfoWindowContent) {
      return Promise.reject("Don't known how to show the info window");
    }    var content = vue.getInfoWindowContent(trackPoint);
    var infoWindow = null;
    if(infoWindowMap.has(vue.amapResolve)) {
      infoWindow = infoWindowMap.get(vue.amapResolve);
      infoWindow.setContent(content);
    } else {
      infoWindow = new amap.InfoWindow({
        content: content,
        offset:new amap.Pixel(0, -8),
      });
      infoWindowMap.set(vue.amapResolve, infoWindow);
    }
    return [infoWindow, amap, container];
  });
};
var moveLorryTo = function (vue, passPointArray, type, emit) {
  if ( passPointArray === void 0 ) passPointArray=[];
  if ( type === void 0 ) type="lorry";
  if ( emit === void 0 ) emit=false;

  var lastPointArray = passPointArray.reverse();
  return prepareLorryMarker(vue, lastPointArray, type).then(function (ref) {
    var lorryMarker = ref[0];
    var amap = ref[1];
    var container = ref[2];
    var position = ref[3];

    // console.log('lorry marker move', lorryMarker, lorryMap.has(vue.amapResolve));
    clearShinning(lorryMarker);
    lorryMarker.stopMove();
    var lastPoint = lastPointArray[0];
    if(!lastPoint) { return lorryMarker; }
    lorryMarker.setPosition(position);
    if(emit){vue.$emit('clickPoint', lastPoint); }
    newInfoWindow(vue, lastPoint).then(function (ref) {
      var infoWindow = ref[0];
      var amap = ref[1];
      var container = ref[2];

      if(!infoWindow.getIsOpen()){
        infoWindow.open(container, position);
      } else {
        infoWindow.setPosition(position);
      }
    });
    return lorryMarker;
  });
};
var showInfoWindowOfPoint = function (vue, trackEle) {
  return newInfoWindow(vue, trackEle).then(function (ref) {
    var infoWindow = ref[0];
    var amap = ref[1];
    var container = ref[2];

    var position = [trackEle.lng, trackEle.lat];
    if(!infoWindow.getIsOpen()){
      infoWindow.open(container, position);
    } else {
      infoWindow.setPosition(position);
    }
  });
};
var hideInfoWindow = function (vue) {
  return confirmAmap(vue).then(function () {
    if(infoWindowMap.has(vue.amapResolve)) {
      var infoWindow = infoWindowMap.get(vue.amapResolve);
      if(infoWindow.getIsOpen()) {
        infoWindow.close();
      }
    }
    return 'ok';
  });
};

var tracking = /*#__PURE__*/Object.freeze({
  __proto__: null,
  removeTrackLine: removeTrackLine,
  drawTrackLine: drawTrackLine,
  getValidPathArray: getValidPathArray,
  getTrackParts: getTrackParts,
  drawTrackPassPoint: drawTrackPassPoint,
  drawLorryMove: drawLorryMove,
  moveLorryTo: moveLorryTo,
  showInfoWindowOfPoint: showInfoWindowOfPoint,
  hideInfoWindow: hideInfoWindow,
  removePassPoint: removePassPoint
});



var map_utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadUnload: load_unload,
  tracking: tracking,
  base: map_base
});

//

var script$1 = {
  name:'AmapRoute',
  components:{
    log: __vue_component__,
  },
  props:{
    className:String,
    loadPoint:Array,
    unloadPoint:Array,
    loadRule:Function,
    unloadRule:Function,
    amap:null,
    avoid:{
      type:Array, default: function default$1(){return [10, 10, 10, 10]; },
    }
  },
  data: function data(){
    // const vue = this;
    var amapId = uuid();
    return {
      amapResolve:null,
      amapId:amapId,
      containerResolve:null,
    };
  },
  mounted: function mounted(){
    var vue = this;
    if(!vue.amap) { return; }
    if(!vue.amapResolve) {
      vue.amapResolve = Promise.resolve(vue.amap);
    }
    vue.drawRoute();
  },
  updated: function updated(){
    var vue = this;
    if(!vue.amap) { return; }
    if(!vue.amapResolve) {
      vue.amapResolve = Promise.resolve(vue.amap);
    }
    vue.drawRoute();
  },
  methods: {
    drawRoute: function drawRoute() {
      var vue = this;
      renderTheRoute(vue).then(function (ok) {
        vue.$emit('drawRoute', ok);
      }).catch(function (err){
        console.log(err);
      });
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.className, attrs: { id: _vm.amapId } },
    [
       _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
var typeSwitch = {
  primary:'info', info:'primary'
};
var deviceMapping = glossary.deviceMapping;
var script$2 = {
  name:'WaybillTrack',
  props: {
    trackInfo: { type: Object, default: function default$1() { return {}; }, },
    baseInfo: { type: Object, default: function default$2() { return {}; }, },
    selectedPoint: Object,
    showDriverInfo: { type: Boolean, default: true, },
    driverInfo: { type: Object, default: function default$3() { return {}; }, },
    amap: null,
    loadPoint:Array,
    unloadPoint:Array,
    showTrackType:{
      type: Number, default: glossary.pathType.full
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
  },
  data: function data(){
    var uuid$1 = uuid();
    return {
      meta: {
        loading: false,
      },
      amapId: uuid$1,
      amapResolve: null,
      containerResolve: null,
      trackTypeOfVehicle:'primary',
      trackTypeOfDriver:'primary',
      trackPath:{},
      focusedPoint:null,
    } 
  },
  computed:{
    disablePlayTrack: function disablePlayTrack() {
      var vue = this;
      var moveDriver = !!(vue.driverActive && vue.showDriverTrack);
      var moveVehicle = !!(vue.vehicleActive && vue.showVehicleTrack);
      var disabled = (moveDriver + moveVehicle)%2 == 0;
      return disabled;
    },
    showUnionTrack: function showUnionTrack(){
      var vue = this;
      return vue.showTrackType == glossary.pathType.union;
    },
    showDriverTrack: function showDriverTrack() {
      var vue = this;
      return (vue.showTrackType & glossary.pathType.driver);
    },
    showVehicleTrack: function showVehicleTrack(){
      var vue = this;
      return (vue.showTrackType & glossary.pathType.vehicle);
    },
    driverActive: function driverActive() {
      var vue = this;
      return vue.trackTypeOfDriver == 'primary';
    },
    vehicleActive: function vehicleActive() {
      var vue = this;
      return vue.trackTypeOfVehicle == 'primary';
    },
  },
  mounted: function mounted() {
    var vue = this;
    callOnInitLifeCircle(vue).then(function (){
      vue.drawTrackAll();
    });
  },
  updated: function updated() {
    var vue = this;
    callOnInitLifeCircle(vue).then(function (){
      vue.drawTrackAll();      
    });
  },
  methods: {
    getAciontRange: function getAciontRange(){
      var vue = this;
      var driverAction = vue.trackInfo && vue.trackInfo.driverOperate;
      var startPoint = findDriverAction(driverAction, 2);
      var endPoint = findDriverAction(driverAction, 3);
      return [startPoint, endPoint];
    },
    drawTrackAll: function drawTrackAll() {
      var vue = this;
      renderTheRoute(vue).then(function (ok) {
        var ref = vue.getAciontRange();
        var startPoint = ref[0];
        var endPoint = ref[1];
        return Promise.all([renderTheAction(vue, startPoint, endPoint), startPoint, endPoint, vue.containerResolve]);
      }).then(function (ref) {
        var ok = ref[0];
        var startPoint = ref[1];
        var endPoint = ref[2];
        var container = ref[3];

        if(!vue._handleDrawPassPoint) {
          container.on('zoomend', function (event) {
            vue.drawTrackPath(startPoint, endPoint);
          });
          vue._handleDrawPassPoint = vue.drawTrackPath;
        }
        vue.drawTrackPath(startPoint, endPoint);
      }).then(function (ok) {
        // console.log('selectedPoint', vue.selectedPoint);
        if(!vue.selectedPoint) { return hideInfoWindow(vue); }
        return showInfoWindowOfPoint(vue, vue.selectedPoint);
      }).catch(function (err){
        console.log(err);
      });
    },
    drawTrackPath: function drawTrackPath(startPoint, endPoint) {
      var vue = this;
      var trackPath =  vue.trackPath;
      var copy = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      var realtime = [endPoint].concat(copy).concat([startPoint]).filter(function (ele) { return !!ele; }).reverse();
      var drawTrackPathHandle = function (pathArray, pathColor, category) {
        if ( category === void 0 ) category="lines";

        return getValidPathArray(vue, pathArray).then(function (paths) {
          var trackParts = getTrackParts(paths);
          drawTrackLine(vue, trackParts, pathColor, category);
          drawTrackPassPoint(vue, trackParts, category);
        });
      };
      if ((vue.showUnionTrack || vue.showDriverTrack)) {
        if(vue.driverActive) {
          trackPath.driver = drawTrackPathHandle(realtime.filter(function (ele){ return ele.origin == glossary.pointType.app; }), vue.trackDriverColor, 'driver');
        } else {
          removeTrackLine(vue, 'driver');
          removePassPoint(vue, 'driver');
        }
      }      if ((vue.showUnionTrack || vue.showVehicleTrack)) {
        if(vue.vehicleActive) {
          trackPath.vehicle = drawTrackPathHandle(realtime.filter(function (ele){ return ele.origin != glossary.pointType.app; }), vue.trackVehicleColor, 'vehicle');
        } else {
          removeTrackLine(vue, 'vehicle');
          removePassPoint(vue, 'vehicle');
        }
      }      return Promise.all([trackPath.all, trackPath.driver, trackPath.vehicle]);
    },
    handlePlayback: function handlePlayback() {
      var vue = this;
      vue.focusedPoint = null;
      var realtime = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      var willMoveDriver = vue.showDriverTrack && vue.driverActive;
      var willMoveVehicle = vue.showVehicleTrack && vue.vehicleActive;
      var willMoveOnUnion = vue.showUnionTrack || (willMoveDriver && willMoveVehicle);
      if (willMoveOnUnion) {
        return getValidPathArray(vue, realtime).then(function (paths) {
          return drawLorryMove(vue, paths, vue.vehicleType);
        });
      } else if (willMoveDriver) {
        return getValidPathArray(vue, realtime.filter(function (ele) { return ele.origin == glossary.pointType.app; })).then(function (paths) {
          return drawLorryMove(vue, paths, vue.vehicleType);
        });
      } else if (willMoveVehicle) {
        return getValidPathArray(vue, realtime.filter(function (ele) { return ele.origin != glossary.pointType.app; })).then(function (paths) {
          return drawLorryMove(vue, paths, vue.vehicleType);
        });
      }
    },
    changeTrack: function changeTrack(target){
      var vue = this;
      var ref = vue.getAciontRange();
      var startPoint = ref[0];
      var endPoint = ref[1];
      switch(target) {
      case 'vehicle':
        vue.trackTypeOfVehicle = typeSwitch[vue.trackTypeOfVehicle];
        vue.drawTrackPath(startPoint, endPoint);
        break;
      case 'driver':
        vue.trackTypeOfDriver = typeSwitch[vue.trackTypeOfDriver];
        vue.drawTrackPath(startPoint, endPoint);
        break;
      default:
        return;
      }
    },
    getInfoWindowContent: function getInfoWindowContent(trackInfo){
      var vue = this;
      var velocity = [];
      // console.log('velocity in track', trackInfo);
      if (trackInfo.velocity) {
        velocity=[
          '<div style="display:flex;padding-top:4px;"><div style="width:60px;text-align:left;font-size:12px">速度</div><span style="font-size:12px">',
          trackInfo.velocityLabel,
          '</span></div>'
        ];
      }      return [("\n      <div style=\"width:220px;padding:8px\">\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">经度</div><span style=\"font-size:12px\">" + ((trackInfo.lng*1 || 0).toFixed(6)) + "</span></div>\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">纬度</div><span style=\"font-size:12px\">" + ((trackInfo.lat*1 || 0).toFixed(6)) + "</span></div>\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">时间</div><span style=\"font-size:12px\">" + (trackInfo.trackTimeLabel) + "</span></div>\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">设备</div><span style=\"font-size:12px\">" + (deviceMapping[trackInfo.origin]) + "</span></div>\n        " + (velocity.join('')) + "\n      "), vue.baseInfo && vue.baseInfo.type != 4 ?("\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;\"><div style=\"width:30px;font-size:12px;\">实时位置</div></div><div style=\"flex:1\"><span style=\"font-size:12px\">" + (trackInfo.addressInfo) + "</span></div></div>\n      "):'',"\n      </div>\n      "].join('');
    },
    moveToEnd: function moveToEnd(type){
      var vue = this;
      vue.focusedPoint = type;
      var realtime = vue.trackInfo && vue.trackInfo.realtime.slice() || [];
      switch(type) {
      case "driver":
        return getValidPathArray(vue, realtime.filter(function (ele) { return ele.origin == glossary.pointType.app; })).then(function (paths) {
          if(paths.length) {
            return moveLorryTo(vue, paths, vue.vehicleType, vue.emitLastPosition);
          } else {
            return hideInfoWindow(vue);
          }
        });
      case "vehicle":
        return getValidPathArray(vue, realtime.filter(function (ele) { return ele.origin != glossary.pointType.app; })).then(function (paths) {
          if (paths.length) {
            return moveLorryTo(vue, paths, vue.vehicleType, vue.emitLastPosition);            
          } else {
            return hideInfoWindow(vue);
          }
        });
      }    }
  }
};

var img$g = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='52px' height='52px' viewBox='0 0 52 52' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 4%3c/title%3e %3cdefs%3e %3clinearGradient x1='-12.313058%25' y1='-14.7070312%25' x2='109.143415%25' y2='108.638393%25' id='linearGradient-1'%3e %3cstop stop-color='%23F1DCC4' offset='0%25'%3e%3c/stop%3e %3cstop stop-color='%23AE9484' offset='100%25'%3e%3c/stop%3e %3c/linearGradient%3e %3crect id='path-2' x='0' y='0' width='52' height='52' rx='3.57142857'%3e%3c/rect%3e %3cpath d='M22.1207049%2c27.7447245 C25.7254001%2c27.7447245 28.565433%2c24.7734665 29.6418686%2c22.5208687 C31.1577996%2c19.3485629 31.4216947%2c13.8438427 31.4216947%2c9.53771013 C31.4216947%2c1.66531625 26.0844392%2c1.9356158 21.6270304%2c1.9356158 C17.1696215%2c1.9356158 12.7759675%2c1.66531625 12.7759675%2c9.53771013 C12.7759675%2c13.8803566 13.0253319%2c19.3517497 14.5858142%2c22.5208687 C15.856767%2c25.1019943 18.5160098%2c27.7447245 22.1207049%2c27.7447245 Z' id='path-4'%3e%3c/path%3e %3c/defs%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-286.000000%2c -579.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-4' transform='translate(286.000000%2c 579.000000)'%3e %3cmask id='mask-3' fill='white'%3e %3cuse xlink:href='%23path-2'%3e%3c/use%3e %3c/mask%3e %3cuse id='%e8%92%99%e7%89%88' fill='url(%23linearGradient-1)' xlink:href='%23path-2'%3e%3c/use%3e %3cg id='%e7%bc%96%e7%bb%84-11' mask='url(%23mask-3)'%3e %3cg transform='translate(3.714286%2c 7.239230)'%3e %3cpath d='M5.59704302%2c36.0225499 C11.1756725%2c31.9513992 16.7077196%2c29.9158238 22.1931845%2c29.9158238 C27.7082279%2c29.9158238 33.2157485%2c31.9734106 38.7157465%2c36.0885843 C40.5745998%2c37.4793988 41.9314169%2c39.4363531 42.581989%2c41.6649079 L44.3089983%2c47.5808312 L44.3089983%2c47.5808312 L5.27831747e-14%2c47.5808312 L1.58343856%2c41.8320749 C2.22642151%2c39.4976789 3.64115899%2c37.4499074 5.59704302%2c36.0225499 Z' id='Rectangle%e5%a4%87%e4%bb%bd-11' stroke='none' fill='%23A88269' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M25.2320359%2c30.3361024 C26.0891119%2c30.0677211 26.760568%2c29.876567 27.2464041%2c29.7626402 C27.7174612%2c29.652179 28.356183%2c29.5269308 29.1625695%2c29.3868956 L29.1625776%2c29.3869425 C29.3180205%2c29.3599486 29.4659148%2c29.4640771 29.4929086%2c29.61952 C29.4938488%2c29.6249338 29.4946325%2c29.6303736 29.4952589%2c29.6358326 C29.7854488%2c32.1649064 29.9305437%2c34.9799924 29.9305437%2c38.0810905 C29.9305437%2c41.3053471 29.6273402%2c44.0509031 29.0209334%2c46.3177587 L24.2856429%2c50.8905755 C25.0166065%2c45.6204602 25.3820884%2c41.4281165 25.3820884%2c38.3135446 C25.3820884%2c35.3102943 25.2658659%2c32.7524563 25.033421%2c30.6400308 L25.0334015%2c30.640033 C25.0184625%2c30.5042694 25.1016938%2c30.3769172 25.2320359%2c30.3361024 Z' id='%e7%9f%a9%e5%bd%a2' stroke='none' fill='%234E3838' fill-rule='evenodd' transform='translate(27.108093%2c 40.113219) rotate(44.000000) translate(-27.108093%2c -40.113219) '%3e%3c/path%3e %3cpolygon id='Rectangle%e5%a4%87%e4%bb%bd-13' stroke='none' fill='%23FFDAC2' fill-rule='evenodd' points='17.778095 22.0361607 26.7933336 22.0361607 26.6352769 32.1572719 18.0816288 32.1572719'%3e%3c/polygon%3e %3cpath d='M17.9132764%2c30.0950182 C19.0827529%2c31.1786715 20.5811384%2c31.7204982 22.4084328%2c31.7204982 C24.2099068%2c31.7204982 25.5784294%2c31.215928 26.5140005%2c30.2067876 C26.6326397%2c30.0787273 26.8171048%2c30.0354764 26.980324%2c30.0973971 L28.1441118%2c30.5389048 C28.2548882%2c30.580777 28.3105964%2c30.7045905 28.2685903%2c30.8153162 C28.2611579%2c30.8349075 28.250894%2c30.8533036 28.238126%2c30.869918 C26.9348872%2c32.5657574 24.9916562%2c33.4136771 22.4084328%2c33.4136771 C19.8269576%2c33.4136771 17.7280875%2c32.5473895 16.1118225%2c30.8148142 C16.0311948%2c30.7282508 16.0359023%2c30.592712 16.1224035%2c30.5120177 C16.1436322%2c30.4922141 16.1686652%2c30.4769328 16.1959817%2c30.4671019 L17.4768561%2c30.0061311 C17.6275119%2c29.9519064 17.7958291%2c29.9861898 17.9132764%2c30.0950182 Z' id='%e8%b7%af%e5%be%84-21%e5%a4%87%e4%bb%bd' stroke='none' fill='%23CFAB8E' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M12.4947703%2c19.1782786 C14.1143741%2c19.3485058 15.5975922%2c17.8664933 15.7902702%2c16.0332846 C15.9829482%2c14.200076 14.7121412%2c13.661132 13.0925373%2c13.4909047 C11.4729335%2c13.3206775 10.1178439%2c13.5836287 9.92516593%2c15.4168373 C9.73248793%2c17.250046 10.8751664%2c19.0080514 12.4947703%2c19.1782786 Z' id='Oval%e5%a4%87%e4%bb%bd' stroke='none' fill='%23FFDAC2' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M31.7028919%2c19.1782786 C30.0832881%2c19.3485058 28.60007%2c17.8664933 28.407392%2c16.0332846 C28.214714%2c14.200076 29.485521%2c13.661132 31.1051249%2c13.4909047 C32.7247287%2c13.3206775 34.0798183%2c13.5836287 34.2724963%2c15.4168373 C34.4651743%2c17.250046 33.3224958%2c19.0080514 31.7028919%2c19.1782786 Z' id='Oval%e5%a4%87%e4%bb%bd-2' stroke='none' fill='%23FFDAC2' fill-rule='evenodd'%3e%3c/path%3e %3cmask id='mask-5' fill='white'%3e %3cuse xlink:href='%23path-4'%3e%3c/use%3e %3c/mask%3e %3cuse id='%e8%92%99%e7%89%88' stroke='none' fill='%23FFE7D6' fill-rule='evenodd' xlink:href='%23path-4'%3e%3c/use%3e %3cpath d='M23.1353149%2c18.7568947 C23.3427459%2c17.6638684 22.8984572%2c16.2390176 22.4833281%2c15.5891022 C22.3430834%2c15.3695386 21.8605422%2c15.3656585 21.7235133%2c15.5790553 C21.3077097%2c16.226591 20.8575369%2c17.6674459 21.059513%2c18.7538274 C21.1057483%2c19.002516 23.0943996%2c18.9724917 23.1353149%2c18.7568947 Z' id='%e6%a4%ad%e5%9c%86%e5%bd%a2%e5%a4%87%e4%bb%bd-7' stroke='none' fill='%23FBD3B9' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M20.2123289%2c21.9654824 C20.7987034%2c22.3201607 21.4863308%2c22.5242881 22.2216347%2c22.5242881 C22.9332852%2c22.5242881 23.6002772%2c22.3330823 24.1740402%2c21.9992414' id='%e8%b7%af%e5%be%84%e5%a4%87%e4%bb%bd-5' stroke='%23EE9585' stroke-width='0.857142857' fill='none' stroke-linecap='round'%3e%3c/path%3e %3cpath d='M12.8459583%2c14.0776 C12.5412311%2c13.6536928 12.0974331%2c13.466828 11.5145645%2c13.5170059 C11.3937709%2c12.1889509 11.0380542%2c6.60754063 12.7759675%2c3.84813058 C14.3666504%2c1.32248884 17.0277581%2c5.03089633e-14 22.061829%2c5.03089633e-14 C26.6055558%2c5.03089633e-14 29.7540039%2c1.27869001 31.3063946%2c3.84813058 C32.7761508%2c6.2807986 32.9449707%2c12.2186035 32.7849923%2c13.5485105 C32.1323012%2c13.4932268 31.6394353%2c13.6695899 31.3063946%2c14.0776 C31.3063946%2c11.9349587 29.8240095%2c8.30980748 29.1999442%2c7.87816685 C28.5758789%2c7.44652623 28.5758789%2c8.37600446 22.0988311%2c8.50332031 C15.6217833%2c8.63063616 15.0919608%2c7.51929757 14.5972934%2c7.87816685 C14.1026259%2c8.23703613 12.7936538%2c11.9349587 12.8459583%2c14.0776 Z' id='%e8%b7%af%e5%be%84-19%e5%a4%87%e4%bb%bd' stroke='none' fill='%2348433D' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M6.93500056%2c44.9290737 C7.18165235%2c42.6286135 8.02144727%2c40.7585486 8.35415514%2c40.8879048 C8.68686301%2c41.017261 8.35112208%2c43.2534042 8.61953251%2c44.9290737 C8.61953251%2c44.9290737 6.93500056%2c44.9290737 6.93500056%2c44.9290737 Z' id='%e8%b7%af%e5%be%84-22' stroke='none' fill='%23966D52' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M35.2447767%2c44.9290737 C35.4914284%2c42.6286135 36.3312234%2c40.7585486 36.6639312%2c40.8879048 C36.9966391%2c41.017261 36.6608982%2c43.2534042 36.9293086%2c44.9290737 C36.9293086%2c44.9290737 35.2447767%2c44.9290737 35.2447767%2c44.9290737 Z' id='%e8%b7%af%e5%be%84-22' stroke='none' fill='%23966D52' fill-rule='evenodd' transform='translate(36.087043%2c 42.905324) scale(-1%2c 1) translate(-36.087043%2c -42.905324) '%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

/* script */
var __vue_script__$2 = script$2;
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.meta.loading,
          expression: "meta.loading"
        }
      ],
      staticClass: "track-amap-container"
    },
    [
      _c("div", {
        staticClass: "track-amap height-100p min-height-700",
        attrs: {
          id: _vm.amapId,
          trackInfo: _vm.trackInfo,
          selectedPoint: _vm.selectedPoint
        }
      }),
      _vm._v(" "),
      _vm.showDriverInfo
        ? _c("div", { staticClass: "driver-info" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "user-info" }, [
              _c("span", { staticClass: "user-name" }, [
                _vm._v(_vm._s(_vm.driverInfo.driverName))
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "user-phone" }, [
                _vm._v(_vm._s(_vm.driverInfo.driverPhone))
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "user-phone plate-code" }, [
                _c("span", [_vm._v(_vm._s(_vm.driverInfo.carPlate))])
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "track-playback" },
              [
                _vm.showPlayBack
                  ? _c(
                      "el-button",
                      {
                        staticClass: "trackbutton margin-bottom-8",
                        attrs: {
                          disabled: _vm.disablePlayTrack,
                          plain: "",
                          type: "default",
                          size: "mini"
                        },
                        on: { click: _vm.handlePlayback }
                      },
                      [_vm._v("轨迹回放")]
                    )
                  : _vm._e()
              ],
              1
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "track-tabs" }, [
         _c(
              "div",
              { staticClass: "flex-row" },
              [
                _vm.showDriverTrack
                  ? _c(
                      "el-button",
                      {
                        staticStyle: { width: "116px" },
                        attrs: { type: _vm.trackTypeOfVehicle, size: "mini" },
                        on: {
                          click: function($event) {
                            return _vm.changeTrack("vehicle")
                          }
                        }
                      },
                      [_vm._v("车辆轨迹")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.showVehicleTrack
                  ? _c(
                      "el-button",
                      {
                        staticStyle: { width: "116px" },
                        attrs: { type: _vm.trackTypeOfDriver, size: "mini" },
                        on: {
                          click: function($event) {
                            return _vm.changeTrack("driver")
                          }
                        }
                      },
                      [_vm._v("司机轨迹")]
                    )
                  : _vm._e()
              ],
              1
            )
          ,
        _vm._v(" "),
         _c(
              "div",
              { staticClass: "flex-row padding-top-4" },
              [
                _vm.showDriverTrack
                  ? _c(
                      "el-button",
                      {
                        attrs: { type: "default", size: "mini" },
                        on: {
                          click: function($event) {
                            return _vm.moveToEnd("vehicle")
                          }
                        }
                      },
                      [_vm._v("车辆实时位置")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.showVehicleTrack
                  ? _c(
                      "el-button",
                      {
                        attrs: { type: "default", size: "mini" },
                        on: {
                          click: function($event) {
                            return _vm.moveToEnd("driver")
                          }
                        }
                      },
                      [_vm._v("司机实时位置")]
                    )
                  : _vm._e()
              ],
              1
            )
          
      ])
    ]
  )
};
var __vue_staticRenderFns__$2 = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "user-avatar" }, [
      _c("img", {
        attrs: { src: img$g, alt: "" }
      })
    ])
  }
];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-1ad74eae_0", { source: "\n.track-amap-container {\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  background: coral;\n}\n.track-amap {\n  min-width: 200px;\n  min-height: 200px;\n  flex: 1;\n}\n.driver-info {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  padding:8px;\n  border-radius:4px;\n  background:#ffffffa0;\n  display:flex;\n  flex-direction: row;\n  align-items: center;\n}\n.track-tabs {\n  background: transparent;\n  position: absolute;\n  top: 120px;\n  left: 20px;\n}\n.user-avatar {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n.user-avatar img {\n  width: 100%;\n  height: 100%;\n  opacity: 0.95;\n}\n.user-info {\n  width: 180px;\n  height: 60px;\n  padding: 0 10px;\n  color:#000000a0;\n}\n.user-name {\n  margin-right: 10px;\n}\n.user-phone {\n  line-height: 30px;\n}\n.plate-code >span {\n  background-color: #FAECD880;\n  padding:0 4px;\n  color: #61503A;\n  border-radius: 2px;\n}\n.height-100p {\n  height: 100%;\n}\n.min-height-400 {\n  min-height: 400px;\n}\n.min-height-700 {\n  min-height: 700px;\n}\n.amap-logo,\n.amap-copyright {\n  display: none !important;\n}\n.track-playback {\n  color:#000000a0;\n  display: flex;\n  flex-direction:column;\n  padding: 0 10px;\n  align-items: center;\n  justify-content:space-between;\n}\n.track-playback .el-button + .el-button {\n  margin-left:0;\n}\n.el-button.trackbutton {\n  background-color: #ffffff80;\n  border-color: #409EFF40;\n  color:#409EFF;\n  border-radius: 6px;\n  padding-bottom:5px !important;\n  padding-top:5px !important;\n}\n.trackbutton > span {\n  font-size: 12px;\n  font-weight: 700;\n  background: transparent;\n}\n.el-button.trackbutton:hover {\n  background-color: #409EFF18;\n  border-color: #409EFF00;\n  box-shadow: unset;\n}\n", map: {"version":3,"sources":["/media/liuhanru/mywork/apps/dayi/admin-widget/src/waybill/WaybillTrack.vue"],"names":[],"mappings":";AA4QA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AACA;AACA;EACA,gBAAA;EACA,iBAAA;EACA,OAAA;AACA;AACA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,iBAAA;EACA,oBAAA;EACA,YAAA;EACA,mBAAA;EACA,mBAAA;AACA;AACA;EACA,uBAAA;EACA,kBAAA;EACA,UAAA;EACA,UAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,aAAA;AACA;AACA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,2BAAA;EACA,aAAA;EACA,cAAA;EACA,kBAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;;EAEA,wBAAA;AACA;AACA;EACA,eAAA;EACA,aAAA;EACA,qBAAA;EACA,eAAA;EACA,mBAAA;EACA,6BAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,2BAAA;EACA,uBAAA;EACA,aAAA;EACA,kBAAA;EACA,6BAAA;EACA,0BAAA;AACA;AACA;EACA,eAAA;EACA,gBAAA;EACA,uBAAA;AACA;AACA;EACA,2BAAA;EACA,uBAAA;EACA,iBAAA;AACA","file":"WaybillTrack.vue","sourcesContent":["<template>\n  <div class=\"track-amap-container\" v-loading=\"meta.loading\">\n    <div class=\"track-amap height-100p min-height-700\" :id=\"amapId\" :trackInfo=\"trackInfo\" :selectedPoint=\"selectedPoint\"></div>\n    <div class=\"driver-info\" v-if=\"showDriverInfo\">\n      <div class=\"user-avatar\">\n        <img src=\"./assets/carrior_portrait.svg\" alt />\n      </div>\n      <div class=\"user-info\">\n        <span class=\"user-name\">{{driverInfo.driverName}}</span>\n        <span class=\"user-phone\">{{driverInfo.driverPhone}}</span>\n        <div class=\"user-phone plate-code\"><span>{{driverInfo.carPlate}}</span></div>\n      </div>\n      <div class=\"track-playback\">\n        <el-button v-if=\"showPlayBack\" :disabled=\"disablePlayTrack\" plain type=\"default\" size=\"mini\" @click=\"handlePlayback\" class=\"trackbutton margin-bottom-8\">轨迹回放</el-button>\n        <!-- <el-button \n         plain type=\"default\" size=\"mini\" @click=\"refreshTrack\" class=\"trackbutton margin-bottom-8\"\n         v-if=\"baseInfo.waybillStatus == 3\"\n        >实时位置</el-button> -->\n      </div>\n    </div>\n    <div class=\"track-tabs\">\n      <div class=\"flex-row\" v-if=\"true\">\n        <el-button style=\"width:116px\" v-if=\"showDriverTrack\" :type=\"trackTypeOfVehicle\" size=\"mini\" @click=\"changeTrack('vehicle')\">车辆轨迹</el-button>\n        <el-button style=\"width:116px\" v-if=\"showVehicleTrack\" :type=\"trackTypeOfDriver\" size=\"mini\" @click=\"changeTrack('driver')\">司机轨迹</el-button>\n      </div>\n      <div class=\"flex-row padding-top-4\" v-if=\"true\">\n        <el-button v-if=\"showDriverTrack\" type=\"default\" size=\"mini\" @click=\"moveToEnd('vehicle')\">车辆实时位置</el-button>\n        <el-button v-if=\"showVehicleTrack\" type=\"default\" size=\"mini\" @click=\"moveToEnd('driver')\">司机实时位置</el-button>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport * as simpleUUIdv4 from 'simple-uuidv4';\nimport * as mapUtils from './lib/map.utils.js';\nconst typeSwitch = {\n  primary:'info', info:'primary'\n};\nconst deviceMapping = mapUtils.base.glossary.deviceMapping;\nexport default {\n  name:'WaybillTrack',\n  props: {\n    trackInfo: { type: Object, default() { return {}; }, },\n    baseInfo: { type: Object, default() { return {}; }, },\n    selectedPoint: Object,\n    showDriverInfo: { type: Boolean, default: true, },\n    driverInfo: { type: Object, default() { return {}; }, },\n    amap: null,\n    loadPoint:Array,\n    unloadPoint:Array,\n    showTrackType:{\n      type: Number, default: mapUtils.base.glossary.pathType.full\n    },\n    trackVehicleColor:{ type:String, default:\"#2288FF\", },\n    trackDriverColor:{ type:String, default:\"#D01F1F\", },\n    trackUnionColor:{ type:String, default:\"#2288FF\", },\n    showPlayBack:{ type:Boolean, default:true },\n    vehicleType:{ type:String, default:'lorry', },\n    moveTriggerInfoWindow:{ type:Boolean, default: true, },\n    isRunning:{ type:Boolean, default:false, },\n    emitLastPosition:Boolean,\n    pointDensity: { type: Number, default: 30 },\n  },\n  data(){\n    const uuid = simpleUUIdv4.uuid();\n    return {\n      meta: {\n        loading: false,\n      },\n      amapId: uuid,\n      amapResolve: null,\n      containerResolve: null,\n      trackTypeOfVehicle:'primary',\n      trackTypeOfDriver:'primary',\n      trackPath:{},\n      focusedPoint:null,\n    } \n  },\n  computed:{\n    disablePlayTrack() {\n      const vue = this;\n      const moveDriver = !!(vue.driverActive && vue.showDriverTrack);\n      const moveVehicle = !!(vue.vehicleActive && vue.showVehicleTrack);\n      const disabled = (moveDriver + moveVehicle)%2 == 0;\n      return disabled;\n    },\n    showUnionTrack(){\n      const vue = this;\n      return vue.showTrackType == mapUtils.base.glossary.pathType.union;\n    },\n    showDriverTrack() {\n      const vue = this;\n      return (vue.showTrackType & mapUtils.base.glossary.pathType.driver);\n    },\n    showVehicleTrack(){\n      const vue = this;\n      return (vue.showTrackType & mapUtils.base.glossary.pathType.vehicle);\n    },\n    driverActive() {\n      const vue = this;\n      return vue.trackTypeOfDriver == 'primary';\n    },\n    vehicleActive() {\n      const vue = this;\n      return vue.trackTypeOfVehicle == 'primary';\n    },\n  },\n  mounted() {\n    const vue = this;\n    mapUtils.base.callOnInitLifeCircle(vue).then(()=>{\n      vue.drawTrackAll();\n    });\n  },\n  updated() {\n    const vue = this;\n    mapUtils.base.callOnInitLifeCircle(vue).then(()=>{\n      vue.drawTrackAll();      \n    })\n  },\n  methods: {\n    getAciontRange(){\n      const vue = this;\n      const driverAction = vue.trackInfo && vue.trackInfo.driverOperate;\n      const startPoint = mapUtils.loadUnload.findDriverAction(driverAction, 2);\n      const endPoint = mapUtils.loadUnload.findDriverAction(driverAction, 3);\n      return [startPoint, endPoint];\n    },\n    drawTrackAll() {\n      const vue = this;\n      mapUtils.loadUnload.renderTheRoute(vue).then(ok => {\n        const [startPoint, endPoint] = vue.getAciontRange();\n        return Promise.all([mapUtils.loadUnload.renderTheAction(vue, startPoint, endPoint), startPoint, endPoint, vue.containerResolve]);\n      }).then(([ok, startPoint, endPoint, container]) => {\n        if(!vue._handleDrawPassPoint) {\n          container.on('zoomend', (event) =>{\n            vue.drawTrackPath(startPoint, endPoint);\n          });\n          vue._handleDrawPassPoint = vue.drawTrackPath;\n        }\n        vue.drawTrackPath(startPoint, endPoint);\n      }).then(ok => {\n        // console.log('selectedPoint', vue.selectedPoint);\n        if(!vue.selectedPoint) return mapUtils.tracking.hideInfoWindow(vue);\n        return mapUtils.tracking.showInfoWindowOfPoint(vue, vue.selectedPoint);\n      }).catch(err=>{\n        console.log(err);\n      });\n    },\n    drawTrackPath(startPoint, endPoint) {\n      const vue = this;\n      const trackPath =  vue.trackPath;\n      const copy = vue.trackInfo && vue.trackInfo.realtime.slice() || [];\n      const realtime = [endPoint].concat(copy).concat([startPoint]).filter(ele => !!ele).reverse();\n      const drawTrackPathHandle = (pathArray, pathColor, category=\"lines\") => {\n        return mapUtils.tracking.getValidPathArray(vue, pathArray).then((paths) => {\n          const trackParts = mapUtils.tracking.getTrackParts(paths);\n          mapUtils.tracking.drawTrackLine(vue, trackParts, pathColor, category);\n          mapUtils.tracking.drawTrackPassPoint(vue, trackParts, category);\n        });\n      };\n      if ((vue.showUnionTrack || vue.showDriverTrack)) {\n        if(vue.driverActive) {\n          trackPath.driver = drawTrackPathHandle(realtime.filter(ele=> ele.origin == mapUtils.base.glossary.pointType.app), vue.trackDriverColor, 'driver');\n        } else {\n          mapUtils.tracking.removeTrackLine(vue, 'driver');\n          mapUtils.tracking.removePassPoint(vue, 'driver');\n        }\n      };\n      if ((vue.showUnionTrack || vue.showVehicleTrack)) {\n        if(vue.vehicleActive) {\n          trackPath.vehicle = drawTrackPathHandle(realtime.filter(ele=> ele.origin != mapUtils.base.glossary.pointType.app), vue.trackVehicleColor, 'vehicle');\n        } else {\n          mapUtils.tracking.removeTrackLine(vue, 'vehicle');\n          mapUtils.tracking.removePassPoint(vue, 'vehicle');\n        }\n      };\n      return Promise.all([trackPath.all, trackPath.driver, trackPath.vehicle]);\n    },\n    handlePlayback() {\n      const vue = this;\n      vue.focusedPoint = null;\n      const realtime = vue.trackInfo && vue.trackInfo.realtime.slice() || [];\n      const willMoveDriver = vue.showDriverTrack && vue.driverActive;\n      const willMoveVehicle = vue.showVehicleTrack && vue.vehicleActive;\n      const willMoveOnUnion = vue.showUnionTrack || (willMoveDriver && willMoveVehicle);\n      if (willMoveOnUnion) {\n        return mapUtils.tracking.getValidPathArray(vue, realtime).then((paths) => {\n          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType);\n        });\n      } else if (willMoveDriver) {\n        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin == mapUtils.base.glossary.pointType.app)).then((paths) => {\n          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType);\n        });\n      } else if (willMoveVehicle) {\n        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin != mapUtils.base.glossary.pointType.app)).then((paths) => {\n          return mapUtils.tracking.drawLorryMove(vue, paths, vue.vehicleType);\n        });\n      }\n    },\n    changeTrack(target){\n      const vue = this;\n      const [startPoint, endPoint] = vue.getAciontRange();\n      switch(target) {\n      case 'vehicle':\n        vue.trackTypeOfVehicle = typeSwitch[vue.trackTypeOfVehicle];\n        vue.drawTrackPath(startPoint, endPoint);\n        break;\n      case 'driver':\n        vue.trackTypeOfDriver = typeSwitch[vue.trackTypeOfDriver];\n        vue.drawTrackPath(startPoint, endPoint);\n        break;\n      default:\n        return;\n      }\n    },\n    getInfoWindowContent(trackInfo){\n      const vue = this;\n      let velocity = [];\n      // console.log('velocity in track', trackInfo);\n      if (trackInfo.velocity) {\n        velocity=[\n          '<div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">速度</div><span style=\"font-size:12px\">',\n          trackInfo.velocityLabel,\n          '</span></div>'\n        ];\n      };\n      return [`\n      <div style=\"width:220px;padding:8px\">\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">经度</div><span style=\"font-size:12px\">${(trackInfo.lng*1 || 0).toFixed(6)}</span></div>\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">纬度</div><span style=\"font-size:12px\">${(trackInfo.lat*1 || 0).toFixed(6)}</span></div>\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">时间</div><span style=\"font-size:12px\">${trackInfo.trackTimeLabel}</span></div>\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;font-size:12px\">设备</div><span style=\"font-size:12px\">${deviceMapping[trackInfo.origin]}</span></div>\n        ${velocity.join('')}\n      `, vue.baseInfo && vue.baseInfo.type != 4 ?`\n        <div style=\"display:flex;padding-top:4px;\"><div style=\"width:60px;text-align:left;\"><div style=\"width:30px;font-size:12px;\">实时位置</div></div><div style=\"flex:1\"><span style=\"font-size:12px\">${trackInfo.addressInfo}</span></div></div>\n      `:'',`\n      </div>\n      `].join('');\n    },\n    moveToEnd(type){\n      const vue = this;\n      vue.focusedPoint = type;\n      const realtime = vue.trackInfo && vue.trackInfo.realtime.slice() || [];\n      switch(type) {\n      case \"driver\":\n        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin == mapUtils.base.glossary.pointType.app)).then((paths) => {\n          if(paths.length) {\n            return mapUtils.tracking.moveLorryTo(vue, paths, vue.vehicleType, vue.emitLastPosition);\n          } else {\n            return mapUtils.tracking.hideInfoWindow(vue);\n          }\n        });\n      case \"vehicle\":\n        return mapUtils.tracking.getValidPathArray(vue, realtime.filter(ele => ele.origin != mapUtils.base.glossary.pointType.app)).then((paths) => {\n          if (paths.length) {\n            return mapUtils.tracking.moveLorryTo(vue, paths, vue.vehicleType, vue.emitLastPosition);            \n          } else {\n            return mapUtils.tracking.hideInfoWindow(vue);\n          }\n        });\n      };\n    }\n  }\n}\n</script>\n\n<style>\n.track-amap-container {\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  background: coral;\n}\n.track-amap {\n  min-width: 200px;\n  min-height: 200px;\n  flex: 1;\n}\n.driver-info {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  padding:8px;\n  border-radius:4px;\n  background:#ffffffa0;\n  display:flex;\n  flex-direction: row;\n  align-items: center;\n}\n.track-tabs {\n  background: transparent;\n  position: absolute;\n  top: 120px;\n  left: 20px;\n}\n.user-avatar {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n.user-avatar img {\n  width: 100%;\n  height: 100%;\n  opacity: 0.95;\n}\n.user-info {\n  width: 180px;\n  height: 60px;\n  padding: 0 10px;\n  color:#000000a0;\n}\n.user-name {\n  margin-right: 10px;\n}\n.user-phone {\n  line-height: 30px;\n}\n.plate-code >span {\n  background-color: #FAECD880;\n  padding:0 4px;\n  color: #61503A;\n  border-radius: 2px;\n}\n.height-100p {\n  height: 100%;\n}\n.min-height-400 {\n  min-height: 400px;\n}\n.min-height-700 {\n  min-height: 700px;\n}\n.amap-logo,\n.amap-copyright {\n  display: none !important;\n}\n.track-playback {\n  color:#000000a0;\n  display: flex;\n  flex-direction:column;\n  padding: 0 10px;\n  align-items: center;\n  justify-content:space-between;\n}\n.track-playback .el-button + .el-button {\n  margin-left:0;\n}\n.el-button.trackbutton {\n  background-color: #ffffff80;\n  border-color: #409EFF40;\n  color:#409EFF;\n  border-radius: 6px;\n  padding-bottom:5px !important;\n  padding-top:5px !important;\n}\n.trackbutton > span {\n  font-size: 12px;\n  font-weight: 700;\n  background: transparent;\n}\n.el-button.trackbutton:hover {\n  background-color: #409EFF18;\n  border-color: #409EFF00;\n  box-shadow: unset;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

var tryBroadcastMessage = function (data, channel) {
  if ( data === void 0 ) data={};
  if ( channel === void 0 ) channel="defaultDayiChannel";

  if(!window.BroadcastChannel) { return void 0; }
  var broadcastChannel = new window.BroadcastChannel(channel);
  broadcastChannel.postMessage(data);
  return broadcastChannel;
};
var tryListenBroadcastMessage = function (channel, action) {
  if ( channel === void 0 ) channel='defaultDayiChannel';
  if ( action === void 0 ) action=function (){};

  if(!window.BroadcastChannel) { return void 0; }
  var broadcastChannel = new window.BroadcastChannel(channel);
  broadcastChannel.onmessage = action;
  return broadcastChannel;
};
var ChannelEnum = {
  default:'defaultDayiChannel',
  driverAudit:'dayi-driver-audit',
  vehicleAudit:'dayi-vehicle-audit',
};
Object.freeze(ChannelEnum);

var broadcast = /*#__PURE__*/Object.freeze({
  __proto__: null,
  tryBroadcastMessage: tryBroadcastMessage,
  tryListenBroadcastMessage: tryListenBroadcastMessage,
  ChannelEnum: ChannelEnum
});



var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  broadcast: broadcast
});

//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name:'WorkArea',
  data: function data(){
    return {
      minWidth:'auto',
    };
  },
  props:{
    showDirectory: Boolean,
    showContent: Boolean,
    draggable:Boolean,
    dragStart:Function,
    dragOver:Function,
    dragEnd:Function,
  },
  computed: {
    contentStyle: function contentStyle() {
      var vue = this;
      return {
        minWidth: vue.minWidth,
        maxWidth: vue.minWidth,
      };
    },
  },
  methods: {
    handleDragStart: function handleDragStart(evt){
      var vue = this;
      if(!vue.draggable) { return; }
      if(vue.dragStart) {
        return vue.dragStart(evt, vue.$refs.workarea);
      }
      // const data = JSON.stringify(vue.start);
      // console.log('handleDragStart', evt, 'client properties', clientWidth, offsetLeft, offsetTop, data);
    },
    handleDragOver: function handleDragOver(evt) {
      var vue = this;
      if(!vue.draggable) { return; }
      if(vue.dragOver) {
        return vue.dragOver(evt, vue.$refs.workarea);
      }
      var ref = vue.$refs.workarea;
      var clientWidth = ref.clientWidth;
      var offsetLeft = ref.offsetLeft;
      var offsetTop = ref.offsetTop;
      var rightLeft = clientWidth + offsetLeft - evt.clientX;
      var minLeft = Math.max(10, clientWidth * 0.05);
      var maxLeft = Math.max(clientWidth - 10,  clientWidth * 0.95);
      var percent = rightLeft < minLeft ? minLeft : (rightLeft > maxLeft ? maxLeft : rightLeft);
      vue.minWidth = (100-(percent * 100) / clientWidth) + '%';
    },
    handleDragEnd: function handleDragEnd(evt) {
      var vue = this;
      if(!vue.draggable) { return; }
      if(vue.dragEnd) {
        return vue.dragEnd(evt, vue.$refs.workarea);
      }
      var ref = vue.$refs.workarea;
      var clientWidth = ref.clientWidth;
      var offsetLeft = ref.offsetLeft;
      var offsetTop = ref.offsetTop;
      var rightLeft = clientWidth + offsetLeft - evt.clientX;
      var minLeft = Math.max(10, clientWidth * 0.05);
      var maxLeft = Math.max(clientWidth - 10,  clientWidth * 0.95);
      var percent = rightLeft < minLeft ? minLeft : (rightLeft > maxLeft ? maxLeft : rightLeft);
      vue.minWidth = (100 - (percent * 100) / clientWidth) + '%';
    },
  },
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "workarea", staticClass: "workarea" }, [
    _vm.showDirectory
      ? _c(
          "div",
          { staticClass: "workarea-left", style: _vm.contentStyle },
          [_vm._t("directory", [_vm._v("目录内容")])],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _c("div", {
      staticClass: "workarea-divider",
      attrs: { draggable: _vm.draggable },
      on: {
        dragstart: _vm.handleDragStart,
        dragover: _vm.handleDragOver,
        dragend: _vm.handleDragEnd
      }
    }),
    _vm._v(" "),
    _vm.showContent
      ? _c("div", { staticClass: "workarea-right" }, [_vm._t("default")], 2)
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-c87f7af8_0", { source: "\n.workarea[data-v-c87f7af8] {\n  display:flex;\n  flex-direction:row;\n  height:100%;\n  width: 100%;\n}\n.workarea-left[data-v-c87f7af8] {\n  height:100%;\n  overflow-y:auto;\n}\n.workarea-divider[data-v-c87f7af8] {\n  min-width:4px;\n  background-color:#fff;\n}\n[draggable=\"true\"].workarea-divider[data-v-c87f7af8]:hover,\n[draggable=\"true\"].workarea-divider[data-v-c87f7af8]:active{\n  filter:invert(0.5);\n  cursor:col-resize;\n}\n.workarea-right[data-v-c87f7af8] {\n  height:100%;\n  flex:1;\n  overflow-y:auto;\n}\n", map: {"version":3,"sources":["/media/liuhanru/mywork/apps/dayi/admin-widget/src/widget/WorkArea.vue"],"names":[],"mappings":";AA+EA;EACA,YAAA;EACA,kBAAA;EACA,WAAA;EACA,WAAA;AACA;AAEA;EACA,WAAA;EACA,eAAA;AACA;AAEA;EACA,aAAA;EACA,qBAAA;AACA;AAEA;;EAEA,kBAAA;EACA,iBAAA;AACA;AAEA;EACA,WAAA;EACA,MAAA;EACA,eAAA;AACA","file":"WorkArea.vue","sourcesContent":["<template>\n<div class=\"workarea\" ref=\"workarea\">\n  <div class=\"workarea-left\" v-if=\"showDirectory\" :style=\"contentStyle\">\n    <slot name=\"directory\">目录内容</slot>\n  </div>\n  <div class=\"workarea-divider\" :draggable=\"draggable\" @dragstart=\"handleDragStart\" @dragover=\"handleDragOver\" @dragend=\"handleDragEnd\">\n  </div>\n  <div class=\"workarea-right\" v-if=\"showContent\">\n    <slot></slot>\n  </div>\n</div>\n</template>\n\n<script>\nexport default {\n  name:'WorkArea',\n  data(){\n    return {\n      minWidth:'auto',\n    };\n  },\n  props:{\n    showDirectory: Boolean,\n    showContent: Boolean,\n    draggable:Boolean,\n    dragStart:Function,\n    dragOver:Function,\n    dragEnd:Function,\n  },\n  computed: {\n    contentStyle() {\n      const vue = this;\n      return {\n        minWidth: vue.minWidth,\n        maxWidth: vue.minWidth,\n      };\n    },\n  },\n  methods: {\n    handleDragStart(evt){\n      const vue = this;\n      if(!vue.draggable) return;\n      if(vue.dragStart) {\n        return vue.dragStart(evt, vue.$refs.workarea);\n      }\n      // const data = JSON.stringify(vue.start);\n      // console.log('handleDragStart', evt, 'client properties', clientWidth, offsetLeft, offsetTop, data);\n    },\n    handleDragOver(evt) {\n      const vue = this;\n      if(!vue.draggable) return;\n      if(vue.dragOver) {\n        return vue.dragOver(evt, vue.$refs.workarea);\n      }\n      const {clientWidth, offsetLeft, offsetTop } = vue.$refs.workarea;\n      const rightLeft = clientWidth + offsetLeft - evt.clientX;\n      const minLeft = Math.max(10, clientWidth * 0.05);\n      const maxLeft = Math.max(clientWidth - 10,  clientWidth * 0.95);\n      const percent = rightLeft < minLeft ? minLeft : (rightLeft > maxLeft ? maxLeft : rightLeft);\n      vue.minWidth = (100-(percent * 100) / clientWidth) + '%';\n    },\n    handleDragEnd(evt) {\n      const vue = this;\n      if(!vue.draggable) return;\n      if(vue.dragEnd) {\n        return vue.dragEnd(evt, vue.$refs.workarea);\n      }\n      const {clientWidth, offsetLeft, offsetTop } = vue.$refs.workarea;\n      const rightLeft = clientWidth + offsetLeft - evt.clientX;\n      const minLeft = Math.max(10, clientWidth * 0.05);\n      const maxLeft = Math.max(clientWidth - 10,  clientWidth * 0.95);\n      const percent = rightLeft < minLeft ? minLeft : (rightLeft > maxLeft ? maxLeft : rightLeft);\n      vue.minWidth = (100 - (percent * 100) / clientWidth) + '%';\n    },\n  },\n}\n</script>\n\n<style scoped>\n.workarea {\n  display:flex;\n  flex-direction:row;\n  height:100%;\n  width: 100%;\n}\n\n.workarea-left {\n  height:100%;\n  overflow-y:auto;\n}\n\n.workarea-divider {\n  min-width:4px;\n  background-color:#fff;\n}\n\n[draggable=\"true\"].workarea-divider:hover,\n[draggable=\"true\"].workarea-divider:active{\n  filter:invert(0.5);\n  cursor:col-resize;\n}\n\n.workarea-right {\n  height:100%;\n  flex:1;\n  overflow-y:auto;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = "data-v-c87f7af8";
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );



var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  WorkArea: __vue_component__$3
});

function install(Vue) {
  if(install.installed) { return; }
  install.installed = true;

  Vue.component('AmapRoute', __vue_component__$1);
  Vue.component('WaybillTrack', __vue_component__$2);
}

var waybill = {
  AmapRoute: __vue_component__$1,
  WaybillTrack: __vue_component__$2,
};

var plugin = {
  install: install,
};

var GlobalVue = null;

if (typeof window!= 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global != 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export { index as base, install, map_utils as mapUtils, waybill, index$1 as widgets };
