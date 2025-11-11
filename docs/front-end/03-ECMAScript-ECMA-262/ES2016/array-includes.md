# Array.prototype.includes()

> ECMAScript 2016 (ES7)

## 概述

判断数组是否包含指定的值,返回布尔值。能正确处理 NaN。

## 基本语法

```javascript
array.includes(searchElement[, fromIndex])
```

## 示例

```javascript
const arr = [1, 2, 3, NaN];

console.log(arr.includes(2));    // true
console.log(arr.includes(NaN));  // true
console.log(arr.includes(5));    // false

// 与 indexOf 对比
console.log(arr.indexOf(NaN) !== -1);  // false (无法检测 NaN)
```

## 参考资料

- [MDN - Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
