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

![Nodejs 响应头](./1st.png)

由于触发 HTTP 缓存机制，因此该响应被缓存至本地来提供复用。

那么如果我们在 60 秒内再次访问 `http://localhost:3300`，依据之前介绍过的公式：

$$
\mathit{response\_is\_fresh} 
= \bigl(\mathit{freshness\_lifetime} > \mathit{current\_age}\bigr)
$$

可以得出缓存的响应处于新鲜状态，可以直接复用这个响应，而不需要重新向服务器发起请求获取新的响应。

我们可以从 **Network** 面板中看到，第二次请求的 **Transferred** 为 cached 状态，即复用了缓存的响应。

![Nodejs 响应头](./2nd.png)

然而，如果我们在 60 秒后再次访问 `http://localhost:3300`，那么同理可得出，此时缓存的响应处于过期状态，不可以被复用，需要重新向服务器发起请求。

我们也可以从 **Network** 面板中看到，第三次请求的 **Transferred** 为 170 B，即重新向服务器发起请求获取新的响应。

![Nodejs 响应头](./3rd.png)

## 重新验证 —— 过期不代表不可复用

当缓存的响应处于过期状态时，不代表该响应不可以被复用。

过期状态的响应，可以被复用，但是需要重新验证。







