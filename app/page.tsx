"use client";

import { useState } from "react";
import { ArrowRight, Bot, CheckCircle2, Globe2, Plane, Ship, Truck, Warehouse } from "lucide-react";
import { content, Locale } from "@/lib/content";
import LanguageToggle from "@/components/LanguageToggle";
import UploadBox from "@/components/UploadBox";
import QuoteForm from "@/components/QuoteForm";

const icons = [Ship, Plane, Globe2, Warehouse, Truck, Bot];

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = content[locale];

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#1f3b5f,_#081225_45%,_#030712)]">
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-navy/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="text-xl font-black tracking-tight">JOMA<span className="text-gold">INC</span></a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#services" className="hover:text-gold">{t.nav[0]}</a>
            <a href="#ai" className="hover:text-gold">{t.nav[1]}</a>
            <a href="#industries" className="hover:text-gold">{t.nav[2]}</a>
            <a href="#quote" className="hover:text-gold">{t.nav[3]}</a>
          </nav>
          <LanguageToggle locale={locale} setLocale={setLocale} />
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.1fr_.9fr] md:pt-24">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold">{t.heroBadge}</div>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">{t.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t.heroSubtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-4 font-bold text-navy hover:bg-amber-300">{t.primaryCta}<ArrowRight size={18} /></a>
            <a href="#ai" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-600 px-6 py-4 font-bold text-white hover:border-gold">{t.secondaryCta}</a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {t.trust.map((item) => <div key={item} className="rounded-2xl border border-slate-700 bg-slate-900/50 p-3 text-sm text-slate-300">{item}</div>)}
          </div>
        </div>

        <div className="card rounded-[2rem] p-6">
          <div className="rounded-[1.5rem] bg-slate-950/70 p-6">
            <div className="mb-5 flex items-center gap-3"><Bot className="text-gold" /><span className="font-semibold">AI Shipment Intake Preview</span></div>
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-slate-900 p-4"><span className="text-slate-400">Document:</span> Commercial Invoice + Packing List</div>
              <div className="rounded-2xl bg-slate-900 p-4"><span className="text-slate-400">Extract:</span> HTS / Value / Weight / CBM / Consignee</div>
              <div className="rounded-2xl bg-slate-900 p-4"><span className="text-slate-400">Risk:</span> Bond need + 301 / AD-CVD review required</div>
              <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-gold">Ready for quote summary</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-4xl font-black">{t.servicesTitle}</h2>
          <p className="mt-3 text-slate-300">{t.servicesSubtitle}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {t.services.map(([title, desc], index) => {
            const Icon = icons[index];
            return <div key={title} className="card rounded-3xl p-6"><Icon className="mb-5 text-gold" /><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-300">{desc}</p></div>;
          })}
        </div>
      </section>

      <section id="ai" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-black">{t.aiTitle}</h2>
          <p className="mt-4 leading-8 text-slate-300">{t.aiSubtitle}</p>
          <div className="mt-8 space-y-4">
            {t.aiSteps.map((step) => <div key={step} className="flex gap-3 rounded-2xl bg-slate-900/70 p-4"><CheckCircle2 className="mt-1 shrink-0 text-gold" /><span>{step}</span></div>)}
          </div>
        </div>
        <UploadBox title={t.uploadTitle} help={t.uploadHelp} />
      </section>

      <section id="industries" className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-4xl font-black">{t.industriesTitle}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {t.industries.map((industry) => <div key={industry} className="rounded-3xl border border-slate-700 bg-slate-900/60 p-5 font-semibold">{industry}</div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-4xl font-black">{t.whyTitle}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {t.why.map(([title, desc]) => <div key={title} className="card rounded-3xl p-6"><h3 className="font-bold text-gold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{desc}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <QuoteForm title={t.quoteTitle} subtitle={t.quoteSubtitle} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6 text-sm leading-7 text-amber-100">
          <strong>{t.complianceTitle}: </strong>{t.complianceText}
        </div>
      </section>

      <footer className="border-t border-slate-800 px-5 py-10 text-center text-slate-400">
        <div className="font-semibold text-white">Joma Logistics Incorporated</div>
        <div className="mt-2">{t.footer}</div>
        <div className="mt-4 text-sm">© {new Date().getFullYear()} Joma Logistics Incorporated. All rights reserved.</div>
      </footer>
    </main>
  );
}
