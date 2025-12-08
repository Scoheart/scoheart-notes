# Claude Code 使用分享

## 基本安装与使用

### Install

通过安装脚本安装：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

通过 npm 安装：

```bash
npm install -g @anthropic-ai/claude-code
```

### 使用

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

## Use Claude as a unix-style utility

把 Claude 作为 unix-style 工具使用。

```bash
claude -p '查看我本地有哪些 docker images'

claude -p '哪个进程占用了我的 8088 端口'

ps aux | claude -p "找出占用 CPU 最高的三个进程，并说明可能原因".
```

## Git worktree

利用 Git worktree 管理多个分支的代码。

基础用法：

```bash
# 创建一个新工作目录，并切换到该目录，会自动切换到目录同名的新分支
git worktree add <path>

# 显示指定分支, 默认以你当前所在分支的 HEAD 为基础 创建新分支
# git worktree add -b <branch> <path> HEAD
git worktree add -b <branch> <path>
```

### 工作流对比

传统方式:

```bash
git stash # 保存当前工作
git checkout main # 切换分支

# 修复 bug...

git checkout feature # 切回原分支
git stash pop # 恢复工作
```

```bash
使用 worktree:
# 等价于 git worktree add -b hotfix ../hotfix
# git branch --show-current
# git worktree add -b hotfix-issue-123 ../hotfix main
git worktree add ../hotfix
cd ../hotfix

# 修复 bug...

cd - # 原工作目录保持不变
```

然后就可以用 Git worktree 把同一个仓库“分身”成多个工作目录，然后在每个目录里开一个独立的 claude 会话，这样你可以同时让多个 Claude Code 实例在不同分支上干活，互不干扰。

```bash
git worktree add -b feature/1234567890 ../feature/1234567890 main

claude
```

## 斜杠指令 Slash commands

简单说：slash commands（斜杠命令）就是在 Claude Code 里，以 / 开头的一种“快捷指令”，用来快速执行特定任务或预先写好的提示词，从而控制 Claude 在当前对话里的行为。

### 内置斜杠指令 Built-in Slash Commands

Claude Code 内置了一些斜杠指令，我们可以直接使用。

- /vim (让 input 框进入 vim 模式)
- /init (创建 CLAUDE.md 文件)
- /clear (清空当前上下文)
- /context (查看当前上下文)
- /config (查看当前配置)
- /exit (退出 Claude Code)
- /hooks (查看当前 hooks)
- /mcp (查看当前 mcp)
- /plugin (查看当前 plugin)
- ...

### 自定义斜杠指令 Custom Slash Commands

它允许你把“经常对 Claude 说的一段提示词”，写进一个 Markdown 文件，然后用一个 /xxx 命令秒调出来。

语法

```bash
/<command-name> [arguments]
```

```markdown
---
description: "Explain a shell command"
argument-hint: "The command to explain"
model: "claude_sonnet4_5"
disable-model-invocation: true
---

# Explain Shell Command

You are a shell command historian and expert. When the user provides a shell command, you should:

1. **Command Overview**: Explain what the command does in clear, concise language
2. **Syntax Breakdown**: Break down the command syntax, including common flags and options
3. **Historical Background**: Provide the historical context:
   - When was it first introduced and in which Unix/Linux version?
   - Who created it or which organization/project developed it?
   - What problem was it designed to solve?
4. **Etymology**: If applicable, explain the origin of the command name (e.g., "grep" = Global Regular Expression Print)
5. **Evolution**: Mention significant changes or versions over time
6. **Modern Usage**: Provide 2-3 practical, real-world examples
7. **Related Commands**: List similar or complementary commands

Be thorough but accessible. Include interesting historical anecdotes when available.

Format your response with clear sections and use code blocks for command examples.

**IMPORTANT**: You MUST respond in Chinese (简体中文). All explanations, descriptions, and text should be in Chinese.

The command to explain is: {{$ARGUMENTS}}
```

#### Frontmatter

