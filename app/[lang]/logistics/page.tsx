import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import RouteMap from "@/components/RouteMap";
import VolumeTiers from "@/components/VolumeTiers";
import { logistics } from "@/lib/content/logistics";
import { hrefFor } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

/** One icon per leg, in the order the legs are listed in the copy. */
const legIcons = ["i-pin", "i-ship", "i-ship", "i-pin", "i-globe"];

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = logistics[lang];
  return pageMetadata({
    lang,
    route: "logistics",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function LogisticsPage() {
  const lang = await currentLang();
  const t = logistics[lang];

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow eyebrow--band">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p>{t.heroLede}</p>
        </div>
        <div className="shell">
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

      <section className="sec band">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow eyebrow--band">{t.volEyebrow}</p>
            <h2>{t.volTitle}</h2>
            <p>{t.volLede}</p>
          </Reveal>
          <div className="two-col items-start">
            <Reveal>
              <VolumeTiers lang={lang} tiers={t.tiers} bagWord={t.bagWord} />
              <p className="mt-[1.4rem] text-[0.9rem] leading-relaxed text-[var(--on-band-2)]">
                {t.packingNote}
              </p>
            </Reveal>
            <Reveal>
              <div className="spec-card">
                <div className="spec-card-h">
                  <span>{t.specTitle}</span>
                  <span>{t.specMeta}</span>
                </div>
                <dl className="m-0">
                  {t.specRows.map(([label, value]) => (
                    <div className="spec-row" key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.termsEyebrow}</p>
            <h2>{t.termsTitle}</h2>
            <p>{t.termsLede}</p>
          </Reveal>
          <Reveal className="tbl-wrap">
            <table>
              <caption>{t.termsCaption}</caption>
              <thead>
                <tr>
                  {t.termsHeads.map((head) => (
                    <th scope="col" key={head}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.terms.map((term) => (
                  <tr key={term.code}>
                    <td className="g">{term.code}</td>
                    <td>{term.includes}</td>
                    <td>{term.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-[70ch] text-[0.925rem] leading-relaxed text-[var(--ink-2)]">
              <strong>{t.termsFootLabel}</strong> {t.termsFootText}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec band">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow eyebrow--band">{t.routeEyebrow}</p>
            <h2>{t.routeTitle}</h2>
            <p>{t.routeLede}</p>
          </Reveal>
          <Reveal className="route-wrap">
            <RouteMap
              nodes={t.routeNodes}
              legFast={t.legFast}
              legSlow={t.legSlow}
              ariaLabel={t.routeAria}
            />
          </Reveal>
          <div className="two-col mt-[clamp(2.25rem,4vw,3.25rem)] items-start">
            <Reveal>
              <figure className="m-0">
                <Photo
                  slot="port"
                  alt={t.photoAlt}
                  ratio="4/3"
                  sizes="(max-width: 900px) 100vw, 560px"
                  className="rounded-[2px] border border-[var(--band-line)]"
                />
                <figcaption className="mt-3 font-mono-brand text-[0.7rem] uppercase tracking-[0.14em] text-[var(--on-band-2)]">
                  {t.photoCaption}
                </figcaption>
              </figure>
            </Reveal>
            <Reveal>
              <p className="eyebrow eyebrow--band">{t.legsTitle}</p>
              <ul className="docs">
                {t.legs.map((leg, i) => (
                  <li key={leg}>
                    <Icon id={legIcons[i]} size={17} className="ic" />
                    <span>{leg}</span>
                  </li>
                ))}
              </ul>
              <p className="form-note mt-[1.1rem]">{t.transitNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.docsEyebrow}</p>
            <h2>{t.docsTitle}</h2>
            <p>{t.docsLede}</p>
          </Reveal>
          <Reveal className="tbl-wrap">
            <table>
              <caption>{t.docsCaption}</caption>
              <thead>
                <tr>
                  {t.docsHeads.map((head) => (
                    <th scope="col" key={head}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.docs.map((d) => (
                  <tr key={d.doc}>
                    <td>{d.doc}</td>
                    <td>{d.issuer}</td>
                    <td>{d.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-[70ch] text-[0.925rem] leading-relaxed text-[var(--ink-2)]">
              <strong>{t.docsFootLabel}</strong> {t.docsFootText}
            </p>
            <Link className="btn mt-8" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {t.cta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
