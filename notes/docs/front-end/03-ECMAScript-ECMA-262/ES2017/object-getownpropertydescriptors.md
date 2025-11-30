# Object.getOwnPropertyDescriptors()

> ECMAScript 2017 (ES8)

返回对象所有自身属性的描述符。

```javascript
const obj = { name: 'Alice' };
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
// { name: { value: 'Alice', writable: true, enumerable: true, configurable: true } }
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