用 YAML frontmatter 提供元数据，比如

- description: 命令的描述
- allowed-tools: 允许使用的工具
- argument-hint: 参数提示
- model: 使用的模型
- disable-model-invocation: 是否禁止 SlashCommand tool 自动调用这个命令

```yaml
---
description: "Explain a shell command"
allowed-tools: Bash(ls:*)
---
```

#### 命名空间

用子目录来整理命令文件

```bash
.claude/commands/shell/explain-cmd.md
```

#### 参数占位符 Arguments

- $ARGUMENTS 把你输入命令时所有的参数原样塞进去
- $1, $2, $3, ... 像 shell 一样，按位置取参数

```bash
/explain-cmd ls
```

#### 执行命令 Bash command execution

可以在命令前面用 `!` 执行 bash 命令，把输出加入上下文。

```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: Create a git commit
---

## Context

- Current git status: !`git status`
- Current git diff: !`git diff HEAD`
- Current branch: !`git branch --show-current`

## Your task

Based on the above changes, create a single git commit.
```

#### 执行命令 Bash command execution

可以在命令前面用 ! 执行 bash，把输出加入上下文。

#### 文件引用 File references

用 `@` 引用文件内容。

#### 扩展思考 Thinking mode

使用 extended thinking keywords 来引导 Claude 进行更加深入的思考。

## 子代理 Subagents

Claude Code 的 subagent = 在 Claude Code 里预先配置好的“小号 AI 助手”，Claude Code 可以把合适的任务丢给它去干。

- 有特定的用途和擅长的领域
- 有独立的上下文窗口
- 有独立的工具权限
- 有独立的系统提示词

Claude 在处理任务时，如果发现“这个活刚好匹配某个 subagent 的专长”，就会把任务委托给它，让它单独跑一趟，再把结果返回来。

subagents 的作用：

- 专业化
- 可复用
- 上下文隔离

subagents 依赖于 Task tool，Task tool 是 Claude Code Built-in tool，用于启动子代理。

