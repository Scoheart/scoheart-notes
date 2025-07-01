---
theme: smartblue
---

# HTTP 缓存

## 什么是 HTTP cache

> An HTTP "cache" is a local store of response messages and the subsystem that controls storage, retrieval, and deletion of messages in it. A cache stores cacheable responses to reduce the response time and network bandwidth consumption on future equivalent requests. Any client or server MAY use a cache, though not when acting as a tunnel.

以上来自 RFC 9111 中关于 HTTP cache 的定义。

简而言之，HTTP 缓存是一种将响应存储于本地，提供复用的机制，它可以减少响应时间并节省网络带宽。

## HTTP cache 的分类

> A "shared cache" is a cache that stores responses for reuse by more than one user; shared caches are usually (but not always) deployed as a part of an intermediary. A "private cache", in contrast, is dedicated to a single user; often, they are deployed as a component of a user agent.

根据 RFC 9111 中所述，HTTP cache 可以分为两大类：

- Shared cache （共享缓存， 可以被多个用户共享）
- Private cache （私有缓存， 只能被单个用户使用）

我们暂且不讨论共享缓存和私有缓存的区别。先熟知一些基本的概念。

## 新鲜 / 过期

被缓存的 HTTP 响应拥有两种状态：**新鲜**（fresh）和 **过期**（stale）。

新鲜状态意味着该响应仍属有效且可复用；而过期状态则表明该响应已过期不可复用。

## 新鲜度寿命 / 当前年龄

**新鲜度寿命**（freshness_lifetime），是指响应从创建到过期的时间。

**当前年龄**（current_age），是指响应从创建到当前的时间。

所以，当响应的当前年龄小于新鲜度寿命时，该响应处于新鲜状态；当响应的当前年龄大于新鲜度寿命时，该响应处于过期状态。

这也对应着 RFC 9111 中关于响应新鲜状态的定义：

$$
\mathit{response\_is\_fresh} 
= \bigl(\mathit{freshness\_lifetime} > \mathit{current\_age}\bigr)
$$

两者的值，不严格的来说，可以按照以下方式计算。

**新鲜度寿命**（freshness_lifetime）可以由以下因素决定：

- 响应头中的 Cache-Control 字段中的 s-maxage 的值
- 响应头中的 Cache-Control 字段中的 max-age 的值
- 响应头中的 Expires 字段的值

**当前年龄**（current_age）可以通过以下因素计算：

- 响应头中的 Date 字段
- 响应头中的 Age 字段

### Expires vs. max-age

**Expires** 和 **Cache-Control: max-age** 都用来指明缓存的新鲜度寿命。

**Expires** 响应头通过指定一个确切的时间点来定义缓存的新鲜度寿命。然而，由于其时间格式解析困难、实践中发现了诸多实现缺陷，且人为修改系统时钟可能导致缓存紊乱，因此，在 HTTP/1.1 的 **Cache-Control** 头部中采用了 **max-age** ——通过设定缓存时长（即一个相对的时间间隔）来解决上述问题。

当响应中同时存在 **Expires** 头和 **Cache-Control: max-age** 时，标准明确规定应优先采用 **max-age** 的值。并且鉴于 HTTP/1.1 已被广泛采用，如今也确实没有必要再特意设置 **Expires** 响应头。

## 示例

### 文本示例

仅仅提炼概念比较抽象，举个🌰例子，来方便理解。

假设我们第一次发起一个 HTTP 请求，服务器返回了一个响应，它的响应头如下：

``` http
HTTP/1.1 200 OK
Date: Mon, 30 Jun 2025 05:00:00 GMT
Cache-Control: max-age=60
```

由于该响应触发了 HTTP 缓存机制，因此该响应被缓存至本地来提供复用。

缓存的响应的 **新鲜度寿命**（freshness_lifetime）和 **当前年龄**（current_age），可以通过以下方式计算。

$$
\mathit{freshness\_lifetime}
= \mathit{max\text{-}age}
$$

$$
\mathit{current\_age} 
= \mathit{now} - \mathit{Date}
$$

---

