# Class Static Block

> ECMAScript 2022 (ES13)

类的静态初始化块。

```javascript
class MyClass {
  static value;

  static {
    // 静态初始化代码
    this.value = this.compute();
  }

  static compute() {
    return 42;
  }
}

console.log(MyClass.value);  // 42
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks)
