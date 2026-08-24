import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";
import Reveal from "@/components/Reveal";
import { news } from "@/lib/content/news";
import { hrefFor } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = news[lang];
  return pageMetadata({
    lang,
    route: "news",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function NewsPage() {
  const lang = await currentLang();
  const t = news[lang];

  // Dates are stored as ISO and formatted here. timeZone: "UTC" keeps the
  // rendered day identical to the stored one wherever the build runs.
  const dateFormat = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow eyebrow--band">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p>{t.heroLede}</p>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.listEyebrow}</p>
            <h2>{t.listTitle}</h2>
            <p>{t.listLede}</p>
          </Reveal>

          <div className="flex flex-col gap-[clamp(2rem,4vw,3.25rem)]">
            {t.notes.map((note) => (
              <Reveal key={note.date}>
                <article className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[1.1rem] border-t border-[var(--line-soft)] pt-[clamp(1.6rem,3vw,2.4rem)] md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
                  <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start">
                    <time
                      dateTime={note.date}
                      className="font-mono-brand text-[0.72rem] uppercase tracking-[0.11em] text-[var(--ink-3)]"
                    >
                      {dateFormat.format(new Date(note.date))}
                    </time>
                    <span className="tag tag--acc">{note.tag}</span>
                  </div>
                  <div>
                    <h3 className="text-[clamp(1.2rem,2.1vw,1.55rem)] leading-[1.12]">
                      {note.title}
                    </h3>
                    <div className="prose mt-[1.1rem] flex flex-col gap-[0.9rem] text-[0.975rem] leading-relaxed text-[var(--ink-2)]">
                      {note.paras.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec band">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow eyebrow--band">{t.ctaEyebrow}</p>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaLede}</p>
          </Reveal>
          <Reveal>
            <p className="max-w-[68ch] text-[0.9rem] leading-relaxed text-[var(--on-band-2)]">
              <strong>{t.disclaimerLabel}</strong> {t.disclaimerText}
            </p>
            <Link className="btn btn--onband mt-8" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {t.cta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
