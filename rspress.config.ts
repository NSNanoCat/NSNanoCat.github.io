import path from "node:path";
import { defineConfig } from "@rspress/core";
import pluginSitemap from "rspress-plugin-sitemap";

const siteUrl = "https://NSNanoCat.github.io";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "NSNanoCat",
  description: "为 JavaScriptCore 与常用 iOS 网络工具提供的基础组件",
  icon: "https://avatars.githubusercontent.com/u/107734924?s=200&v=4",
  logo: "https://avatars.githubusercontent.com/u/107734924?s=80&v=4",
  logoText: "NSNanoCat",
  themeConfig: {
    lastUpdated: true,
    socialLinks: [{ icon: "github", mode: "link", content: "https://github.com/NSNanoCat" }],
  },
  builderConfig: {
    resolve: {
      alias: {
        "rspress/theme": "@rspress/core/theme",
      },
    },
  },
  plugins: [
    pluginSitemap({
      domain: siteUrl,
    }),
  ],
});
