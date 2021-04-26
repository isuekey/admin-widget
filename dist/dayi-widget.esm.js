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
  name:"FundTransferDialog",
  props: {
    showDialog:Boolean,
    dialogTitle:String,
  },
  computed: {
    show:{
      get: function get() {
        var vue = this;
        return !!vue.showDialog;
      },
      set: function set(val) {
        var vue = this;
        vue.$emit('update:showDialog', val);
      },
    }
  }
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

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "el-dialog",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ],
      attrs: {
        visible: _vm.show,
        "append-to-body": "",
        "close-on-click-modal": false,
        center: "",
        title: _vm.dialogTitle
      },
      on: {
        "update:visible": function($event) {
          _vm.show = $event;
        }
      }
    },
    [
      _c(
        "el-form",
        {
          ref: "fundTransferForm",
          staticClass: "inline-form",
          attrs: { model: _vm.widthdrawInfo }
        },
        [
          _c(
            "el-row",
            [
              _c(
                "el-col",
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "转出虚户名称",
                        prop: "outer.accountInfo"
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.widthdrawInfo.outer.accountInfo,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.widthdrawInfo.outer,
                              "accountInfo",
                              $$v
                            );
                          },
                          expression: "widthdrawInfo.outer.accountInfo"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-col",
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "选择转出账户",
                        prop: "outer.accountInfo"
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.widthdrawInfo.outer.accountInfo,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.widthdrawInfo.outer,
                              "accountInfo",
                              $$v
                            );
                          },
                          expression: "widthdrawInfo.outer.accountInfo"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-col",
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "转出虚户名称",
                        prop: "outer.accountInfo"
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.widthdrawInfo.outer.accountInfo,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.widthdrawInfo.outer,
                              "accountInfo",
                              $$v
                            );
                          },
                          expression: "widthdrawInfo.outer.accountInfo"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-col",
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "转出虚户名称",
                        prop: "outer.accountInfo"
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.widthdrawInfo.outer.accountInfo,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.widthdrawInfo.outer,
                              "accountInfo",
                              $$v
                            );
                          },
                          expression: "widthdrawInfo.outer.accountInfo"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

var buttonProps = {
  type:{
    type:String, default:'text'
  },
  label: {
    type:String, default:'按钮', required:true,
  },
  size: {
    type:String, default:'small'
  },
  plain:Boolean,
  round:Boolean,
  circle:Boolean,
  disabled:Boolean,
  icon:String,
};

//

