# Tanstack Router

## 下载

```bash
pnpm install --save-dev @tanstack/router-vite-plugin @tanstack/router-devtools @tanstack/react-router
```

## 创建路由树

如果使用 vite 插件，则会在创建路由的时候自动生成路由树，不需要手动创建。

其会生产一个 `routeTree.gen.ts` 文件，里面包含了路由树。这个文件的生产位置可以通过在 vite 插件调用的时候传入一个配置项 `generatedRouteTree` 来指定。

同时也可以在项目的 root dir 创建一个 `tsr.config.json` 文件定制配置。

```ts
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      r,
    }),
  ],
});
```

## 创建一个路由器（根据路由树）

```ts
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';

const router = createRouter({
  routeTree,
});
```
