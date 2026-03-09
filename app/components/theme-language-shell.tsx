"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { copy, languageMeta, SupportedLanguage } from "@/app/lib/i18n";

const cards = [
  "Health score 86/100",
  "Medication reminders",
  "Supplement schedule",
  "Next blood panel in 12 days"
];

export function ThemeLanguageShell() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState<SupportedLanguage>("he");

  const content = copy[language];
  const direction = languageMeta[language].dir;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme, language, direction]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-6" dir={direction}>
      <header className="glass flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm tracking-wide text-blue-300">{content.tagline}</p>
        <div className="flex items-center gap-3">
          <select
            className="rounded-xl border border-white/20 bg-transparent px-3 py-2 text-sm"
            value={language}
            onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
          >
            {Object.entries(languageMeta).map(([value, meta]) => (
              <option key={value} value={value} className="text-slate-900">
                {meta.label}
              </option>
            ))}
          </select>
          <button
            className="rounded-xl border border-blue-400/40 px-3 py-2 text-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <section className="glass flex flex-col items-center gap-4 py-20 text-center shadow-glow">
        <h1 className="text-8xl font-semibold tracking-[0.6em] text-blue-200">{content.heading}</h1>
        <p className="text-2xl font-medium">{content.tagline}</p>
        <p className="max-w-2xl text-slate-300">{content.subheading}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white">{content.ctaPrimary}</button>
          <Link href="/dashboard" className="rounded-xl border border-blue-300/40 px-5 py-3 font-semibold">
            {content.ctaSecondary}
          </Link>
          <Link href="/login" className="rounded-xl border border-white/20 px-5 py-3 font-semibold">Login</Link>
          <Link href="/signup" className="rounded-xl border border-white/20 px-5 py-3 font-semibold">Sign up</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {content.sections.map((section) => (
          <article key={section} className="glass p-6">
            <h2 className="text-lg font-semibold text-blue-200">{section}</h2>
            <p className="mt-2 text-sm text-slate-300">Cinematic premium module placeholder with multilingual and bidirectional layout support.</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card} className="glass p-4 text-sm text-slate-300">
            {card}
          </div>
        ))}
      </section>
    </main>
  );
}
