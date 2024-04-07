# 原始类型

- string
- number
- boolean

> note: 使用小写与 JavaScript 中的 Built-in 对象区分

```ts
let str: string;
let num: number;
let bool: boolean;
```

# 数组

```ts
let num_arr: number[];
let str_arr: string[];
let bool_arr: boolean[];

let arr_gen: Array<T>;
```

# any

> note: complierOption: noImplicitAny

```ts
let a;
```

# function

函数的类型有两点

- parameters type
- return type

匿名函数

- contextual typing

# object

"," 和 ";" 都可以分割对象中的属性

```ts
let obj: {
  x: number;
  y: number;
};

let obj: {
  x: number;
  y: number;
};
```

optional property

```ts
let obj: {
  x: number;
  y?: number;
};
```

# union type

- defining
- working with
  > note: 「值的并集，属性的交集」

```ts
let a: string | number;

let obj: { name: string; fly: string } | { name: string; eat: string };

obj = {
  name: 'cat',
  eat: 'i can eat',
  fly: 'i can fly',
};

// 这里会出错，因为ts不知道obj是哪种类型
// 可以理解为 声明的时候，我们不知道obj具体是什么类型，有可能是能飞的人，也有可能是能吃的人，所以声明的时候可以说他能飞，能吃
// 但是访问的时候，必须确定他是能飞的人还是能吃的人。
obj.eat;
```

# type alias & interface

- extending
- add a new fields

# type assertions 类型断言

```ts
(value as string) < string > value;
```

- 双重断言

# literal type 字面量类型

- 单独字面量
- combining literal to union
- boolean literal

```ts
let a: boolean;

let b: false | true;

let c: typeof b;
```

- literal inference
  字面量类型断言

```ts
as const
```

# null & undefined

- compilerOptions: strictNullCheck
  - 开启：检查 null 和 undefined，会报错
  - 关闭：不检查 null 和 undefined，不会报错，且有方法属性等代码提示
- non-null assertion (!)

```ts
let a: string | null = null;

a!.toUpperCase();
```

# Enums 枚举
枚举不是编译时会呗去除的，而是会遗留到运行时的 typescript 特性

# less commone primitives 不常见原始类型
- bigint
- symbol