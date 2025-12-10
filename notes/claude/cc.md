# Claude Code 使用分享

## 基本安装与使用

### Install 安装

通过安装脚本安装：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

通过 npm 安装：

```bash
# https://registry.npmjs.org
# https://registry.npmmirror.com
npm install -g @anthropic-ai/claude-code
```

### 通过 max-ai 安装

[max-ai](https://max-ai.amap.com/#/docs/quick-start)

通过安装脚本安装：

```bash
bash -c "$(curl -fsSL https://o.alicdn.com/amap-sharetrip-aicoding/max-ai-tools/install.js)"
```

通过 npm 安装：

```bash
npm install -g tnpm --registry=https://registry.anpm.alibaba-inc.com
tnpm install -g @ali/max-ai
max
```

### 网络相关解决方案

通过官方的下载脚本安装，会爆 403 错误。

```bash
curl -fsSL https://claude.ai/install.sh | bash
# curl: (22) The requested URL returned error: 403
```

有如下几个点：

- 这里的下载 URL 会被 Cloudflare 反向代理到 `www.anthropic.com`
- CloudShell 会将 `www.anthropic.com` 识别为高风险网站，拦截访问
- 如果识别到是中国大陆的 ip，那就会命中 `/app-unavailable-in-region`，也无法访问

### 基本配置文件

~/.claude/settings.json

如果是通过安装 `@ali/max-ai` 然后使用 `max` 命令安卓启动的 Claude Code，会自动给 Claude Code 配置文件写入一系列配置，此时的 Claude Code 就可以直接使用 IdeaLab 上的 Claude 系列模型了。

```json
{
  "env": {
    "DISABLE_PROMPT_CACHING": 0,
    "ANTHROPIC_BASE_URL": "https://max-ai.amap.com",
    "ANTHROPIC_AUTH_TOKEN": "b01bbc92dd05ce2bfc41711a3064571eee92b14fa002b634fe84339e9124aeab",
    "ANTHROPIC_MODEL": "claude_sonnet4_5",
    "ANTHROPIC_SMALL_FAST_MODEL": "claude-haiku-4_5",
    "DISABLE_COST_WARNINGS": 1,
    "CLAUDE_CODE_SUBAGENT_MODEL": "claude-haiku-4_5",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude_sonnet4_5",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude_sonnet4_5",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4_5",
    "CLAUDE_CODE_DISABLE_TERMINAL_TITLE": 1,
    "MCP_TIMEOUT": 300000,
    "MCP_TOOL_TIMEOUT": 300000,
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": 64000,
    "DISABLE_TELEMETRY": 1,
    "DISABLE_BUG_COMMAND": 1,
    "DISABLE_ERROR_REPORTING": 1,
    "DISABLE_AUTOUPDATER": 1
  },
  "includeCoAuthoredBy": false,
  "enableAllProjectMcpServers": true,
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.maxAI/hooks/input-output-logger/input-output-logger.js",
            "name": "input-output-logger"
          }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.maxAI/hooks/input-output-logger/input-output-logger.js",
            "name": "input-output-logger"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.maxAI/hooks/input-output-logger/input-output-logger.js",
            "name": "input-output-logger"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.maxAI/hooks/input-output-logger/input-output-logger.js",
            "name": "input-output-logger"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.maxAI/hooks/input-output-logger/input-output-logger.js",
            "name": "input-output-logger"
          }
        ]
      },
      {
        "hooks": [
          {
            "type": "command",
            "command": "PROJECT_NAME=$(basename $(git rev-parse --show-toplevel 2>/dev/null || echo \"Unknown\")) && if command -v osascript >/dev/null 2>&1; then osascript -e 'display notification \"项目名: '\"$PROJECT_NAME\"'\n任务完成\" with title \"Claude Code\"'; elif command -v notify-send >/dev/null 2>&1; then notify-send 'Claude Code' \"名称: MaxAI\n项目名: $PROJECT_NAME\n内容: 任务完成\"; fi",
            "name": "simple-notifications"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash|Read|Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.maxAI/hooks/security-alert/security-alert.js",
            "name": "security-alert"
          }
        ]
      }
    ]
  },
  "statusLine": {
    "type": "command",
    "command": "node ~/.maxAI/statusLine/project-info-statusLine.js"
  },
  "permissions": {
    "allow": [
      "Bash",
      "LS",
      "Read",
      "Agent",
      "Write",
      "Edit",
      "MultiEdit",
      "Glob",
      "Grep",
      "WebFetch",
      "WebSearch",
      "TodoWrite",
      "NotebookRead",
      "NotebookEdit",
      "mcp__exa",
      "mcp__context7",
      "mcp__searchKnowledge"
    ],
    "deny": [
      "Read(./.env)",
      "Edit(./.env)",
      "Write(./.env)",
      "MultiEdit(./.env)",
      "Read(./.ssh)",
      "Edit(./.ssh)",
      "Write(./.ssh)",
      "MultiEdit(./.ssh)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Read(./config/credentials.json)"
    ],
    "ask": [],
    "additionalDirectories": ["~/.maxAI/memories/"],
    "defaultMode": "acceptEdits"
  }
}
```

如果是自己通过官方脚本安装的 Claude Code，则需要给下面相关的环境变量设置对应的值：

- ANTHROPIC_BASE_URL=https://max-ai.amap.com
- ANTHROPIC_AUTH_TOKEN=xxx
- ANTHROPIC_MODEL=claude_sonnet4_5
- ……

### Terminal 配置

#### Line breaks 换行输入

Claude Code 里输入多行的几种方式：

- 快速换行：输入 \ 然后按 Enter，会插入一个换行而不是直接发送。

- 键盘快捷键：推荐设置快捷键来插入换行，比如 Shift+Enter 或 Option+Enter。

1. 配置 Shift+Enter（VS Code / iTerm2）

在 Claude Code 内运行 /terminal-setup，它会自动帮你把 Shift+Enter 配好。

2. 配置 Option+Enter

- macOS Terminal.app
  - 设置 → Profiles → Keyboard
  - 勾选 “Use Option as Meta Key”
- iTerm2 / VS Code Terminal
  - 设置 → Profiles → Keys（或类似）
  - 把 Left/Right Option key 设置为 “Esc+”。

#### Vim Mode

Claude Code 支持一部分 Vim 键位，可以：

- 用 /vim 开启
- 或通过 /config 进行配置。

#### Handling large inputs 处理大块输入

当你的内容很长（大段代码 / 文档）时：

- 不要狂粘长文本 到 Claude Code 里,终端（尤其 VS Code terminal）对超长粘贴容易截断，Claude 也更难处理。

推荐做法：

- 把内容写到一个文件里
- 然后让 Claude 去读取这个文件（例如让它 read 某个路径），走 文件工作流 会更可靠。

#### Status line configuration

status line 是 Claude Code 的“状态栏”，可以显示项目信息、文件路径、当前分支等。

如何给 Claude Code 配一个“自定义状态栏（status line），有两种方式：

1.交互式配置（推荐起步）

直接在 Claude Code 里运行 /statusline 命令，然后按照提示进行配置。

```bash
/statusline
```

2. 直接在配置文件中写死

编辑 .claude/settings.json 文件添加

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}
```

这里就推荐一个工具 [ccstatusline](https://github.com/sirmalloc/ccstatusline)，可以快速生成 statusline 配置。

### 开始使用

#### Use Claude as a unix-style utility

把 Claude 作为 unix-style 工具使用。

```bash
claude -p '查看我本地有哪些 docker images'

