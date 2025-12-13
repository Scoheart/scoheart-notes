```bash
npm install @vitejs/plugin-vue

cat <<"EOF" > vite.config.js
import vue3 from "@vitejs/plugin-vue"

export default {
  plugin: [vue3()]
}
```
