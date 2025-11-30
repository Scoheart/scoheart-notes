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

这部分还可以看这个文章：https://juejin.cn/post/7335093445868650533

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

注意：这里可以下载一个 Vue 的 Vscode 插件，名字叫：Vue VSCode Snippets，安装完这个插件之后，你创建一个空的 xxx.vue 文件的时候，就可以直接输入：`vbase`或者`vbase-3`等等，来快速创建下面的模版，不用自己一个个敲了。

```js
<template>
  <div>

  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
```

# P5 一个简单效果

## 安装 Vue3 的浏览器插件

需要翻墙，进入浏览器的插件商店

# P6 Options API 和 Composition API

## Options API 和 Composition API 的区别

## Options API

选项式 API，就是你的数据要放入 data 选项中，方法要放入 methods 中

## Composition API

# P7 setup 概述

## JS 的对象

- 任务：如何给一个 JS 对象，添加属性，添加方法

## 定义数据

```js

<script lang="ts">
export default {
  setup() {
    // 在setup函数里，定义一个变量就是定义了一个 Vue 的数据data
    const name = "scoheart"

    // 在setup中通过返回一个对象，而且对象的其中一个key就是这个变量的名字，找个key的value就是这个变量的值，这样在template模版中就可以使用这个数据了
    return {
      'name': name
    }
    // 于亮注意：js的对象的定义 跟 python 的 dict 字典是几乎一致的，js的对象的key本质就是一个字符串，所以可以加上引号“”，也可以不加引号，但是如果不加引号，他就自己会自动识别成字符串。
    // 取一个对象身上某个属性的值的时候，可以obj.name, 也可以obj["name"]，第二种就类似于python的字典取值
  }
}
</script>

```

## 定义方法

同数据

# P8 setup 的返回值

## 返回一个对象

## 返回一个函数

- 任务熟悉解 ES 的箭头函数，周鑫注意，这里可以继续了解 Java 的 lambda 表达式，了解即可。

# P9 setup 与 OptionsAPI

Vue2 的语法 Vue3 能支持，例如 data 能获取 setup 中的数据，但是要加上 this。但是 Vue3 的语法 Vue2 就不能支持。

同时，用 Vue3 就不要在用 data、methods 选项了。

# P10 setup 的语法糖

## 写法

```js
<script setup></script>
```

## 插件修改单文件组件的名字

- vite-plugin-vue-setup-extend

```js
<script setup name="xxx"></script>
```

- defineOptions Vue3.3 最新

