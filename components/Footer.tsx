import Link from "next/link";
import { getCommon } from "@/lib/content/common";
import { company, routes, type RouteKey } from "@/lib/data";
import { hrefFor, type Locale } from "@/lib/i18n";

/**
 * Nine links in one row read as a list of nothing, so they are grouped the way
 * a buyer thinks about us: who we are / what we sell / how we trade.
 */
const GROUPS: { keys: RouteKey[]; title: Record<Locale, string> }[] = [
  {
    keys: ["about", "farms", "news"],
    title: { en: "Company", ru: "Компания" },
  },
  {
    keys: ["products", "sourcing", "quality"],
    title: { en: "The coffee", ru: "Кофе" },
  },
  {
    keys: ["logistics", "faq", "contact"],
    title: { en: "Working with us", ru: "Сотрудничество" },
  },
];

// Not in lib/data.ts: the city name is transliterated per language, so it is
// copy rather than a locale-neutral fact.
const CITY: Record<Locale, string> = { en: "Nairobi, Kenya", ru: "Найроби, Кения" };

export default function Footer({ lang }: { lang: Locale }) {
  const t = getCommon(lang);
  const href = (key: RouteKey) => hrefFor(lang, routes.find((r) => r.key === key)?.path ?? "");

  return (
    <>
      <div className="flagline" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <footer>
        <div className="shell foot-in">
          <div className="foot-brand">
            <p className="foot-tag">
              {t.footerTag}
              <em>{t.footerQuote}</em>
            </p>
            <p className="foot-blurb">{t.footerBlurb}</p>
          </div>
          <nav className="foot-nav" aria-label={t.footerNavLabel}>
            {GROUPS.map((group) => (
              <div className="foot-col" key={group.title.en}>
                <h2>{group.title[lang]}</h2>
                <ul>
                  {group.keys.map((key) => (
                    <li key={key}>
                      <Link href={href(key)}>{t.nav[key]}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="shell foot-legal">
          <p className="foot-meta">
            {company.legal} · {CITY[lang]}
          </p>
          <p className="foot-meta">
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>
      </footer>
    </>
  );
}
