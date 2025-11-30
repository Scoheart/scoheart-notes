# TypeScript

- `MUST` 使用严格类型检查（`strict: true`）
- `MUST` 开启强制文件名大小写一致性（`forceConsistentCasingInFileNames: true`）。
- 应用项目 `MUST` 仅类型检查（`noEmit: true`），构建与打包交由工具链完成。
- 库项目 `MUST` 产出 `.d.ts` 类型声明，并明确输出目录与模块格式。
- 运行时 `MUST` 对齐最低能力：`target: "ES2020"`；浏览器项目 `MUST` 包含 `DOM` 库。
- 模块解析 `SHOULD` 使用 `NodeNext` 以支持 `exports`/`imports` 字段。

## tsconfig.json - 应用项目

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "types": []
    // "baseUrl": ".",
    // "paths": { "@/*": ["src/*"] }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## tsconfig.json - 库项目

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist/types",
    "composite": true,
    "incremental": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## tsconfig.json - 结构化配置

- `SHOULD` 拆分配置：`tsconfig.base.json`（通用）+ `tsconfig.app.json`（应用）+ `tsconfig.test.json`（测试）。
- 测试环境 `SHOULD` 对齐测试工具：例如 Vitest/Jest 的 `types` 与路径别名；Vue 项目使用 `vue-tsc` 做 SFC 类型检查。
