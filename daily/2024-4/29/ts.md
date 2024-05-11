#

## commonjs

导出

```ts
module.exports = {
  val: 'Hello',
  fn: function fn() {
    console.log("I'm a function!");
  },
};

exports.val = 'Hello';
exports.fn = function fn() {
  console.log("I'm a function");
};
```

导入

```ts
const m = require('./xxx');
console.log(m.val + 'World!');
m.fn();

const { val, fn } = require('./xxx');
console.log(val + 'World!');
fn();
```

## ES Module

导出

```ts
export default {
  val: 'Hello',
  fn: function fn() {
    console.log("I'm a function!");
  },
};

import m from './module';
console.log(m.val + 'World!');
m.fn();
```

```ts
export const val = 'Hello';
export const fn = function fn() {
  console.log("I'm a function!");
};

import { val, fn } from './module';
console.log(val + 'World!');
fn();
```

## interoperability

```ts
export default {
  val: 'Hello',
  fn: function fn() {
    console.log("I'm a function!");
  },
};

const m = require('./module');
console.log(m.default.val + 'World!');
m.default.fn();
```

```ts
module.exports = {
  val: 'Hello',
  fn: function fn() {
    console.log("I'm a function!");
  },
};

// 这段代码出错
import m from './module';
console.log(m.val + 'World!');
m.fn();

// 具体原因可以看编译后的 commonjs 代码，如下
('use strict');
Object.defineProperty(exports, '__esModule', { value: true });
var module_1 = require('./module');
console.log(module_1.default.val + 'World!');
module_1.default.fn();
```

### Note

1. commonjs 中 module.exports 中导出的，可以在 ESM 中直接通过 named import 导入
2. commonjs 中 module.exports 中导出的，不能直接在 ESM 中 default import 导入，而是需要通过 tsconfig.json 中的 esModuleInterop 配置修改编译后的结果
3. commonjs 中 module.exports 中导出的，可以在 ESM 中 as namespace import 导入

# 问题

1. 首要的问题应该是在 ESM 中导入 commonjs 的模块，因为在 ESM 出现以前，所有的 JavaScript 代码几乎都是 Commonjs 模块开发的
