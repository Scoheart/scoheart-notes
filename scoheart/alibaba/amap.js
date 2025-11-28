// ~/.claude-code-router/plugins/amap.js
const crypto = require("crypto");

function getKey(secretKey) {
  // 与你示例一致：sha256 → base64 → 取前32字节
  return crypto
    .createHash("sha256")
    .update(String(secretKey))
    .digest("base64")
    .substr(0, 32);
}

function encryptTimestamp(ts, secretKey) {
  const key = getKey(secretKey);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(String(ts), "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

// Claude Code → AMap 请求体映射（最小实现）
// req.body 形如：{ model, messages, tools, stream, max_tokens, temperature, ... }
function buildAmapPayload(anthropicBody, modelName) {
  // AMap 接口期望：{ model, messages, stream }
  // Claude Code 的 messages 已经是 role/content 的数组，基本兼容
  const payload = {
    model: modelName,
    messages: anthropicBody.messages || [],
    stream: !!anthropicBody.stream,
  };
  return payload;
}

module.exports = {
  name: "amap",
  // 入口：CCR 会把 {req, config, provider} 交给 transformer
  async transformRequest({ req, config, provider }) {
    ctx.log("🛰️ 进入 AMap transformer");
    const modelName =
      (req.body && req.body.model) || (provider.models && provider.models[0]);
    const body = buildAmapPayload(req.body || {}, modelName);

    // 生成签名
    const appKey =
      (config.AMAP && config.AMAP.APP_KEY) || process.env.AMAP_APP_KEY;
    const appName =
      (config.AMAP && config.AMAP.APP_NAME) || process.env.AMAP_APP_NAME;
    const ts = Date.now();
    const signature = encryptTimestamp(ts, appKey);

    // 返回 CCR 用于实际发起 HTTP 的信息
    return {
      url: provider.api_base_url,
      method: "POST",
      headers: {
        "content-type": "application/json",
        "app-name": appName,
        signature: signature,
        // 如果 AMap 未来要求传 timestamp 头/字段，你可在此一并加上
      },
      body,
    };
  },

  // AMap → Claude Code 响应映射（最小实现）
  // 这里假设 AMap 返回 { choices: [{ message: {role, content} }], ... }
  // 你需要把它转成 Claude Code 期望的 "messages API" 结构。
  async transformResponse({ response }) {
    // 简化：如果 AMap 已直接返回 OpenAI 风格，我们把第一条 message 抽出
    const data = response.data || response; // CCR 可能已帮你解析 JSON
    const choice = data.choices && data.choices[0];
    const content =
      choice?.message?.content ?? data?.message?.content ?? data?.content ?? "";

    // Claude Code 只需要一个标准 assistant 消息
    return {
      type: "message",
      role: "assistant",
      content,
    };
  },
};