var props = Object.assign({}, 
  buttonProps, __vue_component__.props, {
  loadingMask:Boolean,
  buttonData:{
    type:Object, default: function default$1(){ return {}; },
  },
  buttonClass:String,
});
var script$1 = {
  name: 'FundTransferButton',
  uuid: uuid(),
  components: {
    fundTransferDialog: __vue_component__,
  },
  props: props,
  data: function data() {
    return {
      loadig:false,
      buttonLoading:false,
      showDialog:false,
    }
  },
  methods:{
    handleButtonClick: function handleButtonClick(){
      var vue = this;
      vue.showDialog = true;
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
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loadingMask && _vm.loading,
          expression: "loadingMask && loading"
        }
      ],
      class: _vm.buttonClass
    },
    [
      _c(
        "el-button",
        {
          attrs: {
            type: _vm.type,
            loading: _vm.buttonLoading,
            size: _vm.size,
            plain: _vm.plain,
            round: _vm.round,
            circle: _vm.circle,
            disabled: _vm.disabled,
            icon: _vm.icon
          },
          on: { click: _vm.handleButtonClick }
        },
        [_vm._v(_vm._s(_vm.label))]
      ),
      _vm._v(" "),
      _c("fund-transfer-dialog", {
        attrs: { showDialog: _vm.showDialog },
        on: {
          "update:showDialog": function($event) {
            _vm.showDialog = $event;
          },
          "update:show-dialog": function($event) {
            _vm.showDialog = $event;
          }
        }
      })
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

var script$2 = {
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
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
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
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-627e1c07_0", { source: "\ndiv.log[data-v-627e1c07] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n", map: {"version":3,"sources":["/media/liuhanru/mywork/apps/dayi/admin-widget/src/waybill/components/log.vue"],"names":[],"mappings":";AA0BA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;AACA","file":"log.vue","sourcesContent":["<template>\n<div class=\"log\">\n  <div>className:{{className}}</div>\n  <div>logPoint:{{logPoint}}</div>\n  <div>unloadPoint:{{unloadPoint}}</div>\n  <div>loadRule:{{loadRule}}</div>\n  <div>unloadRule:{{unloadRule}}</div>\n  <div>amap:{{amap}}</div>\n</div>\n</template>\n\n<script>\nexport default {\n  name:'log',\n  props:{\n    className:String,\n    loadPoint:Array,\n    unloadPoint:Array,\n    loadRule:Function,\n    unloadRule:Function,\n    amap:Object,\n  },\n}\n</script>\n\n<style scoped>\ndiv.log {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = "data-v-627e1c07";
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

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='56px' height='56px' viewBox='0 0 56 56' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 10%3c/title%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-747.000000%2c -654.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-10' transform='translate(747.000000%2c 654.000000)'%3e %3cpath d='M3.02083333%2c25.0568182 C1.36397908%2c25.0568182 0.0208333333%2c23.7136724 0.0208333333%2c22.0568182 L0.0208333333%2c3 C0.0208333333%2c1.34314575 1.36397908%2c-1.53269159e-12 3.02083333%2c-1.53299595e-12 L52.1458333%2c-1.53299595e-12 C53.8026876%2c-1.52888557e-12 55.1458333%2c1.34314575 55.1458333%2c3 L55.1458333%2c22.0568182 C55.1458333%2c23.7136724 53.8026876%2c25.0568182 52.1458333%2c25.0568182 L32.5265152%2c25.0568182 L27.5833333%2c30 L22.6401515%2c25.0568182 L3.02083333%2c25.0568182 Z' id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88' fill='%2337A800'%3e%3c/path%3e %3ctext id='%e8%a3%85%e8%b4%a7%e5%9c%b0' font-family='PingFang-SC-Heavy%2c PingFang SC' font-size='14' font-weight='600' line-spacing='13' letter-spacing='-1.07692308' fill='white'%3e %3ctspan x='8.08333333' y='16.5284091'%3e%e8%a3%85%e8%b4%a7%e5%9c%b0%3c/tspan%3e %3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-764.000000%2c -689.000000)' fill-rule='nonzero'%3e %3cg id='%e7%bc%96%e7%bb%84-15' transform='translate(764.000000%2c 689.000000)'%3e %3ccircle id='%e6%a4%ad%e5%9c%86%e5%bd%a2' fill='%23BBE8A7' cx='28' cy='45' r='11'%3e%3c/circle%3e %3ccircle id='%e6%a4%ad%e5%9c%86%e5%bd%a2' fill='%2337A800' cx='28' cy='45' r='6'%3e%3c/circle%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='56px' height='56px' viewBox='0 0 56 56' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 10%3c/title%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-331.000000%2c -1026.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-10' transform='translate(331.476117%2c 1026.748301)'%3e %3cpath d='M3.02083333%2c25.0568182 C1.36397908%2c25.0568182 0.0208333333%2c23.7136724 0.0208333333%2c22.0568182 L0.0208333333%2c3 C0.0208333333%2c1.34314575 1.36397908%2c-1.53269159e-12 3.02083333%2c-1.53299595e-12 L52.1458333%2c-1.53299595e-12 C53.8026876%2c-1.53330031e-12 55.1458333%2c1.34314575 55.1458333%2c3 L55.1458333%2c22.0568182 C55.1458333%2c23.7136724 53.8026876%2c25.0568182 52.1458333%2c25.0568182 L32.5265152%2c25.0568182 L27.5833333%2c30 L22.6401515%2c25.0568182 L3.02083333%2c25.0568182 Z' id='%e5%bd%a2%e7%8a%b6%e7%bb%93%e5%90%88' fill='%23E02020'%3e%3c/path%3e %3ctext id='%e5%8d%b8%e8%b4%a7%e5%9c%b0' font-family='PingFang-SC-Heavy%2c PingFang SC' font-size='14' font-weight='600' line-spacing='13' letter-spacing='-1.07692308' fill='white'%3e %3ctspan x='8.08333333' y='16.5284091'%3e%e5%8d%b8%e8%b4%a7%e5%9c%b0%3c/tspan%3e %3c/text%3e %3c/g%3e %3c/g%3e %3c/g%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-348.000000%2c -1060.000000)' fill-rule='nonzero'%3e %3cg id='%e7%bc%96%e7%bb%84-40' transform='translate(348.000000%2c 1060.000000)'%3e %3ccircle id='22' fill='%23FFA6A6' cx='28' cy='45' r='11'%3e%3c/circle%3e %3ccircle id='%e6%a4%ad%e5%9c%86%e5%bd%a2%e5%a4%87%e4%bb%bd-12' fill='%23E02020' cx='28' cy='45' r='6'%3e%3c/circle%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

