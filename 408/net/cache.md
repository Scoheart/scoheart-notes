# 缓存

## Heuristic caching

如果没有设置 Cache-Control 字段，浏览器会根据响应头中的其他字段来决定是否缓存资源。

## network 工具查看

1. 具体请求字段

```http
Request URL: http://localhost:3002/force-cache
Request Method: GET
Status Code: 200 OK (from disk cache)
Remote Address: [::1]:3002
Referrer Policy: strict-origin-when-cross-origin
```

Status Code: 200 OK (from disk cache) 这一行表示请求的资源是从磁盘缓存中获取的，而不是从服务器获取的。

2. size 字段 和 Status 字段

- size 字段如果来自缓存会显示 `from disk cache`
- Status 字段如果来自缓存会显示是 灰色

## Etag

``` bash
client（first request）

server （response）
    Last-Modified
    Etag

---------
client（second request）
    If-None-Match
    If-Modified-Since

server （response） 
    Last-Modified
    Etag


如果资源没有发生变化，返回 304，这里不处理返回 304 的话，浏览器不会从缓存中获取资源
如果资源发生变化，返回 200，并且返回新的资源
```
