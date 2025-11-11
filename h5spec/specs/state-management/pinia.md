# Pinia

- 状态管理 `MUST` 使用 Pinia；版本 `MUST` 固定为：

| Version |
| ------- |
| v2.0.26 |

- Pinia `MUST` 在应用创建时初始化并注入；Store `SHOULD` 按领域拆分、避免跨域耦合。

## 示例初始化

```js
import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);

const pinia = createPinia();
export default pinia;
```

## 示例 Store

```js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ name: "" }),
  actions: {
    setName(n) {
      this.name = n;
    },
  },
});
```
