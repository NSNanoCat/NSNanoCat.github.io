import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@rspress/core";
import { pluginSitemap } from "@rspress/plugin-sitemap";
import { pluginTypeDoc } from "@rspress/plugin-typedoc";

const siteUrl = "https://nsnanocat.github.io";
const utilRoot = process.env.NSNANOCAT_UTIL_ROOT ?? path.resolve(__dirname, "../util");
const utilEntry = ["index.mjs", "index.js"].map((file) => path.join(utilRoot, file)).find(fs.existsSync);
const urlRoot = process.env.NSNANOCAT_URL_ROOT ?? path.resolve(__dirname, "../URL");
const urlEntries = ["URL.mts", "URLSearchParams.mts"].map((file) => path.join(urlRoot, file));
const grpcRoot = process.env.NSNANOCAT_GRPC_ROOT ?? path.resolve(__dirname, "../gRPC");
const grpcEntry = ["index.mjs", "index.js"].map((file) => path.join(grpcRoot, file)).find(fs.existsSync);
const flatBufferRootRoot = process.env.NSNANOCAT_FLATBUFFER_ROOT_ROOT ?? path.resolve(__dirname, "../FlatBufferRoot");
const flatBufferRootEntry = path.join(flatBufferRootRoot, "src/index.d.ts");

if (!utilEntry) throw new Error(`找不到 @nsnanocat/util 入口：${utilRoot}`);
if (urlEntries.some((entry) => !fs.existsSync(entry)))
  throw new Error(`找不到 @nsnanocat/url TypeScript 入口：${urlRoot}`);
if (!grpcEntry) throw new Error(`找不到 @nsnanocat/grpc 入口：${grpcRoot}`);
if (!fs.existsSync(flatBufferRootEntry))
  throw new Error(`找不到 @nsnanocat/flatbuffer-root TypeScript 入口：${flatBufferRootRoot}`);

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
    pluginSitemap({
      siteUrl,
    }),
    {
      ...pluginTypeDoc({
        entryPoints: [utilEntry],
        outDir: "api/util",
        setup(app) {
          const compilerOptions = app.options.getCompilerOptions(app.logger);
          app.options.setCompilerOptions(
            [utilEntry],
            { ...compilerOptions, allowJs: true, checkJs: false, strict: false },
            undefined,
          );
          app.options.setValue("name", "@nsnanocat/util");
          app.options.setValue("router", "member");
        },
      }),
      name: "@rspress/plugin-typedoc-util",
    },
    pluginTypeDoc({
      entryPoints: urlEntries,
      outDir: "api/url",
      setup(app) {
        const compilerOptions = app.options.getCompilerOptions(app.logger);
        app.options.setCompilerOptions(urlEntries, { ...compilerOptions, strict: false }, undefined);
        app.options.setValue("name", "@nsnanocat/url");
      },
    }),
    {
      ...pluginTypeDoc({
        entryPoints: [grpcEntry],
        outDir: "api/grpc",
        setup(app) {
          const compilerOptions = app.options.getCompilerOptions(app.logger);
          app.options.setCompilerOptions(
            [grpcEntry],
            { ...compilerOptions, allowJs: true, checkJs: false, strict: false },
            undefined,
          );
          app.options.setValue("name", "@nsnanocat/grpc");
          app.options.setValue("router", "member");
          app.converter.on("resolveEnd", (context) => {
            const defaultExport = context.project.children?.find((reflection) => reflection.name === "default");
            if (defaultExport) {
              defaultExport.name = "gRPC";
              for (const child of defaultExport.children ?? [])
                for (const signature of child.signatures ?? [])
                  if (signature.name === "default") signature.name = "gRPC";
            }
          });
        },
      }),
      name: "@rspress/plugin-typedoc-grpc",
    },
    {
      ...pluginTypeDoc({
        entryPoints: [flatBufferRootEntry],
        outDir: "api/flatbuffer-root",
        setup(app) {
          const compilerOptions = app.options.getCompilerOptions(app.logger);
          app.options.setCompilerOptions([flatBufferRootEntry], { ...compilerOptions, strict: false }, undefined);
          app.options.setValue("name", "@nsnanocat/flatbuffer-root");
        },
      }),
      name: "@rspress/plugin-typedoc-flatbuffer-root",
    },
  ],
});
