# WeakRef

> ECMAScript 2021 (ES12)

弱引用对象,不阻止垃圾回收。

```javascript
const obj = { name: 'test' };
const weakRef = new WeakRef(obj);

// 获取引用的对象(可能已被回收)
const deref = weakRef.deref();
if (deref) {
  console.log(deref.name);
}

// 配合 FinalizationRegistry 使用
const registry = new FinalizationRegistry((value) => {
  console.log(`${value} 已被回收`);
});

registry.register(obj, 'my object');
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)
