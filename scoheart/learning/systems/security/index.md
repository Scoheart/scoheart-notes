# Symmetric Encryption

### Node.js AES 工作模式一览表

| 工作模式 | 全称 (英文) | Node.js 标识符 | 是否认证加密 | 填充要求 | IV 长度 | 安全等级 | 主要应用场景 | 特点 |
|---------|------------|----------------|-------------|---------|--------|---------|------------|------|
| **ECB** | Electronic Codebook | `aes-256-ecb` | ❌ | ✅ | ❌ | ⚠️ **危险** | 禁止使用 | 相同输入→相同输出 |
| **CBC** | Cipher Block Chaining | `aes-256-cbc` | ❌ | ✅ | 16字节 | ★★★ | 传统系统兼容 | 最常用，需配合HMAC |
| **CTR** | Counter | `aes-256-ctr` | ❌ | ❌ | 16字节 | ★★★★ | 文件/流加密 | 无填充，并行处理 |

| **GCM** | Galois/Counter Mode | `aes-256-gcm` | ✅ | ❌ | 12字节 | ★★★★★ | TLS/SSL、API通信 | 内置认证标签，高性能 |
| **CCM** | Counter with CBC-MAC | `aes-256-ccm` | ✅ | ❌ | 7-13字节 | ★★★★ | 物联网设备 | 需预知数据长度 |
| **OCB** | Offset Codebook Mode | `aes-256-ocb` | ✅ | ❌ | 12字节 | ★★★★ | 替代GCM | 更高效，专利过期 |
| **XTS** | XEX-based Tweaked Codebook | `aes-256-xts` | ❌ | ❌ | 16字节 | ★★★★ | 磁盘加密 | 需双倍长度密钥 |
| **CFB** | Cipher Feedback | `aes-256-cfb` | ❌ | ❌ | 16字节 | ★★ | 流式传输 | 自同步流密码 |
| **CFB8** | - | `aes-256-cfb8` | ❌ | ❌ | 16字节 | ★★ | 字节流处理 | 按字节操作 |
| **OFB** | Output Feedback | `aes-256-ofb` | ❌ | ❌ | 16字节 | ★★ | 错误敏感场景 | 错误传播少 |
| **WRAP** | Key Wrapping | `aes256-wrap` | ❌ | ❌ | ❌ | ★★★ | 密钥封装 | RFC 3394标准 |

### 图例说明
- ✅：支持该特性  
- ❌：不支持该特性  
- ⚠️：安全风险  
- ★：安全等级（★越多越安全）  

### 关键注释
1. **认证加密**：GCM/CCM/OCB 提供加密+完整性验证一体化  
2. **填充要求**：
   - PKCS#7 填充：CBC/ECB 必需  
   - CTR/GCM/CCM/OCB/XTS：流模式无需填充  
3. **特殊要求**：
   ```javascript
   // XTS 模式需要双倍密钥
   const key = crypto.randomBytes(64); // 512位 for aes-256-xts
   
   // CCM 需指定认证标签长度
   const cipher = crypto.createCipheriv('aes-256-ccm', key, iv, {
     authTagLength: 16 // 必须设置
   });

- Secret Key
- Encryption Algorithm
    - AES
    - DES
    - 3DES
    - RC4
    - RC5
    - RC6
    - Blowfish
    - Twofish
    - Serpent
    - IDEA
- Cipher Mode
    - ECB
    - CBC
    - CFB
    - OFB
    - CTR
- Initialization Vector
- Padding Scheme
    - PKCS#5
    - PKCS#7
    - ANSI X9.23
    - ISO 10126