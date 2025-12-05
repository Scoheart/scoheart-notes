# Try-Catch Exception Handling (异常处理)

> ECMAScript 3 (1999)

## 概述

ES3 引入了结构化的异常处理机制,允许开发者捕获和处理运行时错误。

## 基本语法

```javascript
try {
  // 可能抛出错误的代码
} catch (error) {
  // 处理错误
} finally {
  // 无论是否发生错误都会执行
}
```

## 示例

### 基本用法

```javascript
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error('发生错误:', error.message);
} finally {
  console.log('清理工作');
}
```

### 抛出自定义错误

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  return a / b;
}

try {
  const result = divide(10, 0);
} catch (error) {
  console.error(error.message); // "除数不能为零"
}
```

### 嵌套 try-catch

```javascript
try {
  try {
    throw new Error('内部错误');
  } catch (innerError) {
    console.log('捕获内部错误:', innerError.message);
    throw new Error('外部错误');
  }
} catch (outerError) {
  console.log('捕获外部错误:', outerError.message);
}
```

## Error 对象

```javascript
const error = new Error('错误信息');
console.log(error.name);    // "Error"
console.log(error.message); // "错误信息"
```

## 内置错误类型

- `Error` - 通用错误
- `SyntaxError` - 语法错误
- `ReferenceError` - 引用错误
- `TypeError` - 类型错误
- `RangeError` - 范围错误
- `URIError` - URI 错误
- `EvalError` - eval() 错误

## 参考资料

- [MDN - try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
