# Compiler/Transpiler

- 代码兼容性 `MUST` 通过编译/转译实现；工具 `MAY` 在 Babel 与 SWC 中选用其一，但同一项目 `MUST` 统一。
- 目标环境 `MUST` 以 `.browserslistrc` 的 `[production]` 为准；polyfill 策略 `SHOULD` 采用"按需注入"。

## Babel 基线示例

```json
{
  "presets": [["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }]]
}
```

## SWC 基线示例

```json
{
  "jsc": { "target": "es2019" },
  "env": { "targets": "defaults" }
}
```
