---
pageType: home

hero:
  icon: 🐈
  name: NanoCat Co., Ltd.
  text: JavaScript 基础组件
  tagline: 面向 JavaScriptCore、Node.js 与常用 iOS 网络工具
  actions:
    - theme: brand
      text: 组件概览
      link: /overview
    - theme: alt
      text: GitHub Packages
      link: https://github.com/orgs/NSNanoCat/packages

features:
  - icon: 🧰
    title: util
    details: 统一 HTTP、通知、持久化、脚本结束与常用 Polyfill，减少不同脚本平台之间的条件分支。
    span: 4
    link: /util

  - icon: 🔗
    title: url
    details: 为至少 iOS 15 JavaScriptCore 提供 URL 与 URLSearchParams Polyfill。
    span: 4
    link: /url

  - icon: 📦
    title: gRPC
    details: 在常用 iOS 网络工具中解码和编码 gRPC 帧，并支持二进制 gRPC-Web unary 响应。
    span: 4
    link: /gRPC

  - icon: 🧾
    title: XML
    details: 在 JavaScriptCore 与 Node.js 中互转 XML、JSON 和 plist，保留属性与文本节点语义。
    span: 4
    link: /xml

  - icon: 🧱
    title: flatbuffer-root
    details: 按根表 slot 编解码 FlatBuffers，并透明保留未知与未修改的数据。
    span: 4
    link: /flatbuffer-root
---
