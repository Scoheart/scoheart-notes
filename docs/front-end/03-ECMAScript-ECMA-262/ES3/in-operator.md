# in Operator (in 运算符)

> ECMAScript 3 (1999)

## 概述

`in` 运算符用于检查对象是否包含指定的属性(包括原型链上的属性)。

## 基本语法

```javascript
property in object
```

## 示例

### 检查对象属性

```javascript
const person = {
  name: 'Alice',
  age: 25
};

console.log('name' in person);    // true
console.log('gender' in person);  // false
```

### 检查数组索引

```javascript
const colors = ['red', 'green', 'blue'];

console.log(0 in colors);     // true
console.log(2 in colors);     // true
console.log(3 in colors);     // false
console.log('length' in colors); // true
```

### 检查原型链属性

```javascript
const obj = { a: 1 };

console.log('a' in obj);           // true
console.log('toString' in obj);    // true (继承自 Object.prototype)
console.log('hasOwnProperty' in obj); // true (继承自 Object.prototype)
```

### 与 hasOwnProperty 的区别

```javascript
const parent = { inherited: true };
const child = Object.create(parent);
child.own = true;

console.log('own' in child);        // true
console.log('inherited' in child);  // true

console.log(child.hasOwnProperty('own'));       // true
console.log(child.hasOwnProperty('inherited')); // false
```

## 使用场景

### 检查可选属性

```javascript
function processConfig(config) {
  if ('timeout' in config) {
    setTimeout(() => {
      // 处理超时
    }, config.timeout);
  }
}
```

### 遍历对象属性

```javascript
const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
  if (key in obj) {
    console.log(`${key}: ${obj[key]}`);
  }
}
```

## 注意事项

1. `in` 运算符会检查原型链
2. 对于数组,`in` 检查的是索引,而不是值
3. 删除的属性会返回 `false`

```javascript
const obj = { x: 1 };
delete obj.x;
console.log('x' in obj); // false
```

## 参考资料

- [MDN - in operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
