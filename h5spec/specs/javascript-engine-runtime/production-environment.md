# Production Environment 生产环境

生产环境中的静态资源，`MUST` 被部署在阿里云 OSS 对象存储，用户可以通过任何客户端访问到项目，经阿里云 CDN (Swift/Tengine) 缓存分发，最终到达用户客户端。

## Browserslist

生产环境中，项目 `MUST` 支持符合 Browserslist 中 `[production]` 部分的浏览器版本。

```
# .browserslistrc

[production]
# 同代下限：以 Android 5.0（2014-11）为锚点
# 桌面
chrome >= 38
firefox >= 32
safari >= 8
edge >= 12

# 移动
and_chr >= 38       # Chrome for Android（与 Lollipop 同时代）
ios_saf >= 8
samsung >= 2
opera >= 25
op_mob >= 25

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
```
