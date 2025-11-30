# Shell 启动顺序

## Login Shell

```shell
/etc/profile 

# 仅仅加载找到的第一个文件
→ ~/.bash_profile
→ ~/.bash_login
→ ~/.profile 
```

~/.bash_profile 和 ~/.bash_login 是 Bash 专用的。
~/.profile 是更通用的登录 shell 文件，可以被其他 shell 使用。
如果 ~/.bash_profile 引用了 ~/.bashrc，还会加载 ~/.bashrcchrom。

## Non-Login Shell

```shell
/etc/profile or /etc/bash.bashrc

~/.bashrc                                                              
```
