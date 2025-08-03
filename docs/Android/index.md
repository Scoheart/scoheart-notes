#

## project structure

``` bash
android
├── app
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com.example.myapp
│   │   │   │       └── MainActivity.java
│   │   │   └── res
│   │   │       └── layout
│   │   │           └── activity_main.xml
│   │   └── test
│   │       └── java
│   │           └── com.example.myapp
│   │               └── MainActivityTest.java
│   └── build.gradle
├── gradle
│   └── wrapper
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle / settings.gradle.kts
├── build.gradle / build.gradle.kts
```


``` bash
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH="$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH"

emulator -list-avds

# 启动 emulator（如果没起的话，可改成已在跑的）
emulator -avd Pixel_6_API_34 &

# 等待 device
adb wait-for-device

# 构建
./gradlew :app:assembleDebug

# 安装
adb uninstall com.example.mycomposeapp
adb install -r app/build/outputs/apk/debug/app-debug.apk

# 启动
adb shell monkey -p com.example.demo -c android.intent.category.LAUNCHER 1
```


二、常见的生命周期 / 聚合任务（按用途分类）

这些不是内建强制顺序，只是约定的“组合”任务，通常插件会定义它们依赖一系列子任务：

1. 构建相关
	•	assemble：打包所有构建变体（生成 APK/AAR/JAR 等），不包含验证。
	•	assemble<Variant>（如 assembleDebug / assembleRelease）：针对具体变体打包。
	•	build：典型的“全量构建+验证”，等价于 assemble + check（会执行测试、lint、验证等）。

2. 验证 / 质量
	•	check：执行所有 verification 相关的任务（例如单元测试 test、静态检查、lint）。
	•	test：运行单元测试（Java/Kotlin 项目），在 Android 中通常是 testDebugUnitTest 之类具体变体测试。

3. 清理 / 安装 / 发布
	•	clean：删除构建输出（通常是 build/ 目录）。
	•	install / installDebug（Android 或 Java 库可能是安装到本地仓库/设备）：安装到目标（Android 是安装 APK，Java 可能是 publish 到本地 Maven）。
	•	publish：把构建产物发布到远端仓库（Maven/Ivy）。

4. 辅助 / 组合
	•	dependencies：打印依赖树（不是执行构建）。
	•	dependencyInsight：诊断冲突/版本选择。
	•	buildDependents / buildNeeded：在多项目里根据依赖关系构建受到影响的部分。