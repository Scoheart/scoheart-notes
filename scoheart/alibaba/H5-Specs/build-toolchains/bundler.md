# Bundler

## Vite

- 新项目 `MUST` 使用 Vite；现有项目 `SHOULD` 迁移至 Vite 于合适窗口。
- Vite 版本 `MUST` 固定为：

| Version |
| ------- |
| v4.5.3  |

- 配置 `SHOULD` 至少包含 Vue 插件与与兼容性相关的 Legacy 插件；Less 预处理 `MUST` 正确接入。

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // 与 .browserslistrc 保持一致
      targets: ["chrome >= 38", "firefox >= 32", "safari >= 8", "edge >= 12"],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true },
    },
  },
});
```

## Webpack

- 既有项目 `MAY` 保留 Webpack；新项目 `SHOULD NOT` 引入 Webpack，除非有明确技术约束并记录。
- Vue 2 与 Less 的最小可用配置 `SHOULD` 如下（版本与 loader `MUST` 与依赖匹配）：

```js
module.exports = {
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.[jt]sx?$/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
```
