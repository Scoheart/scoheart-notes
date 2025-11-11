# BigInt

> ECMAScript 2020 (ES11)

任意精度的整数。

```javascript
const big1 = 123456789012345678901234567890n;
const big2 = BigInt('123456789012345678901234567890');

console.log(big1 + big2);  // 246913578024691357802469135780n

// 不能与普通数字混合运算
// big1 + 123  // TypeError
big1 + 123n  // OK
```

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
