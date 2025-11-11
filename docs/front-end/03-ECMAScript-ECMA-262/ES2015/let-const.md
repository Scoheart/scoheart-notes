# let and const (块级作用域声明)

> ECMAScript 2015 (ES6)

## 概述

ES2015 引入了 `let` 和 `const` 两个新的变量声明关键字,提供块级作用域,解决了 `var` 的诸多问题。

## let

### 块级作用域

```javascript
// var 的函数作用域
if (true) {
  var x = 1;
}
console.log(x); // 1

// let 的块级作用域
if (true) {
  let y = 2;
}
console.log(y); // ReferenceError: y is not defined
```

### 不存在变量提升

```javascript
// var 存在变量提升
console.log(a); // undefined
var a = 1;

// let 不存在变量提升(暂时性死区)
console.log(b); // ReferenceError
let b = 2;
```

### 暂时性死区(TDZ)

```javascript
const temp = 'outer';

if (true) {
  // TDZ 开始
  console.log(temp); // ReferenceError
  let temp = 'inner'; // TDZ 结束
  console.log(temp); // "inner"
}
```

### 不允许重复声明

```javascript
// var 允许重复声明
var x = 1;
var x = 2; // OK

// let 不允许重复声明
let y = 1;
let y = 2; // SyntaxError
```

### 循环中的 let

```javascript
// var 的问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 输出: 3, 3, 3

// let 的解决方案
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// 输出: 0, 1, 2
```

## const

### 常量声明

```javascript
const PI = 3.14159;
PI = 3.14; // TypeError: Assignment to constant variable
```

### 必须初始化

```javascript
const x; // SyntaxError: Missing initializer
const y = 10; // OK
```

### 块级作用域

```javascript
if (true) {
  const MAX = 100;
}
console.log(MAX); // ReferenceError
```

### 对象属性可变

```javascript
const person = {
  name: 'Alice',
  age: 25
};

// 可以修改属性
person.age = 26; // OK
person.city = 'New York'; // OK

// 不能重新赋值
person = {}; // TypeError
```

### 数组元素可变

```javascript
const arr = [1, 2, 3];

// 可以修改元素
arr.push(4); // OK
arr[0] = 10; // OK

// 不能重新赋值
arr = []; // TypeError
```

## 实际应用

### 1. 替代 var

```javascript
// 旧代码(使用 var)
var name = 'Alice';
var age = 25;

// 现代代码(使用 let/const)
const name = 'Alice'; // 不会改变的值用 const
let age = 25;         // 会改变的值用 let
```

### 2. 循环迭代器

```javascript
// 好的实践
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// 每次迭代都有独立的 i
const buttons = document.querySelectorAll('button');
buttons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    console.log(`Button ${i} clicked`);
  });
});
```

### 3. 配置常量

```javascript
const CONFIG = {
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000,
  MAX_RETRIES: 3
};

// 属性可以修改,但不推荐
CONFIG.TIMEOUT = 10000;

// 使用 Object.freeze 冻结对象
const IMMUTABLE_CONFIG = Object.freeze({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000
});

IMMUTABLE_CONFIG.TIMEOUT = 10000; // 静默失败(严格模式下抛错)
```

### 4. 模块导出

```javascript
// constants.js
export const MAX_SIZE = 1000;
export const MIN_SIZE = 10;
export const DEFAULT_COLOR = '#000000';

// config.js
export const config = {
  environment: 'production',
  debug: false
};
```

### 5. 防止意外重新赋值

```javascript
// 使用 const 防止错误
const fetchData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// 如果误写成 data =,会立即报错
// data = await response.json(); // TypeError
```

### 6. Switch 语句中的块级作用域

```javascript
const type = 'A';

switch (type) {
  case 'A': {
    const message = 'Type A';
    console.log(message);
    break;
  }
  case 'B': {
    const message = 'Type B'; // 不同的作用域,可以重复声明
    console.log(message);
    break;
  }
}
```

## var vs let vs const

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 是 | 否(TDZ) | 否(TDZ) |
| 重复声明 | 允许 | 不允许 | 不允许 |
| 重新赋值 | 允许 | 允许 | 不允许 |
| 全局对象属性 | 是 | 否 | 否 |

## 最佳实践

### 1. 优先使用 const

```javascript
// 默认使用 const
const name = 'Alice';
const age = 25;
const colors = ['red', 'green', 'blue'];

// 只有需要重新赋值时才使用 let
let counter = 0;
counter++;
```

### 2. let 用于循环变量

```javascript
for (let i = 0; i < array.length; i++) {
  // ...
}

for (let item of items) {
  // ...
}
```

### 3. 避免使用 var

```javascript
// 避免
var x = 1;

// 推荐
const x = 1;
// 或
let x = 1;
```

### 4. 减小作用域

```javascript
// 不好:作用域过大
function processData(data) {
  let result;

  if (data.length > 0) {
    result = data.map(item => item * 2);
  } else {
    result = [];
  }

  return result;
}

// 好:作用域更小
function processData(data) {
  if (data.length > 0) {
    const result = data.map(item => item * 2);
    return result;
  }

  return [];
}
```

## 常见陷阱

### 1. const 不是真正的常量

```javascript
const obj = { x: 1 };
obj.x = 2; // OK,对象属性可以修改

// 要实现真正的不可变
const immutable = Object.freeze({ x: 1 });
immutable.x = 2; // 静默失败
```

### 2. 循环中的闭包

```javascript
// 问题
const funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(() => console.log(i));
}
funcs.forEach(f => f()); // 3, 3, 3

// 解决方案 1: 使用 let
const funcs = [];
for (let i = 0; i < 3; i++) {
  funcs.push(() => console.log(i));
}
funcs.forEach(f => f()); // 0, 1, 2

// 解决方案 2: IIFE
const funcs = [];
for (var i = 0; i < 3; i++) {
  (function(j) {
    funcs.push(() => console.log(j));
  })(i);
}
funcs.forEach(f => f()); // 0, 1, 2
```

### 3. 暂时性死区的困惑

```javascript
function test(x = y, y = 2) {
  return [x, y];
}

test(); // ReferenceError: Cannot access 'y' before initialization

// 正确的顺序
function test(y = 2, x = y) {
  return [x, y];
}

test(); // [2, 2]
```

## 浏览器兼容性

- IE11 不支持(需要使用 Babel 转译)
- 现代浏览器全部支持
- Node.js 4.0+ 支持

## 参考资料

- [MDN - let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
