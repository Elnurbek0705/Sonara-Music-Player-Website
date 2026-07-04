import { Lang, ThemeKey, ThemeDef, Track } from "./types";
import {
  Music2,
  Globe,
  List,
  Palette,
  MonitorSpeaker,
  Zap,
} from "lucide-react";

export const THEMES: Record<ThemeKey, ThemeDef> = {
  default: {
    label: "Default",
    accent: "#c8893a",
    accentRgb: "200,137,58",
    bg: "#1e1e1e",
    bg2: "#0a0a0f",
    border: "#3d2e1a",
    trackBg: "#141414",
    titleBarBg: "#111",
    dot: "#c8893a",
    glow: "rgba(200,137,58,0.35)",
  },
  fire: {
    label: "Fire",
    accent: "#F48C06",
    accentRgb: "244,140,6",
    bg: "#1f1a10",
    bg2: "#0d0a00",
    border: "#4a3800",
    trackBg: "#130e00",
    titleBarBg: "#0d0900",
    dot: "#F48C06",
    glow: "rgba(244,140,6,0.35)",
  },
  rose: {
    label: "Rose",
    accent: "#FF4D6D",
    accentRgb: "255,77,109",
    bg: "#1f1015",
    bg2: "#0d0008",
    border: "#4a1025",
    trackBg: "#130008",
    titleBarBg: "#0d0008",
    dot: "#FF4D6D",
    glow: "rgba(255,77,109,0.35)",
  },
  cyber: {
    label: "Cyber",
    accent: "#64DFDF",
    accentRgb: "100,223,223",
    bg: "#0f1e1e",
    bg2: "#020d0d",
    border: "#0d3a3a",
    trackBg: "#030f0f",
    titleBarBg: "#020c0c",
    dot: "#64DFDF",
    glow: "rgba(100,223,223,0.35)",
  },
  forest: {
    label: "Forest",
    accent: "#74C69D",
    accentRgb: "116,198,157",
    bg: "#101a12",
    bg2: "#050d07",
    border: "#193d20",
    trackBg: "#040d06",
    titleBarBg: "#040c06",
    dot: "#74C69D",
    glow: "rgba(116,198,157,0.35)",
  },
  slate: {
    label: "Slate",
    accent: "#ADB5BD",
    accentRgb: "173,181,189",
    bg: "#1a1c1f",
    bg2: "#0d0e10",
    border: "#2e3035",
    trackBg: "#101113",
    titleBarBg: "#0d0e10",
    dot: "#ADB5BD",
    glow: "rgba(173,181,189,0.35)",
  },
};

export const TRACKS: Track[] = [
  { artist: "James Hart", title: "Midnight Drive", time: "3:42", cur: "1:14", progress: 30, badge: "MP3" },
  { artist: "Clara Moss", title: "Fading Light", time: "4:05", cur: "0:48", progress: 19, badge: "FLAC" },
  { artist: "Owen Ray", title: "Empty Streets", time: "3:17", cur: "2:31", progress: 76, badge: "MP3" },
  { artist: "Lena Park", title: "Still Water", time: "3:58", cur: "0:22", progress: 9, badge: "MP3" },
  { artist: "Marcus Vale", title: "Open Road", time: "4:20", cur: "1:55", progress: 44, badge: "YT" },
  { artist: "Sofia Dunn", title: "Between the Lines", time: "3:33", cur: "0:59", progress: 28, badge: "FLAC" },
];

