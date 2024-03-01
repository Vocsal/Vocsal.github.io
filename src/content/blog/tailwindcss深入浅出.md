---
title: "tailwindcss深入浅出"
description: "tailwindcss 学习"
pubDate: 2024-02-29 16:00:00 +0800
heroImage: "/images/blog-placeholder-3.jpg"
---

> 只需 HTML 即可快速构建现代网站

## 前言

Tailwind CSS 是一个高度可定制的、实用性为导向的 CSS 框架。它提供了一系列预定义的 CSS 类，这些类可以根据您的需要组合在一起，以快速构建现代化的 Web 界面。与传统的 CSS 框架（如 Bootstrap）不同，Tailwind CSS 并不提供预先设计好的 UI 组件，而是让您使用原子类（Atomic CSS classes）来自由组合样式。

## 背景

Tailwind CSS 由 Adam Wathan 和 Jonathan Reinink 于 2017 年首次发布。这个项目的灵感来自于他们在使用 Bootstrap 等流行的 CSS 框架时遇到的问题，尤其是在定制和组合样式方面。他们创建了 Tailwind CSS，以提供一种更灵活、更可扩展的方法来构建用户界面。

为什么叫 Tailwind？作者喜欢一种叫做 kiteboarding 的风筝冲浪运营，这个运动在顺风 tailwind 和逆风 headwind 下有不同的技巧，而作者喜欢在顺风情况下更省力，所以给这个 CSS 框架取名 tailwind。

目前 tailwindcss 在 GitHub 上拥有 76.5k 的 star，是一款非常受欢迎的 CSS 框架。

## 网站示例

