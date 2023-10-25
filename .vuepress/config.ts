import { defineUserConfig, defaultTheme, NavbarItem } from "vuepress";
import MarkdownItMathjax from "markdown-it-mathjax3";

const isDev = process.env.NODE_ENV === "development";

export default defineUserConfig({
  lang: "zh-CN",
  public: "./public",
  dest: "./dist",
  title: "Blog Vocsal.Code01",
  description: "The Blog Of Vocsal.Code",
  head: [["link", { rel: "icon", href: "/favicons/favicon.ico" }]],
  pagePatterns: [
    "*.md",
    isDev ? "**/*.md" : "articles/**/*.md",
    "!.vuepress",
    "!node_modules",
  ].filter((_) => _),
  theme: defaultTheme({
    logo: "/favicons/favicon.png",
    // 默认主题配置
    navbar: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "文章",
        link: "/articles",
      },
      isDev && {
        text: "草稿",
        link: "/drafts",
      },
    ].filter((_) => _) as NavbarItem[],
  }),
  extendsMarkdown: (markdownIt) => {
    // 支持markdown 数学公式
    markdownIt.use(MarkdownItMathjax);
    markdownIt.linkify.set({ fuzzyEmail: false });
  },
});
