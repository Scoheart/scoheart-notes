# Promise.any()

> ECMAScript 2021 (ES12)

返回第一个成功的 Promise。

```javascript
const promises = [
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.reject('error2')
];

Promise.any(promises)
  .then(result => console.log(result))  // 'success'
  .catch(error => console.log(error));

// 如果全部失败
Promise.any([Promise.reject(1), Promise.reject(2)])
  .catch(error => console.log(error));  // AggregateError
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
