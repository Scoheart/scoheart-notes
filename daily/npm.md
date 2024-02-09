# file system

- sector
- block
- inode
- link

# inode

## inode 的内容

## inode 的大小

理解 inode，要从文件储存说起。

文件储存在硬盘上，硬盘的最小存储单位叫做"扇区"（Sector）。每个扇区储存 512 字节（相当于 0.5KB）。

操作系统读取硬盘的时候，不会一个个扇区地读取，这样效率太低，而是一次性连续读取多个扇区，即一次性读取一个"块"（block）。这种由多个扇区组成的"块"，是文件存取的最小单位。"块"的大小，最常见的是 4KB，即连续八个 sector 组成一个 block。

文件数据都储存在"块"中，那么很显然，我们还必须找到一个地方储存文件的元信息，比如文件的创建者、文件的创建日期、文件的大小等等。这种储存文件元信息的区域就叫做 inode，中文译名为"索引节点"。

每一个文件都有对应的 inode，里面包含了与该文件有关的一些信息。

## 目录文件

## 查看文件内容的过程

file name -> inode number -> inode -> block -> file content

## 链接 link

```bash
ln -s a b
ln a b
```

### 符号链接/软链接 Symbol link

### 硬链接 hard link

# npm

## npm 下载路径

### Unix-like

```bash
/usr/local/lib/node_modules
```

### Windows

```powershell
C:\Users\{your-username}\AppData\Roaming\npm\node_modules
```

## config

### prefix

```bash
# Unix-like
/usr/local

# Windows
%AppData%\npm
```

### node_modules

```bash

# Unix-like
{prefix}/lib/node_modules

# Windows
{prefix}\node_modules
```

### Executables

```bash
# Unix-like
{prefix}/bin/

# Windows
{prefix}
```

### Caches

```bash
# Unix-like
~/.npm

# Windows
%LocalAppData%\npm-cache

```

## npm install 过程

1. 下载包到 cache
2. unpacked 到 node_modules
3. bin 文件被链接到 bin 目录

# nodejs CLI

- 命令行参数解析
  - commander
  - yargs
  - minimist
  - cac
  - meow
  - optimist
- 命令行交互
  - inquirer
  - prompts
  - enquirer
- 命令行输出美化
  - chalk
  - colors
  - picocolors

# 问题预留

1. 什么是操作系统上的环境变量

- 所有用户的环境变量（系统变量）
- 单个用户的环境变量（用户变量）
  - login shell （profile -> su -）
  - non login shell （rc -> su ）
- 环境变量的配置文件

2. 环境变量之一 PATH

3. 执行 shell 脚本的不同方式

- 当前进程执行
  - source filename.sh
  - . filename.sh
- 当前进程的子进程执行
  - ./filename.sh 不指定解释器（Sharp Bang）
  - bash filename.sh 指定解释器（bash）

> https://tecadmin.net/difference-between-login-and-non-login-shell/

# 用户和权限管理

- useradd
- userdel
- passwd
- usermod
- chage
- id

- root 用户
- 普通用户

## 创建用户的过程

创建用户 -》指定密码

- /etc/passwd 用户信息
- /etc/shadow 用户密码
- 用户组

# 用户组

- groupadd
- groupdel

# 管道

- 管道符 |

> 一个进程打开的时候，会有一个标准输入、一个标准输出和一个错误输出

# 重定向

- 输入重定向 <
- 输出重定向 >
- 追加重定向 >>
- 错误重定向 2>
- &> 输出和错误重定向
- 合并重定向 1>&2
