import type { Metadata } from "next";
import Link from "next/link";
import CuppingChart from "@/components/CuppingChart";
import GradeCards from "@/components/GradeCards";
import { Icon } from "@/components/IconSprite";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { getCommon } from "@/lib/content/common";
import { products } from "@/lib/content/products";
import { cupTotal } from "@/lib/data";
import { hrefFor, num } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = products[lang];
  return pageMetadata({
    lang,
    route: "products",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function ProductsPage() {
  const lang = await currentLang();
  const t = products[lang];
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
            <p className="eyebrow">{t.gradesEyebrow}</p>
            <h2>{t.gradesTitle}</h2>
            <p>{t.gradesIntro}</p>
          </Reveal>

          <Reveal>
            <GradeCards
              lang={lang}
              copy={t.gradeCards}
              extra={t.gradeExtra}
              heads={t.tableHeads}
              caption={t.tableCaption}
              densityLabel={t.densityLabel}
              densityValue={t.densityValue}
              profileLabel={t.profileLabel}
              shareLabel={t.shareLabel}
              minLotLabel={t.minLotLabel}
            />
          </Reveal>

          <Reveal>
            <figure className="mt-[clamp(2rem,4vw,3.25rem)] mb-0">
              <Photo
                slot="greenbeans"
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
            <p className="prose mt-8 text-[0.925rem] leading-[1.6] text-[var(--ink-2)]">
              {t.packingNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.cupEyebrow}</p>
            <h2>{t.cupTitle}</h2>
            <p>{t.cupIntro}</p>
          </Reveal>

          <div className="cup-grid">
            <figure className="m-0">
              <CuppingChart
                lang={lang}
                labels={t.cupLabels}
                caption={t.cupCaption}
                tableCaption={t.cupTableCaption}
                heads={t.cupHeads}
                bonusRow={t.cupBonusRow}
                totalRow={t.cupTotalRow}
                showTableLabel={c.showAsTable}
                outOfLabel={t.outOf}
              />
            </figure>

            <Reveal>
              <div className="cup-notes">
                <h3>{t.descriptorsTitle}</h3>
                <div className="tags">
                  {t.descriptorsPrimary.map((d) => (
                    <span className="tag tag--acc" key={d}>
                      {d}
                    </span>
                  ))}
                  {t.descriptorsSecondary.map((d) => (
                    <span className="tag" key={d}>
                      {d}
                    </span>
                  ))}
                </div>
                <p>{t.descriptorsBody}</p>
                <p>{t.roastNote}</p>
                <dl className="kv mt-5 border-t border-[var(--line-soft)] pt-4">
                  <dt>{t.scoreLabel}</dt>
                  <dd>{num(cupTotal, lang, 2)}</dd>
                  <dt>{t.sampleLabel}</dt>
                  <dd>{t.sampleValue}</dd>
                </dl>
                <Link className="btn mt-6" href={hrefFor(lang, "contact")}>
                  <Icon id="i-mail" size={14} />
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
