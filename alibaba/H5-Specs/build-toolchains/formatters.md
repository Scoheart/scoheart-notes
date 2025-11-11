# Formatters

- 代码格式化 `MUST` 使用 Prettier，并在 CI 中 `MUST` 以只读模式校验（`prettier --check .`）。
- 基线配置 `MUST` 如下；项目可根据需要 `MAY` 细化，但 `MUST NOT` 引入不一致的风格于同一仓库。

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```
