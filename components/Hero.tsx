"use client";

import { motion } from "framer-motion";
import { Music2, Download, Github, MonitorSpeaker, Package, ShieldCheck } from "lucide-react";
import { Lang, ThemeKey } from "@/lib/types";
import { T, tl, GITHUB_URL } from "@/lib/data";
import Player3D from "./Player3D";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Hero({
  lang,
  onDownloadClick,
  playing,
  setPlaying,
  trackIdx,
  setTrackIdx,
  progress,
  setProgress,
}: {
  lang: Lang;
  onDownloadClick: () => void;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  trackIdx: number;
  setTrackIdx: (v: number) => void;
  progress: number;
  setProgress: (v: number) => void;
}) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 pb-16 sm:pt-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,137,58,0.1) 0%, transparent 70%)",
        }}
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center w-full"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 bg-[rgba(200,137,58,0.08)] border border-[rgba(200,137,58,0.2)] text-accent text-xs px-4 py-1.5 rounded-full mb-6 sm:mb-8 tracking-wide"
        >
          <Music2 size={12} /> {tl(T.badge, lang)}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-[clamp(36px,10vw,80px)] font-medium leading-[1.05] mb-4 sm:mb-5 text-[#e8e8e8]"
        >
          {T.heroTitle[lang][0]}
          <br />
          <span className="text-accent">{T.heroTitle[lang][1]}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-[17px] text-[#666] max-w-[480px] leading-relaxed mb-8 sm:mb-10 px-2"
        >
          {tl(T.heroSub, lang)}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto px-4 sm:px-0"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onDownloadClick}
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-[#e09a45] text-[#0a0a0f] text-[15px] font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            <Download size={16} strokeWidth={2} /> {tl(T.download, lang)}
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-[#777] hover:text-[#e8e8e8] text-[15px] px-7 py-3.5 rounded-xl border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] transition-colors"
          >
            <Github size={16} strokeWidth={1.8} /> GitHub
          </motion.a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-8 justify-center text-[13px] text-[#555] px-4"
        >
          <span className="flex items-center gap-1.5">
            <MonitorSpeaker size={14} className="text-[#666]" /> Windows 10+
          </span>
          <span className="flex items-center gap-1.5">
            <Package size={14} className="text-[#666]" /> ~30 MB
          </span>
          <span className="flex items-center gap-1.5 text-accent">
            <ShieldCheck size={14} /> {tl(T.openSource, lang)}
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 sm:mt-16 w-full px-4 sm:px-0">
          <Player3D
            theme="default"
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
}
