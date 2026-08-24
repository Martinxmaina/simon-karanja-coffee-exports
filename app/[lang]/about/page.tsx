import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/IconSprite";
import { Pledges } from "@/components/LotPassport";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import WhyGrid from "@/components/WhyGrid";
import { about } from "@/lib/content/about";
import { getCommon } from "@/lib/content/common";
import { hrefFor } from "@/lib/i18n";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = about[lang];
  return pageMetadata({
    lang,
    route: "about",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function AboutPage() {
  const lang = await currentLang();
  const t = about[lang];
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
            <p className="eyebrow">{t.howEyebrow}</p>
            <h2>{t.howTitle}</h2>
            <p>{t.howIntro}</p>
          </Reveal>
          <Reveal>
            <WhyGrid items={t.why} />
          </Reveal>
        </div>
      </section>

      <section className="sec band">
        <div className="shell">
          <Reveal>
            <figure className="m-0">
              <Photo
                slot="farm"
                alt={t.photoAlt}
                ratio="16/9"
                className="rounded-[var(--r)] border border-[var(--band-line)]"
              />
              <figcaption className="fig-note mt-4 text-[var(--on-band-2)]">
                {t.photoCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="shell two-col">
          <Reveal>
            <p className="eyebrow mb-[1.1rem]">{t.roleEyebrow}</p>
            <h2 className="mb-5">{t.roleTitle}</h2>
            <div className="prose grid gap-4">
              <p className="lede">{t.roleLede}</p>
              {t.roleBody.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-[1.1rem]">{t.pledgeEyebrow}</p>
            <h2 className="mb-5">{t.pledgeTitle}</h2>
            <Pledges items={t.pledges} />
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
