# Vue3

## 使用 Vue3 的多种方式

- Standalone Script：独立脚本
- Embedded Web Components：作为 Web Component 嵌入
- Single-Page Application (SPA)：单页面应用
- Fullstack / SSR：全栈/服务端渲染
- JAMStack / SSG：JAMStack 架构/静态站点生成

## 独立脚本

首先，我们创建一个 html 文件。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

其次，既然我们需要创建 Vue 项目，那么我们就需要 Vue 的依赖。那么怎么导入 Vue 的依赖呢？我们就可以借助 CDN 引入 Vue 的独立脚本。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 通过cdn —— jsdelivr 引入Vue的依赖 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3.4.19/dist/vue.global.min.js"></script>
  </body>
</html>
```

那么实际上，根据这个 script 标签，浏览器会向`https://cdn.jsdelivr.net/npm/vue@3.4.19/dist/vue.global.js`这个地址发送网络请求，请求成功之后会响应一个 JavaScript 文件。这个文件采用 UMD 的 JavaScript 模块化方案，他最终会给我们的 globalThis 对象（window）身上挂载一个名为`Vue`的属性。可以通过`console.log(globalThis.Vue)` 查看。然后我们就可以开始创建 Vue 项目了。

我们最先需要通过 Vue 提供的 createApp 函数创建一个应用实例 App，然后通过应用实例身上的 mount 方法将其挂载到 html 中已存的 DOM 元素上。

createApp 和 应用实例 App 的类型定义如下：

```ts
function createApp(rootComponent: Component, rootProps?: object): App;

interface App {
  mount(rootContainer: Element | string): ComponentPublicInstance;
}
```

```js
const { createApp } = Vue;
// createApp 需要传递一个必选参数 rootComponent，和可选参数 rootProps
const app = Vue.createApp({});
// mount 需要传递一个必选参数：rootContainer
app.mount('');
```

在上面我们没有将 createApp 和 app.mount 传入具体的参数，而是通过空对象和空字符串取代了。那么这两个参数实际上是需要什么呢？我们一一解答。

rootComponent 代表根组件，我们需要传递一个 Vue 组件给这个参数。

rootContainer 代表我们要将应用实例 App 挂载到哪个已存的 DOM 元素上，可以传递一个 css 选择器的字符串，也可以传递一个真实 DOM 元素给这个参数。

### 什么是 Vue 组件？

其实 Vue 组件就是一个 JavaScript 对象，只不过这个对象有一些特有的属性，让 Vue 能够分辨它是一个 Vue 组件。但是 Vue 的组件，我们也可以大致划分为两类：

- 单文件组件
- 非单文件组件

由于我们现在使用独立脚本在单个 html 文件中构建 Vue 项目，因此我们目前是无法使用 Vue 的单文件组件特性的。但我们可以创建一个非单文件组件。

```js
const { ref } = Vue;
const customVueComponent = {
  setup() {
    const count = ref(0);
    return {
      count: count,
    };
  },
  template: `
    <button>You click me {{count}} times</button>
  `,
};
```

这里补充一个 Vue 的 API —— defineComponent，它是我们在定义 Vue 组件时提供类型推导的辅助函数。不过这里，我们是直接在 html 文件中进行开发，使用它的作用并不显著。

那么我们现在可以构建出下面的项目：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.4.19/dist/vue.global.js"></script>
    <script>
      const { ref, createApp } = Vue;
      const customVueComponent = {
        setup() {
          const count = ref(0);
          return {
            count: count,
          };
        },
        template: `
          <button>You click me {{count}} times</button>
        `,
      };
      const app = createApp(customVueComponent);
      app.mount('#root');
    </script>
  </body>
