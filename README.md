# 🌗 light-dark-auto

[中文](./README-zh_CN.md) | English

A lightweight library for managing light/dark theme switching with automatic system preference detection. It provides both programmatic API and a ready-to-use Web Component.

[![NPM Last Update](https://img.shields.io/npm/last-update/light-dark-auto?style=for-the-badge)](http://npmjs.com/package/light-dark-auto)
[![NPM Version](https://img.shields.io/npm/v/light-dark-auto?style=for-the-badge)](http://npmjs.com/package/light-dark-auto)
[![NPM Downloads](https://img.shields.io/npm/dy/light-dark-auto?style=for-the-badge)](http://npmjs.com/package/light-dark-auto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

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
<script src="https://cdn.jsdelivr.net/npm/light-dark-auto/lib/index.umd.js"></script>

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

#### Web Component Attributes

The `<theme-switch>` element supports the following attributes:

- `theme` - Set the initial theme. Possible values: `auto` (default), `light`, or `dark`
- `theme-key` - Set the localStorage key to save theme preference. Default: `theme`
- `body-theme-attr` - Set the attribute name added to the body element. Default: `theme`
- `immediate` - Apply theme immediately on component initialization. Default: `true`

```html
<!-- Set initial theme to dark -->
<theme-switch theme="dark"></theme-switch>
```

#### Web Component Methods

The `<theme-switch>` element provides the following methods for programmatic control:

- `addThemeChangeEventListener(listener)` - Add a listener for theme change events
- `removeThemeChangeEventListener(listener)` - Remove a previously added listener

Example usage:

```javascript
const themeSwitch = document.querySelector('theme-switch');

// Add theme change listener
const listener = (theme, details) => {
  console.log('Theme changed to:', theme, 'Details:', details);
};
themeSwitch.addThemeChangeEventListener(listener);

// Remove theme change listener
themeSwitch.removeThemeChangeEventListener(listener);
```

To get or set the current theme programmatically:

```javascript
// Get current theme
console.log(themeSwitch.theme); // 'auto', 'light', or 'dark'

// Set theme
themeSwitch.theme = 'dark'; // or 'light' or 'auto'
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
