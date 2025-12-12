# ESLint

## Install

pnpm install -D eslint

## Config

```bash
# 创建 eslint 配置文件
touch eslint.config.js

cat <<"EOF" > eslint.config.js
export default [
  {
    files: ["src/**/*.{js,cjs,ts}"],
    ignores: ["./node_modules/**/*", "./dist/**/*"],
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "no-const-assign": "error",
      "no-debugger": "error",
      "no-use-before-define": "error",
      "no-undef": "error",
    },
    languageOptions: {
      globals: {
        window: "readonly",
        console: "readonly",
        var1: "readonly",
      },
    },
  },
];

EOF

# 检查代码格式
```