</html>
```

这就是通过独立脚本的方式构建一个 Vue 项目。但是这里我们需要注意，我们现在引入的这个独立脚本，他包含了 Vue 的 compiler 和 runtime 模块。

### 什么是 Vue 的 compiler 和 runtime

在 Vue.js 中，有两个主要的构建版本：

- 一个是 “full” build，包括 compiler 和 runtime，因此它支持动态编译模板
- 一个是 runtime-only，仅仅包含 runtime，并且需要在构建步骤中预编译模板

那么上面我们导入的`https://cdn.jsdelivr.net/npm/vue@3.4.19/dist/vue.global.js`就是一个 full 构建版本，我们在 Vue 组件中定义的 template 字段，可以被 compiler 编译成 render 函数。

如果我们将代码中的 CDN 地址改为`https://cdn.jsdelivr.net/npm/vue@3.4.19/dist/vue.runtime.global.js`，那么我们导入的 Vue 就不再包含 compiler，这个构建版本的 Vue 是不支持动态编译模板的。所以我们在 Vue 组件中定义的 template 字段，就不能被 compiler 编译成 render 函数。进而会在控制台报错：

```js
[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Use "vue.global.js" instead.
  at <App>
```

意思就是我们在 Vue 组件中提供的 template 选项，但在 Vue 的这个版本中不支持运行时编译。要使用"vue.global.js"这个构建版本代替。

因此我们这里需要改变 Vue 组件的定义。不能继续使用 template 属性，而是用 render 函数取代。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.4.19/dist/vue.global.js"></script>
    <script>
      const { ref, createApp, h } = Vue;
      const customVueComponent = {
        setup() {
          const count = ref(0);
          return {
            count: count,
          };
        },
        render: (ctx) => {
          return h('button', null, 'You click me ' + ctx.count + ' times');
        },
      };
      const app = createApp(customVueComponent);
      app.mount('#root');
    </script>
  </body>
</html>
```

## 通过 create-vite 脚手架创建一个 Vue 项目

```shell
npm init vite
# npm create vite
```

创建完成后，我们聚焦于如下 src 目录下的几个文件：

```
├── src
  ├── App.vue
  ├── mian.js
```

首先我们来看一下 main.js 文件，这里面的内容我们应该很熟悉，就不再赘述。

```js
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).mount('#app');
```

接下来我们来看一下 App.vue 文件，这个就是上面所说的 Vue 组件的另一类 —— 单文件组件。

```js
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
```

### 什么是单文件组件 SFC

Vue 官方文档中介绍：Vue 的单文件组件 (即 \*.vue 文件，英文 Single-File Component，简称 SFC) 是一种特殊的文件格式，使我们能够将一个 Vue 组件的模板、逻辑与样式封装在单个文件中。Vue 的单文件组件是网页开发中 HTML、CSS 和 JavaScript 三种语言经典组合的自然延伸。`<template>`、`<script>` 和`<style>` 三个块在同一个文件中封装、组合了组件的视图、逻辑和样式。

### SFC 是如何工作的

Vue SFC 是一个框架指定的文件格式，因此必须交由 @vue/compiler-sfc 编译为标准的 JavaScript 和 CSS，一个编译后的 SFC 是一个标准的 JavaScript(ES) 模块。

那么话不多说，我们通过自己手动编译一个 SFC 文件，来感受一下 Vue SFC 是如何工作的。

### 手动编译 SFC

开始之前，我们可以先在 create-vite 脚手架中的 main.js 中通过`console.log(App)`打印一个日志，在控制台看看 从 App.vue 文件中导出的这个 App 单文件组件，最终是一个什么样子，可以看出来，这个 App 就是一个标准的 JavaScript 对象。

```js
// App
{
  render: function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return (
      _openBlock(),
      _createElementBlock(
        _Fragment,
        null,
        [_hoisted_1, _createVNode($setup['HelloWorld'], { msg: 'Vite + Vue' })],
        64
        /* STABLE_FRAGMENT */
      )
    );
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { HelloWorld };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
  __name: 'App',
  __hmrId: '7a7a37b1',
  __scopeId: 'data-v-7a7a37b1',
  __file: '/Users/heartsco/Scoheart/code/vite-project/src/App.vue',
};
```

所以其实，我们手动编译一个 SFC 文件，其实就是将 SFC 文件中的 template、script 和 style 块编译为上面所看到的这个 JavaScript 对象。接下来，我们正式开始手动编写一个 SFC 文件。

首先，初始化项目，并且需要安装上面说到的 @vue/compiler-sfc 依赖：

```shell
npm init; npm install @vue/compiler-sfc
```

其次，我们将准备的目录结构如下：

```
├── App.vue
├── compiler.js
├── package-lock.json
├── package.json
```

然后，我们手动编写一个 SFC 文件：

```js
// App.vue
<template>
  <div>
    <h1>Hi, I'm Scoheart</h1>
  </div>
