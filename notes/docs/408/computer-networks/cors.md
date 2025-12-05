# cors

Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources

## 支持

几乎每种语言和框架都提供了 CORS 支持，以下是一些常见的 CORS 包或内置支持：

- JavaScript/Node.js: cors、@fastify/cors、@koa/cors
- Python: flask-cors、django-cors-headers、FastAPI 内置支持
- Java: Spring Boot 内置支持
- Go: rs/cors
- Ruby: Rack::Cors
- PHP: fruitcake/laravel-cors
- C#: ASP.NET Core 内置支持
- Rust: warp 框架内置支持
- Elixir: cors_plug
- Swift: Vapor 的 cors 中间件

## 参考

- https://fetch.spec.whatwg.org/#cors-preflight-fetch
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://www.rfc-editor.org/rfc/rfc6454.html

## 原理

1. 对 preflight request 的处理
2. 对 actual request 的处理
