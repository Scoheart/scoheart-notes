```bash
project/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/project/
│       │       ├── common/
│       │       ├── config/
│       │       ├── controller/
│       │       ├── dto/
│       │       ├── entity/
│       │       ├── filter/
│       │       ├── handler/
│       │       ├── mapper/
│       │       ├── repository/
│       │       ├── security/
│       │       ├── service/
│       │       │   └── impl/
│       │       ├── util/
│       │       └── ProjectApplication.java
│       └── resources/
│           ├── application.yml
│           ├── mapper/           # Mapper XML 文件
│           └── static/           # 静态资源（如 Swagger UI）
```

```bash
src/main/java/com/example/project/
├── common/                     # 通用类（统一响应、常量、枚举等）
│   ├── CommonResponse.java
│   ├── ResultCode.java          # 状态码枚举
│   ├── Constants.java           # 常量定义
│   └── ApiException.java        # 自定义异常类

├── config/                     # 配置类（Security、CORS、Swagger 等）
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   └── SwaggerConfig.java

├── controller/                 # 控制层（REST 接口）
│   ├── AuthController.java
│   └── UserController.java

├── dto/                        # 数据传输对象（Request / Response）
│   ├── LoginRequest.java
│   ├── LoginResponse.java
│   └── UserDto.java

├── entity/                     # 实体类（与数据库映射）
│   └── User.java

├── filter/                     # 自定义过滤器（如：JWT）
│   └── JwtAuthenticationFilter.java

├── handler/                    # 全局处理器（响应封装、异常处理等）
│   ├── GlobalResponseHandler.java
│   └── GlobalExceptionHandler.java

├── mapper/                     # MyBatis Mapper 接口
│   └── UserMapper.java

├── service/                    # 业务逻辑层
│   ├── AuthService.java
│   ├── UserService.java
│   └── impl/
│       ├── AuthServiceImpl.java
│       └── UserServiceImpl.java

├── util/                       # 工具类（JWT、密码加密、时间处理等）
│   ├── JwtUtil.java
│   ├── PasswordUtil.java
│   └── DateUtil.java

├── repository/                 # 数据访问层（可以与 mapper 合并或用于 JpaRepository）
│   └── UserRepository.java

├── security/                   # Spring Security 相关类（用户详情、自定义认证等）
│   ├── CustomUserDetails.java
│   └── CustomUserDetailsService.java

└── ProjectApplication.java     # 主启动类
```

```bash

```

```bash
src/
└── main/
    ├── java/
    │   └── com/
    │       └── yourcompany/
    │           └── yourproject/
    │               ├── common/                  # 通用封装（响应体、常量、枚举、异常定义等）
    │               │   ├── api/                 # 统一 API 响应封装类
    │               │   ├── constant/            # 常量定义
    │               │   ├── enums/               # 枚举定义
    │               │   └── exception/           # 自定义异常类
    │               │
    │               ├── config/                  # 项目配置类
    │               │   ├── SecurityConfig.java  # Spring Security 配置
    │               │   ├── SwaggerConfig.java   # SpringDoc 配置
    │               │   └── CorsConfig.java      # 跨域配置
    │               │
    │               ├── controller/              # 控制层
    │               │   └── AuthController.java
    │               │   └── UserController.java
    │               │
    │               ├── dto/                     # 数据传输对象 DTO
    │               │   ├── LoginRequest.java
    │               │   ├── LoginResponse.java
    │               │   └── UserDTO.java
    │               │
    │               ├── entity/                  # 实体类（数据库映射）
    │               │   └── User.java
    │               │
    │               ├── mapper/                  # MyBatis-Plus Mapper 接口
    │               │   └── UserMapper.java
    │               │
    │               ├── service/                 # 服务接口和实现
    │               │   ├── UserService.java
    │               │   └── impl/
    │               │       └── UserServiceImpl.java
    │               │
    │               ├── security/                # JWT & Spring Security 相关逻辑
    │               │   ├── JwtAuthenticationFilter.java
    │               │   ├── JwtUtil.java
    │               │   ├── CustomUserDetailsService.java
    │               │   └── SecurityEntryPoint.java  # 认证失败处理
    │               │
    │               ├── handler/                 # 全局异常和统一响应处理
    │               │   ├── GlobalExceptionHandler.java
    │               │   └── GlobalResponseHandler.java
    │               │
    │               ├── YourProjectApplication.java  # 启动类
    │
    └── resources/
        ├── application.yml
        ├── mapper/                   # 存放 XML（如果使用 XML 方式）
        │   └── UserMapper.xml
        └── static/                   # 静态资源（如上传图片）
```