</template>

<script setup lang="ts">
const a = 'Hello, Scoheart!';
console.log(a)
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
```

继续编写一个 compiler.js 文件，用来编译 SFC 文件，内容如下。

```js
const {
  parse,
  compileScript,
  compileTemplate,
  compileStyle,
  rewriteDefault,
} = require('@vue/compiler-sfc');
const fs = require('fs');
const path = require('path');

const sfcFile = 'App.vue';
const sfcPath = path.resolve(sfcFile);

const id = Date.now().toString().substring(0, 8);

// 设置组件的信息，便于开发环境查看
const __file = sfcPath;
const __name = sfcFile.split('.').shift();
const __scopedId = `data-v-${id}`; /** 用于css scope，唯一即可 */
const __hmrId = `${id}`;

// 读取 SFC 文件内容
const sfcContent = fs.readFileSync(sfcPath, 'utf-8');

// 解析 SFC 文件内容, 得到 SFC 的 descriptor
const { descriptor } = parse(sfcContent, {
  filename: sfcFile,
});

// 编译 script
const script = compileScript(descriptor, {
  id: id,
});

// 编译 template
const template = compileTemplate({
  source: descriptor.template.content,
  id: id,
  filename: sfcPath,
});

// 编译 style
let css = '';
for (const style of descriptor.styles) {
  const { code } = compileStyle({
    source: style.content,
    id: id,
  });
  css += code;
}

// 组合 render函数 和 改写后的script
const codeList = [];
codeList.push(template.code);
codeList.push(rewriteDefault(script.content, '__sfc_main__'));
codeList.push(`__sfc_main__.__name='${__name}'`);
codeList.push(`__sfc_main__.__file='${__file}'`);
codeList.push(`__sfc_main__.__scopeId='${__scopedId}'`);
codeList.push(`__sfc_main__.__hmrId='${__hmrId}'`);
codeList.push(`__sfc_main__.render=render`);
codeList.push(`export default __sfc_main__`);

const code = codeList.join('\n');

