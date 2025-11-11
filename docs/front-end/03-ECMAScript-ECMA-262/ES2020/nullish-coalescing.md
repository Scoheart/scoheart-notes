# Nullish Coalescing

> ECMAScript 2020 (ES11)

当左侧为 null 或 undefined 时返回右侧值。

```javascript
const value1 = null ?? 'default';     // 'default'
const value2 = undefined ?? 'default'; // 'default'
const value3 = 0 ?? 'default';        // 0
const value4 = '' ?? 'default';       // ''
const value5 = false ?? 'default';    // false

// 与 || 的区别
console.log(0 || 'default');    // 'default'
console.log(0 ?? 'default');    // 0
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
