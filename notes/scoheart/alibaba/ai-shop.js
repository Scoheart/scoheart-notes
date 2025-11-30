import axios from "axios";
import crypto from "crypto";

// 将字符串密钥转换为32字节密钥
const getKey = (secretKey) =>
  crypto
    .createHash("sha256")
    .update(String(secretKey))
    .digest("base64")
    .substr(0, 32);

// 加密函数
const encrypt = (text, secretKey) => {
  const key = getKey(secretKey);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
};

// 请求流程
const appKey = "iy6WmCgzfjHv3_uP8zGo";
const appName = "driver-ai-code"; // 测试应用，仅测试环境可使用，请申请线上应用
const timestemp = new Date().getTime();
const signature = encrypt(`${timestemp}`, appKey);

axios
  .post(
    "http://ai-shop.amap.com/open-base-api/chat/completions",
    {
      model: "[AiMap][gpt-5]",
      messages: [
        {
          role: "user",
          content: "你可以做什么？",
        },
      ],
      stream: false,
    },
    {
      headers: {
        signature: signature,
        "app-name": appName,
      },
    }
  )
  .then(({ data }) => {
    console.log(data);
  });