ps aux | claude -p "找出占用 CPU 最高的三个进程，并说明可能原因" > res.md

lsof -P -i -n | claude -p '哪个进程占用了 7897 端口' > res.md

cat <<"EOF" | claude -p
```

进入项目目录，启动 Claude Code。

```bash
cd /path/to/your/project
claude
```

提出第一个问题。

```bash
> what can Claude Code do?
```

让 Claude Code 帮我们修改代码。

```bash
> add a hello world function to the main file
```

## 回答风格 Output Styles

Output styles = Claude Code 的“系统提示预设 / 人格模板”。
它不是改模型本身，而是动态改 Claude Code 的 system prompt，让同一个 Claude 在不同“模式”下说话、教学、写代码的风格完全不一样。

### 内置风格 Built-in Styles

目前文档提到有三个“内置”样式

- Default
- Explanatory
- Learning

#### Default

就是现在你习惯的 Claude Code：以尽快完成软件工程任务为主要目标。

#### Explanatory（讲解型）

解释型：在帮助你完成软件工程任务的过程中，提供具有教育意义的「Insights（见解）」

适合我们想理解代码库结构、实现细节和设计决策的时候。

#### Learning（学习型 / 结对编程）

协作式、边做边学的模式，在这种模式下，Claude 在编程时不仅会分享「Insights（见解）」，还会邀请你亲自编写一些小而关键的代码片段，不断让你自己补充的一些小块代码。Claude Code 还会在代码文件中写 TODO(human)，留给你自己来实现。

形成“AI 出题 + 你来填空”的体验。

### 使用方式

```bash
/output-style
```

### 自定义

自定义 Output Styles 需要创建一个 `.claude/output-styles` 目录，然后在这个目录下创建一个 `custom.md` 文件，文件名即为 Output Style 的名称。

```bash
.claude/output-styles/custom.md
```

```markdown
---
name: My Custom Style
description: A brief description of what this style does, to be displayed to the user
---

