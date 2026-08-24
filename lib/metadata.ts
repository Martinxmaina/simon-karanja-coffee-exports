import type { Metadata } from "next";
import { company, routes, type RouteKey } from "@/lib/data";
import { defaultLocale, hrefFor, localeTags, locales, type Locale } from "@/lib/i18n";

const OG_LOCALE: Record<Locale, string> = { en: "en_GB", ru: "ru_RU" };

/**
 * Per-page canonical + hreflang + og:url.
 *
 * Every page must go through here. Inheriting openGraph from the root layout
 * silently pins og:url to the homepage on every subpage, which is exactly the
 * bug this replaces.
 */
export function pageMetadata({
  lang,
  route,
  title,
  description,
}: {
  lang: Locale;
  route: RouteKey;
  title: string;
  description: string;
}): Metadata {
  const path = routes.find((r) => r.key === route)?.path ?? "";
  const canonical = hrefFor(lang, path);

  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = hrefFor(l, path);
  languages["x-default"] = hrefFor(defaultLocale, path);

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: company.name,
      locale: OG_LOCALE[lang],
      type: "website",
      images: [{ url: "/photos/farm.jpg", width: 1600, height: 1200, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/photos/farm.jpg"],
    },
  };
}
