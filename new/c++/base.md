# 基础知识

## 文件类型

### 静态链接库
- Windows: `.lib`
- Linux: `.a`
- macOS: `.a`

### 动态链接库
- Windows: `.dll`
- Linux: `.so`
- macOS: `.dylib`

### 可执行文件
- Windows: `.exe`
- Linux: *无扩展名*
- macOS: *无扩展名*

## C++ 标准库实现
| 标准库 | 适用编译器 | 说明 |
|--------|------------|------|
| GNU libstdc++ | GCC, Clang | GNU C++ Standard Library |
| LLVM libc++ | Clang | LLVM C++ Standard Library |
| MSVC STL | MSVC | Microsoft Visual C++ Standard Library |
| Dinkumware | Intel C++ | Dinkumware C++ Standard Library |
| STLport | GCC, Clang | - |
| EASTL | GCC, Clang | Electronic Arts Standard Template Library |

## 主流 C++ 编译器及其标准库

### GCC (GNU Compiler Collection)
- **编译器**：g++
- **标准库**：libstdc++
- **特点**：
  - GNU 项目提供的 C++ 标准库实现
  - 与 GCC 密切集成
  - 支持最新的 C++ 标准（C++20、C++23）
  - 持续更新跟进最新标准

### Clang
- **编译器**：clang++
- **标准库**：libc++
- **特点**：
  - LLVM 项目的组成部分
  - 提供高性能的标准库实现
  - 广泛应用于 macOS 和 iOS 开发
  - 注：虽可与 libstdc++ 兼容，但默认使用 libc++

### MSVC (Microsoft Visual C++)
- **编译器**：cl.exe
- **标准库**：Microsoft STL
- **特点**：
  - 集成于 Visual Studio
  - 支持最新 C++ 标准
  - 针对 Windows 平台优化

### Intel C++ Compiler (ICPC)
- **编译器**：icpc
- **标准库**：依赖主机系统标准库
- **特点**：
  - 可使用 libstdc++ 或 Microsoft STL
  - 可能提供优化版本

### MinGW (Minimalist GNU for Windows)
- **编译器**：g++（基于 GCC）
- **标准库**：libstdc++
- **特点**：
  - Windows 平台的 GCC 工具链
  - 支持 GNU 工具开发环境

### Cygwin
- **编译器**：g++（基于 GCC）
- **标准库**：libstdc++
- **特点**：
  - 提供 Windows 上的类 Unix 环境
  - 包含完整 GNU 工具链