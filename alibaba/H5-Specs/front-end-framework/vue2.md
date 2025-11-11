# Vue 2

- 框架选择 `MUST` 为 Vue 2；版本 `MUST` 固定为：

| Version |
| ------- |
| v2.7.16 |

- 入口文件 `MUST` 最小化且显式启用生产提示关闭；运行时构建与模板编译的选择 `MUST` 与构建工具一致（Vite/webpack）。

## 示例入口

```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

## 开发规范

- 单文件组件 `MUST` 使用 `<script>`（或 `<script lang=ts>` 在 TS 项目中）；样式隔离策略 `MUST` 与 CSS 章节保持一致（scoped 或 CSS Modules 二选一）。
- 插件注册与全局资源（组件/指令/过滤器） `SHOULD` 在独立模块集中管理；避免在多处重复注册导致行为不一致。
- 构建产物 `MUST` 遵循浏览器兼容策略；必要时 `SHOULD` 使用 `@vitejs/plugin-legacy` 或 Babel 以满足低版本需求。
