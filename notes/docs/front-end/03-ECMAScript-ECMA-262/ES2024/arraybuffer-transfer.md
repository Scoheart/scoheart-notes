# ArrayBuffer Transfer

> ECMAScript 2024 (ES15)

ArrayBuffer 的转移和调整大小。

```javascript
const buffer = new ArrayBuffer(8);

// 转移所有权(原 buffer 变为 detached)
const transferred = buffer.transfer();

// 调整大小
const resized = buffer.transfer(16);  // 扩展到 16 字节

console.log(buffer.byteLength);       // 0 (已分离)
console.log(transferred.byteLength);  // 8
console.log(resized.byteLength);      // 16
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer)
