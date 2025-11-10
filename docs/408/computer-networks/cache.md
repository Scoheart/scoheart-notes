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

```bash
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

## nextjs

Cache-Control: max-age=3600, stale-while-revalidate=600

- max-age=3600 表示缓存内容在 3600 秒（1 小时）内是新鲜的，可以直接使用。

- stale-while-revalidate=600 在超过 max-age 后的 600 秒内，即使缓存过期了，仍然可以使用这份内容，同时客户端会异步向服务器请求最新的资源。

### 缓存状态

1. 缓存仍在有效期内（未过期）客户端直接从缓存中获取内容，不会与服务器通信。

2. 缓存过期，但在 stale-while-revalidate 窗口内，客户端立即使用过期缓存提供内容。同时在后台发送一个异步请求，向服务器获取最新资源并更新缓存。然后再下一次请求时，就会拉取最新的资源。

3. 缓存过期且超过 stale-while-revalidate 窗口，客户端不使用缓存，直接向服务器请求最新内容。

``` tsx
export const revalidate = 20; // invalidate every hour

export default async function Page() {
  console.log('revalidate', new Date().toISOString());
  const data = await fetch('http://localhost:3005/api/posts/1');
  const posts = await data.json();
  return (
    <main>
      <h1>{posts.title}</h1>
      <p>{posts.content}</p>
      <p>{posts.createdAt}</p>
      <p>{posts.updatedAt}</p>
      <p>{posts.author}</p>
    </main>
  );
}
```
