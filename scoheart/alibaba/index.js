// proxy.js
import express from "express";
import axios from "axios";
import crypto from "crypto";

const app = express();
app.use(express.json());

const APP_KEY = "iy6WmCgzfjHv3_uP8zGo";
const APP_NAME = "driver-ai-code";

// 加密函数，与高德接口一致
const getKey = (secretKey) =>
  crypto
    .createHash("sha256")
    .update(String(secretKey))
    .digest("base64")
    .substr(0, 32);

const encrypt = (text, secretKey) => {
  const key = getKey(secretKey);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

// 代理转发 /v1/chat/completions
app.post("/v1/chat/completions", async (req, res) => {
  try {
    const timestemp = new Date().getTime();
    const signature = encrypt(`${timestemp}`, APP_KEY);

    const response = await axios.post(
      "http://ai-shop.amap.com/open-base-api/chat/completions",
      req.body,
      {
        headers: {
          signature,
          "app-name": APP_NAME,
          authorization: `Bearer ${APP_KEY}`,
        },
        responseType: "stream", // 支持流式
      }
    );

    // 将返回的流直接转发回客户端
    response.data.pipe(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(11888, () => {
  console.log("🚀 Proxy running at http://localhost:11888/v1/chat/completions");
});
