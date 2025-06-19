# 提取 HTTP 协议规范

```ts
import http from 'node:http';
import type {
  IncomingMessage,
  IncomingHttpHeaders,
  ServerResponse,
} from 'node:http';
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // request line
    //    method
    console.log(req.method);
    //    request-target
    console.log(req.url);
    //    HTTP-version
    console.log(req.httpVersion);
    console.log(req.httpVersionMajor + '.' + req.httpVersionMinor);

    // field line
    console.log(req.headers);
    console.log(req.headersDistinct);
    console.log(req.rawHeaders);

    // message-body
    req.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    // status line
    //   HTTP-version

    //   status code
    console.log(res.statusCode);
    res.statusCode = 404;
    //   reason-phrase
    console.log(res.statusMessage);
    res.statusMessage = 'Not Found';
    // field line
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.appendHeader('Access-Control-Allow-Method', 'GET');

    // message body
    res.end('hello');
  }
);

server.listen(3333, () => {
  console.log('http://localhost:3333');
});
```
