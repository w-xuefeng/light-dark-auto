import defaultTemplatea from "./templates";
import { type ThemeSwitcher, useTheme } from "../theme-switcher";
import type { ThemeChangeEvent, ThemeType, ThemeTypeSpecific } from "../types";

export class ThemeSwitch extends HTMLElement {
  static observedAttributes = ["theme"];
  static elementName = "theme-switch";
  static {
    if (!customElements.get(this.elementName)) {
      customElements.define(this.elementName, ThemeSwitch);
    }
  }
  override shadowRoot: ShadowRoot;
  themeStore: ReturnType<ThemeSwitcher["useThemeStore"]> | null = null;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = defaultTemplatea.box;
  }
  isVaild(theme: string): theme is ThemeType {
    return ["light", "dark", "auto"].includes(theme);
  }
  get theme() {
    return this.themeStore?.theme || "auto";
  }
  set theme(theme: string) {
    if (!this.isVaild(theme)) return;
    if (!this.themeStore) return;
    this.themeStore.theme = theme;
  }

  handleSlots() {
    const lightSlot = this.shadowRoot.querySelector<HTMLSlotElement>(
      'slot[name="light"]',
    );
    const darkSlot = this.shadowRoot.querySelector<HTMLSlotElement>(
      'slot[name="dark"]',
    );
    const systemLightSlot = this.shadowRoot.querySelector<HTMLSlotElement>(
      'slot[name="system-light"]',
    );
    const systemDarkSlot = this.shadowRoot.querySelector<HTMLSlotElement>(
      'slot[name="system-dark"]',
    );

    const hasLight = (lightSlot?.assignedNodes()?.length ?? 0) > 0;
    const hasDark = (darkSlot?.assignedNodes()?.length ?? 0) > 0;
    const hasSystemLight = (systemLightSlot?.assignedNodes()?.length ?? 0) > 0;
    const hasSystemDark = (systemDarkSlot?.assignedNodes()?.length ?? 0) > 0;

    if (!hasDark || !hasLight || !hasSystemLight || !hasSystemDark) {
      this.innerHTML +=
        `<style name="default-slot-style">.default-slot{display:flex;gap:2em;align-items:center;span{font-size:2em;}}</style>`;
    }

    if (!hasLight) {
      this.innerHTML +=
        `<div slot="light" class="default-slot">${defaultTemplatea.light}</slot>`;
    }
    if (!hasDark) {
      this.innerHTML +=
        `<div slot="dark" class="default-slot">${defaultTemplatea.dark}</slot>`;
    }
    if (!hasSystemLight) {
      this.innerHTML +=
        `<div slot="system-light" class="default-slot">${defaultTemplatea.systemLight}</slot>`;
    }
    if (!hasSystemDark) {
      this.innerHTML +=
        `<div slot="system-dark" class="default-slot">${defaultTemplatea.systemDark}</slot>`;
    }
  }

  connectedCallback() {
    this.handleSlots();
    const initialTheme = this.getAttribute("theme") as
      | ThemeType
      | undefined;
    const lightBtn = this.shadowRoot.querySelector(".light");
    const darkBtn = this.shadowRoot.querySelector(".dark");
    const systemLightBtn = this.shadowRoot.querySelector(".system-light");
    const systemDarkBtn = this.shadowRoot.querySelector(".system-dark");
    const visible = (
      theme: ThemeType,
      details: ThemeTypeSpecific,
    ) => {
      [lightBtn, darkBtn, systemLightBtn, systemDarkBtn].forEach((e) =>
        e?.classList.remove("visible")
      );
      if (theme !== "auto") {
        const btn = this.shadowRoot.querySelector(`.box.${theme}`);
        btn?.classList.add("visible");
      } else {
        const btn = this.shadowRoot.querySelector(
          `.box.system-${details}`,
        );
        btn?.classList.add("visible");
      }
    };
    this.themeStore = useTheme(visible, { immediate: true, initialTheme });
    lightBtn?.addEventListener("click", this.themeStore.dark);
    darkBtn?.addEventListener("click", this.themeStore.auto);
    systemLightBtn?.addEventListener("click", this.themeStore.light);
    systemDarkBtn?.addEventListener("click", this.themeStore.light);
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "theme" && oldValue !== newValue) {
      this.theme = newValue;
    }
  }
  addThemeChangeEventListener(listener: ThemeChangeEvent) {
    if (!this.themeStore) return;
    this.themeStore.addThemeChangeEventListener(listener);
  }
  removeThemeChangeEventListener(listener: ThemeChangeEvent) {
    if (!this.themeStore) return;
    this.themeStore.removeThemeChangeEventListener(listener);
  }
}
