# Object.hasOwn()

> ECMAScript 2022 (ES13)

更安全的 hasOwnProperty。

```javascript
const obj = { prop: 'value' };

// 旧方式
obj.hasOwnProperty('prop');  // true
Object.prototype.hasOwnProperty.call(obj, 'prop');  // true

// 新方式(更简洁和安全)
Object.hasOwn(obj, 'prop');  // true

// 对于没有原型的对象
const nullProto = Object.create(null);
nullProto.prop = 'value';
// nullProto.hasOwnProperty('prop');  // TypeError
Object.hasOwn(nullProto, 'prop');  // true
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
