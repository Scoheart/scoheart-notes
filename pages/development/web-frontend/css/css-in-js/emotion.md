# emotion

## install

### react

```shell
npm install @emotion/react
```

#### vite

```shell
npm install @vitejs/plugin-react @emotion/babel-plugin
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react'
    babel: {
        plugins: ["@emotion/babel-plugin"]
    }
  })]
})
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```
