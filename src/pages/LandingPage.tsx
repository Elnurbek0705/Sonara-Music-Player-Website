import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Music2, Download, Github, Shuffle, SkipBack, Square, Play, Pause,
  SkipForward, Repeat, Zap, Palette, List, MonitorSpeaker, Globe, Package,
  ShieldCheck, Cpu, Wifi, ChevronRight,
} from "lucide-react";

type Lang = "uz" | "ru" | "en";
type ThemeKey = "default" | "fire" | "rose" | "cyber" | "forest" | "slate";

const THEMES: Record<ThemeKey, {
  label: string; accent: string; accentRgb: string;
  bg: string; bg2: string; border: string; trackBg: string; titleBarBg: string; dot: string;
  glow: string;
}> = {
  default: { label: "Default", accent: "#c8893a", accentRgb: "200,137,58",  bg: "#1e1e1e", bg2: "#0a0a0f", border: "#3d2e1a", trackBg: "#141414", titleBarBg: "#111", dot: "#c8893a", glow: "rgba(200,137,58,0.35)" },
  fire:    { label: "Fire",    accent: "#F48C06", accentRgb: "244,140,6",   bg: "#1f1a10", bg2: "#0d0a00", border: "#4a3800", trackBg: "#130e00", titleBarBg: "#0d0900", dot: "#F48C06", glow: "rgba(244,140,6,0.35)" },
  rose:    { label: "Rose",    accent: "#FF4D6D", accentRgb: "255,77,109",  bg: "#1f1015", bg2: "#0d0008", border: "#4a1025", trackBg: "#130008", titleBarBg: "#0d0008", dot: "#FF4D6D", glow: "rgba(255,77,109,0.35)" },
  cyber:   { label: "Cyber",   accent: "#64DFDF", accentRgb: "100,223,223", bg: "#0f1e1e", bg2: "#020d0d", border: "#0d3a3a", trackBg: "#030f0f", titleBarBg: "#020c0c", dot: "#64DFDF", glow: "rgba(100,223,223,0.35)" },
  forest:  { label: "Forest",  accent: "#74C69D", accentRgb: "116,198,157", bg: "#101a12", bg2: "#050d07", border: "#193d20", trackBg: "#040d06", titleBarBg: "#040c06", dot: "#74C69D", glow: "rgba(116,198,157,0.35)" },
  slate:   { label: "Slate",   accent: "#ADB5BD", accentRgb: "173,181,189", bg: "#1a1c1f", bg2: "#0d0e10", border: "#2e3035", trackBg: "#101113", titleBarBg: "#0d0e10", dot: "#ADB5BD", glow: "rgba(173,181,189,0.35)" },
};

const TRACKS = [
  { artist: "James Hart",   title: "Midnight Drive",    time: "3:42", cur: "1:14", progress: 30, badge: "MP3" },
  { artist: "Clara Moss",   title: "Fading Light",      time: "4:05", cur: "0:48", progress: 19, badge: "FLAC" },
  { artist: "Owen Ray",     title: "Empty Streets",     time: "3:17", cur: "2:31", progress: 76, badge: "MP3" },
  { artist: "Lena Park",    title: "Still Water",       time: "3:58", cur: "0:22", progress: 9,  badge: "MP3" },
  { artist: "Marcus Vale",  title: "Open Road",         time: "4:20", cur: "1:55", progress: 44, badge: "YT" },
  { artist: "Sofia Dunn",   title: "Between the Lines", time: "3:33", cur: "0:59", progress: 28, badge: "FLAC" },
];

