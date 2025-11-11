# Class Fields

> ECMAScript 2022 (ES13)

类的公共和私有字段。

```javascript
class Counter {
  // 公共字段
  count = 0;

  // 私有字段
  #privateCount = 0;

  increment() {
    this.count++;
    this.#privateCount++;
  }

  getPrivate() {
    return this.#privateCount;
  }
}

const counter = new Counter();
console.log(counter.count);        // 0
console.log(counter.#privateCount); // SyntaxError
console.log(counter.getPrivate()); // 0
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
