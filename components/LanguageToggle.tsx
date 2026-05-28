"use client";

import { Locale } from "@/lib/content";

export default function LanguageToggle({ locale, setLocale }: { locale: Locale; setLocale: (locale: Locale) => void }) {
  return (
    <div className="rounded-full border border-slate-600 bg-slate-900/70 p-1">
      <button onClick={() => setLocale("en")} className={`rounded-full px-3 py-1 text-sm ${locale === "en" ? "bg-gold text-navy" : "text-slate-300"}`}>EN</button>
      <button onClick={() => setLocale("zh")} className={`rounded-full px-3 py-1 text-sm ${locale === "zh" ? "bg-gold text-navy" : "text-slate-300"}`}>中文</button>
    </div>
  );
}
