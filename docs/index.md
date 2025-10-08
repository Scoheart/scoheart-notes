##

## 环境配置

### 基础环境配置

- Nodejs
- npm

Nodejs 版本切换工具：nvm、fnm

### 科学上网环境配置

- Direct _直连_

- System Proxy _系统代理_

  - Web Proxy Auto-Discovery Protocol _Web 代理自动发现协议_
  - Proxy Auto-Config _代理自动配置_
  - Manual _手动配置_

- Shell
  - Environment Variables _进程级代理 环境变量_
    - HTTP_PROXY
    - HTTPS_PROXY
    - SOCKS_PROXY
    - ALL_PROXY
    - NO_PROXY
  - TUN/TAP(Clash, Shadowsocks, Surge, V2Ray, etc.) _系统级代理 L3/L2_
  - VPN(WireGuard, ExpressVPN, NordVPN, etc.)

本质上是：macOS 的“系统代理”只是把代理地址写进 SystemConfiguration，给会主动读取系统代理的框架/APP（CFNetwork/NSURLSession，如 Safari、Chrome），它不是内核级的透明转发。绝大多数命令行程序（curl、git、npm、pip、node、python 的 requests、Java、Go 等）不会自动读取系统代理，也不会解析 PAC。

### 下载安装

| Tools       |                    Command                     | Notes |
| :---------- | :--------------------------------------------: | ----: |
| Claude Code |   `npm install -g @anthropic-ai/claude-code`   |  null |
| Gemini CLI  |      `npm install -g @google/gemini-cli`       |  null |
| Codex CLI   |         `npm install -g @openai/codex`         |  null |
| Cursor CLI  | `curl https://cursor.com/install -fsS \| bash` |  null |
| qodercli    | `curl -fsSL https://qoder.com/install \| bash` |  null |

### 验证登录

#### Claude Code

```bash
export ANTHROPIC_AUTH_TOKEN=xxx
export ANTHROPIC_BASE_URL=https://anyrouter.top
```

#### Gemini CLI

> https://github.com/google-gemini/gemini-cli/blob/main/docs/get-started/authentication.md

1. Login with Google

```bash
export GOOGLE_CLOUD_PROJECT=xxx
```

Codex CLI

### 权限模型

| Mode                | Description                                                                  |
| :------------------ | :--------------------------------------------------------------------------- |
| `default`           | Standard behavior - prompts for permission on first use of each tool         |
| `acceptEdits`       | Automatically accepts file edit permissions for the session                  |
| `plan`              | Plan Mode - Claude can analyze but not modify files or execute commands      |
| `bypassPermissions` | Skips all permission prompts (requires safe environment - see warning below) |

## 使用方式

### 交互模式

| Tools       | Command  | Notes |
| :---------- | :------: | ----: |
| Claude Code | `claude` |  null |
| Gemini CLI  | `gemini` |  null |
| Codex CLI   | `codex`  |  null |

### 无头模式

| Tools       |           Command           | Notes |
| :---------- | :-------------------------: | :---- |
| Claude Code |  `claude --print "prompt"`  | null  |
| Gemini CLI  | `gemini --prompt "prompt"`  | null  |
| Codex CLI   |    `codex exec "prompt"`    | null  |
| qodercli    | `qodercli --print "prompt"` | null  |

1. 当作 shell 中的 chatbot 使用

```bash
claude --print "介绍一下 CSS 的属性选择器"

codex exec --skip-git-repo-check "根据这个网址（https://agents.md/），详细的介绍一下 AGENTS.md 的作用"

cursor-agent --print "通过 5W1H 分析法解释 Claude Code 的 Hook"
```

2. 当作 shell 中智能自动化工具使用

```bash
gemini --yolo --prompt "帮我下载一个安卓虚拟设备，API 为安卓 30，如果存在直接启动，没有则下载安装后启动"

claude --dangerously-skip-permissions --model claude-4-sonnet --print "帮我打开 iPhone 17 Pro Max 模拟器，如果这个设备不存在 就打开最接近的 iPhone 机型"

qodercli --dangerously-skip-permissions --print "帮我下载最新版本的nodejs"
```

 ~/Code/notes/ qodercli --dangerously-skip-permissions --print "帮我下载最新版本的 nodejs"