fs.writeFileSync('./target.js', code);
fs.writeFileSync('./target.css', css);
```

那让我们逐步来分析一下整个流程的原理。

#### parse 函数

parse 函数，用来解析 SFC 中的内容，返回一个对象。对象中有一个 descriptor 属性，用来存储 SFC 的描述信息。

- descriptor.template 用来存储 SFC 中的 template 块
- descriptor.script 用来存储 SFC 中的 script 块
- descriptor.scriptSetup 用来存储 SFC 中的 scriptSetup 块
- descriptor.styles 用来存储 SFC 中的 多个 style 块。

```js
{
  descriptor: {
    filename: "App.vue",
    source: "<template>\n<div>\n  <h1>Hi, I'm Scoheart</h1>\n  <h1>{{ res }}</h1>\n</div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\nconst res = ref('Hello, Scoheart!');\n</script>\n\n<style scoped>\nh1 {\ncolor: blue;\n}\n</style>\n",
    template: {
      type: "template",
      content: "\n<div>\n  <h1>Hi, I'm Scoheart</h1>\n  <h1>{{ res }}</h1>\n</div>\n",
      loc: {
        start: {
          column: 11,
          line: 1,
          offset: 10,
        },
        end: {
          column: 1,
          line: 6,
          offset: 73,
        },
        source: "\n<div>\n  <h1>Hi, I'm Scoheart</h1>\n  <h1>{{ res }}</h1>\n</div>\n",
      },
      attrs: {
      },
      ast: {
        type: 0,
        source: "<template>\n<div>\n  <h1>Hi, I'm Scoheart</h1>\n  <h1>{{ res }}</h1>\n</div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\nconst res = ref('Hello, Scoheart!');\n</script>\n\n<style scoped>\nh1 {\ncolor: blue;\n}\n</style>\n",
        children: [
          {
            type: 1,
            tag: "div",
            ns: 0,
            tagType: 0,
            props: [
            ],
            children: [
              {
                type: 1,
                tag: "h1",
                ns: 0,
                tagType: 0,
                props: [
                ],
                children: [
                  {
                    type: 2,
                    content: "Hi, I'm Scoheart",
                    loc: {
                      start: {
                        column: 7,
                        line: 3,
                        offset: 23,
                      },
                      end: {
                        column: 23,
                        line: 3,
                        offset: 39,
                      },
                      source: "Hi, I'm Scoheart",
                    },
                  },
                ],
                loc: {
                  start: {
                    column: 3,
                    line: 3,
                    offset: 19,
                  },
                  end: {
                    column: 28,
                    line: 3,
                    offset: 44,
                  },
                  source: "<h1>Hi, I'm Scoheart</h1>",
                },
                codegenNode: undefined,
              },
              {
                type: 1,
                tag: "h1",
                ns: 0,
                tagType: 0,
                props: [
                ],
                children: [
                  {
                    type: 5,
                    content: {
                      type: 4,
                      loc: {
                        start: {
                          column: 10,
                          line: 4,
                          offset: 54,
                        },
                        end: {
                          column: 13,
                          line: 4,
                          offset: 57,
                        },
                        source: "res",
                      },
                      content: "res",
                      isStatic: false,
                      constType: 0,
                      ast: null,
                    },
                    loc: {
                      start: {
                        column: 7,
                        line: 4,
                        offset: 51,
                      },
                      end: {
                        column: 16,
                        line: 4,
                        offset: 60,
                      },
                      source: "{{ res }}",
                    },
                  },
                ],
                loc: {
                  start: {
                    column: 3,
                    line: 4,
                    offset: 47,
                  },
                  end: {
                    column: 21,
                    line: 4,
                    offset: 65,
                  },
                  source: "<h1>{{ res }}</h1>",
                },
                codegenNode: undefined,
              },
            ],
            loc: {
              start: {
                column: 1,
                line: 2,
                offset: 11,
              },
              end: {
                column: 7,
                line: 5,
                offset: 72,
              },
              source: "<div>\n  <h1>Hi, I'm Scoheart</h1>\n  <h1>{{ res }}</h1>\n</div>",
            },
            codegenNode: undefined,
          },
        ],
        helpers: {
        },
        components: [
        ],
        directives: [
        ],
        hoists: [
        ],
        imports: [
        ],
        cached: 0,
        temps: 0,
        codegenNode: undefined,
        loc: {
          start: {
            line: 1,
            column: 1,
            offset: 0,
          },
          end: {
            line: 1,
            column: 1,
            offset: 0,
          },
          source: "",
        },
      },
      map: {
        version: 3,
        sources: [
          "App.vue",
        ],
        names: [
        ],
        mappings: ";AACA,CAAC,CAAC,CAAC,CAAC;EACF,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;EACxB,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;AACnB,CAAC,CAAC,CAAC,CAAC,CAAC",
        file: "App.vue",
        sourceRoot: "",
        sourcesContent: [
          "<template>\n<div>\n  <h1>Hi, I'm Scoheart</h1>\n  <h1>{{ res }}</h1>\n</div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\nconst res = ref('Hello, Scoheart!');\n</script>\n\n<style scoped>\nh1 {\ncolor: blue;\n}\n</style>\n",
        ],
      },
    },
    script: null,
    scriptSetup: {
      type: "script",
      content: "\nimport { ref } from 'vue';\nconst res = ref('Hello, Scoheart!');\n",
      loc: {
        start: {
          column: 25,
          line: 8,
          offset: 110,
        },
        end: {
          column: 1,
          line: 11,
          offset: 175,
        },
        source: "\nimport { ref } from 'vue';\nconst res = ref('Hello, Scoheart!');\n",
      },
      attrs: {
        setup: true,
        lang: "ts",
      },
      setup: true,
      lang: "ts",
    },
    styles: [
      {
        type: "style",
        content: "\nh1 {\ncolor: blue;\n}\n",
        loc: {
          start: {
            column: 15,
            line: 13,
            offset: 200,
          },
          end: {
            column: 1,
            line: 17,
            offset: 221,
          },
          source: "\nh1 {\ncolor: blue;\n}\n",
        },
        attrs: {
          scoped: true,
        },
        scoped: true,
        map: {
          version: 3,
          sources: [
            "App.vue",
          ],
          names: [
          ],
          mappings: ";AAaA,CAAC,EAAE;AACH,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;AACX",
          file: "App.vue",
          sourceRoot: "",
          sourcesContent: [
            "<template>\n<div>\n  <h1>Hi, I'm Scoheart</h1>\n  <h1>{{ res }}</h1>\n</div>\n</template>\n\n<script setup lang=\"ts\">\nimport { ref } from 'vue';\nconst res = ref('Hello, Scoheart!');\n</script>\n\n<style scoped>\nh1 {\ncolor: blue;\n}\n</style>\n",
          ],
        },
      },
    ],
    customBlocks: [
    ],
    cssVars: [
    ],
    slotted: false,
    shouldForceReload: (prevImports) => hmrShouldReload(prevImports, descriptor),
  },
  errors: [
  ],
}
```

这一步做的仅仅是将 SFC 中的内容解析为 descriptor 对象，并没有编译。可以发现，每个块中的 content 字段，就是 SFC 中的内容。

并且因为我们使用的是 script setup 语法，所以 descriptor.script 的内容为 null，而 descriptor.scriptSetup 字段中包含了 script setup 语法中的内容。

同时，我们只使用了一个 style 块，所以 descriptor.styles 数组中只有一个元素。

#### compileScript 函数

comileScript 函数将 scriptSetup 或者 script 块中的内容编译。这里我们因为我们没有 script 块，所以只编译了 scriptSetup 块。最终的编译结果为：

```js
// script.content
import { defineComponent as _defineComponent } from 'vue';
import { ref } from 'vue';

