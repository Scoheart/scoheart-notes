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

```
