import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";
import PhotoCredits from "@/components/PhotoCredits";
import PhotoGallery from "@/components/PhotoGallery";
import Reveal from "@/components/Reveal";
import { getCommon } from "@/lib/content/common";
import { farms, gallerySlots } from "@/lib/content/farms";
import { regions } from "@/lib/data";
import { hrefFor, range } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = farms[lang];
  return pageMetadata({
    lang,
    route: "farms",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function FarmsPage() {
  const lang = await currentLang();
  const t = farms[lang];
  const c = getCommon(lang);

  const items = gallerySlots.map((slot) => ({ slot, caption: t.captions[slot] }));

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

      <section className="sec sec--flush">
        <div className="shell two-col">
          <Reveal>
            <p className="eyebrow mb-[1.1rem]">{t.introEyebrow}</p>
            <h2 className="mb-5">{t.introTitle}</h2>
            <div className="prose grid gap-4">
              <p className="lede">{t.introLede}</p>
              <p>{t.introBody[0]}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="prose grid gap-4">
              {t.introBody.slice(1).map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.galleryEyebrow}</p>
            <h2>{t.galleryTitle}</h2>
            <p>{t.galleryLede}</p>
          </Reveal>
          <Reveal>
            <PhotoGallery items={items} />
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell">
          <Reveal className="sec-head">
            <p className="eyebrow">{t.regionsEyebrow}</p>
            <h2>{t.regionsTitle}</h2>
            <p>{t.regionsLede}</p>
          </Reveal>
          <Reveal className="tbl-wrap">
            <table>
              <caption>{t.tableCaption}</caption>
              <thead>
                <tr>
                  {t.tableHeads.map((head) => (
                    <th scope="col" key={head}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.key}>
                    <td className="g">{c.regions[r.key]}</td>
                    <td className="n">{r.varieties}</td>
                    <td className="n">
                      {range(r.minAlt, r.maxAlt, lang)} {c.metres}
                    </td>
                    <td>{t.regionNotes[r.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-[70ch] text-[0.925rem] leading-relaxed text-[var(--ink-2)]">
              <strong>{t.regionsFootLabel}</strong> {t.regionsFootText}
            </p>
            <Link className="btn mt-8" href={hrefFor(lang, "contact")}>
              <Icon id="i-mail" size={14} />
              {c.headerCta}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="sec sec--flush">
        <div className="shell">
          <PhotoCredits lang={lang} />
        </div>
      </section>
    </>
  );
}
