# Object.values()

> ECMAScript 2017 (ES8)

返回对象自身可枚举属性值的数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.values(obj));  // [1, 2, 3]

const sum = Object.values(obj).reduce((a, b) => a + b, 0);
console.log(sum);  // 6
```

[MDN - Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
