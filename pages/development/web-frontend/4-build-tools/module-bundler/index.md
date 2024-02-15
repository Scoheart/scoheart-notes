# Module Bundler

## 前端的模块化演进



## 什么是模块打包器 (What)

模块打包器，顾名思义就是进行模块代码打包、合并的工具。我们耳熟能详的打包器有这些：

- browserify
- webpack
- rollup
- parcel
- esbuild
- vite
- etc.

## 为什么需要模块打包器 (Why)

刀耕火种的时代，JavaScript 代码直接写在 HTML 文件或单个 JavaScript 脚本文件中。然而，随着 web 应用的复杂性不断增加，少量的 JavaScript 代码和单一的脚本文件已经无法满足开发者的需求。随着项目越来越大，JavaScript 代码越来越复杂，我们希望将 JavaScript 代码拆分成一个个模块，每个模块负责自己的功能，方便开发、测试、重构、维护等等。所谓时势造英雄，这就是模块打包器应运而生的原因。

那么从这个角度来看，我们的模块打包器只是用来解决了 JavaScript 模块化代码的集成打包问题。所以这样来说，模块打包器就只是负责 JavaScript 代码模块的集成打包工具。那么涉及的打包项为：

- 自己编写的 JavaScript 代码模块
- 第三方库的 JavaScript 代码模块

然而，实际上随着 web 应用的复杂性不断增加，我们的样式代码、图片资源、HTML 模板等静态资源也需要打包合并。所以，模块打包器功能的演进也远远不止于 JavaScript 模块化代码的打包。故现代化的模块打包项为：

- 自己编写的 JavaScript 代码模块
- 第三方库的 JavaScript 代码模块
- 图片资源
- 样式资源
- 模板资源
- 等等

## 什么是模块化编程

- https://en.wikipedia.org/wiki/Modular_programming

## 如何编写 JavaScript 模块化代码

非常可惜，JavaScript 诞生之初，并没有模块化代码的概念。但是随着项目越来越复杂，JavaScript 模块化迫在眉睫，于是社区的开发者们开始尝试编写 JavaScript 模块化代码。众多的模块化代码方案横空出世，如：

- CommonJS
- AMD (RequireJS)
- CMD (SeaJS)
- UMD (Universal Module Definition)

随着 ECMAScript 2015（ES6）的发布，JavaScript 终于迎来了原生的模块系统

- ESM

## 如何使用模块打包器 (How)

### browserify

```js
// sum.js
```

### rollup

rollup 是一个 ES Module 模块的打包器，可以将 ES Module 打包为 CommonJS 或者 AMD 模块等。

- 默认只能打包 ES Module
- 默认只支持自己编写的 js 模块化代码
- 默认不支持图片等静态资源（不确定）

三种解决方案

- 如果不仅需要打包 ES Module，还需要打包 CommonJS 或者 AMD 模块，可以使用 @rollup/plugin-commonjs
- 如果需要打包第三方库的 js 模块化代码，可以使用 @rollup/plugin-node-resolve
- 图片等静态资源，可以使用 @rollup

### webpack

