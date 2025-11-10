# 前端文档迁移计划

## 迁移策略

- **迁移方式**: 移动文件(剪切)
- **源目录**: `/Users/scoheart/Code/notes/scoheart-notes/scoheart`
- **目标目录**: `/Users/scoheart/Code/notes/scoheart-notes/front-end`
- **目录结构**: 遵循 `/Users/scoheart/Code/notes/scoheart-notes/alibaba/tree.md`

## 目标目录结构映射

### 1. HTML (共1个文件)
```
front-end/HTML/
├── index.md                 ← scoheart/project/pages/development/web-frontend/1-html/index.md
```

### 2. CSS (共13个文件)
```
front-end/CSS/
├── index.md                 ← scoheart/project/pages/development/web-frontend/2-css/index.md
├── CSS-Coding-Style/
│   ├── property-order.md    ← (从 H5-Specs.md 中提取或新建)
│   ├── naming-convention.md ← (从 H5-Specs.md 中提取或新建)
│   └── maintainability.md   ← (从 H5-Specs.md 中提取或新建)
├── CSS-Modularization/
│   ├── vue-scoped.md        ← (从 H5-Specs.md 中提取或新建)
│   ├── css-modules.md       ← scoheart/project/pages/development/web-frontend/2-css/css-modules/index.md
│   └── css-in-js/
│       ├── index.md         ← scoheart/project/pages/development/web-frontend/2-css/css-in-js/index.md
│       └── emotion.md       ← scoheart/project/pages/development/web-frontend/2-css/css-in-js/emotion.md
└── CSS-Framework/
    ├── preprocessor.md      ← scoheart/project/pages/development/web-frontend/2-css/preprocessor/index.md
    ├── postprocessor.md     ← scoheart/project/pages/development/web-frontend/2-css/postprocessor/index.md
    └── less.md              ← (从 H5-Specs.md 中提取或新建)
```

### 3. ECMAScript & ECMA-262 (共13个文件)
```
front-end/ECMAScript/
├── index.md                 ← (新建索引文件)
├── ES5/
│   ├── array.md             ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es5/Array.md
│   ├── closures.md          ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es5/closures.md
│   ├── execution-context.md ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es5/execution context.md
│   ├── iife.md              ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es5/iife.md
│   ├── let.md               ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es5/let.md
│   ├── memory.md            ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es5/memory.md
│   └── this.md              ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es5/this.md
├── ES2015/
│   ├── arrow-functions.md   ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es2015/arrow-functions-expressions.md
│   ├── default-parameters.md ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es2015/default-parameters.md
│   ├── destructuring.md     ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es2015/destructuring-assignment.md
│   ├── dynamic-property-name.md ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es2015/dynamic-property-name.md
│   ├── object-initializer.md ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es2015/object-initializer.md
│   └── rest-parameters.md   ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es2015/rest-parameters.md
├── ES2016/
│   └── index.md             ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/es2016/Untitled.md
└── Advanced/
    ├── property-accessors.md ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/unknown/property accessors.md
    ├── proxy.md             ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/unknown/proxy.md
    ├── reflect.md           ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/unknown/reflect.md
    └── symbol.md            ← scoheart/project/pages/development/web-frontend/3-javascript/ECMAScript/unknown/symbol.md
```

### 4. JavaScript Engine & Runtime (共9个文件)
```
front-end/JavaScript-Engine-Runtime/
├── engines/
│   ├── v8.md                ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-engine/v8/v8.md
│   ├── javascriptcore.md   ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-engine/javascriptCore/jsc.md
│   └── hermes.md            ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-engine/hermes/hermes.md
└── runtime/
    ├── browser/
    │   ├── browser.md       ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-runtime/browser/browser.md
    │   └── event-loop.md    ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-runtime/browser/event-loop.md
    └── nodejs/
        ├── cli.md           ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-runtime/nodejs/CLI.md
        ├── corepack.md      ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-runtime/nodejs/corepack.md
        ├── http.md          ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-runtime/nodejs/http/http.md
        └── net.md           ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-runtime/nodejs/net/net.md
```