export default /*#__PURE__*/ _defineComponent({
  __name: 'App',
  setup(__props, { expose: __expose }) {
    __expose();

    const res = ref('Hello, Scoheart!');

    const __returned__ = { res };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
});
```

### compileTemplate 函数

compileTemplate 函数将 template 编译为 render 函数。最终的编译结果为：

```js
// template.code
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

const _hoisted_1 = /*#__PURE__*/ _createElementVNode(
  'h1',
  null,
  "Hi, I'm Scoheart",
  -1 /* HOISTED */
);

export function render(_ctx, _cache) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _hoisted_1,
      _createElementVNode('h1', null, _toDisplayString(_ctx.res), 1 /* TEXT */),
    ])
  );
}
```

我们暂且不关注 style 块的处理，单单看 script 和 template 编译后的结果我们会发现，最终通过 `export default` 导出的是一个 Vue 组件。但是我们会发现导出的这个 Vue 组件并没有 render 函数。是因为 SFC 的 template 编译后的 render 函数，变成了独立的命名导出 `export function render`。

那是不是意味着，我们现在需要将这个 render 函数，挂载到 export default 导出的对象上，那么如何实现呢？

我们先回想一下 `export default` 的这个对象怎么来的？没错，通过 compileScript 函数编译而来。

但是头疼的也来了，既然是由这个函数编译而来的，那么我们就不能自己手动给`export default`的对象增加一个字段啊。

没关系，其实在@vue/compiler-sfc 这个包中，早就给我们提供了应对方案。

### rewriteDefault 函数

rewriteDefault 函数能够接收我们编译后的 script 内容，以及自定义一个默认导出的对象名称。他就是帮助来重新改写`export default` 的对象的。

```js
rewriteDefault(script.content, '__sfc_main__');
```

改写后的结果为：

```js
import { defineComponent as _defineComponent } from 'vue';
import { ref } from 'vue';

