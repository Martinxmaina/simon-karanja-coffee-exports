import { attributions } from "@/lib/photos";
import { getCommon } from "@/lib/content/common";
import type { Locale } from "@/lib/i18n";

/** "…/File:Women_drying_coffee.jpg" -> "Women drying coffee.jpg" */
function fileLabel(source: string): string {
  const tail = source.split(/\/File:/).pop() ?? source;
  return decodeURIComponent(tail).replace(/_/g, " ");
}

const link =
  "underline decoration-[var(--line)] underline-offset-2 hover:text-[var(--forest)]";

export default function PhotoCredits({ lang }: { lang: Locale }) {
  const t = getCommon(lang);
  if (attributions.length === 0) return null;

  return (
    <section
      aria-labelledby="photo-credits"
      className="border-t border-[var(--line-soft)] pt-6 text-[var(--ink-3)]"
    >
      <h2 id="photo-credits" className="fig-note m-0">
        {t.photoCreditsTitle}
      </h2>
      <p className="mt-2 mb-4 max-w-[64ch] text-[0.86rem] leading-relaxed">
        {t.photoCreditsNote}
      </p>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-1.5 p-0 text-[0.82rem] leading-relaxed">
        {attributions.map(({ slot, credit }) =>
          // credit is nullable in the generated type even though the filter dropped the nulls.
          credit ? (
            <li key={slot} className="m-0">
              <span className="font-mono-brand text-[0.7rem] uppercase tracking-[0.1em]">
                {t.photoBy}
              </span>{" "}
              {credit.author} ·{" "}
              <a
                href={credit.licenceUrl}
                target="_blank"
                rel="noopener noreferrer license"
                className={link}
              >
                {credit.licence}
              </a>{" "}
              ·{" "}
              <a
                href={credit.source}
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                {fileLabel(credit.source)}
              </a>
            </li>
          ) : null
        )}
      </ul>
    </section>
  );
}
