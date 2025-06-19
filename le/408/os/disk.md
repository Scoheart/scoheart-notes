```
磁盘与存储管理
├── 磁盘
│   ├── 类型
│   │   ├── 机械硬盘（HDD）
│   │   └── 固态硬盘（SSD）
│   ├── 接口
│   │   ├── SATA
│   │   ├── NVMe
│   │   └── SCSI
│   └── 分区表
│       ├── MBR（Master Boot Record）
│       └── GPT（GUID Partition Table）
├── 分区
│   ├── 主分区（Primary Partition）
│   ├── 扩展分区（Extended Partition）
│   └── 逻辑分区（Logical Partition）
├── 文件系统
│   ├── Windows 系统
│   │   ├── NTFS
│   │   ├── FAT32
│   │   └── exFAT
│   ├── Linux 系统
│   │   ├── ext4
│   │   ├── XFS
│   │   └── Btrfs
│   └── macOS 系统
│       ├── APFS
│       └── HFS+
├── 挂载点（Mount Point）
├── 逻辑卷管理（LVM）
│   ├── 物理卷（PV，Physical Volume）
│   ├── 卷组（VG，Volume Group）
│   └── 逻辑卷（LV，Logical Volume）
├── 磁盘工具
│   ├── fdisk
│   ├── parted
│   ├── GParted
│   ├── mkfs
│   └── mount
├── 磁盘性能
│   ├── IOPS（每秒输入输出操作数）
│   ├── 吞吐量（Throughput）
│   └── 延迟（Latency）
├── 磁盘冗余与备份
│   ├── RAID（磁盘阵列）
│   │   ├── RAID 0（条带化）
│   │   ├── RAID 1（镜像）
│   │   ├── RAID 5（带奇偶校验的条带化）
│   │   └── RAID 10（镜像+条带化）
│   └── 备份策略
│       ├── 完全备份
│       ├── 增量备份
│       └── 差异备份
└── 磁盘安全
    ├── 加密
    │   ├── LUKS（Linux 统一密钥设置）
    │   └── BitLocker（Windows 加密）
    └── 权限管理
        ├── 用户权限
        └── ACL（访问控制列表）
```
