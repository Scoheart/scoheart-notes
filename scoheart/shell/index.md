## 🧩 Zsh 配置文件加载顺序

| 配置文件       | 加载时机                     | 建议用途说明                                   |
|----------------|------------------------------|------------------------------------------------|
| `~/.zshenv`    | **所有 zsh 启动都会加载**   | 设置最基础的环境变量（如 `PATH`），推荐最小化 |
| `~/.zprofile`  | **登录 shell 加载**         | 设置环境变量（如 Homebrew、rbenv 初始化）     |
| `~/.zshrc`     | **交互式 shell 加载**       | 设置 alias、命令提示符、shell 美化等          |
| `~/.zlogin`    | **登录 shell 加载（最后）** | 一般不推荐使用，除非有特定登录逻辑            |
| `~/.zlogout`   | **登录 shell 退出时加载**   | 可做退出清理等                                 |

---

## 🧪 Zsh 启动模式下加载行为对照表

| 启动方式                | 是登录 shell？ | 是交互 shell？ | 加载文件                                           |
|-------------------------|----------------|----------------|----------------------------------------------------|
| 打开 Terminal.app       | ✅ 是           | ✅ 是           | `.zshenv` → `.zprofile` → `.zshrc` → `.zlogin`     |
| 执行 `zsh`              | ❌ 否           | ✅ 是           | `.zshenv` → `.zshrc`                                |
| 执行 `zsh -l`           | ✅ 是           | ❌ 否           | `.zshenv` → `.zprofile` → `.zlogin`                |
| 执行 `zsh -i`           | ❌ 否           | ✅ 是           | `.zshenv` → `.zshrc`                                |
| 执行 `zsh -li`          | ✅ 是           | ✅ 是           | `.zshenv` → `.zprofile` → `.zshrc` → `.zlogin`     |
| 执行脚本 `zsh script.sh`| ❌ 否           | ❌ 否           | `.zshenv`                                           |