### 5. JavaScript Module System (共2个文件)
```
front-end/JavaScript-Module-System/
├── index.md                 ← (新建索引,整合以下内容)
├── modularization.en.md     ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-modularization/modularization.en.md
└── modularization.zh.md     ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-modularization/modularization.zh.mdx
```

### 6. JavaScript Flavours (共11个文件)
```
front-end/JavaScript-Flavours/
├── TypeScript/
│   ├── index.md             ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/typescript/index.md
│   ├── mapped-type.md       ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/typescript/mapped-type.md
│   ├── object-type.md       ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/typescript/object-type.md
│   ├── utils.md             ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/typescript/utils.md
│   ├── module.md            ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/typescript/module.md
│   ├── config/
│   │   ├── compiler-options.md ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/typescript/config/compilerOptions.md
│   │   └── extends.md       ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/typescript/config/extends.md
│   └── blog/
│       └── ts-package-lookup.md ← scoheart/project/pages/daily/typescript/ts package lookup.md
└── Flow/
    └── index.md             ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-flavors/flow/Untitled.md
```

### 7. Package Manager (共8个文件)
```
front-end/Package-Manager/
├── npm/
│   ├── nexus.md             ← scoheart/project/pages/development/web-frontend/4-build-tools/javascript-package-manager/npm/nexus/nexus.md
│   ├── global-packages.md   ← scoheart/project/pages/development/web-frontend/4-build-tools/javascript-package-manager/npm/全局包管理.md
│   ├── executable-packages.md ← scoheart/project/pages/development/web-frontend/4-build-tools/javascript-package-manager/npm/可执行包.md
│   ├── cache.md             ← scoheart/project/pages/development/web-frontend/4-build-tools/javascript-package-manager/npm/缓存.md
│   └── cosmiconfig.md       ← scoheart/backup/new/npm/cosmiconfig.md
├── pnpm/
│   ├── pnpm.md              ← scoheart/project/pages/development/web-frontend/4-build-tools/javascript-package-manager/pnpm/pnpm.md
│   └── cli.md               ← scoheart/project/pages/development/web-frontend/4-build-tools/javascript-package-manager/pnpm/cli.md
└── yarn/
    └── index.md             ← scoheart/project/pages/development/web-frontend/4-build-tools/javascript-package-manager/yarn/index.md
```

### 8. Build Toolchains (共30+个文件)
```
front-end/Build-Toolchains/
├── Formatters/
│   └── prettier.md          ← (新建或从现有文档提取)
├── Linters/
│   ├── eslint.md            ← scoheart/project/pages/development/web-frontend/4-build-tools/linters-formatters/eslint.md
│   ├── githooks.md          ← scoheart/project/pages/development/web-frontend/4-build-tools/linters-formatters/githooks.md
│   ├── husky.md             ← scoheart/project/pages/development/web-frontend/4-build-tools/linters-formatters/husky.md
│   ├── commitlint.md        ← scoheart/project/pages/development/web-frontend/4-build-tools/linters-formatters/comitlint.md
│   └── lint-staged.md       ← scoheart/project/pages/development/web-frontend/4-build-tools/linters-formatters/lint-staged.md
├── Compiler-Transpiler/
│   ├── babel.md             ← scoheart/project/pages/development/web-frontend/4-build-tools/compiler/index.md
│   └── index.md             ← (整合编译器相关内容)
└── Module-Bundler/
    ├── index.md             ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/index.md
    ├── bundler.en.md        ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/bundler.en.md
    ├── bundler.zh.md        ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/bundler.zh.md
    ├── Vite/
    │   ├── index.md         ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/vite/index.md
    │   └── blog/
    │       └── demystifying-vite.md ← scoheart/project/pages/blog/demystifying-the-build-tools-vite.md
    ├── Webpack/
    │   ├── index.md         ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/webpack/index.md
    │   ├── webpack.md       ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/webpack/webpack.md
    │   ├── loader.md        ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/webpack/loader.md
    │   ├── hmr.md           ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/webpack/HMR.md
    │   ├── optimization.md  ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/webpack/性能优化.md
    │   └── plugins/
    │       ├── html-webpack-plugin.md ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/webpack/plugins/html-webpack-plugin.md
    │       └── html-inline-script-webpack-plugin.md ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/webpack/plugins/html-inline-script-webpack-plugin.md
    └── Rollup/
        ├── index.md         ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/rollup/index.md
        ├── plugins.md       ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/rollup/plugins.md
        ├── plugin-replace.md ← scoheart/project/pages/development/web-frontend/4-build-tools/module-bundler/rollup/plugin/replace.md
        └── examples/
            └── rollup-vue-demo/ ← scoheart/backup/rollup-vue-demo/
```

