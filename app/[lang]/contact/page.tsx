import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Icon } from "@/components/IconSprite";
import Reveal from "@/components/Reveal";
import { contact } from "@/lib/content/contact";
import { company } from "@/lib/data";
import { currentLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const t = contact[lang];
  return pageMetadata({
    lang,
    route: "contact",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default async function ContactPage() {
  const lang = await currentLang();
  const t = contact[lang];

  // Values come from lib/data (locale-neutral), captions from the copy file.
  // The last line has no href: an address is not a link.
  const lines = [
    { icon: "i-phone", href: company.phoneKeHref, value: company.phoneKe, note: t.lines.phoneKe.note },
    { icon: "i-wa", href: company.phoneRuHref, value: company.phoneRu, note: t.lines.phoneRu.note },
    {
      icon: "i-mail",
      href: `mailto:${company.email}?subject=${encodeURIComponent(t.mailSubject)}`,
      value: company.email,
      note: t.lines.email.note,
    },
    {
      icon: "i-globe",
      href: `https://${company.site}`,
      external: true,
      value: company.site,
      note: t.lines.site.note,
    },
    { icon: "i-pin", value: t.officeValue, note: t.lines.office.note },
  ];

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
            <p className="eyebrow eyebrow--band">{t.linesEyebrow}</p>
            <h2>{t.linesTitle}</h2>
            <p>{t.linesLede}</p>
          </Reveal>

          <div className="two-col items-start">
            <Reveal>
              <ul className="ct-list">
                {lines.map((line) => (
                  <li key={line.value}>
                    {line.href ? (
                      <a
                        href={line.href}
                        {...(line.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <Icon id={line.icon} size={19} className="ic" />
                        <span>
                          <b>{line.value}</b>
                          <small>{line.note}</small>
                        </span>
                      </a>
                    ) : (
                      <span className="ct-static">
                        <Icon id={line.icon} size={19} className="ic" />
                        <span>
                          <b>{line.value}</b>
                          <small>{line.note}</small>
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="form-note mt-7 max-w-[52ch]">{t.hoursNote}</p>
            </Reveal>

            <Reveal>
              <h3 className="mb-[1.1rem] text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.15]">
                {t.formTitle}
              </h3>
              <ContactForm lang={lang} copy={t.form} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