const __sfc_main__ = _defineComponent({
  __name: 'App',
  setup(__props, { expose: __expose }) {
    __expose();

    const res = ref('Hello, Scoheart!');

    const __returned__ = { res };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
});
```

### 组合 改写后的 script 和 render 函数

所以现在，我们只需要组合将 `export default` 改写后的 script 和 template 编译的 render 函数，再将它们默认导出即可。

```js
const codeList = [];
codeList.push(template.code);
codeList.push(rewriteDefault(script.content, '__sfc_main__'));
codeList.push(`__sfc_main__.render=render`);
codeList.push(`export default __sfc_main__`);
```

最终执行 node compiler.js 编译后的 target.js 文件的内容如下：

```js
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

const _hoisted_1 = /*#__PURE__*/ _createElementVNode(
  'h1',
  null,
  "Hi, I'm Scoheart",
  -1 /* HOISTED */
);

export function render(_ctx, _cache) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _hoisted_1,
      _createElementVNode('h1', null, _toDisplayString(_ctx.res), 1 /* TEXT */),
    ])
  );
}

import { defineComponent as _defineComponent } from 'vue';
import { ref } from 'vue';

const __sfc_main__ = _defineComponent({
  __name: 'App',
  setup(__props, { expose: __expose }) {
    __expose();

    const res = ref('Hello, Scoheart!');

    const __returned__ = { res };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
});
__sfc_main__.__name = 'App';
__sfc_main__.__file = '/Users/heartsco/Scoheart/code/vite-project/src/App.vue';
__sfc_main__.__scopeId = 'data-v-17080226';
__sfc_main__.__hmrId = '17080226';
__sfc_main__.render = render;
export default __sfc_main__;
```

导出的对象如下，可以看出，和最初我们在 create-vite 脚手架中打印的 App 基本一致。

```js
{
  render: function render(_ctx, _cache) {
    return (
      _openBlock(),
      _createElementBlock('div', null, [
        _hoisted_1,
        _createElementVNode(
          'h1',
          null,
          _toDisplayString(_ctx.res),
          1 /* TEXT */
        ),
      ])
    );
  },
  setup(__props, { expose: __expose }) {
    __expose();

    const res = ref('Hello, Scoheart!');

    const __returned__ = { res };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
  __name: 'App',
  __file: '/Users/heartsco/Scoheart/code/vite-project/src/App.vue',
  __scopeId: 'data-v-17080226',
  __hmrId: '17080226',
};
```

### compileStyle 函数

compileStyle 函数用来编译 style，在手动编译 SFC 的时候，我们在这的处理是将其输出到了一个单独的 css 文件 target.css，最终的结果为：

```css
h1 {
  color: blue;
}
```

这就是手动编译 SFC 的一个流程。

在实际项目中，我们一般会使用集成了 SFC 编译器的构建工具，比如 Vite 或者 Vue CLI (基于 webpack)，@vue/compiler-sfc 就分别被用在 @vitejs/plugin-vue 和 vue-loader 上.
