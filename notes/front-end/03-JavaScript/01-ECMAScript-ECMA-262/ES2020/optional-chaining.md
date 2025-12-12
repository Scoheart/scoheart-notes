# Optional Chaining

> ECMAScript 2020 (ES11)

安全地访问嵌套对象属性。

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'New York'
  }
};

// 传统方式
const city = user && user.address && user.address.city;

// Optional Chaining
const city = user?.address?.city;  // 'New York'
const zip = user?.address?.zip;    // undefined

// 也适用于方法调用和数组
obj.method?.();
arr?.[0];
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