//

var tian_an_men = [116.397423,39.909117];
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
    image: URL.createObjectURL(new Blob([img], {type:'image/svg+xml'})),
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
    image: URL.createObjectURL(new Blob([img$1], {type:'image/svg+xml'})),
    size:[56, 56],
    offset:[-28, -45],
    type:'marker',
  };
  return pointRule(distance, circleOption, marker);
};
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
var codeMap = {
  district:"adcode",
};
var districtMap = {};
var getKeyOfPoint = function (point){
  var key = (point[0].toFixed(4)) + "/" + (point[1].toFixed(4));
  return key;  
};
var drawDistrict = function (amap, container, point, options) {
  if ( options === void 0 ) options={};

  var key = getKeyOfPoint(point);
  return new Promise(function (resolve, reject) {
    new amap.Geocoder().getAddress(new (Function.prototype.bind.apply( amap.LngLat, [ null ].concat( point) )), function (status, result) {
      var isSuccess = status == 'complete' && result.info== 'OK';
      if (!isSuccess) { return reject('unknown district,' + point); }
      var code = result.regeocode.addressComponent[codeMap[options.type]];
      new amap.DistrictSearch({
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
        resolve(polygon);
      });
    });
  });
};
var circleMap = {};
var drawCircle = function (amap, container, point, options) {
  if ( options === void 0 ) options={};

  var key = getKeyOfPoint(point);
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
var drawMarker = function (amap, container, point, options) {
  if ( options === void 0 ) options={};

  var key = getKeyOfPoint(point);
  if(markerMap[key]) {
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

    var loadPoint = vue.loadPoint || vue.unloadPoint || tian_an_men;
    var unloadPoint = vue.unloadPoint || vue.loadPoint || tian_an_men;
    var distance = amap.GeometryUtil.distance([].concat( loadPoint ), [].concat( unloadPoint ));
    var drawLoad =vue.loadPoint && drawPoint(amap, container, [].concat( vue.loadPoint ), vue.loadRule || defaultLoadRule, distance) || [loadPoint, loadPoint];
    var drawUnload = vue.unloadPoint && drawPoint(amap, container, [].concat( vue.unloadPoint ), vue.unloadRule || defaultUnloadRule, distance) || [unloadPoint, unloadPoint];
    return Promise.all([amap, container, drawLoad, drawUnload]);
  }).then(function (ref){
    var amap = ref[0];
    var container = ref[1];

    return zoomMap(amap, container, vue.avoid);
  });
};
var script$3 = {
  name:'AmapRoute',
  components:{
    log: __vue_component__$2,
  },
  props:{
    className:String,
    loadPoint:Array,
    unloadPoint:Array,
    loadRule:Function,
    unloadRule:Function,
    amap:null,
    avoid:{
      type:Array, default: function default$1(){return [20, 20, 20, 20]; },
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
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
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
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

var img$2 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='52px' height='52px' viewBox='0 0 52 52' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3ctitle%3e%e7%bc%96%e7%bb%84 4%3c/title%3e %3cdefs%3e %3clinearGradient x1='-12.313058%25' y1='-14.7070312%25' x2='109.143415%25' y2='108.638393%25' id='linearGradient-1'%3e %3cstop stop-color='%23F1DCC4' offset='0%25'%3e%3c/stop%3e %3cstop stop-color='%23AE9484' offset='100%25'%3e%3c/stop%3e %3c/linearGradient%3e %3crect id='path-2' x='0' y='0' width='52' height='52' rx='3.57142857'%3e%3c/rect%3e %3cpath d='M22.1207049%2c27.7447245 C25.7254001%2c27.7447245 28.565433%2c24.7734665 29.6418686%2c22.5208687 C31.1577996%2c19.3485629 31.4216947%2c13.8438427 31.4216947%2c9.53771013 C31.4216947%2c1.66531625 26.0844392%2c1.9356158 21.6270304%2c1.9356158 C17.1696215%2c1.9356158 12.7759675%2c1.66531625 12.7759675%2c9.53771013 C12.7759675%2c13.8803566 13.0253319%2c19.3517497 14.5858142%2c22.5208687 C15.856767%2c25.1019943 18.5160098%2c27.7447245 22.1207049%2c27.7447245 Z' id='path-4'%3e%3c/path%3e %3c/defs%3e %3cg id='2020.04.03--%e5%9c%b0%e5%9b%be%e4%bc%98%e5%8c%96' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='A4-1--2-%e8%bf%90%e5%8d%95%e8%bd%a8%e8%bf%b9-%e5%ae%9e%e6%97%b6%e8%bd%a8%e8%bf%b9' transform='translate(-286.000000%2c -579.000000)'%3e %3cg id='%e7%bc%96%e7%bb%84-4' transform='translate(286.000000%2c 579.000000)'%3e %3cmask id='mask-3' fill='white'%3e %3cuse xlink:href='%23path-2'%3e%3c/use%3e %3c/mask%3e %3cuse id='%e8%92%99%e7%89%88' fill='url(%23linearGradient-1)' xlink:href='%23path-2'%3e%3c/use%3e %3cg id='%e7%bc%96%e7%bb%84-11' mask='url(%23mask-3)'%3e %3cg transform='translate(3.714286%2c 7.239230)'%3e %3cpath d='M5.59704302%2c36.0225499 C11.1756725%2c31.9513992 16.7077196%2c29.9158238 22.1931845%2c29.9158238 C27.7082279%2c29.9158238 33.2157485%2c31.9734106 38.7157465%2c36.0885843 C40.5745998%2c37.4793988 41.9314169%2c39.4363531 42.581989%2c41.6649079 L44.3089983%2c47.5808312 L44.3089983%2c47.5808312 L5.27831747e-14%2c47.5808312 L1.58343856%2c41.8320749 C2.22642151%2c39.4976789 3.64115899%2c37.4499074 5.59704302%2c36.0225499 Z' id='Rectangle%e5%a4%87%e4%bb%bd-11' stroke='none' fill='%23A88269' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M25.2320359%2c30.3361024 C26.0891119%2c30.0677211 26.760568%2c29.876567 27.2464041%2c29.7626402 C27.7174612%2c29.652179 28.356183%2c29.5269308 29.1625695%2c29.3868956 L29.1625776%2c29.3869425 C29.3180205%2c29.3599486 29.4659148%2c29.4640771 29.4929086%2c29.61952 C29.4938488%2c29.6249338 29.4946325%2c29.6303736 29.4952589%2c29.6358326 C29.7854488%2c32.1649064 29.9305437%2c34.9799924 29.9305437%2c38.0810905 C29.9305437%2c41.3053471 29.6273402%2c44.0509031 29.0209334%2c46.3177587 L24.2856429%2c50.8905755 C25.0166065%2c45.6204602 25.3820884%2c41.4281165 25.3820884%2c38.3135446 C25.3820884%2c35.3102943 25.2658659%2c32.7524563 25.033421%2c30.6400308 L25.0334015%2c30.640033 C25.0184625%2c30.5042694 25.1016938%2c30.3769172 25.2320359%2c30.3361024 Z' id='%e7%9f%a9%e5%bd%a2' stroke='none' fill='%234E3838' fill-rule='evenodd' transform='translate(27.108093%2c 40.113219) rotate(44.000000) translate(-27.108093%2c -40.113219) '%3e%3c/path%3e %3cpolygon id='Rectangle%e5%a4%87%e4%bb%bd-13' stroke='none' fill='%23FFDAC2' fill-rule='evenodd' points='17.778095 22.0361607 26.7933336 22.0361607 26.6352769 32.1572719 18.0816288 32.1572719'%3e%3c/polygon%3e %3cpath d='M17.9132764%2c30.0950182 C19.0827529%2c31.1786715 20.5811384%2c31.7204982 22.4084328%2c31.7204982 C24.2099068%2c31.7204982 25.5784294%2c31.215928 26.5140005%2c30.2067876 C26.6326397%2c30.0787273 26.8171048%2c30.0354764 26.980324%2c30.0973971 L28.1441118%2c30.5389048 C28.2548882%2c30.580777 28.3105964%2c30.7045905 28.2685903%2c30.8153162 C28.2611579%2c30.8349075 28.250894%2c30.8533036 28.238126%2c30.869918 C26.9348872%2c32.5657574 24.9916562%2c33.4136771 22.4084328%2c33.4136771 C19.8269576%2c33.4136771 17.7280875%2c32.5473895 16.1118225%2c30.8148142 C16.0311948%2c30.7282508 16.0359023%2c30.592712 16.1224035%2c30.5120177 C16.1436322%2c30.4922141 16.1686652%2c30.4769328 16.1959817%2c30.4671019 L17.4768561%2c30.0061311 C17.6275119%2c29.9519064 17.7958291%2c29.9861898 17.9132764%2c30.0950182 Z' id='%e8%b7%af%e5%be%84-21%e5%a4%87%e4%bb%bd' stroke='none' fill='%23CFAB8E' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M12.4947703%2c19.1782786 C14.1143741%2c19.3485058 15.5975922%2c17.8664933 15.7902702%2c16.0332846 C15.9829482%2c14.200076 14.7121412%2c13.661132 13.0925373%2c13.4909047 C11.4729335%2c13.3206775 10.1178439%2c13.5836287 9.92516593%2c15.4168373 C9.73248793%2c17.250046 10.8751664%2c19.0080514 12.4947703%2c19.1782786 Z' id='Oval%e5%a4%87%e4%bb%bd' stroke='none' fill='%23FFDAC2' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M31.7028919%2c19.1782786 C30.0832881%2c19.3485058 28.60007%2c17.8664933 28.407392%2c16.0332846 C28.214714%2c14.200076 29.485521%2c13.661132 31.1051249%2c13.4909047 C32.7247287%2c13.3206775 34.0798183%2c13.5836287 34.2724963%2c15.4168373 C34.4651743%2c17.250046 33.3224958%2c19.0080514 31.7028919%2c19.1782786 Z' id='Oval%e5%a4%87%e4%bb%bd-2' stroke='none' fill='%23FFDAC2' fill-rule='evenodd'%3e%3c/path%3e %3cmask id='mask-5' fill='white'%3e %3cuse xlink:href='%23path-4'%3e%3c/use%3e %3c/mask%3e %3cuse id='%e8%92%99%e7%89%88' stroke='none' fill='%23FFE7D6' fill-rule='evenodd' xlink:href='%23path-4'%3e%3c/use%3e %3cpath d='M23.1353149%2c18.7568947 C23.3427459%2c17.6638684 22.8984572%2c16.2390176 22.4833281%2c15.5891022 C22.3430834%2c15.3695386 21.8605422%2c15.3656585 21.7235133%2c15.5790553 C21.3077097%2c16.226591 20.8575369%2c17.6674459 21.059513%2c18.7538274 C21.1057483%2c19.002516 23.0943996%2c18.9724917 23.1353149%2c18.7568947 Z' id='%e6%a4%ad%e5%9c%86%e5%bd%a2%e5%a4%87%e4%bb%bd-7' stroke='none' fill='%23FBD3B9' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M20.2123289%2c21.9654824 C20.7987034%2c22.3201607 21.4863308%2c22.5242881 22.2216347%2c22.5242881 C22.9332852%2c22.5242881 23.6002772%2c22.3330823 24.1740402%2c21.9992414' id='%e8%b7%af%e5%be%84%e5%a4%87%e4%bb%bd-5' stroke='%23EE9585' stroke-width='0.857142857' fill='none' stroke-linecap='round'%3e%3c/path%3e %3cpath d='M12.8459583%2c14.0776 C12.5412311%2c13.6536928 12.0974331%2c13.466828 11.5145645%2c13.5170059 C11.3937709%2c12.1889509 11.0380542%2c6.60754063 12.7759675%2c3.84813058 C14.3666504%2c1.32248884 17.0277581%2c5.03089633e-14 22.061829%2c5.03089633e-14 C26.6055558%2c5.03089633e-14 29.7540039%2c1.27869001 31.3063946%2c3.84813058 C32.7761508%2c6.2807986 32.9449707%2c12.2186035 32.7849923%2c13.5485105 C32.1323012%2c13.4932268 31.6394353%2c13.6695899 31.3063946%2c14.0776 C31.3063946%2c11.9349587 29.8240095%2c8.30980748 29.1999442%2c7.87816685 C28.5758789%2c7.44652623 28.5758789%2c8.37600446 22.0988311%2c8.50332031 C15.6217833%2c8.63063616 15.0919608%2c7.51929757 14.5972934%2c7.87816685 C14.1026259%2c8.23703613 12.7936538%2c11.9349587 12.8459583%2c14.0776 Z' id='%e8%b7%af%e5%be%84-19%e5%a4%87%e4%bb%bd' stroke='none' fill='%2348433D' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M6.93500056%2c44.9290737 C7.18165235%2c42.6286135 8.02144727%2c40.7585486 8.35415514%2c40.8879048 C8.68686301%2c41.017261 8.35112208%2c43.2534042 8.61953251%2c44.9290737 C8.61953251%2c44.9290737 6.93500056%2c44.9290737 6.93500056%2c44.9290737 Z' id='%e8%b7%af%e5%be%84-22' stroke='none' fill='%23966D52' fill-rule='evenodd'%3e%3c/path%3e %3cpath d='M35.2447767%2c44.9290737 C35.4914284%2c42.6286135 36.3312234%2c40.7585486 36.6639312%2c40.8879048 C36.9966391%2c41.017261 36.6608982%2c43.2534042 36.9293086%2c44.9290737 C36.9293086%2c44.9290737 35.2447767%2c44.9290737 35.2447767%2c44.9290737 Z' id='%e8%b7%af%e5%be%84-22' stroke='none' fill='%23966D52' fill-rule='evenodd' transform='translate(36.087043%2c 42.905324) scale(-1%2c 1) translate(-36.087043%2c -42.905324) '%3e%3c/path%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

//


var script$4 = {
  name:'WaybillTrack',
  props: {
    trackInfo: { type: Object, default: function default$1() { return {}; }, },
    selectedPoint: { type: Object, default: function default$2(){ return {}; }, },
    showDriverInfo: { type: Boolean, default: true, },
    driverInfo: { type: Object, default: function default$3() { return {}; }, },
    showDriverTrack: { type: Boolean, default: true, },
  },
  data: function data(){
    return {
      meta: {
        loading: false,
      }
    } 
  }
};

/* script */
var __vue_script__$4 = script$4;
var __vue_render__$4 = function() {
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
          id: "waybillTrackAmap",
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
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.showDriverTrack
        ? _c("div", { staticClass: "track-tabs flex-row" })
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$4 = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "user-avatar" }, [
      _c("img", {
        attrs: { src: img$2, alt: "" }
      })
    ])
  }
];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-59194259_0", { source: "\n.track-amap-container {\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  background: coral;\n}\n.track-amap {\n  min-width: 200px;\n  min-height: 200px;\n  flex: 1;\n}\n.driver-info {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  padding:8px;\n  border-radius:4px;\n  background:#ffffffa0;\n  display:flex;\n  flex-direction: row;\n  align-items: center;\n}\n.track-tabs {\n  background: transparent;\n  position: absolute;\n  top: 120px;\n  left: 20px;\n}\n.user-avatar {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n.user-avatar img {\n  width: 100%;\n  height: 100%;\n  opacity: 0.95;\n}\n.user-info {\n  width: 180px;\n  height: 60px;\n  padding: 0 10px;\n  color:#000000a0;\n}\n.user-name {\n  margin-right: 10px;\n}\n.user-phone {\n  line-height: 30px;\n}\n.plate-code >span {\n  background-color: #FAECD880;\n  padding:0 4px;\n  color: #61503A;\n  border-radius: 2px;\n}\n.height-100p {\n  height: 100%;\n}\n.min-height-400 {\n  min-height: 400px;\n}\n.min-height-700 {\n  min-height: 700px;\n}\n.amap-logo,\n.amap-copyright {\n  display: none !important;\n}\n.track-playback {\n  color:#000000a0;\n  display: flex;\n  flex-direction:column;\n  padding: 0 10px;\n  align-items: center;\n  justify-content:space-between;\n}\n.track-playback .el-button + .el-button {\n  margin-left:0;\n}\n.el-button.trackbutton {\n  background-color: #ffffff80;\n  border-color: #409EFF40;\n  color:#409EFF;\n  border-radius: 6px;\n  padding-bottom:5px !important;\n  padding-top:5px !important;\n}\n.trackbutton > span {\n  font-size: 12px;\n  font-weight: 700;\n  background: transparent;\n}\n.el-button.trackbutton:hover {\n  background-color: #409EFF18;\n  border-color: #409EFF00;\n  box-shadow: unset;\n}\n", map: {"version":3,"sources":["/media/liuhanru/mywork/apps/dayi/admin-widget/src/waybill/WaybillTrack.vue"],"names":[],"mappings":";AAmEA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;AACA;AACA;EACA,gBAAA;EACA,iBAAA;EACA,OAAA;AACA;AACA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,iBAAA;EACA,oBAAA;EACA,YAAA;EACA,mBAAA;EACA,mBAAA;AACA;AACA;EACA,uBAAA;EACA,kBAAA;EACA,UAAA;EACA,UAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;EACA,aAAA;AACA;AACA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;AACA;AACA;EACA,kBAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,2BAAA;EACA,aAAA;EACA,cAAA;EACA,kBAAA;AACA;AACA;EACA,YAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;EACA,iBAAA;AACA;AACA;;EAEA,wBAAA;AACA;AACA;EACA,eAAA;EACA,aAAA;EACA,qBAAA;EACA,eAAA;EACA,mBAAA;EACA,6BAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,2BAAA;EACA,uBAAA;EACA,aAAA;EACA,kBAAA;EACA,6BAAA;EACA,0BAAA;AACA;AACA;EACA,eAAA;EACA,gBAAA;EACA,uBAAA;AACA;AACA;EACA,2BAAA;EACA,uBAAA;EACA,iBAAA;AACA","file":"WaybillTrack.vue","sourcesContent":["<template>\n  <div class=\"track-amap-container\" v-loading=\"meta.loading\">\n    <div class=\"track-amap height-100p min-height-700\" id=\"waybillTrackAmap\" :trackInfo=\"trackInfo\" :selectedPoint=\"selectedPoint\"></div>\n    <div class=\"driver-info\" v-if=\"showDriverInfo\">\n      <div class=\"user-avatar\">\n        <img src=\"./assets/carrior_portrait.svg\" alt />\n      </div>\n      <div class=\"user-info\">\n        <span class=\"user-name\">{{driverInfo.driverName}}</span>\n        <span class=\"user-phone\">{{driverInfo.driverPhone}}</span>\n        <div class=\"user-phone plate-code\"><span>{{driverInfo.carPlate}}</span></div>\n      </div>\n      <!-- <div class=\"track-playback\">\n        <el-button plain type=\"default\" size=\"mini\" @click=\"handlePlayback\" class=\"trackbutton margin-bottom-8\">轨迹回放</el-button>\n        <el-button \n         plain type=\"default\" size=\"mini\" @click=\"refreshTrack\" class=\"trackbutton margin-bottom-8\"\n         v-if=\"baseInfo.waybillStatus == 3\"\n        >实时位置</el-button>\n      </div> -->\n    </div>\n    <div class=\"track-tabs flex-row\" v-if=\"showDriverTrack\">\n      <!-- <el-button :type=\"trackTypeOfVehicle\" size=\"mini\" @click=\"changeTrack('vehicle')\">车辆轨迹</el-button>\n      <el-button :type=\"trackTypeOfDriver\" size=\"mini\" @click=\"changeTrack('driver')\">司机轨迹</el-button> -->\n    </div>\n  </div>\n</template>\n\n<script>\nimport passMarkerApp5 from \"./assets/pass-marker-app5.svg\";\nimport passMarkerApp5Over from \"./assets/pass-marker-app5-over.svg\";\nimport passMarkerApp6 from \"./assets/pass-marker-app6.svg\";\nimport passMarkerApp6Over from \"./assets/pass-marker-app6-over.svg\";\nimport passMarkerApp from \"./assets/pass-marker-app.svg\";\nimport passMarkerAppOver from \"./assets/pass-marker-app-over.svg\";\nimport passMarkerZjx from \"./assets/pass-marker-zjx.svg\";\nimport passMarkerZjxOver from \"./assets/pass-marker-zjx-over.svg\";\nimport passMarkerSelf from  \"./assets/pass-marker-self.svg\";\nimport passMarkerSelfOver from  \"./assets/pass-marker-self-over.svg\";\nimport loadAddressMarker from \"./assets/address-load.svg\";\nimport loadActionMarker from \"./assets/action-load.svg\";\nimport unloadAddressMarker from \"./assets/address-unload.svg\";\nimport unloadActionMarker from \"./assets/action-unload.svg\";\nimport vehicleMarker from \"./assets/vehicle-marker.png\";\nimport boatMarker from \"./assets/boat-marker.png\";\nimport carriorPortrait from './assets/carrior_portrait.svg';\n\n\nexport default {\n  name:'WaybillTrack',\n  props: {\n    trackInfo: { type: Object, default() { return {}; }, },\n    selectedPoint: { type: Object, default(){ return {}; }, },\n    showDriverInfo: { type: Boolean, default: true, },\n    driverInfo: { type: Object, default() { return {}; }, },\n    showDriverTrack: { type: Boolean, default: true, },\n  },\n  data(){\n    return {\n      meta: {\n        loading: false,\n      }\n    } \n  }\n}\n</script>\n\n<style>\n.track-amap-container {\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  background: coral;\n}\n.track-amap {\n  min-width: 200px;\n  min-height: 200px;\n  flex: 1;\n}\n.driver-info {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n  padding:8px;\n  border-radius:4px;\n  background:#ffffffa0;\n  display:flex;\n  flex-direction: row;\n  align-items: center;\n}\n.track-tabs {\n  background: transparent;\n  position: absolute;\n  top: 120px;\n  left: 20px;\n}\n.user-avatar {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n.user-avatar img {\n  width: 100%;\n  height: 100%;\n  opacity: 0.95;\n}\n.user-info {\n  width: 180px;\n  height: 60px;\n  padding: 0 10px;\n  color:#000000a0;\n}\n.user-name {\n  margin-right: 10px;\n}\n.user-phone {\n  line-height: 30px;\n}\n.plate-code >span {\n  background-color: #FAECD880;\n  padding:0 4px;\n  color: #61503A;\n  border-radius: 2px;\n}\n.height-100p {\n  height: 100%;\n}\n.min-height-400 {\n  min-height: 400px;\n}\n.min-height-700 {\n  min-height: 700px;\n}\n.amap-logo,\n.amap-copyright {\n  display: none !important;\n}\n.track-playback {\n  color:#000000a0;\n  display: flex;\n  flex-direction:column;\n  padding: 0 10px;\n  align-items: center;\n  justify-content:space-between;\n}\n.track-playback .el-button + .el-button {\n  margin-left:0;\n}\n.el-button.trackbutton {\n  background-color: #ffffff80;\n  border-color: #409EFF40;\n  color:#409EFF;\n  border-radius: 6px;\n  padding-bottom:5px !important;\n  padding-top:5px !important;\n}\n.trackbutton > span {\n  font-size: 12px;\n  font-weight: 700;\n  background: transparent;\n}\n.el-button.trackbutton:hover {\n  background-color: #409EFF18;\n  border-color: #409EFF00;\n  box-shadow: unset;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

function install(Vue) {
  if(install.installed) { return; }
  install.installed = true;
  Vue.component('FundTransferButton', __vue_component__$1);
  Vue.component('FundTransferDialog', __vue_component__);
  Vue.component('AmapRoute', __vue_component__$3);
  Vue.component('WaybillTrack', __vue_component__$4);
}

var fas = {
  FundTransferButton: __vue_component__$1,
  FundTransferDialog: __vue_component__,
};
var waybill = {
  AmapRoute: __vue_component__$3,
  WaybillTrack: __vue_component__$4,
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

export { fas, install, waybill };
