import type { MetadataRoute } from "next";
import { company, routes } from "@/lib/data";
import { hrefFor, localeTags, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.origin;

  return locales.flatMap((lang) =>
    routes.map((route) => ({
      url: `${base}${hrefFor(lang, route.path)}`,
      changeFrequency: route.key === "news" ? ("weekly" as const) : ("monthly" as const),
      priority: route.key === "home" ? 1 : 0.7,
      // Tells crawlers the two language versions are the same document.
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [localeTags[l], `${base}${hrefFor(l, route.path)}`])
        ),
      },
    }))
  );
}
