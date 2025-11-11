# JavaScript Module System

项目中的 JavaScript 代码，`MUST` 使用 ECMAScript Modules (ESM) 系统。

## import 语句

import 语句的使用方法如下所示：

```javascript
// default import
import module from "./module.js";

// named import
import { name } from "./module.js";

// all import
import * as module from "./module.js";

// import as
import { name as alias } from "./module.js";
```

## export 语句

export 语句的使用方法如下所示：

```javascript
// default export
export default function () {
  console.log("Hello, world!");
}

// named export
export function name() {
  console.log("Hello, world!");
}

// all export
export * from "./module.js";

// export as
export { name as alias } from "./module.js";
```
