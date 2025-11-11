# Object.entries()

> ECMAScript 2017 (ES8)

返回对象自身可枚举属性的键值对数组。

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj));
// [['a', 1], ['b', 2], ['c', 3]]

// 遍历对象
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

[MDN - Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
