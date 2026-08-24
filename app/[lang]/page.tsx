import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import HeroRelief from "@/components/HeroRelief";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import WhyGrid from "@/components/WhyGrid";
import { Icon } from "@/components/IconSprite";
import { getCommon } from "@/lib/content/common";
import { home, type HomeCardKey } from "@/lib/content/home";
import {
  altitudeCeiling,
  altitudeFloor,
  bagKg,
  company,
  grades,
  routes,
  volumes,
  whyKeys,
} from "@/lib/data";
import { hrefFor, num, range } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

/** Two full rows of the four-column .why grid; "about" is a header/footer link. */
const CARDS: HomeCardKey[] = [
  "products", "sourcing", "quality", "logistics",
  "farms", "faq", "news", "contact",
];

/** Contract moisture window for washed parchment, in percent. */
const MOISTURE = [10, 12] as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = home[lang];
  return pageMetadata({ lang, route: "home", title: t.metaTitle, description: t.metaDescription });
}

export default async function Page() {
  const lang = await currentLang();
  const t = home[lang];
  const c = getCommon(lang);

  const sampleKg = volumes.find((v) => v.key === "sample")?.kg ?? 30;
  const containerKg = volumes.find((v) => v.key === "container")?.kg ?? 5000;
  const altitude = `${range(altitudeFloor, altitudeCeiling, lang)} ${c.metres}`;

  const offer: [string, string][] = [
    [t.offer.origin, t.offer.originValue],
    [t.offer.variety, t.offer.varietyValue],
    [t.offer.process, t.offer.processValue],
    [t.offer.altitude, altitude],
    [t.offer.moisture, `${range(MOISTURE[0], MOISTURE[1], lang)} %`],
    [t.offer.packing, `${num(bagKg, lang)} ${t.kg} ${t.offer.packingValue}`],
    [t.offer.minLot, `${num(sampleKg, lang)} ${t.kg} · ${t.offer.minLotValue}`],
  ];

  const facts: [string, string][] = [
    [altitude, t.facts.altitude],
    [
      `${num(sampleKg, lang)} ${t.kg} → ${num(containerKg / 1000, lang)}+ ${t.tonnes}`,
      t.facts.volume,
    ],
    [grades.map((g) => g.code).join(" · "), t.facts.grades],
    [`${num(2, lang)} ${t.facts.portsValue}`, t.facts.ports],
  ];

  return (
    <>
      <section className="hero">
        <HeroRelief />
        <div className="shell hero-in">
          <div className="hero-grid">
            <div>
              <p className="eyebrow eyebrow--band">{t.eyebrow}</p>
              <h1>
                {t.h1Top}
                <br />
                {t.h1Bottom} <em>{t.h1Accent}</em>
              </h1>
              <p className="hero-sub">{t.heroSub}</p>
              <p className="hero-lede">{t.heroLede}</p>

              <div className="grades" role="list" aria-label={t.gradesLabel}>
                {grades.map((g, i) => (
                  <Fragment key={g.code}>
                    {i > 0 && <span className="dot" aria-hidden="true" />}
                    <span className="grade-chip" role="listitem">
                      {g.code}
                      <small>
                        {g.code === "PB" ? t.chipPeaberry : `${t.chipScreen} ${g.screen}`}
                      </small>
                    </span>
                  </Fragment>
                ))}
              </div>

              <div className="btn-row">
                <a
                  className="btn btn--onband"
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon id="i-wa" size={15} />
                  {t.ctaWhatsapp}
                </a>
                <Link className="btn btn--onband-ghost" href={hrefFor(lang, "products")}>
                  {t.ctaSpecs}
                </Link>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-card-h">
                <span>{t.offer.title}</span>
                <span>{t.offer.season}</span>
              </div>
              <dl>
                {offer.map(([k, v]) => (
                  <div className="spec-row" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="shell">
          <div className="facts">
            {facts.map(([big, small]) => (
              <div className="fact" key={small}>
                <b>{big}</b>
                <span>{small}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--flush">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.whyEyebrow}</p>
            <h2>{t.whyTitle}</h2>
            <p>{t.whyLede}</p>
          </Reveal>
          <Reveal>
            <figure className="mb-[clamp(2rem,4vw,3.25rem)]">
              <Photo
                slot="cherries"
                alt={t.photoAlt}
                ratio="16/9"
                className="rounded-[2px] border border-[var(--line)]"
              />
              <figcaption className="mt-3 font-mono-brand text-[0.7rem] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                {t.photoCaption}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <WhyGrid items={whyKeys.map((k) => t.why[k])} />
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.cardsEyebrow}</p>
            <h2>{t.cardsTitle}</h2>
          </Reveal>
          <div className="why">
            {CARDS.map((key) => (
              <Link
                key={key}
                href={hrefFor(lang, routes.find((r) => r.key === key)?.path ?? "")}
                className="why-item link-card"
              >
                <h3>{c.nav[key]}</h3>
                <p>{t.cards[key]}</p>
                <span className="go">{c.readMore}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
