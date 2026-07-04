"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Lang } from "@/lib/types";
import { T } from "@/lib/data";

export default function Nav({
  lang,
  setLang,
  scrollToSection,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  scrollToSection: (index: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (i: number) => {
    scrollToSection(i);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 sm:px-8 lg:px-12 bg-[rgba(10,10,15,0.8)] border-b border-[rgba(200,137,58,0.12)] backdrop-blur-xl"
    >
      <div className="font-display italic text-xl sm:text-2xl text-accent tracking-wide">
        Sonara
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-8">
        {T.nav[lang].map((label, i) => (
          <button
            key={i}
            onClick={() => handleNavClick(i)}
            className="text-sm text-[#777] hover:text-accent transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {/* Language switcher — desktop */}
        <div className="hidden sm:flex gap-1.5">
          {(["uz", "ru", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-md border transition-colors ${
                lang === l
                  ? "bg-[rgba(200,137,58,0.15)] border-accent text-accent"
                  : "border-[rgba(200,137,58,0.25)] text-[#666] hover:text-accent"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#e8e8e8] p-1"
          aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 md:hidden bg-[#0a0a0f] border-b border-[rgba(200,137,58,0.12)] flex flex-col px-6 py-4 gap-4"
          >
            {T.nav[lang].map((label, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(i)}
                className="text-left text-sm text-[#aaa] hover:text-accent transition-colors py-1"
              >
                {label}
              </button>
            ))}
            <div className="flex gap-1.5 pt-2 border-t border-[#181818]">
              {(["uz", "ru", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-md border transition-colors ${
                    lang === l
                      ? "bg-[rgba(200,137,58,0.15)] border-accent text-accent"
                      : "border-[rgba(200,137,58,0.25)] text-[#666]"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
