export type Lang = "uz" | "ru" | "en";
export type ThemeKey = "default" | "fire" | "rose" | "cyber" | "forest" | "slate";

export type ThemeDef = {
  label: string;
  accent: string;
  accentRgb: string;
  bg: string;
  bg2: string;
  border: string;
  trackBg: string;
  titleBarBg: string;
  dot: string;
  glow: string;
};

export type Track = {
  artist: string;
  title: string;
  time: string;
  cur: string;
  progress: number;
  badge: string;
};
