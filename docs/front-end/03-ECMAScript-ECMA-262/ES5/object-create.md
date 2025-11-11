# Object.create()

> ECMAScript 5 (2009)

## 概述

`Object.create()` 方法创建一个新对象,使用现有的对象作为新创建对象的原型。

## 基本语法

```javascript
Object.create(proto[, propertiesObject])
```

- `proto` - 新创建对象的原型对象
- `propertiesObject` - 可选,要添加到新对象的可枚举属性

## 示例

### 基本用法

```javascript
const person = {
  isHuman: true,
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const alice = Object.create(person);
alice.name = 'Alice';
alice.age = 25;

console.log(alice.isHuman); // true
alice.greet(); // "Hello, I'm Alice"
```

### 创建纯净对象

```javascript
// 没有原型的对象
const pureObject = Object.create(null);
pureObject.name = 'test';

console.log(pureObject.toString); // undefined
console.log(pureObject.hasOwnProperty); // undefined
```

### 使用属性描述符

```javascript
const person = Object.create(Object.prototype, {
  name: {
    value: 'Bob',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
    value: 30,
    writable: false,
    enumerable: true,
    configurable: false
  }
});

console.log(person.name); // "Bob"
console.log(person.age);  // 30

person.name = 'Charlie'; // 可以修改
person.age = 40;         // 不能修改(strict mode 下会报错)

console.log(person.name); // "Charlie"
console.log(person.age);  // 30
```

### 实现继承

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 继承 Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const myDog = new Dog('Max', 'Golden Retriever');
myDog.speak(); // "Max makes a sound"
myDog.bark();  // "Max barks"
```

### 单向数据绑定

```javascript
const base = {
  value: 0,
  getValue() {
    return this.value;
  }
};

const derived = Object.create(base);
derived.value = 10;

console.log(base.getValue());    // 0
console.log(derived.getValue()); // 10
```

## 与对象字面量的区别

```javascript
// 使用 Object.create()
const obj1 = Object.create({ inherited: 'value' });
obj1.own = 'property';

console.log(obj1.inherited);              // "value"
console.log(obj1.hasOwnProperty('own')); // true
console.log(obj1.hasOwnProperty('inherited')); // false

// 使用对象字面量
const obj2 = {
  own: 'property'
};

console.log(obj2.inherited);              // undefined
console.log(obj2.hasOwnProperty('own')); // true
```

## 属性描述符参数

```javascript
const obj = Object.create(Object.prototype, {
  // 数据属性
  property1: {
    value: 'Hello',
    writable: true,
    enumerable: true,
    configurable: true
  },

  // 访问器属性
  property2: {
    get() {
      return this._property2;
    },
    set(value) {
      this._property2 = value.toUpperCase();
    },
    enumerable: true,
    configurable: true
  }
});

obj.property2 = 'world';
console.log(obj.property1); // "Hello"
console.log(obj.property2); // "WORLD"
```

## 使用场景

### 1. 原型继承

```javascript
const vehicle = {
  wheels: 4,
  move() {
    console.log('Moving...');
  }
};

const car = Object.create(vehicle);
car.brand = 'Toyota';
car.move(); // "Moving..."
```

### 2. 创建不含原型污染的对象

```javascript
const config = Object.create(null);
config.apiKey = 'secret';

// 不会有原型链上的方法
console.log(config.toString); // undefined
```

### 3. 实现委托模式

```javascript
const logger = {
  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
};

const errorLogger = Object.create(logger);
errorLogger.log = function(message) {
  console.error(`[ERROR] ${message}`);
};

logger.log('Info message');       // [2024-01-01T00:00:00.000Z] Info message
errorLogger.log('Error occurred'); // [ERROR] Error occurred
```

## Polyfill

```javascript
if (typeof Object.create !== 'function') {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object or null');
    }

    function F() {}
    F.prototype = proto;
    const obj = new F();

    if (propertiesObject !== undefined) {
      Object.defineProperties(obj, propertiesObject);
    }

    return obj;
  };
}
```

## 注意事项

1. `proto` 参数只能是对象或 `null`
2. 第二个参数的格式与 `Object.defineProperties()` 相同
3. 创建的对象继承 proto 的所有属性
4. 使用 `Object.create(null)` 创建的对象没有原型链

## 参考资料

- [MDN - Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
