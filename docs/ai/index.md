
/speckit.constitution Purpose: 以最小复杂度实现一个可扩展的 SSG（Markdown→静态
  HTML），开发期可热预览，生产期一键产出可部署的 dist/。

  Non-negotiables:
  - Node ≥ 20，ESM only；禁止把密钥写入仓库。 
  - 禁用 JS 时也能看到正文（SEO 友好）。
  - 基础 a11y（标题层级/图片 alt/对比度）不可回退

/speckit.specify 通过 Vue + Vite + TS 实现 SSG 框架 (Markdown → Static HTML) ，有开发环境预览、生产环境构建html的功能，可以根据 markdown 文件生成网页，需要有 TOC、代码高亮、Frontmatter等功能，同时提供主题与插件机制


/speckit.plan is running… - Tooling: Vite + Vue 3 + TypeScript（ESM）
- Dev: Vite devServer + 自研 Markdown→HTML 管线（unified/remark/rehype）
- Prod: Vite SSG 对每个路由产出 dist/**/index.html

## Directory
src/
  ssg/
    content.ts      # 扫描 content/**.md + 路由映射
    pipeline.ts     # remark/rehype 管线 + frontmatter 注入
    devPlugin.ts    # Vite 插件（监听 content/**，触发 HMR）
    build.ts        # 生产构建（循环 SSR 渲染）
  theme/
    Layout.vue
content/
public/
scripts/
  ssg.build.mjs     # 调用 build.ts，生成 dist
ssg.config.ts       # defineConfig({ plugins: [] })

## Pipelines
- 扫描 content/**.md + 解析 frontmatter + 代码高亮 + TOC
- 链接/图片重写；图片复制 dist
- 注入 Layout.vue（SSR）输出 dist/**/index.html
- 生成 sitemap.xml/robots.txt，打印页数与体积 