# 编程语言的分类

编程语言的分类有很多种，这里介绍几种常见的分类方式。

## 按抽象层次分类

- 机器语言

机器语言又称二进制代码语言，直接用二进制代码指令来表示，是计算机能够直接识别和执行的语言。

> 举例，二进制指令“10110000”：可能表示将一个值存储到特定的内存地址。

- 低级语言（汇编语言）

汇编语言是一种低级语言，它使用英文单词或其缩写等助记符，来表示机器语言的二进制代码指令，比机器语言更易于理解、记忆和编写。使用汇编语言编辑的程序需要通过汇编程序的翻译，将汇编语言程序转换成机器语言程序，然后，才能在计算机的硬件系统中执行。

> 举例，汇编指令“MOV A, 1”：表示将值 1 移动到寄存器 A 中。

- 高级语言（C、C++、Java、Python、JavaScript、Go、Rust、Swift、Kotlin 等）

高级语言是一种更接近自然语言和人类思维方式的编程语言，它使用更抽象的语法和语义来表示程序逻辑，比汇编语言更易于编写和理解。通常，高级语言需要经过编译器或解释器翻译成机器语言程序，然后才能在计算机的硬件系统中执行。

> 举例，Python 代码“print("Hello, World!")”：表示打印“Hello, World!”。

## 按照翻译方式分类

由于计算机无法直接理解和执行高级语言程序，需要将高级语言程序翻译成机器语言程序，才能在计算机上运行。而高级语言的翻译程序通常有两种：编译程序（编译器 Compiler）或解释程序（解释器 Interpreter）。

- 编译型语言

编译型语言的源代码需要通过编译器翻译成机器语言程序，然后才能在计算机上运行。

> 例如，C、C++、Rust、Go、Swift、Kotlin、Objective-C、Dart 等语言。

- 解释型语言

对于解释型语言，解释器将源代码中的语句按执行顺序逐条解释成机器语言指令并执行。

> 例如，Python、JavaScript、Ruby、PHP、Perl、Shell 等语言。

# 从源代码翻译成机器语言（二进制可执行程序）的过程

据上，我们介绍了编程语言的分类，以及在高级语言中源代码的几种不同的翻译方式。那么，现在我们通过一些具体的示例来看看源代码翻译成二进制可执行程序的具体过程。

## 解释型语言 - Python 示例

首先，通过 Python 语言来举例。按翻译方式分类，Python 是一种解释型语言。所以，Python 的源代码需要通过解释器将源代码中的语句按执行顺序逐条解释成机器语言指令并执行。

### 常见的 Python 解释器

- **CPython**：最常用的 Python 解释器，使用 C 语言编写。作为 Python 官方的实现，CPython 支持大多数 Python 语言的特性和库，包括标准库和第三方库，能够处理复杂的数据结构和多线程操作，广泛应用于各种开发项目中。
- **PyPy**：一个快速的 Python 解释器，使用 JIT（即时编译）技术来提高执行速度。PyPy 通过动态分析代码并在运行时编译热点代码，显著减少了程序的执行时间，特别适合需要高性能的应用程序，如科学计算和数据分析。
- **Jython**：在 Java 平台上运行的 Python 解释器，能够与 Java 代码无缝集成。Jython 允许开发者在 Python 代码中直接调用 Java 类和库，使得 Python 开发者可以利用 Java 的强大生态系统，适合需要与 Java 应用程序交互的场景。
- **IronPython**：在 .NET 平台上运行的 Python 解释器，支持与 .NET 代码的互操作。IronPython 允许开发者在 .NET 环境中使用 Python 语言编写应用程序，并能够直接访问 .NET 框架的类和功能，适合需要与 .NET 应用程序集成的项目。
- **MicroPython**：为微控制器和嵌入式系统设计的轻量级 Python 解释器。MicroPython 提供了一个简化的 Python 3 版本，能够在资源有限的设备上运行，支持硬件控制和传感器交互，广泛应用于物联网（IoT）和嵌入式开发中。