const FEATURES = {
  uz: [
    { icon: Music2,         title: "Mahalliy fayllar",     desc: "MP3, FLAC, WAV, OGG, M4A formatlarini qo'llab-quvvatlaydi" },
    { icon: Globe,          title: "Internet qidiruv",     desc: "YouTube dan qidiring va to'g'ridan tinglang" },
    { icon: List,           title: "Ko'p playlist",        desc: "Cheksiz playlist yarating va boshqaring" },
    { icon: Palette,        title: "6 ta tema",            desc: "Default, Fire, Rose, Cyber, Forest, Slate" },
    { icon: MonitorSpeaker, title: "Tizim integratsiyasi", desc: "Tray ikonka, media tugmalari, mini player" },
    { icon: Zap,            title: "Engil va tez",         desc: "Tauri texnologiyasi — atigi ~30 MB, kam RAM" },
  ],
  ru: [
    { icon: Music2,         title: "Локальные файлы",       desc: "Поддержка MP3, FLAC, WAV, OGG, M4A форматов" },
    { icon: Globe,          title: "Поиск в интернете",    desc: "Ищите на YouTube и слушайте напрямую" },
    { icon: List,           title: "Несколько плейлистов", desc: "Создавайте и управляйте неограниченными плейлистами" },
    { icon: Palette,        title: "6 тем оформления",     desc: "Default, Fire, Rose, Cyber, Forest, Slate" },
    { icon: MonitorSpeaker, title: "Системная интеграция", desc: "Иконка в трее, медиа-клавиши, мини-плеер" },
    { icon: Zap,            title: "Лёгкий и быстрый",     desc: "Технология Tauri — всего ~30 МБ, мало RAM" },
  ],
  en: [
    { icon: Music2,         title: "Local files",          desc: "Supports MP3, FLAC, WAV, OGG, M4A formats" },
    { icon: Globe,          title: "Internet search",      desc: "Search YouTube and listen directly" },
    { icon: List,           title: "Multiple playlists",   desc: "Create and manage unlimited playlists" },
    { icon: Palette,        title: "6 themes",             desc: "Default, Fire, Rose, Cyber, Forest, Slate" },
    { icon: MonitorSpeaker, title: "System integration",   desc: "Tray icon, media keys, mini player" },
    { icon: Zap,            title: "Lightweight & fast",   desc: "Tauri technology — only ~30 MB, low RAM" },
  ],
};

const T = {
  nav:        { uz: ["Xususiyatlar", "Temalar", "Yuklab olish"], ru: ["Возможности", "Темы", "Скачать"], en: ["Features", "Themes", "Download"] },
  badge:      { uz: "Versiya 0.1.0 — Bepul",  ru: "Версия 0.1.0 — Бесплатно",   en: "Version 0.1.0 — Free" },
  heroTitle:  { uz: ["Musiqangizni", "his qiling"], ru: ["Почувствуйте", "музыку"], en: ["Feel your", "music"] },
  heroSub:    { uz: "Mahalliy fayllar va internet musiqasini bir joyda tinglang. Engil, tez va chiroyli.", ru: "Слушайте локальные файлы и музыку из интернета в одном месте. Лёгкий, быстрый и красивый.", en: "Listen to local files and internet music in one place. Lightweight, fast and beautiful." },
  download:   { uz: "Yuklab olish",   ru: "Скачать",         en: "Download" },
  what:       { uz: "Nima qila oladi", ru: "Возможности",    en: "What it can do" },
  featTitle:  { uz: "Hamma narsa bir joyda", ru: "Всё в одном месте", en: "Everything in one place" },
  themes:     { uz: "Temalar",        ru: "Темы",            en: "Themes" },
  themesTitle:{ uz: "O'z uslubingizni tanlang", ru: "Выберите свой стиль", en: "Choose your style" },
  themesSub:  { uz: "Temaga bosib, playerda qanday ko'rinishini hoziroq ko'ring", ru: "Нажмите на тему, чтобы увидеть как выглядит плеер", en: "Click a theme to preview how it looks in the player right now" },
  dlTitle:    { uz: "Bepul yuklab oling", ru: "Скачайте бесплатно", en: "Download for free" },
  dlBtn:      { uz: "Windows uchun yuklab olish", ru: "Скачать для Windows", en: "Download for Windows" },
  dlSize:     { uz: "Sonara_0.1.0_x64-setup.exe · ~30 MB", ru: "Sonara_0.1.0_x64-setup.exe · ~30 МБ", en: "Sonara_0.1.0_x64-setup.exe · ~30 MB" },
  internet:   { uz: "Internet (YouTube uchun)", ru: "Интернет (для YouTube)", en: "Internet (for YouTube)" },
  openSource: { uz: "Ochiq manba", ru: "Открытый код", en: "Open source" },
  copy:       { uz: "Barcha huquqlar himoyalangan.", ru: "Все права защищены.", en: "All rights reserved." },
};