# Custom Style Instructions

You are an interactive CLI tool that helps users with software engineering
tasks. [Your custom instructions here...]

## Specific Behaviors

[Define how the assistant should behave in this style...]
```

### Output Styles 如何工作的

会直接修改 Claude Code 的系统提示词（system prompt），从而影响 Claude Code 的回答风格。

## 系统提示词 System prompt flags

### --system-prompt

效果：把 Claude Code 默认所有系统指令全部干掉，换成你给的一句（或几句）话。

### --system-prompt-file

效果：从一个文件加载完整 system prompt，替换默认 prompt（只在 -p 打印模式里可用）。

### --append-system-prompt

效果：在 默认 Claude Code system prompt 的后面 再补充一段说明。

## 上下文信息

- CLAUDE.md
- .claude/rules/\*.md

```bash
your-project/
├── .claude/
│   ├── CLAUDE.md           # Main project instructions
│   └── rules/
│       ├── code-style.md   # Code style guidelines
│       ├── testing.md      # Testing conventions
│       └── security.md     # Security requirements
```

### CLAUDE.md

`CLAUDE.md`是 Claude Code 里的项目向导与长期记忆文件，我们与 Claude Code 的对话都会基于 `CLAUDE.md` 文件中的内容进行。

#### CLAUDE.md imports

CLAUDE.md 可以通过 @路径 语法 导入其他文件，实现拆分管理。

```markdown
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions

- git workflow
  @docs/git-instructions.md
```

### .claude/rules/\*.md

对于大项目，一份 CLAUDE.md 容易变得很长。可以用 .claude/rules/ 目录来做模块化。

我们可以将每一个规则都写成一个 `.md` 文件，然后放到 `.claude/rules/` 目录下，Claude Code 会自动加载这些规则。

#### Path-specific rules

```markdown
---
paths: src/api/**/*.ts
---

# API Development Rules

- All API endpoints must include input validation
- Use the standard error response format
- Include OpenAPI documentation comments
```

### Glob patterns

paths 字段使用常规 glob 语法

```markdown
---
paths: src/**/*.{ts,tsx}
paths: {src,lib}/**/*.ts, tests/**/*.test.ts
---
```

### Subdirectories

claude/rules/ 可以继续分子目录, Claude 会 递归发现所有 .md 文件。

举例：

```bash
your-project/.claude/rules/
├── frontend/
│   ├── react.md
│   └── styles.md
├── backend/
│   ├── api.md
│   └── database.md
└── general.md
```

H5 规范设想：

```bash
your-project/.claude/rules/
├── 01-HTML
│   └── index.md
├── 02-CSS
│   ├── Coding-Style
│   │   └── index.md
│   ├── Modularization
│   │   └── index.md
│   ├── Postprocessor
│   │   └── index.md
│   ├── Preprocessor
│   │   └── index.md
│   └── index.md
├── 03-JavaScript
│   ├── 01-ECMAScript-ECMA-262
│   │   └── index.md
│   ├── 02-JavaScript-Engine
│   │   └── index.md
│   ├── 03-JavaScript-Runtime
│   │   └── index.md
│   ├── 04-JavaScript-Module-System
│   │   └── index.md
│   ├── 05-JavaScript-Flavours
│   │   └── index.md
│   ├── 06-JavaScript-Package-Manager
│   │   └── index.md
│   ├── 07-Build-Toolchains
│   │   └── index.md
│   ├── 08-Front-End-Framework
│   │   └── index.md
│   ├── 09-Ecosystem
│   │   └── index.md
│   └── index.md
└── index.md
```

### Symlinks

.claude/rules/ 支持软链接，方便多个项目共享规则：

```bash
# 整个目录
ln -s ~/shared-claude-rules .claude/rules/shared

