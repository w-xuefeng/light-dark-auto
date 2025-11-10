# 🌗 light-dark-auto

中文 | [English](./README.md)

一个轻量级的库，用于管理明暗主题切换并自动检测系统偏好设置。它提供了编程 API 和即用型 Web 组件。

[![NPM Last Update](https://img.shields.io/npm/last-update/light-dark-auto?style=for-the-badge)](http://npmjs.com/package/light-dark-auto)
[![NPM Version](https://img.shields.io/npm/v/light-dark-auto?style=for-the-badge)](http://npmjs.com/package/light-dark-auto)
[![NPM Downloads](https://img.shields.io/npm/dy/light-dark-auto?style=for-the-badge)](http://npmjs.com/package/light-dark-auto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

## 🌟 功能特性

- 🎯 自动检测系统主题偏好
- 💡 手动切换主题（明暗模式）
- 💾 使用 localStorage 持久化主题设置
- 🧩 Web 组件（`<theme-switch>`）便于 UI 集成
- 🚀 零依赖
- 📝 使用 TypeScript 编写，完整的类型支持
- ⚡ 轻量且快速

## 📦 安装

```bash
npm install light-dark-auto
```

## 🚀 使用方法

### 📘 基础使用

导入并初始化主题管理器：

```javascript
import { useTheme } from 'light-dark-auto';

const themeStore = useTheme((theme, details) => {
  console.log('主题更改为:', theme, '详情:', details);
});

// 获取当前主题
console.log(themeStore.theme); // 'auto', 'light', 或 'dark'

// 更改主题
themeStore.light();  // 切换到浅色模式
themeStore.dark();   // 切换到深色模式
themeStore.auto();   // 跟随系统偏好
```

### 🔌 使用 Web 组件

在 HTML 中引入组件：

```html
<script src="https://cdn.jsdelivr.net/npm/light-dark-auto/lib/index.umd.js"></script>

<theme-switch></theme-switch>
```

使用插槽自定义图标：

```html
<theme-switch>
  <div slot="light">☀️ 浅色</div>
  <div slot="dark">🌙 深色</div>
  <div slot="system-light">_自动(浅色)_</div>
  <div slot="system-dark">_自动(深色)_</div>
</theme-switch>
```

#### Web 组件属性

`<theme-switch>` 元素支持以下属性：

- `theme` - 设置初始主题。可选值：`auto`（默认）、`light` 或 `dark`
- `theme-key` - 设置用于保存主题偏好的 localStorage 键名。默认值：`theme`
- `body-theme-attr` - 设置添加到 body 元素的属性名。默认值：`theme`
- `immediate` - 在组件初始化时立即应用主题。默认值：`true`

```html
<!-- 设置初始主题为深色 -->
<theme-switch theme="dark"></theme-switch>
```

#### Web 组件方法

`<theme-switch>` 元素提供以下方法用于编程控制：

- `addThemeChangeEventListener(listener)` - 添加主题更改事件监听器
- `removeThemeChangeEventListener(listener)` - 移除已添加的监听器

使用示例：

```javascript
const themeSwitch = document.querySelector('theme-switch');

// 添加主题更改监听器
const listener = (theme, details) => {
  console.log('主题更改为:', theme, '详情:', details);
};
themeSwitch.addThemeChangeEventListener(listener);

// 移除主题更改监听器
themeSwitch.removeThemeChangeEventListener(listener);
```

以编程方式获取或设置当前主题：

```javascript
// 获取当前主题
console.log(themeSwitch.theme); // 'auto', 'light', 或 'dark'

// 设置主题
themeSwitch.theme = 'dark'; // 或 'light' 或 'auto'
```

### ⚙️ 高级配置

```javascript
import { useTheme } from 'light-dark-auto';

const themeStore = useTheme(
  (theme, details) => {
    // 主题更改回调函数
    console.log('主题更改为:', theme);
  },
  {
    themeKey: 'my-app-theme',     // localStorage 键名 (默认: 'theme')
    bodyThemeAttr: 'data-theme',  // body 属性 (默认: 'theme')
    immediate: true,              // 立即应用主题 (默认: false)
    initialTheme: 'dark'          // 初始主题 (默认: 'auto')
  }
);
```

## 📚 API

### `useTheme(onThemeChange?, options?)`

创建一个主题存储实例。

- `onThemeChange`: 主题更改时触发的回调函数
- `options`: 配置对象

### 主题存储方法

- `themeStore.theme` - 获取或设置当前主题
- `themeStore.light()` - 切换到浅色模式
- `themeStore.dark()` - 切换到深色模式
- `themeStore.auto()` - 跟随系统偏好
- `themeStore.getThemeDetail()` - 获取实际主题 ('light' 或 'dark')

## 🧠 工作原理

该库会在 `<body>` 元素上添加一个 `theme` 属性，值为：
- `theme="dark"` 表示深色模式
- 无属性（或移除属性）表示浅色模式

对于自动模式，它会监听 `prefers-color-scheme` 媒体查询并相应更新 body 属性。

## 🌐 浏览器支持

- 支持 ES6+ 的现代浏览器
- 使用 Web 组件需要 Custom Elements API 支持

## 📄 许可证

MIT
