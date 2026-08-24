import type { Metadata } from "next";
import Link from "next/link";
import AltitudeChart from "@/components/AltitudeChart";
import ChainSteps from "@/components/ChainSteps";
import HarvestCalendar from "@/components/HarvestCalendar";
import { Icon } from "@/components/IconSprite";
import { LotCard } from "@/components/LotPassport";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { getCommon } from "@/lib/content/common";
import { sourcing } from "@/lib/content/sourcing";
import { lotPassport } from "@/lib/data";
import { hrefFor, num, range } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

/** Shaded band on the altitude chart — must match the zone drawn in AltitudeChart. */
const SPECIALTY = [1600, 2000] as const;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = sourcing[lang];
  return pageMetadata({
    lang,
    route: "sourcing",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function SourcingPage() {
  const lang = await currentLang();
  const t = sourcing[lang];
  const c = getCommon(lang);

  // "AA · 17/18" -> "AA · screen 17/18" / "AA · скрин 17/18"
  const [gradeCode, gradeScreen] = lotPassport.grade.split(" · ");

  const lotRows: [string, string][] = [
    [t.lotLabels.region, `${c.regions.nyeri}, ${t.lotRegionSuffix}`],
    [t.lotLabels.coop, lotPassport.coop],
    [t.lotLabels.mill, lotPassport.mill],
    [t.lotLabels.altitude, `${num(lotPassport.altitude, lang)} ${c.metres} ${t.lotAsl}`],
    [t.lotLabels.variety, lotPassport.variety],
    [t.lotLabels.process, t.lotProcess],
    [t.lotLabels.grade, `${gradeCode} · ${t.lotScreen} ${gradeScreen}`],
    [t.lotLabels.harvest, t.lotHarvest],
    [
      t.lotLabels.moisture,
      `${num(lotPassport.moisture, lang, 1)} % / ${num(lotPassport.waterActivity, lang, 2)}`,
    ],
    [t.lotLabels.score, num(lotPassport.score, lang, 2)],
  ];

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow eyebrow--band">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p>{t.heroLede}</p>
        </div>
      </section>

      <section className="sec sec--flush">
        <div className="shell">
          <Reveal className="fig-wrap">
            <div className="fig-head">
              <h3>{t.altTitle}</h3>
              <p className="fig-note">{t.altNote}</p>
            </div>
            <div className="fig-body">
              <AltitudeChart
                lang={lang}
                regionNames={c.regions}
                zoneLabel={`${t.altZone} · ${range(SPECIALTY[0], SPECIALTY[1], lang)} ${c.metres.toUpperCase()}`}
                unit={c.metres}
                ariaLabel={t.altAria}
              />
            </div>
            <p className="fig-foot">
              <strong>{t.altFootLabel}</strong> {t.altFootText}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.calEyebrow}</p>
            <h2>{t.calTitle}</h2>
            <p>{t.calLede}</p>
          </Reveal>
          <Reveal className="fig-wrap">
            <div className="fig-head">
              <h3>{t.calFigTitle}</h3>
              <p className="fig-note">{t.calFigNote}</p>
            </div>
            <div className="fig-body">
              <HarvestCalendar
                lang={lang}
                months={c.months}
                laneLabels={t.calLanes}
                legend={t.calLegend}
              />
            </div>
            <p className="fig-foot">
              <strong>{t.calFootLabel}</strong> {t.calFootText}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.chainEyebrow}</p>
            <h2>{t.chainTitle}</h2>
            <p>{t.chainLede}</p>
          </Reveal>
          <Reveal>
            <figure className="m-0 mb-[clamp(2rem,4vw,3.25rem)]">
              <Photo
                slot="drying"
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
            <ChainSteps steps={t.steps} stepWord={t.stepWord} />
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell two-col items-center">
          <Reveal>
            <p className="eyebrow mb-[1.1rem]">{t.traceEyebrow}</p>
            <h2 className="mb-5">
              {t.traceTitleTop}
              <br />
              {t.traceTitleBottom}
            </h2>
            <div className="prose grid gap-4">
              <p className="lede">{t.traceLede}</p>
              {t.traceBody.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <Link className="btn mt-8" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {c.headerCta}
            </Link>
          </Reveal>
          <Reveal>
            <LotCard
              rows={lotRows}
              title={lotPassport.id}
              caption={t.lotCaption}
              foot={t.lotFoot}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
