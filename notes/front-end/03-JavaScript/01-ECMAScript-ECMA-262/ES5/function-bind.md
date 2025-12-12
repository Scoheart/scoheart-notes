# Function.prototype.bind()

> ECMAScript 5 (2009)

## 概述

`bind()` 方法创建一个新函数,在调用时将 `this` 关键字设置为提供的值,并在调用新函数时将给定的参数序列放在任何提供的参数之前。

## 基本语法

```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

## 示例

### 绑定 this

```javascript
const person = {
  name: 'Alice',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

person.greet(); // "Hello, I'm Alice"

const greet = person.greet;
greet(); // "Hello, I'm undefined" (this 丢失)

const boundGreet = person.greet.bind(person);
boundGreet(); // "Hello, I'm Alice"
```

### 偏函数应用(Partial Application)

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
console.log(double(10)); // 20

const triple = multiply.bind(null, 3);
console.log(triple(5)); // 15
```

### 事件处理器中保持 this

```javascript
class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
  }

  handleClick() {
    this.clickCount++;
    console.log(`${this.label} clicked ${this.clickCount} times`);
  }

  attachTo(element) {
    // 绑定 this 以保持正确的上下文
    element.addEventListener('click', this.handleClick.bind(this));
  }
}

const button = new Button('Submit');
// button.attachTo(document.querySelector('#submit-btn'));
```

### 定时器中的 this

```javascript
const module = {
  x: 42,
  getX() {
    return this.x;
  }
};

// 错误:this 丢失
setTimeout(module.getX, 1000); // undefined

// 正确:使用 bind 绑定 this
setTimeout(module.getX.bind(module), 1000); // 42
```

## 实际应用

### 1. 创建预设参数的函数

```javascript
function log(level, message) {
  console.log(`[${level}] ${message}`);
}

const info = log.bind(null, 'INFO');
const error = log.bind(null, 'ERROR');
const warn = log.bind(null, 'WARN');

info('Application started');   // [INFO] Application started
error('Something went wrong'); // [ERROR] Something went wrong
warn('Low memory');            // [WARN] Low memory
```

### 2. 柯里化(Currying)

```javascript
function add(a, b, c) {
  return a + b + c;
}

const add5 = add.bind(null, 5);
const add5and10 = add5.bind(null, 10);

console.log(add5and10(15)); // 30
```

### 3. 转换 arguments 为数组

```javascript
function example() {
  const slice = Array.prototype.slice;
  const args = slice.call(arguments);

  // 或使用 bind
  const toArray = slice.bind(Array.prototype);
  const args2 = toArray(arguments);

  console.log(args);
  console.log(args2);
}

example(1, 2, 3); // [1, 2, 3]
```

### 4. 防抖函数中保持上下文

```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const obj = {
  value: 42,
  getValue() {
    console.log(this.value);
  }
};

// 保持 this 上下文
const debouncedGetValue = debounce(obj.getValue.bind(obj), 300);
debouncedGetValue(); // 300ms 后输出: 42
```

### 5. 简化回调函数

```javascript
const numbers = [1, 2, 3, 4, 5];

// 不使用 bind
const doubled1 = numbers.map(function(num) {
  return this.multiplier * num;
}, { multiplier: 2 });

// 使用 bind
const context = { multiplier: 2 };
const doubled2 = numbers.map(function(num) {
  return this.multiplier * num;
}.bind(context));

console.log(doubled2); // [2, 4, 6, 8, 10]
```

### 6. React 类组件中的方法绑定

```javascript
class MyComponent {
  constructor() {
    this.state = { count: 0 };
    // 在构造函数中绑定
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return {
      type: 'button',
      props: {
        onClick: this.handleClick,
        children: `Clicked ${this.state.count} times`
      }
    };
  }
}
```

## 与 call/apply 的区别

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'Alice' };

// call: 立即调用
console.log(greet.call(person, 'Hello', '!'));
// "Hello, Alice!"

// apply: 立即调用,参数为数组
console.log(greet.apply(person, ['Hi', '.']));
// "Hi, Alice."

// bind: 返回新函数,不立即调用
const boundGreet = greet.bind(person, 'Hey');
console.log(boundGreet('?'));
// "Hey, Alice?"
```

## Polyfill

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    const aArgs = Array.prototype.slice.call(arguments, 1);
    const fToBind = this;
    const fNOP = function() {};
    const fBound = function() {
      return fToBind.apply(
        this instanceof fNOP ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };

    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

## 注意事项

1. `bind()` 返回的是新函数,不会修改原函数
2. 多次 `bind()` 只有第一次有效
3. 箭头函数不能使用 `bind()` 改变 `this`
4. 绑定后的函数不能作为构造函数使用

```javascript
// 多次 bind 只有第一次有效
function test() {
  console.log(this.value);
}

const obj1 = { value: 1 };
const obj2 = { value: 2 };

const bound = test.bind(obj1).bind(obj2);
bound(); // 1 (使用 obj1,不是 obj2)

// 箭头函数的 this 不能改变
const arrow = () => console.log(this);
const boundArrow = arrow.bind({ value: 42 });
boundArrow(); // this 仍然是定义时的上下文
```

## 性能考虑

```javascript
// 不推荐:每次渲染都创建新函数
class Component {
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Click me
      </button>
    );
  }
}

// 推荐:在构造函数中绑定一次
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

## 参考资料

- [MDN - Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
