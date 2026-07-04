"use client";

import { useRef, useState } from "react";
import { Lang, ThemeKey } from "@/lib/types";
import { TRACKS } from "@/lib/data";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Themes from "@/components/Themes";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<Lang>("uz");
  const [theme, setTheme] = useState<ThemeKey>("default");
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(2);
  const [progress, setProgress] = useState(TRACKS[2].progress);

  const featRef = useRef<HTMLElement>(null);
  const themeRef = useRef<HTMLElement>(null);
  const dlRef = useRef<HTMLElement>(null);

  const sectionRefs = [featRef, themeRef, dlRef];
  const scrollToSection = (i: number) =>
    sectionRefs[i].current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-bg">
      <Nav lang={lang} setLang={setLang} scrollToSection={scrollToSection} />

      <Hero
        lang={lang}
        onDownloadClick={() => dlRef.current?.scrollIntoView({ behavior: "smooth" })}
        playing={playing}
        setPlaying={setPlaying}
        trackIdx={trackIdx}
        setTrackIdx={setTrackIdx}
        progress={progress}
        setProgress={setProgress}
      />

      <Features ref={featRef} lang={lang} />

      <Themes
        ref={themeRef}
        lang={lang}
        theme={theme}
        setTheme={setTheme}
        playing={playing}
        setPlaying={setPlaying}
        trackIdx={trackIdx}
        setTrackIdx={setTrackIdx}
        progress={progress}
        setProgress={setProgress}
      />

      <Download ref={dlRef} lang={lang} />

      <Footer lang={lang} />
    </div>
  );
}
