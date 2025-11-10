type ThemeObject = {
  light: string;
  dark: string;
  auto: string;
};

export type ThemeType = keyof ThemeObject;
export type ThemeTypeSpecific = keyof Omit<ThemeObject, "auto">;

export interface ThemeSwitcherOptions {
  themeKey?: string;
  bodyThemeAttr?: string;
  immediate?: boolean;
  initialTheme?: ThemeType;
}

export type ThemeChangeEvent = (
  e: ThemeType,
  details: ThemeTypeSpecific,
) => void;
