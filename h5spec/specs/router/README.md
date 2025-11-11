# Router

项目路由 `MUST` 使用 Vue Router 3；版本 `MUST` 固定为：

| Version |
| ------- |
| v3.6.5  |

- 路由模式选择（`hash` / `history`）`MUST` 明确；`history` 模式 `MUST` 配合服务端重写规则。
- 路由文件组织 `SHOULD` 模块化（基础路由 + 业务模块路由聚合）；动态加载 `SHOULD` 使用懒加载以优化首屏。

## 示例

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{ path: "/", component: () => import("./pages/Home.vue") }];

export default new VueRouter({
  mode: "hash",
  routes,
});
```