export const FEATURES = {
  uz: [
    { icon: Music2, title: "Mahalliy fayllar", desc: "MP3, FLAC, WAV, OGG, M4A formatlarini qo'llab-quvvatlaydi" },
    { icon: Globe, title: "Internet qidiruv", desc: "YouTube dan qidiring va to'g'ridan tinglang" },
    { icon: List, title: "Ko'p playlist", desc: "Cheksiz playlist yarating va boshqaring" },
    { icon: Palette, title: "6 ta tema", desc: "Default, Fire, Rose, Cyber, Forest, Slate" },
    { icon: MonitorSpeaker, title: "Tizim integratsiyasi", desc: "Tray ikonka, media tugmalari, mini player" },
    { icon: Zap, title: "Engil va tez", desc: "Tauri texnologiyasi — atigi ~30 MB, kam RAM" },
  ],
  ru: [
    { icon: Music2, title: "Локальные файлы", desc: "Поддержка MP3, FLAC, WAV, OGG, M4A форматов" },
    { icon: Globe, title: "Поиск в интернете", desc: "Ищите на YouTube и слушайте напрямую" },
    { icon: List, title: "Несколько плейлистов", desc: "Создавайте и управляйте неограниченными плейлистами" },
    { icon: Palette, title: "6 тем оформления", desc: "Default, Fire, Rose, Cyber, Forest, Slate" },
    { icon: MonitorSpeaker, title: "Системная интеграция", desc: "Иконка в трее, медиа-клавиши, мини-плеер" },
    { icon: Zap, title: "Лёгкий и быстрый", desc: "Технология Tauri — всего ~30 МБ, мало RAM" },
  ],
  en: [
    { icon: Music2, title: "Local files", desc: "Supports MP3, FLAC, WAV, OGG, M4A formats" },
    { icon: Globe, title: "Internet search", desc: "Search YouTube and listen directly" },
    { icon: List, title: "Multiple playlists", desc: "Create and manage unlimited playlists" },
    { icon: Palette, title: "6 themes", desc: "Default, Fire, Rose, Cyber, Forest, Slate" },
    { icon: MonitorSpeaker, title: "System integration", desc: "Tray icon, media keys, mini player" },
    { icon: Zap, title: "Lightweight & fast", desc: "Tauri technology — only ~30 MB, low RAM" },
  ],
};

export const T = {
  nav: {
    uz: ["Xususiyatlar", "Temalar", "Yuklab olish"],
    ru: ["Возможности", "Темы", "Скачать"],
    en: ["Features", "Themes", "Download"],
  },
  badge: {
    uz: "Versiya 0.2.0 — Bepul",
    ru: "Версия 0.2.0 — Бесплатно",
    en: "Version 0.2.0 — Free",
  },
  heroTitle: {
    uz: ["Musiqangizni", "his qiling"],
    ru: ["Почувствуйте", "музыку"],
    en: ["Feel your", "music"],
  },
  heroSub: {
    uz: "Mahalliy fayllar va internet musiqasini bir joyda tinglang. Engil, tez va chiroyli.",
    ru: "Слушайте локальные файлы и музыку из интернета в одном месте. Лёгкий, быстрый и красивый.",
    en: "Listen to local files and internet music in one place. Lightweight, fast and beautiful.",
  },
  download: { uz: "Yuklab olish", ru: "Скачать", en: "Download" },
  what: { uz: "Nima qila oladi", ru: "Возможности", en: "What it can do" },
  featTitle: {
    uz: "Hamma narsa bir joyda",
    ru: "Всё в одном месте",
    en: "Everything in one place",
  },
  themes: { uz: "Temalar", ru: "Темы", en: "Themes" },
  themesTitle: {
    uz: "O'z uslubingizni tanlang",
    ru: "Выберите свой стиль",
    en: "Choose your style",
  },
  themesSub: {
    uz: "Temaga bosib, playerda qanday ko'rinishini hoziroq ko'ring",
    ru: "Нажмите на тему, чтобы увидеть как выглядит плеер",
    en: "Click a theme to preview how it looks in the player right now",
  },
  dlTitle: { uz: "Bepul yuklab oling", ru: "Скачайте бесплатно", en: "Download for free" },
  dlBtn: {
    uz: "Windows uchun yuklab olish",
    ru: "Скачать для Windows",
    en: "Download for Windows",
  },
  dlSize: {
    uz: "Windows uchun .exe · ~30 MB",
    ru: "Установщик .exe для Windows · ~30 МБ",
    en: "Windows .exe installer · ~30 MB",
  },
  internet: {
    uz: "Internet (YouTube uchun)",
    ru: "Интернет (для YouTube)",
    en: "Internet (for YouTube)",
  },
  openSource: { uz: "Ochiq manba", ru: "Открытый код", en: "Open source" },
  copy: {
    uz: "Barcha huquqlar himoyalangan.",
    ru: "Все права защищены.",
    en: "All rights reserved.",
  },
};

export function tl<T extends Record<Lang, string>>(obj: T, lang: Lang): string {
  return obj[lang];
}

export const GITHUB_URL = "https://github.com/Elnurbek0705/Sonara-Music-Player";
