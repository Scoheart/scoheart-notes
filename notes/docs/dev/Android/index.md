#!/bin/bash

# 清理项目
./gradlew clean

# 编译 debug 版本 APK
./gradlew :app:assembleDebug

# 构建项目
./gradlew build

# 卸载旧包（如果存在）
adb uninstall com.rn074_1 || true

# 安装新 APK
adb install -r app/build/outputs/apk/debug/app-debug.apk

# 启动应用
adb shell monkey -p com.rn074_1 -c android.intent.category.LAUNCHER 1

#
emulator -list-avds


# 启动模拟器
emulator -avd Nexus_5_API_21
