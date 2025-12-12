# Asynchronous Iteration

> ECMAScript 2018 (ES9)

异步迭代器和 for-await-of 循环。

```javascript
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

(async () => {
  for await (const num of asyncGenerator()) {
    console.log(num);  // 1, 2, 3
  }
})();
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
