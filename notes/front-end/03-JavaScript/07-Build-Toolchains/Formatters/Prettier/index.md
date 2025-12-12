# Formatters

## Install

pnpm install -D prettier

## Config

```bash
# 创建 prettier 配置文件
touch prettier.config.js

# 写入 prettier 配置
cat <<"EOF" > prettier.config.js
export default {
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "lf",
};
EOF

# 检查代码格式
npx prettier --check /path/to/xxx.js

# 格式化代码
npx prettier --write /path/to/xxx.js
```