假设我们第二次发起请求时，当前时间为 `Mon, 30 Jun 2025 05:00:05 GMT` ，那么缓存的响应的 **新鲜度寿命**（freshness_lifetime）和 **当前年龄**（current_age），可如下计算得出：

$$
\begin{align*}
\mathit{freshness\_lifetime}
&= \mathit{max\text{-}age} \\
&= 60s
\end{align*}
$$

$$
\begin{align*}
\mathit{current\_age} 
&= \mathit{now} - \mathit{Date} \\
&= \text{Mon, 30 Jun 2025 05:00:05 GMT} - \text{Mon, 30 Jun 2025 05:00:00 GMT} \\
&= 5s
\end{align*}
$$

该响应的 **新鲜度寿命**（freshness_lifetime）为 60 秒，**当前年龄**（current_age）为 5 秒。

$$
\begin{align*}
\mathit{response\_is\_fresh} 
&= \bigl(\mathit{freshness\_lifetime} > \mathit{current\_age}\bigr) \\
&= \bigl(60s > 5s\bigr) \\
&= true
\end{align*}
$$

***由响应新鲜状态的公式可知，第二次请求时，缓存的响应处于新鲜状态，可以直接复用这个响应，而不需要重新向服务器发起请求获取新的响应。***

---

假设后续的某一次请求时间为 `Mon, 30 Jun 2025 05:01:00 GMT` ，那么该响应的 **新鲜度寿命**（freshness_lifetime）和 **当前年龄**（current_age）可如下计算：

$$
\begin{align*}
\mathit{freshness\_lifetime}
&= \mathit{max\text{-}age} \\
&= 60s
\end{align*}
$$

$$
\begin{align*}
\mathit{current\_age} 
&= \mathit{now} - \mathit{Date} \\
&= \text{Mon, 30 Jun 2025 05:01:00 GMT} - \text{Mon, 30 Jun 2025 05:00:00 GMT} \\
&= 60s
\end{align*}
$$

该响应的 **新鲜度寿命**（freshness_lifetime）为 60 秒，**当前年龄**（current_age）也为 60 秒。

$$
\begin{align*}
\mathit{response\_is\_fresh} 
&= \bigl(\mathit{freshness\_lifetime} > \mathit{current\_age}\bigr) \\
&= \bigl(60s > 60s\bigr) \\
&= false
\end{align*}
$$

***此时，上面响应新鲜状态的公式不成立，即为：***

$$
\begin{align*}
\mathit{freshness\_lifetime}
&== \mathit{current\_age} \\
\end{align*}
$$

***所以，缓存中的响应处于过状态，不可以被复用，需要重新向服务器发起请求。***

### 代码示例

接下来，我们继续通过代码💻示例，来加深理解。

首先，我们可以通过 nodejs/golang 等语言创建一个最基本的 HTTP 服务。并且使其响应能触发 HTTP 缓存机制。

``` js
import http from "http";

const server = http.createServer((req, res) => {
    res.setHeader("Cache-Control", "max-age=60");
    res.end("Hello World - Nodejs");
});

server.listen(3300, () => {
    console.log("Server is running on http://localhost:3300");
});
```

``` golang
package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "max-age=60")
		w.Write([]byte("Hello World - Golang"))
	})

	http.ListenAndServe(":3300", nil)

	log.Println("Server is running on http://localhost:3300")
}
```

启动服务后，我们可以在浏览器中访问 `http://localhost:3300` ，并查看响应头。我们获取到响应头大致如下（以 Nodejs 为例）：

``` http
HTTP/1.1 200 OK
Cache-Control: max-age=60
Date: Mon, 30 Jun 2025 19:31:11 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 20
```

