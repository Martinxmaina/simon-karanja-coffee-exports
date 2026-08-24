// Locale plumbing. No i18n library: two locales, static dictionaries, all
// resolved on the server at build time.
export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
};

// Short label for the header switcher.
export const localeShort: Record<Locale, string> = { en: "EN", ru: "RU" };

// BCP-47 tags for <html lang> and hreflang.
export const localeTags: Record<Locale, string> = { en: "en", ru: "ru" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build an absolute-from-root href: hrefFor("ru", "products") -> "/ru/products" */
export function hrefFor(lang: Locale, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}

/**
 * Numbers carry a locale: Russian writes 8,25 and 1 780, English 8.25 and
 * 1,780. Storing them as pre-formatted strings would mean duplicating every
 * figure per language, so they live as numbers and are formatted here.
 */
export function num(value: number, lang: Locale, digits = 0): string {
  return new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-GB", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Inclusive numeric range, e.g. "1,650–1,900" / "1 650–1 900". */
export function range(min: number, max: number, lang: Locale, digits = 0): string {
  return `${num(min, lang, digits)}–${num(max, lang, digits)}`;
}
