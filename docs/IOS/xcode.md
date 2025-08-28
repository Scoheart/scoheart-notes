
## xcode-select

[xcode-select - ss64](https://ss64.com/mac/xcode-select.html)

## activate developer directory

```bash
sudo xcode-select -p
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

## scheme

scheme is a collection of build settings and targets.

```bash
xcodebuild -list
```

### Scheme file

```fs
# shared scheme
<project>/
    <project>.xcodeproj/
        xcshareddata/
            xcschemes/
                <scheme1>.xcscheme
                <scheme2>.xcscheme

# user scheme
<project>/
    <project>.xcodeproj/
        xcuserdata/
            <user>.xcuserdatad/
                xcschemes/
                    <scheme1>.xcscheme
                    <scheme2>.xcscheme
                    xcschememanagement.plist
```

## xcodebuild

[xcodebuild - ss64](https://ss64.com/osx/xcodebuild.html)

```bash
xcodebuild -list
```

### Action
- Build
- Run
- Test
- Analyze
- Profile
- Archive

```bash
xcodebuild \
    -project <project> \
    -scheme <scheme> \
    -configuration <configuration> \
    -sdk <sdk> \
    -destination <destination> \
    -derivedDataPath <derivedDataPath> \
    build
```

build for simulator

```bash
xcodebuild \
    -project water.xcodeproj \
    -scheme water \
    -sdk iphonesimulator \
    -derivedDataPath ./build-simulator \
    build

xcodebuild \
    -project drink.xcodeproj \
    -scheme drink \
    -configuration Debug \
    -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
    -derivedDataPath ./build-device2 \
    build

xcodebuild \
    -project drink.xcodeproj \
    -scheme drink \
    -configuration Debug \
    -sdk iphoneos \
    -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
    -derivedDataPath ./build-device \
    build

xcodebuild \
    -project drink.xcodeproj \
    -scheme drink \
    -configuration Debug \
    -sdk iphonesimulator \
    -derivedDataPath ./build-simulator \
    build

xcodebuild \
    -project drink.xcodeproj \
    -scheme drink \
    -configuration Debug \
    -derivedDataPath ./build-simulator \
    build


xcrun simctl list devices

# json format
xcrun simctl list -j devices 

# open simulator
open -a Simulator

# start a device
xcrun simctl boot <UDID|name>
xcrun simctl shutdown <UDID|name>


# install app to simulator
# install to current simulator
xcrun simctl install <UDID|name> <app-path>
xcrun simctl install booted ./build-simulator/Build/Products/Debug-iphonesimulator/water.app
xcrun simctl install 382BEEEC-AD91-489C-A5EF-3CFAE767D23C build-device2/Build/Products/Debug-iphonesimulator/drink.app

# launch app
xcrun simctl launch booted <bundle-id>
xcrun simctl launch booted com.scoheart.water

# terminate app
xcrun simctl terminate <UDID|name> <bundle-id>
xcrun simctl terminate booted com.scoheart.water

xcrun simctl spawn booted log stream --style compact --predicate 'process == "drink"'

```

build for device

```bash
xcodebuild \
    -project reminder.xcodeproj \
    -scheme reminder \
    -sdk iphoneos \
    -derivedDataPath ./build-device \
    build

xcrun devicectl list devices 

xcrun devicectl device install app --device 56423B97-C045-587E-959A-21EAA8BDBE40 ./build-device/Build/Products/Debug-iphoneos/reminder.app

xcrun devicectl device process launch --terminate-existing --device 56423B97-C045-587E-959A-21EAA8BDBE40 com.scoheart.reminder --console 

xcrun devicectl device process launch --device 56423B97-C045-587E-959A-21EAA8BDBE40 com.scoheart.reminder --console 

```

## UIkit & SwiftUI

@State          — 我自己的小状态
@Binding        — 改别人的状态
@StateObject    — 第一次创建并持有一个对象
@ObservedObject — 外面给我一个对象，我来观察
@EnvironmentObject — 全局注入环境对象

```swift
UIApplication  (单例)
└─ UIApplicationDelegate （App Delegate，负责全局生命周期）
   └─ UISceneSession （场景会话，携带配置和恢复信息）
      └─ UIScene （抽象场景）
         └─ UIWindowScene （管理窗口的具体场景）
            └─ UIWindowSceneDelegate （Scene Delegate，负责本场景生命周期回调）
               └─ UIWindow （键窗口，事件分发和渲染容器）
                  └─ rootViewController (根 UIViewController)
                     └─ 子 UIViewController …
                        └─ UIView 层级树

SwiftUI App (遵循 App 协议)
└─ Scenes (遵循 Scene 协议)
   ├─ WindowGroup / DocumentGroup / Settings / Commands
   │   └─ body 中返回的根 View（struct ContentView）
   │       └─ 子 View 树（HStack/VStack/…）
   └─ onChange(of:scenePhase) 等生命周期钩子
```