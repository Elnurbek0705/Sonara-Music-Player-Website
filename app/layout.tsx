import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sonara-music-player-website.vercel.app"),
  title: "Sonara — Musiqangizni his qiling",
  description:
    "Mahalliy fayllar va internet musiqasini bir joyda tinglang. Engil, tez va chiroyli Windows musiqa pleeri.",
  openGraph: {
    title: "Sonara Music Player",
    description:
      "Mahalliy fayllar va internet musiqasini bir joyda tinglang. Engil, tez va chiroyli.",
    images: ["/opengraph.jpg"],
  },
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans bg-bg text-[#e8e8e8] antialiased">{children}</body>
    </html>
  );
}
