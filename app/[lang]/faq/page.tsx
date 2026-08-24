import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";
import Reveal from "@/components/Reveal";
import { getCommon } from "@/lib/content/common";
import { faq } from "@/lib/content/faq";
import { hrefFor, localeTags } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

/** One icon per line of the closing contact list, in order. */
const routeIcons = ["i-mail", "i-doc", "i-check"];

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = faq[lang];
  return pageMetadata({
    lang,
    route: "faq",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function FaqPage() {
  const lang = await currentLang();
  const t = faq[lang];
  const c = getCommon(lang);

  // Structured data is derived from the same `groups` the page renders, so the
  // two cannot drift. Rich results need the answer as one string, hence join.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeTags[lang],
    mainEntity: t.groups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow eyebrow--band">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p>{t.heroLead}</p>
        </div>
      </section>

      <section className="sec band">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow eyebrow--band">{t.glanceEyebrow}</p>
            <h2>{t.glanceTitle}</h2>
            <p className="lede">{t.glanceLede}</p>
          </Reveal>

          <div className="facts">
            {t.facts.map(([big, small]) => (
              <div className="fact" key={small}>
                <b>{big}</b>
                <span>{small}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {t.groups.map((group) => (
        <section className="sec" key={group.key}>
          <div className="shell">
            <Reveal className="sec-head">
              <p className="eyebrow">{group.eyebrow}</p>
              <h2>{group.title}</h2>
              <p>{group.lede}</p>
            </Reveal>

            <Reveal>
              <div className="overflow-hidden rounded-[2px] border border-[var(--line)] bg-[var(--surface)]">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group border-b border-[var(--line-soft)] last:border-b-0"
                  >
                    <summary className="flex cursor-pointer list-none items-baseline gap-4 px-[clamp(1.1rem,2.2vw,1.75rem)] py-[1.15rem] font-display text-[0.98rem] uppercase leading-[1.4] tracking-[0.035em] text-[var(--ink)] transition-colors hover:text-[var(--brass)] group-open:text-[var(--brass)] [&::-webkit-details-marker]:hidden">
                      <span className="flex-1">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="flex-none font-mono-brand text-[1.05rem] leading-none text-[var(--brass)] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>

                    <div className="prose grid gap-4 px-[clamp(1.1rem,2.2vw,1.75rem)] pb-[1.6rem] text-[0.945rem] leading-[1.62] text-[var(--ink-2)]">
                      {item.a.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="sec band">
        <div className="shell two-col items-start">
          <Reveal>
            <p className="eyebrow eyebrow--band mb-[1.1rem]">{t.closeEyebrow}</p>
            <h2 className="mb-5">{t.closeTitle}</h2>
            <p className="lede">{t.closeLede}</p>
            <div className="btn-row mt-8">
              <Link className="btn btn--onband" href={hrefFor(lang, "contact")}>
                <Icon id="i-mail" size={14} />
                {c.headerCta}
              </Link>
              <Link className="btn btn--onband-ghost" href={hrefFor(lang, "logistics")}>
                <Icon id="i-ship" size={14} />
                {t.closeSecondary}
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <ul className="docs">
              {t.closeRoutes.map((line, i) => (
                <li key={line}>
                  <Icon id={routeIcons[i]} size={17} className="ic" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="form-note mt-[1.1rem]">{t.closeNote}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
