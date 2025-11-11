# instanceof Operator (instanceof 运算符)

> ECMAScript 3 (1999)

## 概述

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在对象的原型链中。

## 基本语法

```javascript
object instanceof Constructor
```

## 示例

### 基本用法

```javascript
function Person(name) {
  this.name = name;
}

const alice = new Person('Alice');

console.log(alice instanceof Person);  // true
console.log(alice instanceof Object);  // true
console.log(alice instanceof Array);   // false
```

### 检查内置类型

```javascript
const arr = [1, 2, 3];
const obj = { a: 1 };
const str = 'hello';
const num = 42;
const date = new Date();

console.log(arr instanceof Array);    // true
console.log(obj instanceof Object);   // true
console.log(str instanceof String);   // false (原始类型)
console.log(num instanceof Number);   // false (原始类型)
console.log(date instanceof Date);    // true
console.log(date instanceof Object);  // true
```

### 原型链检查

```javascript
function Animal() {}
function Dog() {}

Dog.prototype = new Animal();

const myDog = new Dog();

console.log(myDog instanceof Dog);     // true
console.log(myDog instanceof Animal);  // true
console.log(myDog instanceof Object);  // true
```

### 自定义检查

```javascript
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

const error = new CustomError('自定义错误');

console.log(error instanceof CustomError);  // true
console.log(error instanceof Error);        // true
console.log(error instanceof Object);       // true
```

## 注意事项

### 1. 原始类型

```javascript
const str = 'hello';
const strObj = new String('hello');

console.log(str instanceof String);     // false
console.log(strObj instanceof String);  // true
```

### 2. 跨 iframe 问题

```javascript
// 不同 iframe 的数组不共享同一个 Array 构造函数
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const iframeArray = window.frames[0].Array;

const arr = new iframeArray();
console.log(arr instanceof Array);        // false
console.log(Array.isArray(arr));          // true (更可靠)
```

### 3. 手动修改原型链

```javascript
function Foo() {}
const foo = new Foo();

console.log(foo instanceof Foo);  // true

Foo.prototype = {};
console.log(foo instanceof Foo);  // false
```

## 替代方案

### 使用 typeof

```javascript
typeof 'hello' === 'string'  // true
typeof 42 === 'number'       // true
typeof true === 'boolean'    // true
```

### 使用 Array.isArray()

```javascript
Array.isArray([1, 2, 3])  // true
Array.isArray('hello')    // false
```

### 使用 Object.prototype.toString

```javascript
Object.prototype.toString.call([1, 2, 3])  // "[object Array]"
Object.prototype.toString.call({})         // "[object Object]"
Object.prototype.toString.call(new Date()) // "[object Date]"
```

## 参考资料

- [MDN - instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