Python 有多种解释器实现，每种解释器都有其特定的用途和优势。更多的实现可以参考[官网的这个页面](https://www.python.org/download/alternatives/)。而通常绝大多数的 Python 开发者使用的是 CPython。也就是我们在 Python 的[官网 - python.org](https://www.python.org/downloads/)上下载的 Python 解释器。

当我们下载并安装好 CPython 解释器后，我们就可以通过解释器翻译并执行 Python 源代码了。并且通常我们在开发 Python 程序时，会把源代码编辑在一个以 `.py` 为扩展名的文件中，以更好地标识这是一个 Python 源代码文件。

> **补充说明**：虽然将源代码编辑在 `.py` 文件中是最佳实践，但实际上，Python 解释器并不依赖于文件扩展名来判断文件内容。只要文件内容符合 Python 语法规则，解释器就可以执行它。因此，源代码也可以保存在其他扩展名的文件中，例如 `.txt`，甚至没有扩展名，更甚可以是 `.java`、`.go`、`.js` 等扩展名的文件（何尝不是一种 NTR 🐶），但这可能会导致混淆和不便于管理。此外，使用 `.py` 扩展名还有助于代码编辑器和 IDE 提供语法高亮和自动补全等功能，从而提高开发效率。

例如，我们创建一个 `hello.py` 文件，然后输入以下代码：

```python
print("Hello, Python! From Source Code To Binary Executable!")
```

然后，我们就可以通过命令行进入到该文件所在的目录，并且在该目录下执行以下命令：

```bash
python hello.py

'''
而这里如果我们在之前创建的是一个 `hello.txt` 文件
并且内容与 `hello.py` 文件相同，都是 `print("Hello, World!")
那么，我们执行 `python hello.txt` 命令时，也可以得到相同的结果
'''
```

这时，Python 解释器就会翻译并执行该源代码文件，同时，我们也就可以在命令行中看到如下的输出结果：

```bash
Hello, Python! From Source Code To Binary Executable!
```

这就是一个解释型语言从源代码翻译成机器语言（二进制可执行程序）的过程的示例。

### Python 解释器的补充扩展

除了通过 Python 解释器直接翻译并执行源代码编写的文件外，我们还可以通过 Python 解释器来交互式地执行 Python 代码。这种方式被称为 REPL（Read-Eval-Print Loop），即读取-求值-打印循环。很多语言的解释器都支持这种模式，例如 Python、Lua、Ruby、Perl、JavaScript 等。在这种模式下，解释器会逐行解释并执行输入的 Python 代码，用户可以即时看到代码的执行结果。

要进入 Python 解释器的交互模式，可以直接在命令行中输入以下命令：

```bash
python
```

这时，Python 解释器会进入交互模式，并显示一个提示符 `>>>`，具体的展示可以参考如下：

```bash
Python 3.12.5 (v3.12.5:ff3bc82f7c9, Aug  7 2024, 05:32:06) [Clang 13.0.0 (clang-1300.0.29.30)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

然后，我们就可以在提示符 `>>>` 后输入 Python 代码，解释器会逐行解释并执行这些代码。例如：

```bash
>>> print("Hello, Python!")
Hello, Python!
>>>
```

如果想要继续输入更多的代码，可以继续在提示符 `>>>` 后输入代码，解释器会逐行解释并执行这些代码。而想要退出 Python 解释器的交互模式，可以输入 `exit()` 函数，或者直接按 `Ctrl+D` 组合键。

## 编译型语言 - C 示例

首先，按翻译方式分类，C 是一种编译型语言。所以，C 的源代码需要通过编译器翻译成机器语言程序，然后才能在计算机上运行。

### 常见的 C 编译器

- **GCC**：GNU Compiler Collection，是一个开源的编译器集合，支持多种编程语言，包括 C、C++、Objective-C、Fortran 等。GCC 广泛应用于各种操作系统（如 Linux、Windows、macOS）和嵌入式系统中，是 C 和 C++ 程序的常用编译器。
- **Clang**：由 LLVM 项目开发的编译器，专注于 C、C++、Objective-C 等语言的编译。Clang 以其高性能和低资源消耗而闻名，支持多种平台，包括 Windows、macOS、Linux 等。Clang 是苹果公司官方推荐的编译器，广泛应用于苹果的开发工具链中。
- **MSVC**：Microsoft Visual C++，是微软公司开发的编译器，专门用于 C 和 C++ 语言的编译。MSVC 是 Windows 平台上最常用的编译器之一，与 Visual Studio 集成紧密，支持 Windows API 和 Windows 特有的扩展。

C 语言有多种编译器实现，每种编译器都有其特定的用途和优势。更多的实现可以参考[Wikipedia 的这个页面](https://en.wikipedia.org/wiki/List_of_compilers#C_compilers)。这里我们以 GCC 为例，来看看 C 语言的源代码翻译成机器语言（二进制可执行程序）的过程。

我们创建一个 `hello.c` 文件，然后输入以下代码：

```c
#include <stdio.h>

int main() {
    printf("Hello, C! From Source Code To Binary Executable!\n");
    return 0;
}
```

然后，我们就可以通过命令行进入到该文件所在的目录，并且在该目录下执行以下命令：

```bash
gcc hello.c -o hello
```

这时，GCC 编译器就会编译该源代码文件，并且在该目录下生成一个名为 `hello` 的二进制可执行文件。然后，我们就可以通过命令行进入到该文件所在的目录，并且在该目录下执行以下命令：

```bash
./hello
```

这时，我们就可以在命令行中看到如下的输出结果：

```bash
Hello, C! From Source Code To Binary Executable!
```

这就是一个编译型语言从源代码翻译成机器语言（二进制可执行程序）的过程的示例。

### C 语言编译过程补充扩展（与上述阐述的东西无关，扩展 C 语言的编译过程）

C 语言的编译过程通常包括以下几个步骤：

- 预处理（Preprocessing）：
  - 读取源代码文件，进行宏替换、条件编译、头文件包含等操作。
  - 生成一个临时的预处理文件，通常以 `.i` 为扩展名。
- 编译（Compilation）：
  - 将预处理后的代码转换为汇编语言代码。
  - 生成一个临时的汇编文件，通常以 `.s` 为扩展名。
- 汇编（Assembly）：
  - 将汇编语言代码转换为机器语言代码。
  - 生成一个临时的目标文件，通常以 `.o` 为扩展名。
- 链接（Linking）：
  - 将目标文件与库文件进行链接，生成最终的二进制可执行文件。
  - 生成一个最终的二进制可执行文件，通常以 `.exe` 为扩展名（在 Windows 上）或不带扩展名（在 Linux 和 macOS 上）。

那么，通过 GCC 编译器编译 C 语言源代码文件时，上述的几个步骤分别对应的命令如下：

```bash
# 预处理 -E 选项表示预处理，-o 选项表示输出文件。
gcc -E hello.c -o hello.i

# 编译 -S 选项表示编译，-o 选项表示输出文件。
gcc -S hello.i -o hello.s

# 汇编 -c 选项表示汇编，-o 选项表示输出文件。
gcc -c hello.s -o hello.o

# 链接 -o 选项表示输出文件。
gcc hello.o -o hello

# 执行
./hello
```

# 环境变量

环境变量是操作系统在运行程序时设置的变量，用于指定程序运行时的各种配置信息。这些变量在程序执行期间提供了重要的上下文信息，影响程序的行为和性能。环境变量可以用于指定程序的搜索路径、工作目录、库文件路径等，从而确保程序能够找到所需的资源和依赖项。

环境变量的设置通常在操作系统启动时进行，用户也可以在终端或命令行中手动设置或修改这些变量。通过合理配置环境变量，用户可以优化程序的运行环境，避免因路径错误或缺少依赖而导致的运行时错误。

## 常见的环境变量及其详细说明

- **PATH**：指定可执行文件的搜索路径。当用户在命令行中输入一个命令时，操作系统会在这个路径中查找相应的可执行文件。通过在 PATH 中添加自定义路径，用户可以方便地运行自定义脚本或程序。
- **HOME**：指定用户的主目录。这个变量通常用于指向用户的个人文件夹，许多程序会默认在此目录下查找配置文件和数据文件。
- **USER**：指定当前用户的用户名。这个变量在多用户系统中非常重要，许多程序会根据这个变量来确定当前用户的权限和访问控制。
- **LANG**：指定系统的语言和编码。这个变量影响程序的本地化设置，决定了程序的界面语言和文本编码方式，确保用户能够以其母语使用软件。

## 环境变量的分类

- **用户环境变量**：这些变量通常在用户的主目录下设置，例如 `.bashrc` 或 `.bash_profile` 文件中。用户环境变量只对当前用户有效，当用户登录或启动新终端时，这些变量会被加载到当前会话中。
- **系统环境变量**：这些变量在系统范围内设置，通常在 `/etc/environment` 文件中配置。系统环境变量对所有用户和所有终端会话都有效，当系统启动时，这些变量会被加载到系统环境中。

## 如何设置环境变量

# 二进制可执行程序

二进制可执行程序是计算机系统中的一种特殊类型的文件，用于在计算机上运行程序。它们是编译后的机器语言代码，可以直接在计算机上执行，而不需要额外的解释或翻译过程。二进制可执行程序通常以 `.exe` 为扩展名（在 Windows 上）或不带扩展名（在 Linux 和 macOS 上）。

## 二进制可执行程序的类型

- **Windows 可执行文件**：

  - `.exe`：Windows 操作系统上最常见的可执行文件扩展名。
  - `.dll`：动态链接库文件，包含可被多个程序共享的代码和数据。
  - `.sys`：设备驱动程序文件，用于与硬件设备进行通信。

- **Linux 和 macOS 可执行文件**：
  - 不带扩展名：在 Linux 和 macOS 上，可执行文件通常不带扩展名。
  - `.bin`：一些嵌入式系统中常见的可执行文件扩展名。
  - `.out`：编译器生成的可执行文件扩展名。
  - `.app`：macOS 上应用程序的可执行文件扩展名。

## 二进制可执行程序的运行

- 通过图形化界面（GUI）直接点击运行
- 通过命令行接口（CLI）输入命令运行

无论哪种方式，我们既然要运行一个二进制可执行程序，那么，我们就一定需要找到这个二进制可执行程序在计算机文件系统中的位置。然后，在通过 GUI 点击运行或者 CLI 输入命令的方式运行这个二进制可执行程序。

在 Windows 操作系统中，可以通过图形化的文件资源管理器来找二进制可执行程序的文件位置。而 macOS 中也可以通过图形化的 Finder 来找二进制可执行程序的文件位置。而在 Linux 操作系统的图形化界面发行版中，也可以通过图形化的文件资源管理器来找二进制可执行程序的文件位置。但是这都需要我们手动去找到这个二进制可执行程序的文件位置。如果这个二进制可执行程序的文件位置我们记不住，那么每次执行的时候，就要花费很多时间去找这个二进制可执行程序的文件位置。借助图形化界面来找二进制可执行程序的文件位置，虽然方便，但是效率低下。并且，如果在没有图形化界面的操作系统中，寻找我们需要的二进制可执行程序的文件位置，可能就会更加耗时。

那么，有没有一种方法，可以让我们随时随地都可以快速地找到并运行我们需要的二进制可执行程序呢？那就可以借助 命令行+环境变量 来实现。

在命令行中，执行的每一条命令，都是由操作系统中的一个可执行程序来解释执行的。而在操作系统中，有一类可执行程序，它的作用就是用来解释执行命令行中的命令。这类可执行程序就是 Shell。而 Shell 中最常用的就是 Bash。所以，我们这里以 Bash 为例。

> - **_作者_**: Scoheart
> - **_日期_**: 2024.04.10 06:57:00 UTC
> - **_最后更新_**: 2024.04.10 06:57:00 UTC
> - **_辅助工具_**: Cursor(Editor)、GPT-4o(LLM)、Google(Search Engine)
> - **_参考资料_**:
>   - [Wikipedia - C compilers](https://en.wikipedia.org/wiki/List_of_compilers#C_compilers)
>   - [Python - Alternative Python Implementations](https://www.python.org/download/alternatives/)
> - **_注_**: 自由转载，转载请注明出处，感谢