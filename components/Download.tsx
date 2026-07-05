"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Download as DownloadIcon, MonitorSpeaker, Cpu, Wifi, Loader2 } from "lucide-react";
import { Lang } from "@/lib/types";
import { T, tl } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const REPO = "Elnurbek0705/Sonara-Music-Player";

const Download = forwardRef<HTMLElement, { lang: Lang }>(({ lang }, ref) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`);
      const data = await res.json();
      const asset = data.assets?.find((a: { name: string }) =>
        a.name.toLowerCase().endsWith("x64-setup.exe"),
      );
      if (asset?.browser_download_url) {
        window.location.href = asset.browser_download_url;
      } else {
        // Fallback — Releases sahifasiga yo'naltirish
        window.location.href = `https://github.com/${REPO}/releases/latest`;
      }
    } catch {
      window.location.href = `https://github.com/${REPO}/releases/latest`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="bg-[#0d0d12] px-4 sm:px-6 py-20 sm:py-24 text-center">
      <motion.div
        className="max-w-[900px] mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] text-accent tracking-[3px] uppercase mb-3"
        >
          {tl(T.download, lang)}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.15] mb-4 text-[#e8e8e8]"
        >
          {tl(T.dlTitle, lang)}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="max-w-[480px] mx-auto mt-8 sm:mt-10 bg-bg-card border border-[#2a2a2a] rounded-2xl p-8 sm:p-10"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="inline-block bg-[rgba(200,137,58,0.1)] border border-[rgba(200,137,58,0.2)] text-accent text-xs px-3.5 py-1.5 rounded-full mb-6 tracking-wide"
          >
            {tl(T.dlBadge, lang)}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02, background: "#e09a45" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center justify-center gap-2.5 bg-accent text-[#0a0a0f] text-base font-semibold px-6 py-4 rounded-xl w-full transition-colors disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <DownloadIcon size={18} strokeWidth={2} />
            )}
            {tl(T.dlBtn, lang)}
          </motion.button>
          <div className="text-xs text-[#444] mt-3">{tl(T.dlSize, lang)}</div>
          <div className="mt-6 pt-6 border-t border-[#222] flex gap-4 sm:gap-6 justify-center flex-wrap text-xs text-[#555]">
            <span className="flex items-center gap-1.5">
              <MonitorSpeaker size={12} /> Windows 10 / 11
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu size={12} /> x64
            </span>
            <span className="flex items-center gap-1.5">
              <Wifi size={12} /> {tl(T.internet, lang)}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

Download.displayName = "Download";
export default Download;