### 9. Front-End Framework (共10+个文件)
```
front-end/Front-End-Framework/
├── Vue/
│   ├── index.md             ← scoheart/project/pages/development/web-frontend/5-frameworks/front-end-frameworks/vue3/index.md
│   ├── blog/
│   │   └── vue.md           ← scoheart/project/pages/blog/vue.md
│   └── backup/
│       └── vue-old.md       ← scoheart/backup/blog/vue.md, scoheart/backup/interview/vue.md
├── React/
│   ├── demo.en.md           ← scoheart/project/pages/development/web-frontend/5-frameworks/front-end-frameworks/react/demo.en.md
│   ├── demo.zh.md           ← scoheart/project/pages/development/web-frontend/5-frameworks/front-end-frameworks/react/demo.zh.md
│   ├── source-code.md       ← scoheart/project/pages/development/web-frontend/5-frameworks/front-end-frameworks/react/源码.md
│   ├── event-system.md      ← scoheart/project/pages/development/web-frontend/5-frameworks/front-end-frameworks/react/合成事件系统.md
│   ├── hooks/
│   │   └── useState.md      ← scoheart/project/pages/development/web-frontend/5-frameworks/front-end-frameworks/react/hooks/useState.md
│   └── examples/
│       └── mini-react.md    ← scoheart/project/pages/development/web-frontend/other/mini-react.md
└── Other/
    └── marko.md             ← scoheart/project/pages/development/web-frontend/5-frameworks/front-end-frameworks/marko/index.md
```

### 10. Routers (共3个文件)
```
front-end/Routers/
├── React-Router/
│   └── routing.md           ← scoheart/project/pages/development/web-frontend/6-ecosystem/router/react-router/路由.md
├── Vue-Router/
│   └── index.md             ← scoheart/project/pages/development/web-frontend/6-ecosystem/router/vue-router/index.md
└── TanStack-Router/
    └── index.md             ← scoheart/project/pages/development/web-frontend/6-ecosystem/router/tanstack-router/index.md
```

### 11. State Management (共2个文件)
```
front-end/State-Management/
├── Vuex/
│   └── index.md             ← scoheart/project/pages/development/web-frontend/6-ecosystem/state/vuex/index.md
└── Zustand/
    └── index.md             ← scoheart/project/pages/development/web-frontend/6-ecosystem/state/zustand/index.md
```

### 12. Rendering/Meta Frameworks (共2个文件)
```
front-end/Rendering-Meta-Frameworks/
├── index.md                 ← scoheart/project/pages/development/web-frontend/5-frameworks/rendering-frameworks/index.md
└── ssr.md                   ← scoheart/project/pages/development/web-frontend/other/ssr.md
```

### 13. Test Tools (共2个文件)
```
front-end/Test-Tools/
├── Jest/
│   └── jest.md              ← scoheart/project/pages/development/web-frontend/6-ecosystem/test/jest.md
└── Vitest/
    └── config.md            ← scoheart/project/pages/development/web-frontend/6-ecosystem/test/vitest/config.md
```

### 14. Back-End Frameworks (共2个文件)
```
front-end/Back-End-Frameworks/
├── NestJS/
│   └── index.md             ← scoheart/project/pages/development/web-frontend/5-frameworks/back-end-frameworks/nestjs/index.md
└── Koa/
    └── middleware.md        ← scoheart/project/pages/development/web-frontend/5-frameworks/back-end-frameworks/koa/中间件、洋葱模型.md
```

