(function (vue) {
  'use strict';

  const __sfc_main__ = {
    setup() {
      return {};
    },
  };

  const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("h1", null, "Hello Vue", -1 /* HOISTED */);
  const _hoisted_2 = [
    _hoisted_1
  ];

  function render(_ctx, _cache) {
    return (vue.openBlock(), vue.createElementBlock("div", null, [..._hoisted_2]))
  }
  __sfc_main__.render=render;

  const app = vue.createApp(__sfc_main__);
  console.log('hello');
  app.mount('#app');

})(vue);
//# sourceMappingURL=main-C122b2ms.js.map