![第一次请求](https://raw.githubusercontent.com/Scoheart/scoheart-notes/main/assets/408/network/http/http-caching/1st.png)

由于触发 HTTP 缓存机制，因此该响应被缓存至本地来提供复用。

那么如果我们在 60 秒内再次访问 `http://localhost:3300`，依据之前介绍过的公式：

$$
\mathit{response\_is\_fresh} 
= \bigl(\mathit{freshness\_lifetime} > \mathit{current\_age}\bigr)
$$

可以得出缓存的响应处于新鲜状态，可以直接复用这个响应，而不需要重新向服务器发起请求获取新的响应。

我们可以从 **Network** 面板中看到，第二次请求的 **Transferred** 为 cached 状态，即复用了缓存的响应。

![第二次请求](https://raw.githubusercontent.com/Scoheart/scoheart-notes/main/assets/408/network/http/http-caching/2nd.png)       

然而，如果我们在 60 秒后再次访问 `http://localhost:3300`，那么同理可得出，此时缓存的响应处于过期状态，不可以被复用，需要重新向服务器发起请求。

我们也可以从 **Network** 面板中看到，第三次请求的 **Transferred** 为 170 B，即重新向服务器发起请求获取新的响应。

![第三次请求](https://raw.githubusercontent.com/Scoheart/scoheart-notes/main/assets/408/network/http/http-caching/3rd.png)       

## 验证机制 —— 过期不代表完全失效

当缓存的响应处于过期状态时，不代表该响应完全失效。

当一个缓存的响应变为 **过期**（stale）之后，缓存系统并不会立刻丢弃它，而是可以尝试通过 **验证**（Validation）机制来“刷新”这份响应，使其重新变为可用的**新鲜**（fresh）状态。

验证机制有两种 **验证器**（validator）：

- **Last-Modified**
- **ETag**

> Validation is done by using a conditional request that includes an If-Modified-Since or If-None-Match request header.

要实现验证机制，需要客户端构造一个**条件请求**（conditional request），其中包含 **If-Modified-Since** 或 **If-None-Match** 请求头字段。

### Last-Modified 验证

假设我们第一次请求时，服务器返回的响应如下：

``` http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600

<!doctype html>
…
```

由于 HTTP 缓存机制，该响应被缓存至本地来提供复用。并且根据第一次请求的响应头，我们可以计算出缓存的响应的 **新鲜度寿命**（freshness_lifetime）为 3600 秒。

$$
\begin{align*}
\mathit{freshness\_lifetime}
&= \mathit{max\text{-}age} \\
&= 3600s
\end{align*}
$$

假设我们第二次请求时，当前时间为 `Tue, 22 Feb 2022 23:22:22 GMT` ，那么缓存的响应的 **当前年龄**（current_age）为 3600 秒。

$$
\begin{align*}
\mathit{current\_age} 
&= \mathit{now} - \mathit{Date} \\
&= \text{Tue, 22 Feb 2022 23:22:22 GMT} - \text{Tue, 22 Feb 2022 22:22:22 GMT} \\
&= 3600s
\end{align*}
$$

那么，缓存的响应的 **新鲜度寿命**（freshness_lifetime）等于 **当前年龄**（current_age），即：
$$
\mathit{freshness\_lifetime}
== \mathit{current\_age}
$$

于是，因为缓存的响应的 **新鲜度寿命**（freshness_lifetime）等于 **当前年龄**（current_age），所以缓存的响应处于 **过期**（stale）状态，不可以被复用，需要重新向服务器发起请求。

但此时，由于缓存的响应在返回的时候，提供了 **Last-Modified** 验证器，所以客户端会构造一个**条件请求**（conditional request）发往原始服务器，同时请求头中包含一个 **If-Modified-Since** 字段，值为缓存的响应的 **Last-Modified** 验证器的值。向服务器查询自指定时间（**Last-Modified**）以来是否有任何更改。

如果内容自指定时间以来未更改，则服务器会返回一个 **304 状态码** 的响应。并且这个响应仅仅包含响应头，不包含响应体，它用来通知缓存系统，缓存的响应仍然有效，可以复用。于此同时，缓存系统会刷新缓存的响应的状态，将其重新变为可复用的**新鲜**（fresh）状态。

如果内容自指定时间以来已更改，则服务器会返回一个 **200 状态码** 的响应。这个响应就是全新的响应。

### ETag 验证

ETag 和 Last-Modified 的流程大致相同，只是验证器的切换。这里不再赘述。

### 强制验证

当服务器将响应头中的 **Cache-Control** 字段的值设置为 **no-cache** 时，表示服务器告知任何缓存，在未与源服务器验证并得到成功响应之前，不得将该响应用于后续请求，即不可以直接复用缓存的响应。

也就是说缓存可以存储该响应，但每次重用前都必须向源服务器验证。

例如，我们第一次请求时，服务器返回的响应如下：

``` http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
ETag: "deadbeef"
Cache-Control: no-cache

<!doctype html>
…
```

由于 HTTP 缓存机制，该响应被缓存至本地来提供复用。但是因为 **Cache-Control** 字段的值为 **no-cache** ，该响应不会被直接复用，而是需要向服务器发起请求验证。

也就是说我们后续的请求，都会向服务器发起请求验证。依据 **Last-Modified** 或 **ETag** 验证器来验证缓存的响应是否仍然有效。验证的流程和上面介绍的一致。

如果请求的资源已更新，客户端将收到 **200 OK** 响应，并且使用新的响应；如果请求的资源未更新，客户端将收到 **304 Not Modified** 响应，同时复用缓存的响应。

***简而言之，普通的验证被用来刷新缓存的响应的新鲜状态，而强制验证则是迫使客户端在复用缓存的响应前，都先向服务器发起条件请求验证缓存响应是否仍然有效。***

## 不缓存

当服务器将响应头中的 **Cache-Control** 字段的值设置为 **no-store** 时，表示服务器告知任何缓存，不得存储该响应，即不可以缓存该响应。

## 再谈验证机制

上述的验证机制，我们只是介绍了由服务器主导的重新验证。即通过服务器设置 **Cache-Control** 字段的值为 **no-cache** ，并且添加**验证器**（validator）—— **Last-Modified/ETag**，来迫使客户端在复用缓存的响应前，都先向服务器发起条件请求验证缓存响应是否仍然有效。

实际上，客户端也可以主动发起重新验证。也就是说，验证机制不仅适用于响应，同样也适用于请求。

浏览器端的重新加载（Reload）与强制重新加载（Force Reload）操作，即是客户端发起验证的典型场景。

### 重新加载（Reload）

为恢复窗口异常或更新至资源最新版本，浏览器为用户提供了**重新加载**（Reload）功能。可以通过点击浏览器工具栏的刷新按钮，或者按下快捷键 `Command + R` （Mac）等操作来触发。

![Reload](https://raw.githubusercontent.com/Scoheart/scoheart-notes/main/assets/408/network/http/http-caching/reload.png)

浏览器重新加载时发送的 HTTP 请求简化示例如下（Chrome、Edge 和 Firefox 的请求结构与下文高度相似；Safari 的请求结构略有差异）：

``` http
GET / HTTP/1.1
Host: example.com
Cache-Control: max-age=0
If-None-Match: "deadbeef"
If-Modified-Since: Tue, 22 Feb 2022 20:20:20 GMT
```

请求中的 **max-age=0** 指令声明 ​​"仅复用生成时间 ≤ 0 秒的响应"​​ —— 这意味着缓存的响应不会被复用。同时通过携带 **If-None-Match** 和 **If-Modified-Since** 请求头，发起 **条件请求**（conditional request），触发服务端验证。验证部分的机制与上文介绍的一致。

Fetch 标准中也定义了此逻辑，可通过下面的代码实现：

``` js
// Note: "reload" is not the right mode for a normal reload; "no-cache" is
fetch("/", { cache: "no-cache" });
```

这里值得注意的一点是，cache 的值为 **no-cache** ，而不是 **reload** 。

### 强制重新加载（Force Reload）

强制重新加载（Force Reload）操作是另一种绕过缓存的方案，按下快捷键 `Command + Shift + R` （Mac）或者显示开启 禁用缓存（Disable Cache）等操作来触发。

![Force Reload](https://raw.githubusercontent.com/Scoheart/scoheart-notes/main/assets/408/network/http/http-caching/force-reload.png)

强制重新加载时发送的 HTTP 请求简化示例如下（Chrome、Edge 和 Firefox 的请求结构与下文高度相似；Safari 的请求结构略有差异）：

``` http
GET / HTTP/1.1
Host: example.com
Pragma: no-cache
Cache-Control: no-cache
``` 

由于这是携带 no-cache 的非条件请求，客户端将始终从源服务器获取 200 OK 响应。