Node.js v24.9.0 已成功下载到您的系统中。您可以通过以下任一方式完成安装：

1. 图形界面安装：双击下载的 node-v24.9.0.pkg 文件，按提示操作
2. 命令行安装：执行 `sudo installer -pkg node-v24.9.0.pkg -target /`

安装完成后，您可以打开终端并运行 `node --version` 和 `npm --version` 来验证安装是否成功。

### 拓展技巧

#### AGENTS.md

> https://agents.md/#examples

Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project.

AGENTS.md 其实就是一份提供给 AI 阅读的 README，帮助 AI 更好地理解项目、完成任务。

#### Hook

Hook（钩子） 是 Claude Code 提供的一种 事件驱动机制。允许我们在 Claude Code 的特定生命周期阶段（如启动、执行工具、用户输入等），自动执行自定义脚本或命令。

> 如果想查看 Hook 的输出，需要 `ctrl + o` 开启输出详情。

##### Hook 事件类型

| Hook 事件            | 触发时机                                      | 是否支持 matcher | 典型用途                                                                 |
| -------------------- | --------------------------------------------- | ---------------- | ------------------------------------------------------------------------ |
| **PreToolUse**       | Claude 调用某个工具之前                       | ✅ 是            | 在工具执行前进行权限检查、输入验证、拦截敏感操作（如禁止写 `.env` 文件） |
| **PostToolUse**      | 工具执行完成后                                | ✅ 是            | 对工具结果做校验、分析、日志记录或向 Claude 注入额外上下文               |
| **Notification**     | Claude 向用户发送系统通知时                   | ❌ 否            | 监控通知事件，例如权限请求、会话状态变化等                               |
| **UserPromptSubmit** | 用户提交消息后、Claude 处理前                 | ❌ 否            | 检查用户输入是否合法，自动注入提示词或过滤敏感内容                       |
| **Stop**             | 主 Agent 任务完成、准备停止时                 | ❌ 否            | 控制 Claude 是否应结束会话，可用于收尾逻辑或阻止中止                     |
| **SubagentStop**     | 子 Agent（例如工具代理）结束时                | ❌ 否            | 管理子任务生命周期，清理资源或决定是否继续执行                           |
| **PreCompact**       | Claude 准备压缩上下文（Compact）前            | ✅ 是            | 在上下文压缩前执行预处理，如保留重要内容或过滤敏感信息                   |
| **SessionStart**     | 新会话启动时（包括 resume / clear / compact） | ✅ 是            | 初始化上下文、加载项目信息、设定环境变量                                 |
| **SessionEnd**       | 整个会话结束时                                | ❌ 否            | 会话收尾、日志记录、触发外部清理或通知任务                               |

##### 动手实现 Hook

实现一个 Hook， Claude Code 完成任务后，通过钉钉机器人发送通知提醒卡片，点击卡片可直接跳转相应 IDE.

1. cursor hook

```json
// ~/.cursor/hooks.json
{
  "version": 1,
  "hooks": {
    "stop": [
      {
        "command": "source /Users/scoheart/Env/ai_hooks/.env && AI_TOOL=cursor python3 /Users/scoheart/Env/ai_hooks/stop.py"
      }
    ]
  }
}
```

2. claude hook

```json
// ~/.claude/settings.json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "AI_TOOL=claude python3 /Users/scoheart/Env/ai_hooks/stop.py"
          }
        ]
      }
    ]
  }
}
```

stop hook python script