### 15. Mobile Frameworks (共5个文件)
```
front-end/Mobile-Frameworks/
└── React-Native/
    ├── config.md            ← scoheart/project/pages/development/mobile-application/react-native/config.zh.md
    ├── router.md            ← scoheart/project/pages/development/mobile-application/react-native/router.zh.md
    ├── error.md             ← scoheart/project/pages/development/mobile-application/react-native/error.md
    ├── component-lib.md     ← scoheart/project/pages/development/mobile-application/react-native/component-lib.zh.md
    └── examples/
        └── dropdown.md      ← scoheart/project/pages/development/mobile-application/react-native/组件库/下拉列表.md
```

### 16. 其他分类 - Web Fundamentals (共17个文件)
```
front-end/Web-Fundamentals/
├── DOM/
│   ├── dom.md               ← scoheart/project/pages/development/web-frontend/other/DOM.md
│   ├── dom-api.md           ← scoheart/project/pages/development/web-frontend/other/DOM API.md
│   └── event.md             ← scoheart/project/pages/development/web-frontend/other/Event.md
├── HTTP/
│   └── ajax.md              ← scoheart/project/pages/development/web-frontend/other/AJAX.md
├── Browser/
│   ├── browser-cache.md     ← scoheart/project/pages/development/web-frontend/other/浏览器缓存.md
│   └── webview.md           ← scoheart/project/pages/development/web-frontend/other/webview.md
├── Cross-Platform/
│   └── cross.md             ← scoheart/project/pages/development/web-frontend/other/cross.md
└── Other/
    ├── ast.md               ← scoheart/project/pages/development/web-frontend/other/ast/index.md
    ├── cli.md               ← scoheart/project/pages/development/web-frontend/other/cli.md
    ├── scaffold.md          ← scoheart/project/pages/development/web-frontend/other/scaffold.md
    ├── visualization.md     ← scoheart/project/pages/development/web-frontend/other/可视化.md
    ├── serialization.md     ← scoheart/project/pages/development/web-frontend/other/序列化.md
    ├── echarts.md           ← scoheart/project/pages/development/web-frontend/other/echarts.md
    ├── web.md               ← scoheart/project/pages/development/web-frontend/other/web.md
    └── demo.md              ← scoheart/project/pages/development/web-frontend/other/demo.md
```

### 17. Libraries & Utils
```
front-end/Libraries/
├── Vue/
│   └── compiler-sfc.md      ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-libraries/@vue-compiler-sfc/index.md
├── CLI-Tools/
│   └── cac.md               ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-libraries/cac/index.md
├── Config/
│   ├── config.md            ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-libraries/config/index.md
│   └── dotenv.md            ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-libraries/dotenv/index.md
└── Visualization/
    └── uplot.md             ← scoheart/project/pages/development/web-frontend/3-javascript/javascript-libraries/Uplot.md
```

### 18. Blog & Articles
```
front-end/Blog/
├── esparser.md              ← scoheart/project/pages/blog/esparser.md
├── npm-run.md               ← scoheart/project/pages/blog/npm run.md
├── interoperability.md      ← scoheart/project/pages/blog/interoperability.md
├── install.md               ← scoheart/project/pages/blog/install/install.md
├── nodejs-diy.md            ← scoheart/backup/blog/nodejs/制作你自己的nodejs.md
└── typescript.md            ← scoheart/backup/blog/ts.md
```

### 19. Monorepo (新增目录)
```
front-end/Monorepo/
├── index.md                 ← scoheart/project/pages/development/web-frontend/4-build-tools/monorepo/index.md
├── pnpm-workspace/
│   └── index.md             ← scoheart/project/pages/development/web-frontend/4-build-tools/monorepo/pnpm/index.md
└── Turborepo/
    └── turborepo.md         ← scoheart/project/pages/development/web-frontend/4-build-tools/monorepo/turborepo/turborepo.md
```

## 迁移统计

- **总文件数**: 约 150+ 个文件
- **目标目录**: 19 个主要分类
- **迁移方式**: 移动(mv)
- **特殊处理**:
  - 中文文件名将转换为英文
  - 保持原有的 Markdown 格式
  - 保留所有代码示例和链接

## 下一步行动

1. 创建目标目录结构
2. 批量移动文件
3. 调整文件名(规范化)
4. 验证迁移结果
5. 创建索引文件(README.md)
