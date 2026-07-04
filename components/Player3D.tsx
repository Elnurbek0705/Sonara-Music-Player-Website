"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Shuffle,
  SkipBack,
  Square,
  Play,
  Pause,
  SkipForward,
  Repeat,
  ChevronRight,
} from "lucide-react";
import { ThemeKey } from "@/lib/types";
import { THEMES, TRACKS } from "@/lib/data";

export default function Player3D({
  theme,
  playing,
  setPlaying,
  trackIdx,
  setTrackIdx,
  progress,
  setProgress,
}: {
  theme: ThemeKey;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  trackIdx: number;
  setTrackIdx: (v: number) => void;
  progress: number;
  setProgress: (v: number) => void;
}) {
  const th = THEMES[theme];
  const track = TRACKS[trackIdx];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), {
    stiffness: 120,
    damping: 20,
  });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 120,
    damping: 20,
  });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 120,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = cardRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(Math.min(progress + 0.4, 100)), 200);
    return () => clearInterval(iv);
  }, [playing, progress, setProgress]);

  const prev = () => {
    const i = (trackIdx - 1 + TRACKS.length) % TRACKS.length;
    setTrackIdx(i);
    setProgress(TRACKS[i].progress);
  };
  const next = () => {
    const i = (trackIdx + 1) % TRACKS.length;
    setTrackIdx(i);
    setProgress(TRACKS[i].progress);
  };

  return (
    <div
      className="w-full max-w-[380px] mx-auto"
      style={{ perspective: isTouch ? undefined : 1200, perspectiveOrigin: "50% 50%" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          transformStyle: "preserve-3d",
          background: th.bg,
          border: `1px solid ${th.border}`,
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${th.accent}22, 0 0 80px ${th.glow}`,
          transition: "box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease",
        }}
        className="w-full rounded-2xl overflow-hidden relative cursor-pointer"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glare overlay */}
        {!isTouch && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
              ),
            }}
          />
        )}

        {/* Title bar */}
        <div
          style={{ background: th.titleBarBg, borderBottom: `1px solid ${th.border}` }}
          className="px-3.5 py-2.5 flex items-center justify-between transition-colors duration-300"
        >
          <span
            style={{ color: th.accent }}
            className="font-display italic text-lg sm:text-xl tracking-wide transition-colors duration-300"
          >
            Sonara
          </span>
          <div className="flex gap-1.5">
            {[th.accent, "#333", "#333"].map((c, i) => (
              <div
                key={i}
                style={{ background: c }}
                className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
              />
            ))}
          </div>
        </div>

        {/* Track info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={trackIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ background: th.trackBg }}
            className="px-4 py-3.5 transition-colors duration-300"
          >
            <div
              style={{ color: th.accent }}
              className="text-sm font-semibold mb-2.5 truncate transition-colors duration-300"
            >
              {track.artist} — {track.title}
            </div>
            <div
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
              className="h-1 bg-[#1a1a1a] rounded-full mb-2 cursor-pointer relative overflow-hidden"
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                style={{ background: `linear-gradient(90deg, ${th.accent}99, ${th.accent})` }}
                className="h-full rounded-full transition-colors duration-300"
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#555]">
              <span>{track.cur}</span>
              <span>{track.time}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div
          style={{ background: th.bg }}
          className="px-2.5 py-3 flex items-center justify-center gap-3 sm:gap-4 transition-colors duration-300"
        >
          {[
            { icon: Shuffle, main: false, onClick: () => {} },
            { icon: SkipBack, main: false, onClick: prev },
            { icon: Square, main: false, onClick: () => {} },
            { icon: playing ? Pause : Play, main: true, onClick: () => setPlaying(!playing) },
            { icon: SkipForward, main: false, onClick: next },
            { icon: Repeat, main: false, onClick: () => {} },
          ].map((btn, i) => {
            const Icon = btn.icon;
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={btn.onClick}
                aria-label={Icon.displayName || "control"}
                style={{
                  border: btn.main ? `2px solid ${th.accent}` : "none",
                  color: btn.main ? th.accent : "#666",
                }}
                className={`flex items-center justify-center transition-colors duration-300 ${
                  btn.main ? "w-10 h-10 rounded-full" : "p-1"
                }`}
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
              <motion.div
                key={i}
                onClick={() => {
                  setTrackIdx(i);
                  setProgress(tr.progress);
                }}
                whileHover={{ backgroundColor: isActive ? th.accent : `${th.accent}15` }}
                style={{
                  color: isActive ? th.bg2 : "#666",
                  background: isActive ? th.accent : "transparent",
                  borderBottom: `1px solid ${th.bg2}11`,
                }}
                className="px-3.5 py-2 text-xs flex items-center gap-2 cursor-pointer transition-colors duration-300"
              >
                <span
                  style={{
                    background: isActive
                      ? `${th.bg2}33`
                      : isYT
                        ? "rgba(255,50,50,0.15)"
                        : `${th.accent}22`,
                    color: isActive ? th.bg2 : isYT ? "#ff5555" : th.accent,
                    border: `1px solid ${isActive ? th.bg2 + "44" : isYT ? "rgba(255,50,50,0.25)" : th.accent + "44"}`,
                  }}
                  className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0 transition-colors duration-300"
                >
                  {tr.badge}
                </span>
                <span className="truncate">
                  {tr.artist} — {tr.title}
                </span>
                {isActive && (
                  <ChevronRight size={10} className="ml-auto opacity-60 flex-shrink-0" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer bar */}
        <div
          style={{ background: th.titleBarBg, borderTop: `1px solid ${th.border}` }}
          className="px-3.5 py-1.5 flex justify-between text-[10px] text-[#555] transition-colors duration-300"
        >
          <span className="flex items-center gap-1.5 truncate">
            <span
              style={{ color: th.accent, border: `1px solid ${th.border}` }}
              className="bg-[#2a2a2a] px-1.5 py-0.5 rounded transition-colors duration-300"
            >
              {track.badge}
            </span>
            <span className="truncate">
              {track.artist} — {track.title}
            </span>
          </span>
          <span className="flex-shrink-0 pl-2">
            {track.cur}/{track.time} {trackIdx + 1}/{TRACKS.length}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
