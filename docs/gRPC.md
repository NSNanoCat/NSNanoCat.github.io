---
title: gRPC
description: 面向常用 iOS 网络工具的 gRPC 编解码辅助库
---

# @nsnanocat/grpc

`@nsnanocat/grpc` 提供纯 JavaScript gRPC 帧编解码能力，并复用 `@nsnanocat/util` 适配常用 iOS 网络工具。

- [GitHub 仓库](https://github.com/NSNanoCat/gRPC)
- [GitHub Packages](https://github.com/orgs/NSNanoCat/packages/npm/package/grpc)
- [API 说明](https://github.com/NSNanoCat/gRPC#readme)

## 安装

```shell
pnpm add @nsnanocat/grpc
```

如果从 GitHub Packages 安装：

```ini title=".npmrc"
@nsnanocat:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

## gRPC 帧

```js
import gRPC from "@nsnanocat/grpc";

const protobufBytes = new Uint8Array([8, 1]);

const framed = gRPC.encode(protobufBytes, "gzip");
const decoded = gRPC.decode(framed);
```

`encode(body, encoding)` 支持 `identity` 与 `gzip`；`decode(bytesBody)` 会读取五字节帧头，并在需要时解压消息体。

## gRPC-Web unary 响应

```js
import gRPC from "@nsnanocat/grpc";

const { header, bodyBytes } = gRPC.decodeWeb($response.bodyBytes);

console.log(header["grpc-status"]);
console.log(bodyBytes);
```

`decodeWeb(bytesBody)` 返回：

```js
{
  header: {
    "grpc-status": "0",
  },
  bodyBytes: Uint8Array,
}
```

## 限制

- 仅支持二进制 gRPC-Web unary 响应。
- 不支持 `grpc-web-text`。
- trailer frame 会解析到返回值的 `header`，不会解析 HTTP 传输层响应头。
- unary 响应只接受一个 data frame，并要求 trailer frame 位于最后。
