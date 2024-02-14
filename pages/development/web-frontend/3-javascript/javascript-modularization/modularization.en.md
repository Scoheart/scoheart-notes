# JavaScript Modularization

模块化方案的演进过程

## 手动模块化（无模块化）

在早期的前端开发中，开发者通常将所有代码放在一个或几个全局脚本中，使用全局变量和函数进行组织。这种方式容易导致代码混乱、难以维护，并且不利于复用。

## 命名空间 和 对象字面量

为了避免全局污染和组织代码，开发者开始使用命名空间和对象字面量。通过创建一个全局对象，并将相关的函数和变量添加到该对象中，以模拟模块的概念。这种方法提高了代码的可维护性，但仍然有一些限制。

## 立即执行函数 和 闭包

IIFE 提供了一种在代码中创建作用域的方式，以防止变量污染全局命名空间，并且可以通过参数传递实现一些模块化的特性。

## CJS —— CommonJS

Nodejs 这个 JavaScript Runtime 的横空出世，带来了 Nodejs 自己的模块化解决方案，CommonJS 是一种模块化规范，用于在服务器端和本地环境中实现模块化编程。它主要用于 Node.js 环境。在 Node.js 环境中。它通过 require 和 module.exports 语法来定义和导出模块。虽然在客户端使用 CommonJS 存在一些问题，但它在服务器端的成功启示了后续模块化方案。

## AMD —— Asynchronous Module Definition

AMD 是一种用于 JavaScript 模块化的规范，用于在浏览器环境中实现异步加载模块，引入了 define 函数，允许开发者异步加载模块。它主要由 RequireJS 等库来支持，RequireJS 是一个流行的 AMD 实现。AMD 使得前端代码能够更灵活地加载和组织模块，提高了性能和可维护性。

## CMD —— Common Module Definition

CMD 也是一种模块化规范，类似于 AMD，但它更强调按需加载模块。SeaJS 是一个支持 CMD 的库。

- SeaJS

## UMD —— Universal Module Definition

UMD 是一种通用的模块化规范，旨在兼容 CommonJS 和 AMD，并且可以在浏览器和 Node.js 环境中使用。

## ESM

ECMAScript Modules

ESM 是 ECMAScript（JavaScript）的官方模块化规范，从 ES6/ES2015 开始引入。它支持静态导入和导出，并成为 JavaScript 开发中的主要模块化标准。

### 使用 ESM 的前提

- script 标签上添加一个属性 type 属性值为 module
- 打开 HTML 文件的时候，不可以使用 file

### ESM 的使用

一个文件就是一个模块

如何导入一个模块

- import

如何导出模块中的变量、函数……

- export

### 导出方式

named export

```
export var a = 1111

export function fn() {

}

export var obj = {

}

```

default export
在每一个 js 模块中只能用一次

```
let str = 'scoheart';

export default str;
```

### 导入方式

导入所有的东西

- named export
- default export

```
import * as Module from '......js'
```

导入 default

```
import module from '.....js'
```

导入 named

```
import {name1, name2} from '.....js'
```

## 总结

用什么样的模块化导出
在导入的时候就要安装一样的模块化规范导入

### Commonjs

```
module.exports = {

}
```

```
const a = require("")
```

### ESM

```
export default Vue;
```

```
import Vue from "xx.js"
```

### amd\\cmd

```
define()

require()
```

### umd

IIFE + Closures

```
globalThis

globalThis.Vue

console.log(Vue)
```
