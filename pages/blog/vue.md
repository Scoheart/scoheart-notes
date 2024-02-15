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

首先，初始化项目，并且需要安装上面说到的 @vue/compiler-sfc 依赖：

```shell
npm init; npm install @vue/compiler-sfc
```

然后，我们手动编写一个 SFC 文件：

```js
// App.vue
<template>
  <div>
    <h1>Hi, I'm Scoheart</h1>
  </div>
</template>

<script>
const a = 'Hello, Scoheart!';
</script>

<style>
h1 {
  color: blue;
}
</style>

```
