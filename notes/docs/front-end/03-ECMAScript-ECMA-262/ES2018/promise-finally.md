# Promise.prototype.finally()

> ECMAScript 2018 (ES9)

无论 Promise 成功或失败都会执行的回调。

```javascript
fetch('/api/data')
  .then(response => response.json())
  .catch(error => console.error(error))
  .finally(() => {
    console.log('请求完成');
    hideLoadingSpinner();
  });
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)