function tl<T extends Record<Lang, string>>(obj: T, lang: Lang): string { return obj[lang]; }

/* ── 3D Floating Player ── */
function Player3D({ theme, playing, setPlaying, trackIdx, setTrackIdx, progress, setProgress }: {
  theme: ThemeKey; playing: boolean; setPlaying: (v: boolean) => void;
  trackIdx: number; setTrackIdx: (v: number) => void;
  progress: number; setProgress: (v: number) => void;
}) {
  const th = THEMES[theme];
  const track = TRACKS[trackIdx];
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), { stiffness: 120, damping: 20 });
  const glowX   = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 120, damping: 20 });
  const glowY   = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(Math.min(progress + 0.4, 100)), 200);
    return () => clearInterval(iv);
  }, [playing, progress]);

  const prev = () => { setTrackIdx((trackIdx - 1 + TRACKS.length) % TRACKS.length); setProgress(TRACKS[(trackIdx - 1 + TRACKS.length) % TRACKS.length].progress); };
  const next = () => { setTrackIdx((trackIdx + 1) % TRACKS.length); setProgress(TRACKS[(trackIdx + 1) % TRACKS.length].progress); };

  return (
    <div style={{ perspective: 1200, perspectiveOrigin: "50% 50%" }} ref={cardRef}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          width: 380,
          background: th.bg,
          border: `1px solid ${th.border}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${th.accent}22, 0 0 80px ${th.glow}`,
          transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease",
          cursor: "pointer",
          position: "relative",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glare overlay */}
        <motion.div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
          ),
          borderRadius: 16,
        }} />

        {/* Title bar */}
        <div style={{ background: th.titleBarBg, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${th.border}`, transition: "all 0.4s" }}>
          <span style={{ color: th.accent, fontSize: 20, fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: 1, transition: "color 0.4s" }}>Sonara</span>
          <div style={{ display: "flex", gap: 6 }}>
            {[th.accent, "#333", "#333"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, transition: "background 0.4s" }} />
            ))}
          </div>
        </div>

        {/* Track info */}
        <AnimatePresence mode="wait">
          <motion.div key={trackIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
            style={{ padding: "14px 16px", background: th.trackBg, transition: "background 0.4s" }}
          >
            <div style={{ color: th.accent, fontSize: 14, fontWeight: 600, marginBottom: 10, transition: "color 0.4s" }}>
              {track.artist} — {track.title}
            </div>
            {/* Progress bar */}
            <div style={{ height: 4, background: "#1a1a1a", borderRadius: 4, marginBottom: 8, cursor: "pointer", position: "relative", overflow: "hidden" }}
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
            >
              <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }}
                style={{ height: "100%", background: `linear-gradient(90deg, ${th.accent}99, ${th.accent})`, borderRadius: 4, transition: "background 0.4s" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555" }}>
              <span>{track.cur}</span><span>{track.time}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div style={{ padding: "12px 10px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, background: th.bg, transition: "background 0.4s" }}>
          {[
            { icon: Shuffle,     sm: true,  onClick: () => {} },
            { icon: SkipBack,    sm: true,  onClick: prev },
            { icon: Square,      sm: true,  onClick: () => {} },
            { icon: playing ? Pause : Play, main: true, onClick: () => setPlaying(!playing) },
            { icon: SkipForward, sm: true,  onClick: next },
            { icon: Repeat,      sm: true,  onClick: () => {} },
          ].map((btn, i) => {
            const Icon = btn.icon;
            return (
              <motion.button key={i} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={btn.onClick}
                style={{
                  background: "none",
                  border: btn.main ? `2px solid ${th.accent}` : "none",
                  color: btn.main ? th.accent : "#666",
                  width: btn.main ? 42 : "auto",
                  height: btn.main ? 42 : "auto",
                  borderRadius: btn.main ? "50%" : 0,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "color 0.4s, border-color 0.4s",
                  padding: btn.main ? 0 : 4,
                }}
              >
                <Icon size={btn.main ? 16 : 15} strokeWidth={1.8} />
              </motion.button>
            );
          })}
        </div>

        {/* Playlist */}
        <div style={{ background: th.bg, borderTop: `1px solid ${th.border}22` }}>
          {TRACKS.map((tr, i) => {
            const isActive = i === trackIdx;
            const isYT = tr.badge === "YT";
            return (
              <motion.div key={i} onClick={() => { setTrackIdx(i); setProgress(tr.progress); }}
                whileHover={{ backgroundColor: isActive ? th.accent : `${th.accent}15` }}
                style={{
                  padding: "8px 14px", fontSize: 12,
                  color: isActive ? th.bg2 : "#666",
                  background: isActive ? th.accent : "transparent",
                  borderBottom: `1px solid ${th.bg2}11`,
                  display: "flex", alignItems: "center", gap: 8,
                  cursor: "pointer", transition: "background 0.3s, color 0.4s",
                }}
              >
                <span style={{
                  fontSize: 9, padding: "1px 5px", borderRadius: 3, flexShrink: 0,
                  background: isActive ? `${th.bg2}33` : isYT ? "rgba(255,50,50,0.15)" : `${th.accent}22`,
                  color: isActive ? th.bg2 : isYT ? "#ff5555" : th.accent,
                  border: `1px solid ${isActive ? th.bg2 + "44" : isYT ? "rgba(255,50,50,0.25)" : th.accent + "44"}`,
                  transition: "all 0.4s",
                }}>{tr.badge}</span>
                {tr.artist} — {tr.title}
                {isActive && <ChevronRight size={10} style={{ marginLeft: "auto", opacity: 0.6 }} />}
              </motion.div>
            );
          })}
        </div>

        {/* Footer bar */}
        <div style={{ background: th.titleBarBg, padding: "6px 14px", display: "flex", justifyContent: "space-between", borderTop: `1px solid ${th.border}`, fontSize: 10, color: "#555", transition: "all 0.4s" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ background: "#2a2a2a", color: th.accent, border: `1px solid ${th.border}`, fontSize: 9, padding: "1px 5px", borderRadius: 3, transition: "color 0.4s, border-color 0.4s" }}>{track.badge}</span>
            {track.artist} — {track.title}
          </span>
          <span>{track.cur} / {track.time} &nbsp; {trackIdx + 1}/{TRACKS.length}</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Landing Page ── */
export default function LandingPage() {
  const [lang, setLang]         = useState<Lang>("uz");
  const [theme, setTheme]       = useState<ThemeKey>("default");
  const [playing, setPlaying]   = useState(false);
  const [trackIdx, setTrackIdx] = useState(2);
  const [progress, setProgress] = useState(TRACKS[2].progress);

  const featRef  = useRef<HTMLElement>(null);
  const themeRef = useRef<HTMLElement>(null);
  const dlRef    = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => ref.current?.scrollIntoView({ behavior: "smooth" });

  const th = THEMES[theme];

  const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const stagger = { show: { transition: { staggerChildren: 0.1 } } };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#e8e8e8" }}>

      {/* NAV */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 3rem",
          background: "rgba(10,10,15,0.8)",
          borderBottom: "1px solid rgba(200,137,58,0.12)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ fontSize: 24, color: "#c8893a", fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: 1 }}>Sonara</div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {T.nav[lang].map((label, i) => (
            <motion.button key={i} whileHover={{ color: "#c8893a" }} onClick={() => scrollTo([featRef, themeRef, dlRef][i])}
              style={{ background: "none", border: "none", color: "#777", fontSize: 14, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            >{label}</motion.button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["uz", "ru", "en"] as Lang[]).map(l => (
            <motion.button key={l} onClick={() => setLang(l)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{
                background: lang === l ? "rgba(200,137,58,0.15)" : "none",
                border: `1px solid ${lang === l ? "#c8893a" : "rgba(200,137,58,0.25)"}`,
                color: lang === l ? "#c8893a" : "#666",
                fontSize: 11, padding: "3px 9px", borderRadius: 5, cursor: "pointer",
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
              }}
            >{l.toUpperCase()}</motion.button>
          ))}
        </div>
      </motion.nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "6rem 2rem 5rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,137,58,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div variants={fadeUp} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(200,137,58,0.08)", border: "1px solid rgba(200,137,58,0.2)",
            color: "#c8893a", fontSize: 12, padding: "5px 16px", borderRadius: 20,
            marginBottom: "2rem", letterSpacing: 0.5,
          }}>
            <Music2 size={12} /> {tl(T.badge, lang)}
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(48px, 8vw, 80px)", color: "#e8e8e8", fontWeight: 500, lineHeight: 1.05, marginBottom: "1.25rem", fontFamily: "Georgia, serif" }}>
            {T.heroTitle[lang][0]}<br /><span style={{ color: "#c8893a" }}>{T.heroTitle[lang][1]}</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: 17, color: "#666", maxWidth: 480, lineHeight: 1.75, marginBottom: "2.5rem" }}>
            {tl(T.heroSub, lang)}
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button whileHover={{ scale: 1.03, background: "#e09a45" }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo(dlRef)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#c8893a", color: "#0a0a0f", fontSize: 15, fontWeight: 600, padding: "13px 28px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            >
              <Download size={16} strokeWidth={2} /> {tl(T.download, lang)}
            </motion.button>
            <motion.a whileHover={{ scale: 1.03, color: "#e8e8e8", borderColor: "rgba(255,255,255,0.3)" }} whileTap={{ scale: 0.97 }}
              href="https://github.com" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#777", fontSize: 15, padding: "13px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", textDecoration: "none" }}
            >
              <Github size={16} strokeWidth={1.8} /> GitHub
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginTop: "2.5rem", display: "flex", gap: "2rem", justifyContent: "center", fontSize: 13, color: "#555", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MonitorSpeaker size={14} color="#666" /> Windows 10+</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Package size={14} color="#666" /> ~30 MB</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#c8893a" }}><ShieldCheck size={14} /> {tl(T.openSource, lang)}</span>
          </motion.div>

          {/* 3D Player */}
          <motion.div variants={fadeUp} style={{ marginTop: "4rem" }}>
            <Player3D theme="default" playing={playing} setPlaying={setPlaying} trackIdx={trackIdx} setTrackIdx={setTrackIdx} progress={progress} setProgress={setProgress} />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section ref={featRef} style={{ background: "#0d0d12", padding: "6rem 2rem" }}>
        <motion.div style={{ maxWidth: 900, margin: "0 auto" }}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.p variants={fadeUp} style={{ fontSize: 11, color: "#c8893a", letterSpacing: 3, textTransform: "uppercase", marginBottom: "0.75rem" }}>{tl(T.what, lang)}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#e8e8e8", fontWeight: 500, marginBottom: "1rem", lineHeight: 1.15, fontFamily: "Georgia, serif" }}>{tl(T.featTitle, lang)}</motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 1, background: "#181818", border: "1px solid #181818", borderRadius: 14, overflow: "hidden", marginTop: "3rem" }}>
            {FEATURES[lang].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ background: "#141414" }}
                  style={{ background: "#0d0d12", padding: "2rem", transition: "background 0.2s" }}
                >
                  <motion.div whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(200,137,58,0.3)" }} style={{
                    width: 44, height: 44, borderRadius: 11,
                    background: "rgba(200,137,58,0.08)", border: "1px solid rgba(200,137,58,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#c8893a", marginBottom: "1.25rem", transition: "all 0.2s",
                  }}>
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.div>
                  <div style={{ color: "#e8e8e8", fontSize: 15, fontWeight: 500, marginBottom: "0.5rem" }}>{f.title}</div>
                  <div style={{ color: "#555", fontSize: 13, lineHeight: 1.65 }}>{f.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* THEMES + INTERACTIVE PLAYER */}
      <section ref={themeRef} style={{ background: "#0a0a0f", padding: "6rem 2rem" }}>
        <motion.div style={{ maxWidth: 960, margin: "0 auto" }}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.p variants={fadeUp} style={{ fontSize: 11, color: "#c8893a", letterSpacing: 3, textTransform: "uppercase", marginBottom: "0.75rem" }}>{tl(T.themes, lang)}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#e8e8e8", fontWeight: 500, marginBottom: "0.5rem", lineHeight: 1.15, fontFamily: "Georgia, serif" }}>{tl(T.themesTitle, lang)}</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: "#555", lineHeight: 1.7, maxWidth: 500, marginBottom: "2.5rem" }}>{tl(T.themesSub, lang)}</motion.p>

          {/* Theme chips */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "3rem" }}>
            {(Object.keys(THEMES) as ThemeKey[]).map(key => {
              const t2 = THEMES[key];
              const isActive = theme === key;
              return (
                <motion.button key={key} onClick={() => setTheme(key)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  animate={{ borderColor: isActive ? t2.accent : "#2a2a2a", color: isActive ? t2.accent : "#777", background: isActive ? `rgba(${t2.accentRgb},0.12)` : "#1a1a1a" }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid", padding: "8px 18px", borderRadius: 30, cursor: "pointer", fontSize: 13, fontFamily: "'Inter', sans-serif" }}
                >
                  <motion.div animate={{ background: t2.dot, boxShadow: isActive ? `0 0 10px ${t2.glow}` : "none" }} transition={{ duration: 0.3 }}
                    style={{ width: 11, height: 11, borderRadius: "50%", flexShrink: 0 }}
                  />
                  {t2.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Interactive 3D player */}
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
            <Player3D theme={theme} playing={playing} setPlaying={setPlaying} trackIdx={trackIdx} setTrackIdx={setTrackIdx} progress={progress} setProgress={setProgress} />
          </motion.div>
        </motion.div>
      </section>

      {/* DOWNLOAD */}
      <section ref={dlRef} style={{ background: "#0d0d12", padding: "6rem 2rem", textAlign: "center" }}>
        <motion.div style={{ maxWidth: 900, margin: "0 auto" }}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
        >
          <motion.p variants={fadeUp} style={{ fontSize: 11, color: "#c8893a", letterSpacing: 3, textTransform: "uppercase", marginBottom: "0.75rem" }}>{tl(T.download, lang)}</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#e8e8e8", fontWeight: 500, marginBottom: "1rem", lineHeight: 1.15, fontFamily: "Georgia, serif" }}>{tl(T.dlTitle, lang)}</motion.h2>

          <motion.div variants={fadeUp} style={{ maxWidth: 480, margin: "2.5rem auto 0", background: "#181818", border: "1px solid #2a2a2a", borderRadius: 18, padding: "2.5rem" }}>
            <motion.div whileHover={{ scale: 1.03 }} style={{ display: "inline-block", background: "rgba(200,137,58,0.1)", border: "1px solid rgba(200,137,58,0.2)", color: "#c8893a", fontSize: 12, padding: "5px 14px", borderRadius: 20, marginBottom: "1.5rem", letterSpacing: 0.5 }}>
              Sonara v0.1.0
            </motion.div>
            <motion.a whileHover={{ scale: 1.02, background: "#e09a45" }} whileTap={{ scale: 0.98 }}
              href="/Sonara_0.1.0_x64-setup.exe"
              download
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#c8893a", color: "#0a0a0f", fontSize: 16, fontWeight: 600, padding: "15px 24px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", fontFamily: "'Inter', sans-serif", textDecoration: "none" }}
            >
              <Download size={18} strokeWidth={2} /> {tl(T.dlBtn, lang)}
            </motion.a>
            <div style={{ fontSize: 12, color: "#444", marginTop: "0.75rem" }}>{tl(T.dlSize, lang)}</div>
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #222", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", fontSize: 12, color: "#555" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MonitorSpeaker size={12} /> Windows 10 / 11</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Cpu size={12} /> x64</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Wifi size={12} /> {tl(T.internet, lang)}</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0a0f", padding: "2rem 3rem", borderTop: "1px solid #181818", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ color: "#c8893a", fontSize: 20, fontFamily: "Georgia, serif", fontStyle: "italic" }}>Sonara</div>
        <div style={{ color: "#333", fontSize: 12 }}>© 2026 Sonara. {tl(T.copy, lang)}</div>
      </footer>
    </div>
  );
}