```json
 {
      "name": "Task",
      "description": "Launch a new agent to handle complex, multi-step tasks autonomously. \n\nThe Task tool launches specialized agents (subprocesses) that autonomously handle complex tasks. Each agent type has specific capabilities and tools available to it.\n\nAvailable agent types and the tools they have access to:\n- general-purpose: General-purpose agent for researching complex questions, searching for code, and executing multi-step tasks. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries use this agent to perform the search for you. (Tools: *)\n- statusline-setup: Use this agent to configure the user's Claude Code status line setting. (Tools: Read, Edit)\n- Explore: Fast agent specialized for exploring codebases. Use this when you need to quickly find files by patterns (eg. \"src/components/**/*.tsx\"), search code for keywords (eg. \"API endpoints\"), or answer questions about the codebase (eg. \"how do API endpoints work?\"). When calling this agent, specify the desired thoroughness level: \"quick\" for basic searches, \"medium\" for moderate exploration, or \"very thorough\" for comprehensive analysis across multiple locations and naming conventions. (Tools: All tools)\n- Plan: Software architect agent for designing implementation plans. Use this when you need to plan the implementation strategy for a task. Returns step-by-step plans, identifies critical files, and considers architectural trade-offs. (Tools: All tools)\n- claude-code-guide: Use this agent when the user asks questions (\"Can Claude...\", \"Does Claude...\", \"How do I...\") about: (1) Claude Code (the CLI tool) - features, hooks, slash commands, MCP servers, settings, IDE integrations, keyboard shortcuts; (2) Claude Agent SDK - building custom agents; (3) Claude API (formerly Anthropic API) - API usage, tool use, Anthropic SDK usage. **IMPORTANT:** Before spawning a new agent, check if there is already a running or recently completed claude-code-guide agent that you can resume using the \"resume\" parameter. (Tools: Glob, Grep, Read, WebFetch, WebSearch)\n\nWhen using the Task tool, you must specify a subagent_type parameter to select which agent type to use.\n\nWhen NOT to use the Task tool:\n- If you want to read a specific file path, use the Read or Glob tool instead of the Task tool, to find the match more quickly\n- If you are searching for a specific class definition like \"class Foo\", use the Glob tool instead, to find the match more quickly\n- If you are searching for code within a specific file or set of 2-3 files, use the Read tool instead of the Task tool, to find the match more quickly\n- Other tasks that are not related to the agent descriptions above\n\n\nUsage notes:\n- Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses\n- When the agent is done, it will return a single message back to you. The result returned by the agent is not visible to the user. To show the user the result, you should send a text message back to the user with a concise summary of the result.\n- You can optionally run agents in the background using the run_in_background parameter. When an agent runs in the background, you will need to use AgentOutputTool to retrieve its results once it's done. You can continue to work while background agents run - When you need their results to continue you can use AgentOutputTool in blocking mode to pause and wait for their results.\n- Each agent invocation is stateless. You will not be able to send additional messages to the agent, nor will the agent be able to communicate with you outside of its final report. Therefore, your prompt should contain a highly detailed task description for the agent to perform autonomously and you should specify exactly what information the agent should return back to you in its final and only message to you.\n- Agents with \"access to current context\" can see the full conversation history before the tool call. When using these agents, you can write concise prompts that reference earlier context (e.g., \"investigate the error discussed above\") instead of repeating information. The agent will receive all prior messages and understand the context.\n- The agent's outputs should generally be trusted\n- Clearly tell the agent whether you expect it to write code or just to do research (search, file reads, web fetches, etc.), since it is not aware of the user's intent\n- If the agent description mentions that it should be used proactively, then you should try your best to use it without the user having to ask for it first. Use your judgement.\n- If the user specifies that they want you to run agents \"in parallel\", you MUST send a single message with multiple Task tool use content blocks. For example, if you need to launch both a code-reviewer agent and a test-runner agent in parallel, send a single message with both tool calls.\n\nExample usage:\n\n<example_agent_descriptions>\n\"code-reviewer\": use this agent after you are done writing a signficant piece of code\n\"greeting-responder\": use this agent when to respond to user greetings with a friendly joke\n</example_agent_description>\n\n<example>\nuser: \"Please write a function that checks if a number is prime\"\nassistant: Sure let me write a function that checks if a number is prime\nassistant: First let me use the Write tool to write a function that checks if a number is prime\nassistant: I'm going to use the Write tool to write the following code:\n<code>\nfunction isPrime(n) {\n  if (n <= 1) return false\n  for (let i = 2; i * i <= n; i++) {\n    if (n % i === 0) return false\n  }\n  return true\n}\n</code>\n<commentary>\nSince a signficant piece of code was written and the task was completed, now use the code-reviewer agent to review the code\n</commentary>\nassistant: Now let me use the code-reviewer agent to review the code\nassistant: Uses the Task tool to launch the code-reviewer agent \n</example>\n\n<example>\nuser: \"Hello\"\n<commentary>\nSince the user is greeting, use the greeting-responder agent to respond with a friendly joke\n</commentary>\nassistant: \"I'm going to use the Task tool to launch the greeting-responder agent\"\n</example>\n",
      "input_schema": {
        "type": "object",
        "properties": {
          "description": {
            "type": "string",
            "description": "A short (3-5 word) description of the task"
          },
          "prompt": {
            "type": "string",
            "description": "The task for the agent to perform"
          },
          "subagent_type": {
            "type": "string",
            "description": "The type of specialized agent to use for this task"
          },
          "model": {
            "type": "string",
            "enum": ["sonnet", "opus", "haiku"],
            "description": "Optional model to use for this agent. If not specified, inherits from parent. Prefer haiku for quick, straightforward tasks to minimize cost and latency."
          },
          "resume": {
            "type": "string",
            "description": "Optional agent ID to resume from. If provided, the agent will continue from the previous execution transcript."
          },
          "run_in_background": {
            "type": "boolean",
            "description": "Set to true to run this agent in the background. Use AgentOutputTool to read the output later."
          }
        },
        "required": ["description", "prompt", "subagent_type"],
        "additionalProperties": false,
        "$schema": "http://json-schema.org/draft-07/schema#"
      }
    },
```

