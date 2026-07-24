# Vocsal Blog

基于 [Zola](https://www.getzola.org/) 的个人博客，暖纸感视觉风格，专注内容阅读体验。

线上地址：<https://blog.code01.cc>

## 本地开发

需要先安装 [Zola](https://www.getzola.org/documentation/getting-started/installation/)（本项目使用 `0.22.1`）。

```bash
zola serve
```

默认在 `http://127.0.0.1:1111` 提供本地预览，修改 `content/`、`sass/`、`templates/` 会自动重新构建。

```bash
zola check   # 校验内容、frontmatter、内外部链接
zola build   # 构建到 public/（已 gitignore，不提交）
```

## 目录结构

```
content/            文章内容（Markdown + TOML frontmatter）
  _index.md         首页
  blog/             文章列表 + 各篇文章
templates/          Tera 模板
  base.html         页面骨架（head/导航/页脚）
  index.html        首页
  section.html       文章列表页
  page.html          文章详情页
  macros/post.html   文章元信息（日期+标签）复用宏
sass/                样式，按功能拆分为多个 partial，由 style.scss 汇总
static/              字体、favicon、图片等静态资源
zola.toml            站点配置
```

## 部署

部署在 [Cloudflare Pages](https://pages.cloudflare.com/)，通过 Git 集成自动构建，不使用 GitHub Actions。

Cloudflare Pages 项目设置：

| 配置项 | 值 |
|---|---|
| Framework preset | Zola |
| Build output directory | `public` |
| 环境变量 `ZOLA_VERSION` | `0.22.1` |
| Build command | `if [ "$CF_PAGES_BRANCH" = "main" ]; then zola build; else zola build --base-url $CF_PAGES_URL; fi` |

Build command 的分支判断是为了让非 `main` 分支的预览部署使用 Cloudflare 分配的临时域名，而不是 `zola.toml` 里写死的生产域名，避免预览环境资源链接错乱。
