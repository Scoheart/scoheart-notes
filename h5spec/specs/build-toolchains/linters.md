# Linters

## ESLint

- JavaScript/TypeScript 代码质量检查 `MUST` 使用 ESLint，并与 Prettier `MUST` 集成以消除风格冲突。
- Vue 2 项目 `MUST` 启用 `eslint-plugin-vue` 的推荐规则集；环境与解析器选项 `MUST` 明确。
- CI 中 `MUST` 执行 `eslint .` 并且不得有错误；警告 `SHOULD` 控制在团队约定阈值之内。

示例基线（可按项目 `MAY` 调整）：

```js
import eslintPluginVue from "eslint-plugin-vue";
import js from "@eslint/js";
import globals from "globals";

globals.amap = {
  AmapApp: "readonly",
};

export default [
  // 忽略构建产物
  {
    ignores: ["dist/**", "coverage/**", "**/*.min.js", "node_modules/**"],
  },
  // javascript
  {
    files: ["src/**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.amap },
    },
    ...js.configs.recommended,
  },
  // vue
  ...eslintPluginVue.configs["flat/vue2-recommended"],
  // 检查 src 目录下的 Vue 文件
  // ...eslintPluginVue.configs['flat/recommended'].map((config) => ({
  //   ...config,
  //   files: ['src/**/*.vue'],
  // })),
];
```

## Stylelint

- 样式代码检查 `SHOULD` 使用 Stylelint，并 `SHOULD` 采用 `stylelint-config-standard` 与 `stylelint-config-recess-order`；与 CSS 章节的属性顺序规范保持一致。
