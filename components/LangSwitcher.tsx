"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCommon } from "@/lib/content/common";
import { hrefFor, locales, localeNames, localeShort, type Locale } from "@/lib/i18n";

// Module scope: assigning to document.cookie inside the component body trips
// the React Compiler's immutability rule, and this is a plain DOM side effect.
function remember(next: Locale) {
  document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * EN | RU, preserving the current page: /ru/products -> /en/products.
 *
 * The choice is also written to the `locale` cookie so proxy.ts sends a later
 * bare-path visit (a shared "/contact" link, a bookmark) to the same language
 * instead of falling back to Accept-Language.
 */
export default function LangSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const t = getCommon(lang);

  // "/ru/products" -> "products"; the locale segment is always first.
  const path = pathname.split("/").slice(2).join("/");

  return (
    <div className="lang" role="group" aria-label={t.languageLabel}>
      {locales.map((l, i) => (
        <span key={l} className="lang-item">
          {i > 0 && (
            <i className="lang-sep" aria-hidden="true">
              /
            </i>
          )}
          <Link
            href={hrefFor(l, path)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            title={l === lang ? localeNames[l] : t.switchTo}
            onClick={() => remember(l)}
          >
            {localeShort[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
