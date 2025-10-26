# Claude Code

## install 下载安装

```shell
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Navigate to your project
cd /path/to/your-awesome-project

# Start coding with Claude
claude
# You'll be prompted to log in on first use
```

运行后

- 选择你喜欢的主题 + Enter
- 确认安全须知 + Enter
- 使用默认 Terminal 配置 + Enter
- 信任工作目录 + Enter

开始在终端里和你的 AI 编程搭档一起写代码吧！🚀

## 接入非官方的 Claude Code 服务

如果你没有 Claude Code 官方的账号，或者 API Key，可以接入非官方的 Claude Code 服务，具体步骤参考下面的方式：

### 方式一：直连“Anthropic 兼容”端点

- AnyRouter
- AgentRouter
- Codemirror

1. 配置环境变量

```bash
export ANTHROPIC_BASE_URL=https://your-gateway.example.com
export ANTHROPIC_AUTH_TOKEN=sk-xxxxxxxx

# 例如接入 AnyRouter
export ANTHROPIC_BASE_URL=https://anyrouter.top
export ANTHROPIC_AUTH_TOKEN=your-anyrouter-api-key
```

2. 或者，编辑 ~/.claude/settings.json 全局配置文件

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://your-gateway.example.com",
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxxxxxx"
  }
}
```

### 方式二：用“转译代理/网关”

若目标模型只支持 OpenAI/Gemini 风格，放一个中间层把“Anthropic 请求”->“目标模型请求”，再把响应“翻译回 Anthropic 消息格式”。Claude Code 只感知 Anthropic 协议，代理负责“口译”。

- LiteLLM
- OpenRouter
- Zuplo
- 302.AI
- 自建
- ...

## 使用指南

### CLAUDE.md

CLAUDE.md 是 Claude Code 里最重要的项目向导与长期记忆文件，我们与 Claude Code 的对话都会基于 `CLAUDE.md` 文件中的内容进行。

例如，我们可以自己在 `CLAUDE.md` 文件中添加一些内容：

```markdown
# 禁区与限制

- 不得改动：`packages/ui/theme/*`、`apps/web/app/layout.tsx`（来自设计系统）。
- 权限策略：默认拒绝读取 `.env` 与 `secrets/**`。
```

后续与 Claude Code 的对话中，如果涉及到 `CLAUDE.md` 文件中注明的禁止事项，Claude Code 会自动遵守这些约定，不会随意修改。

当你的 CLAUDE.md 形成节奏，Claude Code 就不再是“聪明但偶有走偏的伙伴”，而是有章可循、能持续改进的协作同事。

### Slash Commands

Slash Commands 是 Claude Code 提供的一种命令行交互方式。在交互式会话中，通过斜杠命令控制 Claude 的行为。

有很多的 built-in slash commands，你可以通过 `/help` 切换到帮助页，然后通过 `tab` 来切换到 `commands` 面板查看每个内置斜杠命令的描述和用法。

例如，`/init` 的含义是这样显示的：

```bash
/init   Initialize a new CLAUDE.md file with codebase documentation
```

#### /init

它是 Claude Code 里最重要的开场指令之一，它会扫描代码仓库并帮我们生成或更新 `CLAUDE.md` 文件。不用我们自己再去编写 `CLAUDE.md` 文件了，非常方便。

#### /memory

它可以帮助我们查看和编辑 Claude Code 的 `CLAUDE.md` 文件。或者，我们自己用任何编辑器直接打开 `CLAUDE.md` 文件进行编辑，这也是可以的。
