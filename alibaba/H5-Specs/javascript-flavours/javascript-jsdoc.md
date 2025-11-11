# JavaScript + JSDoc + tsc + `@/types/*.d.ts`

未使用 TypeScript 的项目 `MUST` 通过 JSDoc + `tsc` 实现项目级类型检查；公共类型 `MUST` 手工维护于 `@/types/*.d.ts` 并作为单一可信源。

## 文件级类型检查

文件级类型检查 `MUST` 使用 `@ts-check`；`MUST NOT` 使用 `@ts-nocheck`（除非有记录的豁免与到期日）。

## 项目级类型检查

项目级类型检查 `MUST` 使用 `tsconfig.json` 配置文件。

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "skipLibCheck": true,
    "types": [],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/types/*": ["types/*"]
    }
  },
  "include": ["src/**/*", "types/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 类型模型目录（`@/types/*.d.ts`）

- 所有公共类型 `MUST` 集中在 `types/`（例如 `types/index.d.ts`、`types/env.d.ts`、`types/components.d.ts`）。
- 文件 `MUST` 为模块化声明（使用 `export`/`import`），避免全局污染；如需扩展全局，`MUST` 使用 `declare global` 并以 `export {}` 结尾。
- 大型项目 `SHOULD` 按业务域拆分类型文件，并通过 `types/index.d.ts` 统一导出聚合。

```ts
// types/index.d.ts
export interface User {
  id: string;
  active?: boolean;
}
export type Result<T> = { ok: true; data: T } | { ok: false; error: Error };

declare global {
  interface Window {
    APP_VERSION: string;
  }
}
export {};
```

```ts
// types/env.d.ts
export interface BuildMeta {
  commit: string;
  date: string;
}
```

## JSDoc 用法

```javascript
// @ts-check

/** @typedef {import('@/types').User} User */

/**
 * 根据用户激活状态生成标签
 * @param {User} user
 * @returns {string}
 */
export function label(user) {
  return user.active === true ? `active:${user.id}` : `inactive:${user.id}`;
}

/**
 * 列表计数（泛型）
 * @template T
 * @param {T[]} list
 * @returns {number}
 */
export const count = (list) => list.length;
```
