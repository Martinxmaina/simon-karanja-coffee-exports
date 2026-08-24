import { bagKg, volumes, type VolumeKey } from "@/lib/data";
import { num, type Locale } from "@/lib/i18n";

export default function VolumeTiers({
  lang,
  tiers,
  bagWord,
  kgWord,
}: {
  lang: Locale;
  /** One entry per tier in lib/data.ts `volumes`, matched by key. */
  tiers: { key: VolumeKey; title: string; text: string }[];
  /** Abbreviated bag noun, e.g. "bags" / "меш.". */
  bagWord: string;
  /** Kilogramme unit; defaults to the locale's symbol. */
  kgWord?: string;
}) {
  const kg = kgWord ?? (lang === "ru" ? "кг" : "kg");
  const byKey = new Map(tiers.map((t) => [t.key, t]));

  return (
    <div className="tiers">
      {volumes.map((v) => {
        const t = byKey.get(v.key);
        const bags = v.kg / bagKg;
        return (
          <div className="tier" key={v.key}>
            <b>
              {num(v.kg, lang)} {kg}
            </b>
            <span>
              <i>{t?.title}</i>
              {t?.text}
            </span>
            <em>
              {bags < 1 ? num(bags, lang, 1) : num(Math.round(bags), lang)} {bagWord}
            </em>
          </div>
        );
      })}
    </div>
  );
}
