---
title: "HTTP知识总结"
description: "http相关知识总结"
pubDate: 2025-03-20 14:30:00 +0800
heroImage: "/images/http-knowledge.jpg"
---

> "What is http?"

## 一、HTTP 是什么

HTTP，HyperText Transfer Protocol 超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个基于请求与响应模式的、无状态的、应用层的协议，常基于 TCP 的连接方式，HTTP 协议默认的端口号为 80、443。

## 二、HTTP 版本

<a href="https://yuanbao.tencent.com/bot/app/share/chat/s7z7OwCyxBHq" target="_blank">HTTP 版本</a>

| 特性           | HTTP/0.9 | HTTP/1.0 | HTTP/1.1 | HTTP/2         | HTTP/3           |
| -------------- | -------- | -------- | -------- | -------------- | ---------------- |
| **协议类型**   | 文本     | 文本     | 文本     | 二进制         | 二进制           |
| **持久连接**   | 不支持   | 不支持   | 支持     | 支持           | 支持             |
| **多路复用**   | 不支持   | 不支持   | 不支持   | 支持           | 支持             |
| **头部压缩**   | 不支持   | 不支持   | 不支持   | 支持（HPACK）  | 支持（QPACK）    |
| **服务器推送** | 不支持   | 不支持   | 不支持   | 支持           | 支持             |
| **传输层协议** | TCP      | TCP      | TCP      | TCP            | QUIC（基于 UDP） |
| **安全性**     | 无       | 无       | 可选     | 通常与 HTTPS   | 默认与 HTTPS     |
| **队头阻塞**   | 无       | 存在     | 存在     | 存在（TCP 层） | 解决             |

- **HTTP/0.9**：最简单，功能有限。
- **HTTP/1.0**：引入了请求头和响应头，支持更多功能。
- **HTTP/1.1**：默认持久连接，支持管道化和虚拟主机。
- **HTTP/2**：二进制协议，多路复用，头部压缩，服务器推送。
- **HTTP/3**：基于 QUIC，解决队头阻塞，支持 0-RTT。

## 三、HTTP 建立连接

1. <a href="https://yuanbao.tencent.com/bot/app/share/chat/DEoWamLNWBRV" target="_blank">HTTP 握手</a>

HTTP 是基于 TCP 协议的，除了 HTTP3，所以 HTTP 的握手实际为 TCP 的三次握手

- 第一步：客户端请求连接，发送标识 SYN(Synchronize 同步校准)和客户端初始序列号 ISN
- 第二步：服务端确认，发送确认标识 SYN-ACK(Synchronize-Acknowledge)、服务端初始化序列号 SYN 和回复客户端序列号 ACK = 客户端 ISN + 1
- 第三步：客户端确认，发送收到标识 ACK 和回复服务端序列号 ACK = 服务端 ISN + 1

HTTP3 是基于 QUIC 协议的，<a href="https://yuanbao.tencent.com/bot/app/share/chat/Tua7TKLQRBL1" target="_blank">HTTP3 握手</a>

2. <a href="https://yuanbao.tencent.com/bot/app/share/chat/WsaAoDBKeoom" target="_blank">HTTPS 握手</a>

HTTPS 是基于 SSL/TLS 协议的，因此它的握手过程包括 TCP 三次握手和 SSL/TLS 握手。SSL/TLS 握手如下：

- 第一步：客户端发送 `ClientHello` 消息，包含客户端支持的 SSL/TLS 协议版本、支持的密码套件列表、随机数 `Client Random`
- 第二步：服务端发送 `ServerHello` 消息，包含选择的 SSL/TLS 协议版本和密码套件、随机数 `Server Random` 和证书(公钥和域名信息)
- 第三步：客户端验证证书，生成 `Pre-Master Secret`，并使用证书中的公钥加密发送给服务端
- 第四步：服务端使用私钥解密得到 `Pre-Master Secret`，然后生成 `Master Secret`
- 第五步：客户端使用 `Pre-Master Secret` 生成 `Master Secret`
- 第六步：完成握手，开始加密通信

3. 浏览器输入 url 会发生什么

## 四、HTTP 请求方法

<a href="https://yuanbao.tencent.com/bot/app/share/chat/ccp830ofvbf3" target="_blank">http 请求方法</a>

| 方法        | 幂等性 | 安全性 | 请求体 | 用途                     |
| ----------- | ------ | ------ | ------ | ------------------------ |
| **GET**     | 是     | 是     | 无     | 获取资源                 |
| **POST**    | 否     | 否     | 有     | 提交数据或创建资源       |
| **PUT**     | 是     | 否     | 有     | 上传或更新资源           |
| **DELETE**  | 是     | 否     | 无     | 删除资源                 |
| **PATCH**   | 否     | 否     | 有     | 部分更新资源             |
| **HEAD**    | 是     | 是     | 无     | 获取资源元数据           |
| **OPTIONS** | 是     | 是     | 无     | 获取服务器支持的选项     |
| **TRACE**   | 是     | 是     | 无     | 回显请求（用于测试）     |
| **CONNECT** | 否     | 否     | 无     | 建立隧道连接（用于代理） |

1. **幂等性**：

- 幂等方法（如 GET、PUT、DELETE）可以安全地重复调用，不会产生副作用。
- 非幂等方法（如 POST、PATCH）重复调用可能会导致意外的结果。

2. **安全性**：

- 安全方法（如 GET、HEAD、OPTIONS）不会修改服务器资源。
- 非安全方法（如 POST、PUT、DELETE）可能会修改服务器资源。

3. **RESTful API 设计**：

- 遵循 REST 原则，使用合适的 HTTP 方法（如 GET 获取资源，POST 创建资源，PUT 更新资源，DELETE 删除资源）。

4. **CORS 预检请求**：

- 使用 OPTIONS 方法进行跨域请求的预检，确保客户端和服务器支持跨域请求。

## 五、HTTP 状态码

## 六、HTTP 头部

## 七、HTTP 缓存

## 八、HTTP 代理

## 九、HTTP 安全
