# 🌗 light-dark-auto

[中文](./README-zh_CN.md) | English

A lightweight library for managing light/dark theme switching with automatic system preference detection. It provides both programmatic API and a ready-to-use Web Component.

## 🌟 Features

- 🎯 Automatic detection of system theme preference
- 💡 Manual theme switching (light/dark mode)
- 💾 Theme persistence using localStorage
- 🧩 Web Component (`<theme-switch>`) for easy UI integration
- 🚀 Zero dependencies
- 📝 Written in TypeScript with full type support
- ⚡ Lightweight and fast

## 📦 Installation

```bash
npm install light-dark-auto
```

## 🚀 Usage

### 📘 Basic Usage

Import and initialize the theme manager:

```javascript
import { useTheme } from 'light-dark-auto';

const themeStore = useTheme((theme, details) => {
  console.log('Theme changed to:', theme, 'Details:', details);
});

// Get current theme
console.log(themeStore.theme); // 'auto', 'light', or 'dark'

// Change theme
themeStore.light();  // Switch to light mode
themeStore.dark();   // Switch to dark mode
themeStore.auto();   // Follow system preference
```

### 🔌 Using the Web Component

Include the component in your HTML:

```html
<script type="module">
  import 'light-dark-auto/lib/theme-switch-element/index.esm.js';
</script>

<theme-switch></theme-switch>
```

Customize icons with slots:

```html
<theme-switch>
  <div slot="light">☀️ Light</div>
  <div slot="dark">🌙 Dark</div>
  <div slot="system-light">_AUTO(Light)_</div>
  <div slot="system-dark">_AUTO(Dark)_</div>
</theme-switch>
```

### ⚙️ Advanced Configuration

```javascript
import { useTheme } from 'light-dark-auto';

const themeStore = useTheme(
  (theme, details) => {
    // Theme change callback
    console.log('Theme changed to:', theme);
  },
  {
    themeKey: 'my-app-theme',     // localStorage key (default: 'theme')
    bodyThemeAttr: 'data-theme',  // body attribute (default: 'theme')
    immediate: true,              // Apply theme immediately (default: false)
    initialTheme: 'dark'          // Initial theme (default: 'auto')
  }
);
```

## 📚 API

### `useTheme(onThemeChange?, options?)`

Creates a theme store instance.

- `onThemeChange`: Callback function triggered when theme changes
- `options`: Configuration object

### Theme Store Methods

- `themeStore.theme` - Get or set current theme
- `themeStore.light()` - Switch to light mode
- `themeStore.dark()` - Switch to dark mode
- `themeStore.auto()` - Follow system preference
- `themeStore.getThemeDetail()` - Get actual theme ('light' or 'dark')

## 🧠 How It Works

The library adds a `theme` attribute to the `<body>` element with values:
- `theme="dark"` for dark mode
- No attribute (or removed attribute) for light mode

For automatic mode, it listens to the `prefers-color-scheme` media query and updates the body attribute accordingly.

## 🌐 Browser Support

- Modern browsers with ES6+ support
- Custom Elements API for Web Component usage

## 📄 License

MIT