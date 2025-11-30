# Promise.withResolvers()

> ECMAScript 2024 (ES15)

更方便地创建和控制 Promise。

```javascript
// 旧方式
let resolve, reject;
const promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// 新方式
const { promise, resolve, reject } = Promise.withResolvers();

// 使用
setTimeout(() => resolve('done'), 1000);
promise.then(console.log);  // 'done'
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers)
