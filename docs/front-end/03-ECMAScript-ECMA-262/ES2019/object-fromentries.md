# Object.fromEntries()

> ECMAScript 2019 (ES10)

将键值对列表转换为对象。

```javascript
const entries = [['a', 1], ['b', 2], ['c', 3]];
const obj = Object.fromEntries(entries);
console.log(obj);  // { a: 1, b: 2, c: 3 }

// 与 Object.entries() 互逆
const original = { x: 1, y: 2 };
const copy = Object.fromEntries(Object.entries(original));
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
