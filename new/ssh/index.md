# SSH

## SSH

SSH（Secure Shell）是一种网络协议，用于安全地远程管理和访问计算机。它通过加密和认证机制提供安全的通信通道，使用户能够在不安全的网络中进行安全的远程操作。SSH 常用于远程登录到服务器、执行命令和传输文件，确保数据在传输过程中的安全性和隐私性。

## OpenSSH

OpenSSH(OpenBSD Secure Shell) 是一个开源的工具包，用于实现安全的网络通信。它是 SSH（Secure Shell）协议的免费实现，用于在网络上提供加密的通信，从而提高数据传输的安全性和隐私性。OpenSSH 最初由 OpenBSD 项目开发和维护，现在已经成为许多类 Unix 操作系统和其他平台的标准组件。

OpenSSH 起源于 1999 年，由 OpenBSD 项目的开发人员创建，以替代当时的商业化 SSH 实现。OpenSSH 的主要开发者之一是 Theo de Raadt。随着时间的推移，它迅速获得了广泛采用，成为几乎所有 Unix 和类 Unix 系统的默认 SSH 工具。

OpenSSH 基于客户端-服务器模型工作。客户端通过 ssh（ssh client）向服务器发送连接请求。服务器端的 sshd（ssh daemon）守护进程接收请求，执行身份验证，并建立加密的会话。数据在会话中经过加密和解密，确保了通信的保密性和完整性。

### OpenSSH 包含的一系列组件

#### 客户端和服务器

- ssh (ssh client): ssh 是 OpenSSH 的客户端工具，用于远程登录到运行 sshd 的服务器。
- sshd (ssh daemon): sshd 是 OpenSSH 的服务器端守护进程，它监听来自客户端的连接请求，并处理身份验证和会话管理。

#### 密钥生成和管理

- ssh-keygen (ssh key 生成): ssh-keygen 用于生成、管理和转换 SSH 密钥对。
- ssh-agent (ssh key 管理): ssh-agent 用于管理 SSH 密钥，提供密钥的缓存和自动认证功能。
- ssh-add (ssh key 添加): ssh-add 用于将 SSH 密钥添加到 ssh-agent 中。

#### 文件传输

- scp (Secure Copy): scp 是一个基于 SSH 的文件传输工具，用于在本地和远程主机之间安全地复制文件。
- sftp (Secure File Transfer Protocol): sftp 是一个基于 SSH 的文件传输协议，提供了一个交互式的文件传输会话。

``` mermaid
sequenceDiagram
    participant Client as SSH Client
    participant Server as SSH Server

    Client->>Server: TCP Connect Request (port 22)
    Server-->>Client: TCP Connect Acknowledge

    Client->>Server: Protocol Version Exchange ("SSH-2.0-...")
    Server-->>Client: Protocol Version Exchange ("SSH-2.0-...")

    Client->>Server: Algorithm Negotiation (encryption, MAC, compression)
    Server-->>Client: Algorithm Agreement

    Client->>Server: Key Exchange Initiation
    Server-->>Client: Key Exchange Reply
    loop Key Exchange Process
        Client->>Server: DH/ECDH Public Key
        Server-->>Client: DH/ECDH Public Key
        Client->>Server: Shared Secret Confirmation
        Server-->>Client: Shared Secret Confirmation
    end

    Server->>Client: Host Key Offer (server's public key)
    Client-->>Server: Host Key Verification (accept/reject)

    Client->>Server: User Authentication Request (password, publickey, etc.)
    alt Password Authentication
        Server-->>Client: Password Prompt
        Client->>Server: Password Submission
        Server-->>Client: Authentication Success/Failure
    else Public Key Authentication
        Client->>Server: Signature Challenge Response
        Server-->>Client: Authentication Success/Failure
    end

    Client->>Server: Session Creation Request
    Server-->>Client: Session Establishment Confirmation

    Client->>Server: Command Execution or Service Request
    Server-->>Client: Command Output or Service Response

    Client->>Server: Close Connection Request
    Server-->>Client: Connection Closed Acknowledge

```
