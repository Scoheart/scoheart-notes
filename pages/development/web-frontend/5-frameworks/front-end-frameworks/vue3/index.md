# P1 教程简介

# P2 Vue3 简介

# P3 创建 Vue3 工程

## 安装 nodejs

nodejs 是一个 JavaScript Runtime，即 JavaScript 运行时。你可能还会听到 ES（ECMAScript）、JavaScript、JS 引擎（JavaScript Runtime）、JavaScript Runtime。

请参考：https://juejin.cn/post/7333421776461135881

## 通过 create-vue 脚手架创建项目

```shell
npm create vue@latest
```

## 安装 Vue 官方提供的的 VSCode 插件

插件是用来给.vue 文件提供代码高亮提示的

## 启动项目

```shell
cd xxx
npm install
npm run dev
```

## 目录结构用途

略

# P4 编写 App 组件

## src/main.ts 文件

### createApp 函数

```js
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);
app.mount('#root');
```

createApp 这个函数用来创建一个 Vue 的应用实例，同时需要一个组件作为这个应用实例的根组件（rootComponent），在这里就是：App 组件作为 app 应用实例的根组件.

创建完 app 应用实例后，需要把这个应用实例挂载到 html 中的一个真实存在的 DOM 节点下。这里我们通过 app 应用实例的 mount 方法，传入一个字符串（这个字符串的本质是一个 css 选择器语法，通过这样把他挂载到 id 为 root 的 DOM 节点下。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
  </head>
  <body>
    <div id="root">
      <!-- app应用实例的真实DOM代码 —— html代码，在Vue项目经过整个工程的编译之后，就会被添加到这里面来，可以通过F12进入浏览器的调试查看这些DOM元素-->
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## src/App.vue

这是 Vue 的 SFC（single page component），即 Vue 的单文件组件。

有三大块
- template 这个就是组件的结构 - html
- script 这个就是组件的逻辑 - js
- style 找个就是组件的样式 - css
