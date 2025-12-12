# Object.defineProperty() / Object.defineProperties()

> ECMAScript 5 (2009)

## 概述

ES5 引入了 `Object.defineProperty()` 和 `Object.defineProperties()` 方法,允许精确地添加或修改对象的属性。

## Object.defineProperty()

### 基本语法

```javascript
Object.defineProperty(obj, prop, descriptor)
```

### 属性描述符类型

#### 数据描述符

```javascript
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'Alice',           // 属性值
  writable: true,           // 是否可写
  enumerable: true,         // 是否可枚举
  configurable: true        // 是否可配置
});

console.log(obj.name); // "Alice"
```

#### 访问器描述符

```javascript
const obj = {
  _age: 25
};

Object.defineProperty(obj, 'age', {
  get() {
    console.log('Getting age');
    return this._age;
  },
  set(value) {
    console.log('Setting age');
    if (value < 0) {
      throw new Error('Age cannot be negative');
    }
    this._age = value;
  },
  enumerable: true,
  configurable: true
});

console.log(obj.age); // Getting age, 25
obj.age = 30;         // Setting age
```

### 属性特性详解

#### writable

```javascript
const obj = {};

Object.defineProperty(obj, 'readonly', {
  value: 'Cannot change',
  writable: false
});

obj.readonly = 'New value'; // 静默失败(严格模式下抛出错误)
console.log(obj.readonly);  // "Cannot change"
```

#### enumerable

```javascript
const obj = { visible: 'yes' };

Object.defineProperty(obj, 'hidden', {
  value: 'no',
  enumerable: false
});

console.log(Object.keys(obj));        // ["visible"]
console.log(obj.hidden);              // "no"

for (const key in obj) {
  console.log(key); // 只输出 "visible"
}
```

#### configurable

```javascript
const obj = {};

Object.defineProperty(obj, 'permanent', {
  value: 'Fixed',
  configurable: false
});

// 不能删除
delete obj.permanent;
console.log(obj.permanent); // "Fixed"

// 不能重新定义
try {
  Object.defineProperty(obj, 'permanent', {
    enumerable: true
  });
} catch (e) {
  console.error(e); // TypeError
}
```

## Object.defineProperties()

同时定义多个属性。

### 基本语法

```javascript
Object.defineProperties(obj, {
  property1: descriptor1,
  property2: descriptor2,
  // ...
})
```

### 示例

```javascript
const person = {};

Object.defineProperties(person, {
  firstName: {
    value: 'John',
    writable: true,
    enumerable: true
  },
  lastName: {
    value: 'Doe',
    writable: true,
    enumerable: true
  },
  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      const parts = value.split(' ');
      this.firstName = parts[0];
      this.lastName = parts[1];
    },
    enumerable: true,
    configurable: true
  }
});

console.log(person.fullName); // "John Doe"
person.fullName = 'Jane Smith';
console.log(person.firstName); // "Jane"
console.log(person.lastName);  // "Smith"
```

## 实际应用

### 1. 实现观察者模式

```javascript
function createObservable(obj) {
  const observers = [];

  return Object.keys(obj).reduce((acc, key) => {
    let value = obj[key];

    Object.defineProperty(acc, key, {
      get() {
        return value;
      },
      set(newValue) {
        const oldValue = value;
        value = newValue;
        observers.forEach(fn => fn(key, oldValue, newValue));
      },
      enumerable: true
    });

    return acc;
  }, {
    observe(fn) {
      observers.push(fn);
    }
  });
}

const state = createObservable({ count: 0 });

state.observe((key, oldVal, newVal) => {
  console.log(`${key} changed from ${oldVal} to ${newVal}`);
});

state.count = 1; // "count changed from 0 to 1"
state.count = 2; // "count changed from 1 to 2"
```

### 2. 创建常量对象

```javascript
function createConstants(obj) {
  const constants = {};

  Object.keys(obj).forEach(key => {
    Object.defineProperty(constants, key, {
      value: obj[key],
      writable: false,
      configurable: false,
      enumerable: true
    });
  });

  return constants;
}

const CONFIG = createConstants({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000
});

CONFIG.API_URL = 'https://malicious.com'; // 无法修改
console.log(CONFIG.API_URL); // "https://api.example.com"
```

### 3. 实现私有属性

```javascript
function Person(name) {
  let _name = name; // 私有变量

  Object.defineProperty(this, 'name', {
    get() {
      return _name;
    },
    set(value) {
      if (typeof value !== 'string') {
        throw new TypeError('Name must be a string');
      }
      _name = value;
    },
    enumerable: true
  });
}

const person = new Person('Alice');
console.log(person.name); // "Alice"

person.name = 'Bob'; // OK
console.log(person.name); // "Bob"

try {
  person.name = 123; // TypeError
} catch (e) {
  console.error(e.message);
}
```

### 4. 延迟计算属性

```javascript
const obj = {
  items: [1, 2, 3, 4, 5]
};

Object.defineProperty(obj, 'sum', {
  get() {
    console.log('Calculating sum...');
    return this.items.reduce((a, b) => a + b, 0);
  },
  enumerable: true
});

console.log(obj.sum); // Calculating sum... 15
console.log(obj.sum); // Calculating sum... 15 (每次访问都重新计算)
```

### 5. 属性验证

```javascript
function createValidatedObject(schema) {
  const obj = {};

  Object.keys(schema).forEach(key => {
    const validator = schema[key];
    let value;

    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set(newValue) {
        if (!validator(newValue)) {
          throw new Error(`Invalid value for ${key}`);
        }
        value = newValue;
      },
      enumerable: true
    });
  });

  return obj;
}

const user = createValidatedObject({
  age: val => typeof val === 'number' && val >= 0,
  email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
});

user.age = 25;        // OK
user.email = 'test@example.com'; // OK

try {
  user.age = -5;      // Error
} catch (e) {
  console.error(e.message);
}
```

## 默认值

如果不指定描述符的某些属性,其默认值为:

```javascript
{
  value: undefined,
  writable: false,
  enumerable: false,
  configurable: false,
  get: undefined,
  set: undefined
}
```

## 注意事项

1. 数据描述符和访问器描述符不能混用
2. `configurable: false` 后大部分特性不可更改
3. Vue 2.x 的响应式系统基于此实现
4. 不能同时指定 `value`/`writable` 和 `get`/`set`

## 参考资料

- [MDN - Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [MDN - Object.defineProperties()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