1. [Tailwind Toolbox](https://www.tailwindtoolbox.com)：提供 Tailwind CSS 模板、组件和资源的网站。

2. [Tailwind Components](https://tailwindcomponents.com)：一个包含大量 Tailwind CSS 组件的开源项目。

3. [daisyUI](https://daisyui.com)：一个基于 Tailwind CSS 的组件库，提供了一系列现代化的、响应式的 UI 组件。

## 核心概念

- 工具优先的基础

工具优先（Utility-First）提供了大量的实用程序类，如颜色、边距、内边距、字体大小等。开发者可以直接使用这些工具类，无需编写任何自定义 CSS 代码

- 悬停、焦点以及其他状态

提供悬停（hover）、焦点（focus）、激活（active）等伪类状态。开发者可以通过在实用程序类前添加特定的前缀（如`hover:`、`focus:`、`active:`等）来为元素在这些状态下添加样式。

- 响应式设计

允许开发者为不同的屏幕尺寸和设备类型指定样式，通过在实用程序类前添加特定的前缀（如`sm:`、`md:`、`lg:`等）来实现的。

- 深色模式

支持深色模式，通过在元素的工具类前添加`dark:`前缀来实现的。

- 重用样式

通过组合工具类来创建自定义的设计，使得 HTML 和 CSS 代码更加模块化，易于维护。

- 添加自定义样式

可通过配置添加自定义样式

- 指令和函数

提供`@tailwind`、`@layer`、`@apply`、`@variants`、`@responsive`等指令和`theme()`、`screen()`等函数

## 使用实践

> VSCode 插件 `Tailwind CSS IntelliSense`

- **基本使用**

1. 初始化

```shell
# 安装依赖
npm install -D tailwindcss
# 初始化配置
npx tailwindcss init
```

2. 在配置文件中增加内容文件

3. 在 css 入口文件中增加 tailwind 指令

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. 编译构建

```shell
npx tailwindcss -i input.css -o output.css --watch
```

5. 在 html 中引入`output.css`并使用 tailwind 样式类

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind CSS Demo</title>
    <link rel="stylesheet" href="/output.css" />
  </head>

  <body class="h-screen flex justify-center items-center">
    <h1 class="text-3xl font-bold underline">Hello World!</h1>
  </body>
</html>
```

- **搭配 vite**

1. 创建项目

```shell
npm create vite@latest vite-demo -- --template vue
cd vite-demo
npm install
```

2. 安装 tailwindcss, 并初始化配置，增加内容文件配置

```shell
npm install tailwindcss postcss autoprefixer -D
npx tailwindcss init -p
```

3. 在 css 入口文件中增加 tailwind 指令

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. 在 App.vue 里使用 tailwind

```html
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Button
</button>
```

## 配置

可执行`npx tailwindcss init --full`生成 tailwind 的默认配置

```javascript
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  darkMode: "media", // or 'class'
  theme: {
    // 覆盖默认主题
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    // height, width, borderColor, opacity ...
    extend: {
      // 扩展合并默认主题
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    plugin(function ({
      addBase,
      addComponents,
      addUtilities,
      addVariant,
      theme,
    }) {
      /* 给类似 h1 div 这些选择器添加样式 */
      addBase({
        h1: {
          fontSize: theme("fontSize.2xl"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
        },
      });
      /* 给固定的复杂的类添加样式 比如框架中通用的 按钮、表单等组件 */
      addComponents({
        ".card": {
          backgroundColor: theme("colors.white"),
          borderRadius: theme("borderRadius.lg"),
          padding: theme("spacing.6"),
          boxShadow: theme("boxShadow.xl"),
        },
      });
      /* 添加自定义的功能类 */
      addUtilities({
        ".content-auto": {
          contentVisibility: "auto",
        },
      });
      /** 添加自定义修饰符 */
      addVariant("third", "&:nth-child(3)");
    }),
  ],
  presets: [],
};
```

1. 内容

配置所有使用 tailwind 的源文件，供 tailwind 在编译时进行索引

2. 主题

[主题配置参考](https://tailwind.nodejs.cn/docs/theme#-11)

3. 夜间模式

定制夜间模式的使用

4. 插件

使用插件给 tailwind 注册新样式

官方插件

`@tailwindcss/typography`，添加了一组`prose`类，可用于将合理的排版样式快速添加到来自 markdown 或 CMS 数据库等来源的内容块。

`@tailwindcss/forms`，添加了一个自以为是的表单重置层，可以更轻松地使用工具类来设置表单元素的样式。

`@tailwindcss/aspect-ratio`，是原生 aspect-ratio 支持的替代方案，适用于旧版浏览器，并添加了`aspect-w-{n}`和`aspect-h-{n}`类，它们可以组合起来为元素提供固定的纵横比。

`@tailwindcss/container-queries`，添加了新的`@{size}`变体，如`@sm`和`@md`，使你可以根据标有`@container`而不是视口的父元素的尺寸来设置元素样式。

5. 预设

默认情况下，tailwind 配置会与默认配置进行合并扩展，`presets`可以设定不同的配置作为基础，保证跨项目时基础配置保持一致。

对于同品牌或同项目组，可以封装一个 tailwind 基础配置包，在不同项目中进行使用。

## 特性

- **布局 layout**

控制元素的布局，使用`container`类来设置元素的最大宽度，使用`box-content`或`box-border`类来控制`box-sizing`属性，或者使用`float`、`clear`和`object-fit`等类来控制元素的浮动和对象拟合。

- **Flexbox & Gird**

支持 Flexbox 和 Grid 布局，可以使用`flex`类来创建一个 flex 容器，使用`justify-*`和`items-*`类来控制元素的对齐方式，或者使用`grid`类来创建一个 grid 容器，使用`grid-cols-*`类来设置网格列数。

- **间距 Spacing**

控制元素的间距，可以使用`p-*`、`px-*`和`py-*`类来设置元素的内边距，使用`m-*`、`mx-*`和`my-*`类来设置元素的外边距。

- **尺寸 Sizing**

控制元素的尺寸，可以使用`w-*`和`h-*`类来设置元素的宽度和高度，或者使用`max-w-*`和`max-h-*`类来设置元素的最大宽度和高度。

- **排版 Typography**

控制文本的排版，可以使用`font-*`类来设置字体，使用`text-*`类来设置文本大小、颜色、对齐方式等。

- **背景 Backgrounds**

控制元素的背景，可以使用`bg-*`类来设置背景颜色，使用`bg-opacity-*`类来设置背景透明度，或者使用`bg-cover`和`bg-contain`类来控制背景大小。

- **边框 Borders**

控制元素的边框，可以使用`border-*`类来设置边框宽度和颜色，使用`rounded-*`类来设置边框圆角。

- **效果 Effects**

添加各种视觉效果，可以使用`shadow-*`类来添加阴影效果，或者使用`opacity-*`类来设置元素的透明度。

- **滤镜 Filters**

支持 CSS 滤镜，可以使用`blur-*`、`brightness-*`和`contrast-*`等，用于调整图像的视觉效果。

- **表格 Tables**

用于样式化 HTML 表格，可以使用`border-collapse`类来设置边框折叠，使用`table-auto`、`table-fixed`类来设置表格布局。

- **过渡 Transitions & 动画 Animation**

支持 CSS 过渡和动画，可以使用`transition-*`类来设置过渡属性，使用`animate-*`类来应用预定义的动画。

- **转换 Transforms**

支持 CSS 转换，可以使用`scale-*`、`rotate-*`和`translate-*`等，用于调整元素的尺寸、旋转和位置。

- **交互 Interactivity**

控制元素的交互状态，可以使用`cursor-*`类来改变鼠标悬停时的光标样式，使用`pointer-events-*`类来控制元素的点击事件。

- **SVG**

控制 SVG 元素的颜色、尺寸等样式，可以使用`fill-*`、`stroke-*`等调整 SVG 元素的样式

- **无障碍 Accessibility**

改进网站的无障碍访问，可以使用`sr-only`类来隐藏视觉元素，但对屏幕阅读器保持可见，或者使用`focus:outline-none`类来移除焦点轮廓。

## 原理

tailwindcss 是基于 postcss 的 AST 实现的 css 代码生成工具，并通过 extractor 提取 js、html 等中 class

## 优点

1. 快速开发：Tailwind CSS 提供了大量预定义的 CSS 类，使得开发者能够快速构建用户界面。

2. 高度可定制：Tailwind CSS 允许开发者通过配置文件定制样式，实现个性化的 UI 设计。

3. 易于维护：实用程序优先的方法使得 HTML 和 CSS 代码更加模块化，易于维护。

## 框架对比

1. Bootstrap：Bootstrap 是最流行的 CSS 框架之一，提供了一系列预定义的组件和样式。与 Tailwind CSS 相比，Bootstrap 更注重组件，而 Tailwind 更注重实用程序类。这意味着使用 Tailwind CSS 可能需要编写更少的自定义 CSS，但相应地，开发者需要熟悉更多的实用程序类。

2. Bulma：Bulma 是另一个流行的 CSS 框架，专注于提供现代化的 UI 设计。与 Tailwind 相比，Bulma 更依赖于预定义的组件，而 Tailwind 则提供了更高的可定制性。

## 结论

Tailwind CSS 是一个用于构建响应式用户界面的实用程序优先的 CSS 框架。它提供了一系列预定义的 CSS 类，使开发者能够快速地构建用户界面，而无需编写任何自定义 CSS 代码。Tailwind CSS 的核心理念是将样式直接应用于 HTML 元素，从而实现高度可定制且易于维护的 UI。
