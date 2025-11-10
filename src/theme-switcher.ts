import type {
  ThemeChangeEvent,
  ThemeSwitcherOptions,
  ThemeType,
} from "./types";

export class ThemeSwitcher {
  #THEME_KEY = "theme";
  #BODY_THEME_ATTR = "theme";
  #GLThemeRef = {
    matchMedia: window.matchMedia("(prefers-color-scheme: light)"),
    onThemeChanges: [] as ThemeChangeEvent[],
  };
  #immediate = false;
  #initialTheme = "auto";
  constructor(
    options?: ThemeSwitcherOptions,
  ) {
    if (options?.themeKey) {
      this.#THEME_KEY = options.themeKey;
    }
    if (options?.bodyThemeAttr) {
      this.#BODY_THEME_ATTR = options.bodyThemeAttr;
    }
    if (typeof options?.immediate === "boolean") {
      this.#immediate = options.immediate;
    }
    if (
      options?.initialTheme && [
        "light",
        "dark",
        "auto",
      ].includes(options.initialTheme)
    ) {
      this.#initialTheme = options.initialTheme;
    }
  }
  useThemeStore(onChange?: (nextTheme: ThemeType) => void) {
    const theme = (nextTheme?: ThemeType) => {
      const storeTheme = localStorage.getItem(this.#THEME_KEY);
      const previousTheme = (storeTheme ?? this.#initialTheme) as ThemeType;
      if (
        typeof nextTheme !== "undefined" && nextTheme !== previousTheme
      ) {
        localStorage.setItem(this.#THEME_KEY, nextTheme);
        if (typeof onChange === "function") {
          onChange(nextTheme);
        }
        return nextTheme;
      }
      return previousTheme;
    };

    if (typeof onChange === "function" && this.#immediate) {
      onChange(theme());
    }

    return {
      get theme() {
        return theme();
      },
      set theme(nextTheme) {
        theme(nextTheme);
      },
      dark: () => {
        theme("dark");
      },
      light: () => {
        theme("light");
      },
      auto: () => {
        theme("auto");
      },
      getThemeDetail: () => {
        const value = theme();
        if (value !== "auto") {
          return value;
        }
        return this.#GLThemeRef.matchMedia.matches ? "light" : "dark";
      },
      addThemeChangeEventListener: (e: ThemeChangeEvent) => {
        if (this.#GLThemeRef.onThemeChanges.includes(e)) {
          return;
        }
        this.#GLThemeRef.onThemeChanges.push(e);
      },
      removeThemeChangeEventListener: (e: ThemeChangeEvent) => {
        this.#GLThemeRef.onThemeChanges = this.#GLThemeRef
          .onThemeChanges
          .filter(
            (handleChange) => handleChange !== e,
          );
      },
    };
  }
  #dark() {
    document.body.setAttribute(this.#BODY_THEME_ATTR, "dark");
  }
  #light() {
    document.body.removeAttribute(this.#BODY_THEME_ATTR);
  }
  #matchTheme(e: MediaQueryListEvent | { matches: boolean }) {
    if (e.matches) {
      this.#light();
    } else {
      this.#dark();
    }
    if (this.#GLThemeRef.onThemeChanges.length) {
      this.#GLThemeRef.onThemeChanges.forEach((handleChange) =>
        handleChange("auto", e.matches ? "light" : "dark")
      );
    }
  }
  #removeAutoChangeThemeEvent() {
    this.#GLThemeRef.matchMedia.removeEventListener(
      "change",
      this.#matchTheme,
    );
  }
  #addAutoChangeThemeEvent() {
    this.#removeAutoChangeThemeEvent();
    this.#GLThemeRef.matchMedia.addEventListener(
      "change",
      this.#matchTheme.bind(this),
    );
  }
  #handleLight(onThemeChange?: ThemeChangeEvent) {
    this.#removeAutoChangeThemeEvent();
    this.#light();
    if (typeof onThemeChange === "function") {
      onThemeChange("light", "light");
    }
    if (this.#GLThemeRef.onThemeChanges.length) {
      this.#GLThemeRef.onThemeChanges.forEach((handleChange) =>
        handleChange("light", "light")
      );
    }
  }
  #handleDark(onThemeChange?: ThemeChangeEvent) {
    this.#removeAutoChangeThemeEvent();
    this.#dark();
    if (typeof onThemeChange === "function") onThemeChange("dark", "dark");
    if (this.#GLThemeRef.onThemeChanges.length) {
      this.#GLThemeRef.onThemeChanges.forEach((handleChange) =>
        handleChange("dark", "dark")
      );
    }
  }
  #handleAuto(onThemeChange?: ThemeChangeEvent) {
    if (
      typeof onThemeChange === "function" &&
      !this.#GLThemeRef.onThemeChanges.includes(onThemeChange)
    ) {
      this.#GLThemeRef.onThemeChanges.push(onThemeChange);
    }
    this.#matchTheme(this.#GLThemeRef.matchMedia);
    this.#addAutoChangeThemeEvent();
  }
  switchTheme(e: ThemeType, onThemeChange?: ThemeChangeEvent) {
    switch (e) {
      case "light":
        this.#handleLight(onThemeChange);
        break;
      case "dark":
        this.#handleDark(onThemeChange);
        break;
      case "auto":
        this.#handleAuto(onThemeChange);
        break;
    }
  }
}

export function useTheme(
  onThemeChange?: ThemeChangeEvent,
  options?: ThemeSwitcherOptions,
) {
  const switcher = new ThemeSwitcher(options);
  const store = switcher.useThemeStore((theme) => {
    switcher.switchTheme(theme, onThemeChange);
  });
  return store;
}
