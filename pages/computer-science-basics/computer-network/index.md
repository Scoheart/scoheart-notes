|      ISO/OSI       |        TCP/IP        |    Five-layer     |  protocol data unit -- PDU   |                                protocol                                |      device       |
| :----------------: | :------------------: | :---------------: | :--------------------------: | :--------------------------------------------------------------------: | :---------------: |
| Application Layer  |  Application Layer   | Application Layer |         Data/Message         | HTTP、DNS、DHCP、FTP、SMTP、IMAP、POP3、SSH、NTP、Telnet、MySQL、Neo4j |        PC         |
| Presentation Layer |                      |                   |                              |                                                                        |
|   Session Layer    |                      |                   |                              |                                                                        |
|  Transport Layer   |   Transport Layer    |  Transport Layer  | Segment(TCP) / Datagram(UDP) |                                TCP UDP                                 |     L4 switch     |
|   Network Layer    |    Internet Layer    |   Network Layer   |            Packet            |              IP(v4, v6)、ARP、BGP、ICMP、RIP、OSPF、IGMP               | Router、L3 switch |
|  Data Link Layer   |                      |  Data Link Layer  |            Frame             |          Ethernet(v2)、802.11(WLAN)、PPP、802.1Q(VLAN)、HDLC           |  Switch、Bridge   |
|   Physical Layer   | Network Access Layer |  Physical Layer   |             Bit              |                                                                        |   Hub、Repeater   |

- 应用层：解决通过应用进程的交互来实现特定网络应用的问题
- 传输层：解决进程之间基于网络的通信问题
- 网络层：解决数据包在多个网络之间传输和路由的问题
- 数据链路层：解决数据包在同一个网络或一段链路上传输的问题
- 物理层：解决使用何种信号来表示比特 0 和 1 的问题
- 传输介质：传输信号
