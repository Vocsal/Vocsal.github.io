import { defineUserConfig, defaultTheme } from "vuepress";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Blog Vocsal.Code01",
  description: "The Blog Of Vocsal.Code",
  public: './public',
  dest: './dist',
  theme: defaultTheme({
    // 默认主题配置
    navbar: [
      {
        text: "首页",
        link: "/",
      },
    ],
  })
});