### 内置子代理 Built-in subagents

Claude Code 内置了一些 subagent，我们可以直接使用。

- claude-code-guide
- Plan
- Explore
- statusline-setup
- general-purpose

#### claude-code-guide

claude-code-guide subagent 用来帮助我们理解 Claude Code 的相关概念和基础用法。

```bash
指导我如何使用 Claude Code。
```

#### Plan

Plan subagent 让 Claude Code 可以按照我们的 prompt 意图，生成执行计划。

```bash
帮我规划一个从 vue-cli-service 迁移到 vite 的迁移方案。
```

#### Explore

Explore subagent 用来帮助我们探索代码库。

可以通过 prompt 指定探索的深度。

- quick: 快速探索
- medium: 中等探索，平衡速度和彻底性
- very thorough: 深度探索，对多处位置及不同命名方式进行全面分析，适用于目标可能藏在非预期位置的场景

- quick: 快速探索
- medium: 中等探索
- very thorough: 深度探索

```bash
Invokes Explore subagent with "medium" thoroughness，帮我查找【出行分】页面的相关的代码文件
```

#### statusline-setup

statusline-setup subagent 用来帮助我们设置 Claude Code 的 statusline。

```bash
帮我设置一下 Claude Code 的 statusline。
```

#### general-purpose

general-purpose subagent 是 Claude Code 的通用子代理，可以处理各种任务。

### 进阶用法 Advanced Usage

#### 链式调用子代理 Chaining subagents

对于复杂的任务，我们可以链式调用多个子代理来完成。

```markdown
Change the project’s build tool to the Vite toolchain.

> Note: the project is using Node 16.

<tasks>
- Use the **Explore subagent** to explore the codebase.
- Then use the **Plan subagent** to plan the migration tasks.
- Finally, use the **general-purpose subagent** to implement the migration task.
</tasks>
```

## 钩子 Hooks

Claude Code 的 Hooks 本质上是：在 Claude Code 生命周期的不同阶段自动执行的一组 shell 命令，用来做“确定性、可编程的行为控制”，而不是靠提示语让模型“自觉遵守”。

为什么用 Hooks 而不是 Prompt？

- Prompt 是“建议”，不一定每次都严格执行；
- Hook 是实际运行的程序逻辑，只要配置了就一定会跑，可测试、可版本管理。

### Hook Events Overview

Claude Code 提供了多种钩子事件，可以在不同的阶段执行不同的操作。

- PreToolUse
- PermissionRequest
- PostToolUse
- UserPromptSubmit
- Notification
- Stop
- SubagentStop
- PreCompact
- SessionStart
- SessionEnd

### Hooks 配置

### 通知 Hook（桌面通知）

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code 完成任务🚀\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

#### Javascript 代码格式化 Hook

目标是：每次 Edit/Write 工具写完文件后，如果是 .js 文件，就自动跑 prettier。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | { read file_path; if echo \"$file_path\" | grep -q '\\.js$'; then npx prettier --write \"$file_path\"; fi; }"
          }
        ]
      }
    ]
  }
}
```

## 插件与插件市场 Plugins & Marketplace

插件是 Claude Code 的扩展机制，可以让我们扩展 Claude Code 的功能。

插件市场是 Claude Code 的插件的一个集合，用户可以添加一个插件市场，然后在这个市场里寻找自己想要的插件。也可以安装其他众多的插件市场，然后在不同的市场选择自己想要的插件安装使用。

## 附录 Appendix

[Claude Code: Best practices for agentic coding](https://www.anthropic.com/engineering/claude-code-best-practices)

[Awesome Claude Skills](https://github.com/travisvn/awesome-claude-skills)