# 单个文件
ln -s ~/company-standards/security.md .claude/rules/security.md
```

## 替换 Claude Code 的模型底座

推荐使用 [Claude Code Router](https://github.com/musistudio/claude-code-router) 替换 Claude Code 的模型底座，可以实现更灵活的模型切换。

它是一个开源的代理 / 中间件工具，夹在 Claude Code CLI 和各种 AI 模型提供商之间，做兼容层、路由和转换，CCR 让你保留“Claude Code 的开发体验”，但把“背后的大脑”换成任何你想要的模型组合

### 使用指南

```bash
npm install -g @musistudio/claude-code-router
```

1. 直接编辑配置文件

~/.claude-code-router/config.json

2. UI Mode，使用快捷 UI 界面配置

```bash
ccr ui
```

配置完成后，通过下面的命令启动 Claude Code

```bash
ccr code
```

## 抓包 Claude Code 的数据交互过程

抓包 Claude Code 的数据交互过程，可以更清楚地了解 Claude Code 的工作原理。

### 网络环境配置

本质上是：macOS 的“系统代理”只是把代理地址写进 SystemConfiguration，给会主动读取系统代理的框架/APP（CFNetwork/NSURLSession，如 Safari、Chrome），它不是内核级的透明转发。绝大多数命令行程序（curl、git、npm、pip、node、python 的 requests、Java、Go 等）不会自动读取系统代理，也不会解析 PAC。

- Direct 直连
- System Proxy 系统代理

  - Web Proxy Auto-Discovery Protocol Web 代理自动发现协议
  - Proxy Auto-Config 代理自动配置
  - Manual 手动配置

### Shell

- Environment Variables 进程级代理 环境变量
  - HTTP_PROXY
  - HTTPS_PROXY
  - SOCKS_PROXY
  - ALL_PROXY
  - NO_PROXY
- TUN/TAP(Clash, Shadowsocks, Surge, V2Ray, etc.) 系统级代理 L3/L2
- VPN(WireGuard, ExpressVPN, NordVPN, etc.)

### Nodejs

其实在 Nodejs 应用程序里，我们要代理的就是类似 fetch 这样的 Http 网络请求库。

```js
const req = new Request("https://postman-echo.com/get");
const res = await fetch(req);
const data = await res.json();
console.log(data);
```

对于上面这样一个请求，我们通过设置环境变量来实现代理是默认不生效的。

```bash
export HTTP_PROXY=http://127.0.0.1:8888
export HTTPS_PROXY=http://127.0.0.1:8888
```

本质上是 Node 并不会自己读取系统代理。

#### 如何让 Node 使用系统代理

1. Node 18+ 自带 fetch（基于 undici）, 使用 undici 的 ProxyAgent 实现代理。

```js
import { ProxyAgent, fetch } from "undici";

const proxyAgent = new ProxyAgent("http://127.0.0.1:7890"); // 你的代理地址

const res = await fetch("https://api.example.com/data", {
  dispatcher: proxyAgent, // 这里传代理
});

const data = await res.json();
console.log(data);
```

2. Node 24 的「零侵入代理」：NODE_USE_ENV_PROXY + HTTP(S)\_PROXY

从 Node.js 24.0.0 开始，只要你打开 NODE_USE_ENV_PROXY，再配好 HTTP_PROXY / HTTPS_PROXY / NO_PROXY，fetch() 会自动走代理，你完全不用在代码里传 dispatcher

```bash
export HTTP_PROXY=http://127.0.0.1:8888
export HTTPS_PROXY=http://127.0.0.1:8888

# 开启 Node 的环境变量代理支持
export NODE_USE_ENV_PROXY=1

node app.js
```

#### HTTPS 代理

Charles 抓 HTTPS 的原理，就是用一套“自己签发的假站点证书”在 Node 和真实服务器之间做了一个「双向 TLS 中间人」

```bash
Node ←(TLS1)→ Charles ←(TLS2)→ 真实服务器
```

1. 显式告诉 Node 多信任一个 CA

```bash
export NODE_EXTRA_CA_CERTS=/path/to/charles.pem
node app.js
```

2. Node 24 可以开启「使用系统 CA」的能力，让 Node 直接用系统信任库（如果你已经把 Charles 证书安装到了系统里）

```bash
export NODE_USE_SYSTEM_CA=1
node app.js
```

最终的“组合拳”

```bash
export NODE_USE_SYSTEM_CA=1
export NODE_USE_ENV_PROXY=1
export HTTP_PROXY=http://127.0.0.1:8888
export HTTPS_PROXY=http://127.0.0.1:8888
export NO_PROXY=localhost,127.0.0.1,.company.com
node app.js
```
