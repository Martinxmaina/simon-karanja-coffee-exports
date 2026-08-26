import type { Metadata } from "next";
import { lang as rootLang } from "next/root-params";
import { Oswald, Literata, JetBrains_Mono } from "next/font/google";
import IconSprite from "@/components/IconSprite";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCommon } from "@/lib/content/common";
import { company } from "@/lib/data";
import { isLocale, localeTags, type Locale } from "@/lib/i18n";
import "../globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }];
}

// Anything outside generateStaticParams 404s instead of rendering an
// unsupported locale.
export const dynamicParams = false;

const SITE_TITLE: Record<Locale, string> = {
  en: "Simon & Sons Coffee — Kenyan green coffee, wholesale",
  ru: "Simon & Sons Coffee — кенийский зелёный кофе оптом",
};

export async function generateMetadata(): Promise<Metadata> {
  const value = await rootLang();
  const lang: Locale = isLocale(value ?? "") ? (value as Locale) : "en";
  return {
    metadataBase: new URL(company.origin),
    title: { default: SITE_TITLE[lang], template: `%s · ${company.name}` },
  };
}

// Applies the stored theme before first paint, otherwise a visitor whose choice
// differs from their system setting sees one frame of the wrong palette.
const themeInit = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
`;

export default async function LangLayout({ children }: LayoutProps<"/[lang]">) {
  const value = await rootLang();
  const lang: Locale = isLocale(value ?? "") ? (value as Locale) : "en";
  const t = getCommon(lang);

  return (
    // suppressHydrationWarning: the script above adds data-theme to <html>
    // before React hydrates, which would otherwise be reported as a mismatch.
    <html
      lang={localeTags[lang]}
      suppressHydrationWarning
      className={`${oswald.variable} ${literata.variable} ${jbMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a className="skip-link" href="#main">
          {t.skipToContent}
        </a>
        <IconSprite />
        <Header lang={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
