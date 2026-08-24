import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";
import { Pledges } from "@/components/LotPassport";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { getCommon } from "@/lib/content/common";
import { quality } from "@/lib/content/quality";
import { hrefFor, num } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

/** One icon per step of the sample-approval sequence, in order. */
const sampleIcons = ["i-doc", "i-cup", "i-ship", "i-shield"];

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = quality[lang];
  return pageMetadata({
    lang,
    route: "quality",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function QualityPage() {
  const lang = await currentLang();
  const t = quality[lang];
  const c = getCommon(lang);

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow eyebrow--band">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p>{t.heroLead}</p>
        </div>
      </section>

      <section className="sec sec--flush">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.checksEyebrow}</p>
            <h2>{t.checksTitle}</h2>
            <p>{t.checksIntro}</p>
          </Reveal>

          <Reveal>
            <div className="tbl-wrap">
              <table>
                <caption>{t.checksCaption}</caption>
                <thead>
                  <tr>
                    {t.checksHeads.map((h) => (
                      <th scope="col" key={h}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.checks.map((row) => (
                    <tr key={row.stage}>
                      <th scope="row">{row.stage}</th>
                      <td>{row.measure}</td>
                      <td className="n">{row.threshold}</td>
                      <td>{row.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="prose mt-8 text-[0.925rem] leading-[1.6] text-[var(--ink-2)]">
              <strong>{t.checksNoteLabel}</strong> {t.checksNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec band">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow eyebrow--band">{t.cupEyebrow}</p>
            <h2>{t.cupTitle}</h2>
            <p className="lede">{t.cupLede}</p>
          </Reveal>

          <div className="two-col items-start">
            <Reveal>
              <div className="prose grid gap-4">
                {t.cupBody.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <Link className="btn btn--onband-ghost mt-8" href={hrefFor(lang, "products")}>
                <Icon id="i-cup" size={15} />
                {t.cupCta}
              </Link>
            </Reveal>

            <Reveal>
              <div className="spec-card">
                <div className="spec-card-h">
                  <span>{t.protocolTitle}</span>
                  <span>{t.protocolSeason}</span>
                </div>
                <dl>
                  {t.protocol.map(([label, value]) => (
                    <div className="spec-row" key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          <div className="facts mt-[clamp(2rem,4vw,3.25rem)]">
            {t.facts.map(([big, small]) => (
              <div className="fact" key={small}>
                <b>{big}</b>
                <span>{small}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.physEyebrow}</p>
            <h2>{t.physTitle}</h2>
            <p>{t.physLede}</p>
          </Reveal>

          <div className="two-col items-start">
            <Reveal>
              <div className="prose grid gap-4">
                {t.physBody.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <figure className="m-0">
                <Photo
                  slot="parchment"
                  alt={t.photoAlt}
                  ratio="4/3"
                  sizes="(max-width: 900px) 100vw, 560px"
                  className="rounded-[2px] border border-[var(--line)]"
                />
                <figcaption className="mt-3 font-mono-brand text-[0.72rem] leading-[1.6] tracking-[0.06em] text-[var(--ink-3)]">
                  {t.photoCaption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.defectsEyebrow}</p>
            <h2>{t.defectsTitle}</h2>
            <p>{t.defectsLede}</p>
          </Reveal>

          <Reveal>
            <div className="tbl-wrap">
              <table>
                <caption>{t.defectsCaption}</caption>
                <thead>
                  <tr>
                    {t.defectsHeads.map((h) => (
                      <th scope="col" key={h}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.defects.map((d) => (
                    <tr key={d.name}>
                      <th scope="row">{d.name}</th>
                      <td className="n">{num(d.category, lang)}</td>
                      <td className="n">{d.beans}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="prose mt-8 text-[0.925rem] leading-[1.6] text-[var(--ink-2)]">
              <strong>{t.defectsNoteLabel}</strong> {t.defectsNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec band">
        <div className="shell two-col items-start">
          <Reveal>
            <p className="eyebrow eyebrow--band mb-[1.1rem]">{t.sampleEyebrow}</p>
            <h2 className="mb-5">{t.sampleTitle}</h2>
            <p className="lede">{t.sampleLede}</p>
            <Link className="btn btn--onband mt-8" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {t.sampleCta}
            </Link>
          </Reveal>

          <Reveal>
            <ul className="docs">
              {t.sampleSteps.map((step, i) => (
                <li key={step}>
                  <Icon id={sampleIcons[i]} size={17} className="ic" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <p className="form-note mt-[1.1rem]">{t.sampleNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell two-col items-start">
          <Reveal>
            <p className="eyebrow mb-[1.1rem]">{t.failEyebrow}</p>
            <h2 className="mb-5">{t.failTitle}</h2>
            <div className="prose grid gap-4">
              <p className="lede">{t.failLede}</p>
              {t.failBody.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <Pledges items={t.failPledges} />
            <Link className="btn mt-8" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {c.headerCta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
