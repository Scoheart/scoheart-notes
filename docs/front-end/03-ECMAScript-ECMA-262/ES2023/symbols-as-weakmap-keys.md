# Symbols as WeakMap Keys

> ECMAScript 2023 (ES14)

WeakMap 可以使用 Symbol 作为键。

```javascript
const weakMap = new WeakMap();
const sym = Symbol('key');

weakMap.set(sym, 'value');
console.log(weakMap.get(sym));  // 'value'

// 之前只能用对象作为键
const obj = {};
weakMap.set(obj, 'object value');
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
