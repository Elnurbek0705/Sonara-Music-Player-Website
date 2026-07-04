import { Lang } from "@/lib/types";
import { T, tl } from "@/lib/data";

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-bg px-6 sm:px-12 py-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div className="font-display italic text-xl text-accent">Sonara</div>
      <div className="text-[#333] text-xs">© 2026 Sonara. {tl(T.copy, lang)}</div>
    </footer>
  );
}