```python
#!/usr/bin/env python3
"""
AI Tools Hook Script - Send DingTalk notifications
"""
import os
import sys
import time
import hmac
import hashlib
import base64
import urllib.parse
import urllib.request
import json
from typing import Dict, Any


def gen_sign(secret: str) -> tuple[str, str]:
    """Generate DingTalk signature"""
    timestamp = str(round(time.time() * 1000))
    string_to_sign = f"{timestamp}\n{secret}"
    hmac_code = hmac.new(
        secret.encode("utf-8"),
        string_to_sign.encode("utf-8"),
        digestmod=hashlib.sha256,
    ).digest()
    sign = urllib.parse.quote_plus(base64.b64encode(hmac_code))
    return timestamp, sign


def send_to_dingtalk(
    ai_tool: str,
    event: str,
    project_path: str,
    complete_time: str,
    access_token: str,
    secret: str,
    user_phone: str
):
    """
    Send DingTalk notifications

    Args:
        ai_tool: AI tool name (cursor, claude, etc)
        event: Hook event name
        project_path: Project directory path
        complete_time: Task completion time
        access_token: DingTalk access token
        secret: DingTalk secret
        user_phone: User phone number for @mention
    """
    timestamp, sign = gen_sign(secret)
    webhook = (
        f"https://oapi.dingtalk.com/robot/send"
        f"?access_token={access_token}&timestamp={timestamp}&sign={sign}"
    )

    actioncard = {
        "msgtype": "actionCard",
        "actionCard": {
            "title": f"🚀 {ai_tool.title()} Task Completed",
            "text": (
                f"### 🤖 {ai_tool.title()} Hook\n\n"
                f"**Event**: {event}\n\n"
                f"**Project**: {project_path}\n\n"
                f"**Time**: {complete_time}\n\n"
            ),
            "btnOrientation": "1",
            "btns": [
                {"title": "👽 Open in Cursor",
                    "actionURL": f"cursor://file{project_path}"},
                {"title": "🤖 Open in VSCode",
                    "actionURL": f"vscode://file{project_path}"},
                {"title": "🪀 Open in QODER",
                    "actionURL": f"qoder://file{project_path}"},
            ],
        },
    }

    # Message 2: Text with @mention
    text_msg = {
        "msgtype": "text",
        "text": {
            "content": f"🚀 Code shipped, coffee time. @{user_phone}"
        },
        "at": {
            "atMobiles": [user_phone],
            "isAtAll": False
        }
    }

    # Send both messages
    for payload in [actioncard, text_msg]:
        try:
            req = urllib.request.Request(
                url=webhook,
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                print("✅ DingTalk:", resp.read().decode("utf-8"))
        except Exception as e:
            print(f"⚠️  Error: {e}", file=sys.stderr)


def get_ai_tool() -> str:
    """Get AI tool name from environment"""
    return os.environ.get("AI_TOOL", "unknown")


def get_hook_field(hook_input: Dict[str, Any], ai_tool: str, field_type: str) -> str:
    """Extract field from hook input based on AI tool and field type"""

    # Field extraction strategies: {ai_tool: {field_type: extractor_function}}
    strategies = {
        "cursor": {
            "project_path": lambda h: (h.get("workspace_roots") or [None])[0],
            "event_name": lambda h: h.get("hook_event_name"),
        },
        "claude": {
            "project_path": lambda h: h.get("cwd"),
            "event_name": lambda h: h.get("hook_event_name"),
        },
        "qoder": {
            "project_path": lambda h: h.get("cwd"),
            "event_name": lambda h: h.get("hook_event_name", "unknown"),
        },
        "unknown": {
            "project_path": lambda h: None,
            "event_name": lambda h: None,
        },
    }

    # Get and execute strategy (default to unknown)
    tool_strategies = strategies.get(ai_tool.lower(), strategies["unknown"])
    strategy = tool_strategies.get(field_type, lambda h: None)

    return strategy(hook_input) or "unknown"


def get_complete_time() -> str:
    """Get current time as completion time"""
    return time.strftime("%Y-%m-%d %H:%M:%S")


def main():
    """Main function"""
    try:
        # Get environment variables
        access_token = os.environ.get("DINGTALK_ACCESS_TOKEN")
        secret = os.environ.get("DINGTALK_SECRET")
        user_phone = os.environ.get("DINGTALK_USER_PHONE")

        # Read hook input from stdin
        hook_input = {}
        if not sys.stdin.isatty():
            try:
                hook_input = json.load(sys.stdin)
                print('✅ Hook triggered! Input:', hook_input)
            except (json.JSONDecodeError, ValueError):
                pass  # Use empty dict if input is not valid JSON

        # Get hook information
        ai_tool = get_ai_tool()
        event = get_hook_field(hook_input, ai_tool, "event_name")
        project_path = get_hook_field(hook_input, ai_tool, "project_path")
        complete_time = get_complete_time()

        # Send notifications
        send_to_dingtalk(
            ai_tool,
            event,
            project_path,
            complete_time,
            access_token,
            secret,
            user_phone
        )
        return 0

    except Exception as e:
        print(f"\n❌ Error: {e}\n", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())

```
