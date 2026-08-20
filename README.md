# NSNanoCat.github.io

NSNanoCat 的组件文档站，包含 `@nsnanocat/util`、`@nsnanocat/url`、`@nsnanocat/grpc` 与
`@nsnanocat/flatbuffer-root`。

## 开发

本项目使用 Node.js 20 与 pnpm 9。`@nsnanocat/doc-ui` 发布在 GitHub Packages，安装依赖前需要提供具有
`read:packages` 权限的 `NODE_AUTH_TOKEN`：

```shell
export NODE_AUTH_TOKEN=YOUR_GITHUB_TOKEN
pnpm install
pnpm dev
```

完整检查：

```shell
pnpm check
```
