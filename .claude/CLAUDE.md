# CLAUDE.md

本文件是与 Claude Code Agent 交互的项目级契约，只写 Agent 需要遵守的约束和需要知道的踩坑，不做项目介绍（项目介绍见 README.md）。

## 验证方式

本项目没有单元测试框架（Zola 静态站点生成器）。改动后按以下方式验证，不要声称"已测试"却没跑过这些命令：

```bash
zola check   # 内容/frontmatter/链接校验；2 条外链 broken link ERROR（tailwind.nodejs.cn、nextjs.cn）是已知的网络问题，不是本项目引入的 bug
zola build   # 默认不含 draft，退出码 0 即通过
zola build --drafts   # 含 draft 文章一起构建
```

涉及页面视觉/交互改动时，必须用浏览器（Playwright 或同等工具）实际打开页面截图确认，不能只看 `zola build` 成功就判断完成——本项目在开发过程中出现过构建成功但页面渲染错误的真实案例（见下）。

Zola 版本固定为 `0.22.1`（本机 `/opt/homebrew/bin/zola`），语法行为以这个版本为准，不要假设其他版本的 Tera/Zola 文档一定适用（比如 `is starting_with(...)` 在这个版本不是合法的 Tera test）。

## 内容 frontmatter 约定

`content/blog/*.md` 的自定义字段必须放在正确的位置，顶层裸字段会被 Zola 静默丢弃（不报错但模板读不到）：

- 标签/分类 → `[taxonomies]` 表（`tags`、`categories`），对应 `zola.toml` 里 `taxonomies = [{name="tags", render=false}, {name="categories", render=false}]`——`render = false` 表示不生成归档页，纯粹是数据字段
- 配图、数学公式开关等自定义数据 → `[extra]` 表（`heroImage`、`math`）
- `content/_index.md`、`content/blog/_index.md` 必须有 `sort_by = "date"`，否则 `section.pages` 顺序不可控
- 首页展示的是 `content/blog/` 下的文章，`index.html` 用 `get_section(path="blog/_index.md")` 取，不能直接用 `section.pages`（根 section 自己没有直接子页面，这样写永远是空列表）

## 含 KaTeX 公式的文章要注意的 Markdown 陷阱

`[extra] math = true` 的文章会在 `page.html` 里按需加载 KaTeX（CDN + auto-render，作用域限定 `.post-content`，`delimiters` 同时支持 `$...$`/`$$...$$`）。CommonMark 处理会破坏两种写法，新增数学公式内容时要避开：

1. `$$...$$` 块内字面 `\\`（LaTeX 换行）会被 Markdown 的反斜杠转义规则吃掉一层变成单个 `\`，导致 KaTeX 报 "Too many tab characters"。写成 `\\\\`（源码 4 个反斜杠）才能在 Markdown 处理后还原成正确的 `\\`。
2. `$$...$$` 块内不能有单独占一行的 `=` 或 `-`，会被 CommonMark 当成 Setext 标题下划线，把公式从中间截断成 `<h1>`/`<h2>` + 段落，KaTeX 找不到跨元素的 `$$` 配对，直接原样显示源码。`=`/`-` 必须和其他内容同一行。

## 样式/构建细节

- `zola.toml` 里 `minify_html = true`：构建产物属性无引号、可能重排属性顺序、多个标签可能合并到同一行。写验证用的 grep 时：不要依赖引号或属性顺序；统计出现次数用 `grep -o PATTERN file | wc -l`，不要用 `grep -c`（后者统计的是匹配行数不是次数）。
- `sass/style.scss` 用 `@use` 汇总 6 个功能拆分的 partial（`_variables`/`_base`/`_layout`/`_typography`/`_code`/`_components`），新增样式按功能归类，不要按页面拆文件。
- 视觉基调是暖纸感（亮色 `#faf6ee`/`#2b2620`/`#8a7f6a`/`#c9a44c`，暗色跟随系统 `prefers-color-scheme` 自动切换为深棕底+米白字+亮金强调），改样式时不要引入新的硬编码颜色值，一律走 `_variables.scss` 里已有的 CSS 自定义属性。

## 范围边界

- 只有三类页面：首页、文章列表、文章详情。不要未经确认就添加"关于页"、标签/分类归档页、评论系统等。
- 详情页故意不做 heroImage 大图、返回链接、上下篇导航、阅读时长——这是确认过的设计决定，不是遗漏。
- 页脚只放版权信息，RSS 走 `<head>` 自动发现，不放可见的 RSS/GitHub 链接。

## 部署

Cloudflare Pages 通过 Git 集成自动构建，不用 GitHub Actions。构建命令、环境变量见 README.md「部署」一节。改动 `zola.toml`（尤其是 `base_url`）前确认不会影响 Cloudflare Pages 的生产/预览环境判断逻辑。

## 设计与实现历史

`.superpowers/specs/`、`.superpowers/plans/` 下有本次搭建模板/样式的设计文档和实现计划（已 gitignore，不进仓库）。涉及后续大改动时可以先看这些文档了解已确认过的设计决策和踩过的坑，避免重复踩坑或推翻已确认的方案。
