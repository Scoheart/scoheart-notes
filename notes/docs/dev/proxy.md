#

## 如何代理 CLI 程序

```bash
> npm install vue

$ npm install vue

>> npm install vue

~ npm install vue

 ~/ npm install vue
```

install 是把 npm 包拉回来

1. 从哪里拉？ registry
2. 拉回来之后，放到哪里？ 先放缓存目录，后放 node_modules

##

sudo snap install shadowsocks-rust

snap info shadowsocks-rust

sudo mkdir -p /var/snap/shadowsocks-rust/common/etc/shadowsocks-rust/

cat << 'EOF' | sudo tee /var/snap/shadowsocks-rust/common/etc/shadowsocks-rust/config.json > /dev/null
{
"server": "0.0.0.0",
"server_port": 8488,
"password": "8888",
"method": "chacha20-ietf-poly1305",
"mode": "tcp_and_udp"
}
EOF

sudo snap start --enable shadowsocks-rust.ssserver-daemon

sudo systemctl status snap.shadowsocks-rust.ssserver-daemon.service
