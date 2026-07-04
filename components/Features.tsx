"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/types";
import { T, FEATURES, tl } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const Features = forwardRef<HTMLElement, { lang: Lang }>(({ lang }, ref) => {
  return (
    <section ref={ref} className="bg-bg-panel px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        className="max-w-[900px] mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] text-accent tracking-[3px] uppercase mb-3"
        >
          {tl(T.what, lang)}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.15] mb-4 text-[#e8e8e8]"
        >
          {tl(T.featTitle, lang)}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#181818] border border-[#181818] rounded-2xl overflow-hidden mt-10">
          {FEATURES[lang].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ background: "#141414" }}
                className="bg-bg-panel p-7 sm:p-8 transition-colors"
              >
                <motion.div
                  whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(200,137,58,0.3)" }}
                  className="w-11 h-11 rounded-xl bg-[rgba(200,137,58,0.08)] border border-[rgba(200,137,58,0.18)] flex items-center justify-center text-accent mb-5 transition-all"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.div>
                <div className="text-[#e8e8e8] text-[15px] font-medium mb-2">{f.title}</div>
                <div className="text-[#555] text-[13px] leading-relaxed">{f.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
});

Features.displayName = "Features";
export default Features;
