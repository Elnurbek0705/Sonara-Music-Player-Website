"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Lang, ThemeKey } from "@/lib/types";
import { T, THEMES, tl } from "@/lib/data";
import Player3D from "./Player3D";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const Themes = forwardRef<
  HTMLElement,
  {
    lang: Lang;
    theme: ThemeKey;
    setTheme: (t: ThemeKey) => void;
    playing: boolean;
    setPlaying: (v: boolean) => void;
    trackIdx: number;
    setTrackIdx: (v: number) => void;
    progress: number;
    setProgress: (v: number) => void;
  }
>(
  (
    { lang, theme, setTheme, playing, setPlaying, trackIdx, setTrackIdx, progress, setProgress },
    ref,
  ) => {
    return (
      <section ref={ref} className="bg-bg px-4 sm:px-6 py-20 sm:py-24">
        <motion.div
          className="max-w-[960px] mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] text-accent tracking-[3px] uppercase mb-3"
          >
            {tl(T.themes, lang)}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.15] mb-2 text-[#e8e8e8]"
          >
            {tl(T.themesTitle, lang)}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[15px] text-[#555] leading-relaxed max-w-[500px] mb-8 sm:mb-10"
          >
            {tl(T.themesSub, lang)}
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-2.5 flex-wrap mb-10 sm:mb-12">
            {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
              const t2 = THEMES[key];
              const isActive = theme === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setTheme(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    borderColor: isActive ? t2.accent : "#2a2a2a",
                    color: isActive ? t2.accent : "#777",
                    background: isActive ? `rgba(${t2.accentRgb},0.12)` : "#1a1a1a",
                  }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 border px-4 py-2 rounded-full cursor-pointer text-[13px]"
                >
                  <motion.div
                    animate={{
                      background: t2.dot,
                      boxShadow: isActive ? `0 0 10px ${t2.glow}` : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  />
                  {t2.label}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <Player3D
              theme={theme}
              playing={playing}
              setPlaying={setPlaying}
              trackIdx={trackIdx}
              setTrackIdx={setTrackIdx}
              progress={progress}
              setProgress={setProgress}
            />
          </motion.div>
        </motion.div>
      </section>
    );
  },
);

Themes.displayName = "Themes";
export default Themes;
