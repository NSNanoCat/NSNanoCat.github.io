import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@rspress/core";
import { pluginApiDocgen } from "@rspress/plugin-api-docgen";
import { pluginSitemap } from "@rspress/plugin-sitemap";
import { pluginTypeDoc } from "@rspress/plugin-typedoc";

const siteUrl = "https://nsnanocat.github.io";
const utilRoot = process.env.NSNANOCAT_UTIL_ROOT ?? path.resolve(__dirname, "../util");
const utilEntry = ["index.mjs", "index.js"].map((file) => path.join(utilRoot, file)).find(fs.existsSync);
const urlRoot = process.env.NSNANOCAT_URL_ROOT ?? path.resolve(__dirname, "../URL");
const urlEntries = ["URL.mts", "URLSearchParams.mts"].map((file) => path.join(urlRoot, file));

if (!utilEntry) throw new Error(`找不到 @nsnanocat/util 入口：${utilRoot}`);
if (urlEntries.some((entry) => !fs.existsSync(entry)))
  throw new Error(`找不到 @nsnanocat/url TypeScript 入口：${urlRoot}`);

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "NanoCat Co., Ltd.",
  description: "为 JavaScriptCore 与常用 iOS 网络工具提供的基础组件",
  icon: "https://avatars.githubusercontent.com/u/107734924?s=200&v=4",
  logo: "https://avatars.githubusercontent.com/u/107734924?s=80&v=4",
  logoText: "NanoCat Co., Ltd.",
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
    pluginApiDocgen({
      entries: {
        // documentation 模式保留 entry key，API 组件会追加当前默认语言。
        "util-en": utilEntry,
      },
      apiParseTool: "documentation",
    }),
    pluginSitemap({
      siteUrl,
    }),
    pluginTypeDoc({
      entryPoints: urlEntries,
      outDir: "api/url",
      setup(app) {
        const compilerOptions = app.options.getCompilerOptions(app.logger);
        app.options.setCompilerOptions(urlEntries, { ...compilerOptions, strict: false }, undefined);
        app.options.setValue("name", "@nsnanocat/url");
      },
    }),
  ],
});
