# Sonara Website (Next.js)

Sonara Music Player uchun rasmiy landing sahifa — Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion asosida qurilgan.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: http://localhost:3000

## Build qilish

```bash
npm run build
npm run start
```

## Tuzilma

- `app/` — Next.js App Router sahifalari (layout, globals.css, page.tsx)
- `components/` — Nav, Hero, Player3D, Features, Themes, Download, Footer
- `lib/data.ts` — Barcha matnlar (uz/ru/en), temalar va demo tracklar
- `lib/types.ts` — TypeScript turlari

## Muhim o'zgarishlar (eski Vite versiyasidan)

1. **Next.js App Router**'ga o'tkazildi (`pages/LandingPage.tsx` endi `app/page.tsx` + alohida komponentlarga bo'lingan)
2. **Barcha inline style'lar Tailwind classlarga o'tkazildi**, faqat dinamik tema ranglari (runtime'da o'zgaradigan) `style` prop orqali qoladi
3. **To'liq responsive**: mobil hamburger menyu, stack bo'ladigan tugmalar, moslashuvchan grid va padding'lar
4. **Yuklab olish tugmasi endi GitHub Releases'ning eng so'nggi versiyasiga ishora qiladi** (`lib/data.ts` ichidagi `DOWNLOAD_URL`), shuning uchun har safar yangi versiya release qilinganda saytni yangilashning hojati yo'q
5. **`next/font`** orqali Google Fonts optimallashtirilgan holda yuklanadi (Inter + Lora)

## Deploy qilish (Vercel)

1. Repo'ni GitHub'ga push qiling
2. https://vercel.com → **New Project** → repo'ni tanlang
3. Framework avtomatik "Next.js" deb aniqlanadi — boshqa sozlash kerak emas
4. **Deploy**

## Versiya raqamini yangilash

`lib/data.ts` ichida:
- `T.badge` — hero'dagi versiya belgisi
- `Download.tsx` ichida `Sonara v0.2.0` matni

Yuklab olish linki avtomatik eng so'nggi GitHub Release'ni oladi, uni qo'lda o'zgartirish shart emas.
