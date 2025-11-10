# 🌗 light-dark-auto

中文 | [English](./README.md)

一个轻量级的库，用于管理明暗主题切换并自动检测系统偏好设置。它提供了编程 API 和即用型 Web 组件。

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
<script type="module">
  import 'light-dark-auto/lib/theme-switch-element/index.esm.js';
</script>

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