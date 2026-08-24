import { grades, gradesExtra, type GradeCode } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

function BeanSilhouette({ bean }: { bean: "large" | "medium" | "round" }) {
  if (bean === "round") {
    return (
      <svg width="120" height="86" viewBox="0 0 120 86">
        <ellipse className="bn" cx="60" cy="50" rx="26" ry="30" />
      </svg>
    );
  }
  if (bean === "medium") {
    return (
      <svg width="120" height="86" viewBox="0 0 120 86">
        <ellipse className="bn" cx="60" cy="46" rx="29" ry="35" />
        <path className="bn-crack" d="M60 15c-6 10-6 22 0 30s6 20 0 30" />
      </svg>
    );
  }
  return (
    <svg width="120" height="86" viewBox="0 0 120 86">
      <ellipse className="bn" cx="60" cy="43" rx="34" ry="41" />
      <path className="bn-crack" d="M60 8c-7 12-7 26 0 35s7 23 0 35" />
    </svg>
  );
}

// ponytail: lib/data.ts stores gradesExtra.size pre-formatted for Russian ("7,2+").
// Swap the decimal separator at render rather than editing a file this component
// does not own; drop this once that field becomes a number.
function localiseSize(size: string, lang: Locale) {
  return lang === "ru" ? size : size.replace(",", ".");
}

export type GradeCopy = {
  code: GradeCode;
  /** Brewing use, e.g. "filter · espresso". */
  profile: string;
  /** One-line cup character, used in the specification table. */
  cupProfile: string;
  description: string;
};

export default function GradeCards({
  lang,
  copy,
  extra,
  heads,
  caption,
  densityLabel,
  densityValue,
  profileLabel,
  shareLabel,
  minLotLabel,
  sizeUnit,
}: {
  lang: Locale;
  /** One entry per grade in lib/data.ts `grades`, matched by code. */
  copy: GradeCopy[];
  /** One entry per row in lib/data.ts `gradesExtra`, matched by code. */
  extra: { code: string; cupProfile: string; minLot: string }[];
  /** Five column headings: grade, screen, size, cup character, minimum lot. */
  heads: string[];
  caption: string;
  densityLabel: string;
  densityValue: string;
  profileLabel: string;
  shareLabel: string;
  /** Minimum lot cell for the three core grades, e.g. "30 kg". */
  minLotLabel: string;
  /** Millimetre unit on the card header; defaults to the locale's symbol. */
  sizeUnit?: string;
}) {
  const mm = sizeUnit ?? (lang === "ru" ? "мм" : "mm");
  const byCode = new Map(copy.map((c) => [c.code, c]));
  const extraByCode = new Map(extra.map((e) => [e.code, e]));

  return (
    <>
      <div className="grade-grid">
        {grades.map((g) => {
          const c = byCode.get(g.code);
          return (
            <article className="grade-card" key={g.code}>
              <div className="grade-card-h">
                <b>{g.code}</b>
                <i>
                  {g.screen}
                  <br />
                  {range(g.sizeMin, g.sizeMax, lang, 1)} {mm}
                </i>
              </div>
              <div className="bean-stage" aria-hidden="true">
                <BeanSilhouette bean={g.bean} />
              </div>
              <div className="grade-card-b">
                <p>{c?.description}</p>
                <dl className="kv">
                  <dt>{densityLabel}</dt>
                  <dd>{densityValue}</dd>
                  <dt>{profileLabel}</dt>
                  <dd>{c?.profile}</dd>
                  <dt>{shareLabel}</dt>
                  <dd>≈ {num(g.sharePct, lang)} %</dd>
                </dl>
              </div>
            </article>
          );
        })}
      </div>

      <div className="tbl-wrap" style={{ marginTop: "1.5rem" }}>
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              {heads.map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.code}>
                <td className="g">{g.code}</td>
                <td className="n">{g.screen}</td>
                <td className="n">{range(g.sizeMin, g.sizeMax, lang, 1)}</td>
                <td>{byCode.get(g.code)?.cupProfile}</td>
                <td className="n">{minLotLabel}</td>
              </tr>
            ))}
            {gradesExtra.map((g) => (
              <tr key={g.code}>
                <td className="g">{g.code}</td>
                <td className="n">{g.screen}</td>
                <td className="n">{localiseSize(g.size, lang)}</td>
                <td>{extraByCode.get(g.code)?.cupProfile}</td>
                <td className="n">{extraByCode.get(g.code)?.minLot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
