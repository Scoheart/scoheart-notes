# Nexus5 安卓 5.0.1 系统

[下载地址](https://developers.google.com/android/images#hammerhead)

# 刷回官方 system.img

下载 hammerhead-lrx21o-factory-56a09d43.zip

进入 bootloader

```bash
adb reboot bootloader
```

刷入 system.img

```bash
fastboot flash system /path/to/system.img
fastboot reboot
```

把系统 app（包括 WebView）恢复成官方状态：

✅ 刷 system.img：
解压 image-hammerhead-lrx21o.zip → 用 fastboot flash system system.img。

⛔ 先别用 flash-all.sh：
那是整套全刷 + 可能清数据，用在“我就是要彻底恢复出厂”的场景。

⛔ 不需要动 bootloader-hammerhead-hhz12d.img 和 radio-\*.img，除非你有别的问题要顺便修。

# 刷新系统

```bash
adb devices
adb reboot bootloader
./flash-all.sh

---

cd /你放镜像的目录

unzip image-hammerhead-lrx21o.zip

adb reboot bootloader
fastboot devices

# 1. 刷 bootloader（可选）
fastboot flash bootloader bootloader-hammerhead-hhz12d.img
fastboot reboot-bootloader

# 2. 刷 radio（推荐）
fastboot flash radio radio-hammerhead-m8974a-2.0.50.2.21.img
fastboot reboot-bootloader

# 3. 刷系统相关分区
fastboot flash boot boot.img
fastboot flash recovery recovery.img
fastboot flash system system.img
# 如果有 cache.img：
# fastboot flash cache cache.img

# 4. 全清数据
fastboot erase userdata
fastboot erase cache

# 5. 重启
fastboot reboot

```

刷 bootloader
刷 radio（基带）
刷 boot、system（有时还有 recovery、cache、userdata）
一般会 清除用户数据（等同于恢复出厂）
