// import { generateText } from "ai";
// import { createGoogleGenerativeAI } from "@ai-sdk/google";

// const google = createGoogleGenerativeAI({
//   apiKey: 'AIzaSyC_ulowVLR93z8iczcgbjnv-ag_gdTJpVE',
// });

// const response = await generateText({
//   model: google("gemini-2.5-flash"),
//   prompt: "Hello, world!",
// });

// console.log(response.text);
process.env.GOOGLE_API_KEY = "AIzaSyC_ulowVLR93z8iczcgbjnv-ag_gdTJpVE";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { ProxyAgent } from "undici"; // ⭐ 关键：用 undici 的 ProxyAgent
import fs from "fs";

// Charles 代理
const ca = fs.readFileSync(
  "/Users/scoheart/Code/charles-ssl-proxying-certificate.pem",
  "utf8"
);
const proxyAgent = new ProxyAgent({
  uri: "http://127.0.0.1:8888",
  // Provide the Charles root cert so TLS verification passes instead of treating it as self-signed.
  requestTls: {
    ca,
  },
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,

  // 使用 Node 内置全局 fetch
  fetch: (input: RequestInfo, init: RequestInit = {}) => {
    return fetch(input, {
      ...init,
      // ⭐ Node 内置 fetch 使用 dispatcher 配置代理
      dispatcher: proxyAgent,
    } as any);
  },
});

const response = await generateText({
  model: google("gemini-2.5-flash"),
  prompt: "Hello, world!",
});

console.log(response.text);
