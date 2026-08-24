// Next 16 renamed Middleware to Proxy. Its only job here is sending bare paths
// (/, /products) to a locale-prefixed one, picking the visitor's language from
// Accept-Language when we have no stored preference.
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";

const COOKIE = "locale";

function preferredLocale(request: NextRequest): string {
  const stored = request.cookies.get(COOKIE)?.value;
  if (stored && isLocale(stored)) return stored;

  // "ru-RU,ru;q=0.9,en;q=0.8" -> ordered tags. Intl-free: two locales does not
  // justify pulling in Negotiator + intl-localematcher.
  const header = request.headers.get("accept-language") ?? "";
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((t) => t.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const res = NextResponse.redirect(url);
  // Remember the choice so a visitor who switches language is not bounced back
  // to their browser default on the next bare-path visit.
  res.cookies.set(COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}

export const config = {
  // Skip Next internals and anything with a file extension (photos, icons).
  matcher: ["/((?!_next|.*\\.[^/]+$).*)"],
};
