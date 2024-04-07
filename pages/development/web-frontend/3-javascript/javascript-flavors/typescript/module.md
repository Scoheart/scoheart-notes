#

## 导出

- Standard JavaScript syntax
- TypeScript-specific syntax
  - Type aliases
  - interfaces
  - enums
  - namespaces

导出的 Type aliases 和 interface 不能直接通过成员运算符 .出来，只能用在 类型定义后面

```ts
import * as mod from './module.js';
mod.f();
mod.SomeType; // Property 'SomeType' does not exist on type 'typeof import("./module.js")'
let x: mod.SomeType; // Ok
```

## Type-only

1. typescript 默认忽略用在类型的导入导出，人话就是它会在编译完成的阶段把 import type 这样的语句给他删除调, 但是可以通过 type 显式的触发这个行为
2. 一个值类型也可以通过 type 导入，只需要把其通过 typeof 之后用在类型定义的地方就行
3. type 不能同时声明 default 导入和 named 导入，可以分开写 或者 通过 default as xxx

## import Types




## 
- Scripts and modules in JavaScript
  - Scripts
  - Module
    - ESM
    - CJS


## esModuleInterOp
提供 CJS 和 ESM 的互操作性








