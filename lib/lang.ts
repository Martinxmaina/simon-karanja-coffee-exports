import { lang as rootLang } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./i18n";

/**
 * The active locale, for any Server Component under app/[lang].
 *
 * Uses next/root-params so layouts, pages and deeply nested components can all
 * read it without threading `params` through every level.
 */
export async function currentLang(): Promise<Locale> {
  const value = await rootLang();
  return isLocale(value ?? "") ? (value as Locale) : defaultLocale;
}
