// Next 16 renamed Middleware to Proxy (and the exported function with it).
// Its only job here is sending bare paths (/, /products) to a locale-prefixed
// one, choosing the language from where the visitor actually is.
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

const COOKIE = "locale";

// Vercel sets this on every request. `geolocation()` from @vercel/functions
// reads the same header, so we skip the dependency for a single lookup.
// Absent locally and on other hosts — we fall back to Accept-Language there.
const COUNTRY_HEADER = "x-vercel-ip-country";

// Countries served in Russian. Russia is the core market; the rest of the CIS
// is included because Russian is the working trade language there.
const RUSSIAN_SPEAKING = new Set([
  "RU", "BY", "KZ", "KG", "TJ", "UZ", "AM", "MD",
]);

function fromCountry(request: NextRequest): Locale | null {
  const country = request.headers.get(COUNTRY_HEADER)?.toUpperCase();
  if (!country) return null;
  // Kenya and everywhere else fall through to English, the default.
  return RUSSIAN_SPEAKING.has(country) ? "ru" : "en";
}

function fromAcceptLanguage(request: NextRequest): Locale | null {
  // "ru-RU,ru;q=0.9,en;q=0.8" -> ordered tags. Two locales does not justify
  // pulling in Negotiator + intl-localematcher.
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
  return null;
}

function preferredLocale(request: NextRequest): Locale {
  // An explicit choice via the language switcher outranks any detection —
  // a Kenyan visitor who picks Russian must stay in Russian.
  const stored = request.cookies.get(COOKIE)?.value;
  if (stored && isLocale(stored)) return stored;

  return fromCountry(request) ?? fromAcceptLanguage(request) ?? defaultLocale;
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
  // Remember it so a visitor who switches language is not bounced back to the
  // detected one on their next bare-path visit.
  res.cookies.set(COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}

export const config = {
  // Skip Next internals and anything with a file extension (photos, icons).
  matcher: ["/((?!_next|.*\\.[^/]+$).*)"],
};
