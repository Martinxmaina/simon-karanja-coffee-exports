// Shared chrome copy: navigation, header/footer, and vocabulary used by more
// than one page. Page-specific copy lives in lib/content/<route>.ts.
import type { Locale } from "@/lib/i18n";
import type { RegionKey, RouteKey } from "@/lib/data";

export type CommonCopy = {
  /** Visible label for every route, used by header, footer and sitemap. */
  nav: Record<RouteKey, string>;
  brandTagline: string;
  headerCta: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  menuLabel: string;
  mainNavLabel: string;
  footerNavLabel: string;
  languageLabel: string;
  switchTo: string;
  themeToLight: string;
  themeToDark: string;
  footerTag: string;
  footerQuote: string;
  footerBlurb: string;
  months: string[];
  regions: Record<RegionKey, string>;
  metres: string;
  showAsTable: string;
  readMore: string;
  photoCreditsTitle: string;
  photoCreditsNote: string;
  photoBy: string;
};

const en: CommonCopy = {
  nav: {
    home: "Home",
    about: "About",
    products: "Products",
    sourcing: "Sourcing",
    farms: "Our farms",
    quality: "Quality control",
    logistics: "Logistics",
    faq: "FAQ",
    news: "Market updates",
    contact: "Contact",
  },
  brandTagline: "Green Coffee Exporters",
  headerCta: "Request a price list",
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuLabel: "Site menu",
  mainNavLabel: "Main navigation",
  footerNavLabel: "Footer navigation",
  languageLabel: "Language",
  switchTo: "Switch to Russian",
  themeToLight: "Switch to light theme",
  themeToDark: "Switch to dark theme",
  footerTag: "From the Kenyan highlands to anywhere in the world",
  footerQuote: "“Quality you can trust”",
  footerBlurb:
    "Wholesale supply for roasters, importers and coffee companies across Russia and beyond",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  regions: {
    nyeri: "Nyeri",
    kirinyaga: "Kirinyaga",
    muranga: "Murang'a",
    embu: "Embu",
    kiambu: "Kiambu",
    elgon: "Bungoma · Elgon",
  },
  metres: "m",
  showAsTable: "Show as a table",
  readMore: "Read more →",
  photoCreditsTitle: "Photography credits",
  photoCreditsNote:
    "Images are used under Creative Commons licences. Each photographer is credited below with a link to the original file.",
  photoBy: "Photo:",
};

const ru: CommonCopy = {
  nav: {
    home: "Главная",
    about: "О компании",
    products: "Продукция",
    sourcing: "Снабжение",
    farms: "Наши фермы",
    quality: "Контроль качества",
    logistics: "Логистика",
    faq: "Вопросы и ответы",
    news: "Обзор рынка",
    contact: "Контакты",
  },
  brandTagline: "Green Coffee Exporters",
  headerCta: "Запросить прайс",
  skipToContent: "Перейти к содержимому",
  openMenu: "Открыть меню",
  closeMenu: "Закрыть меню",
  menuLabel: "Меню сайта",
  mainNavLabel: "Основная навигация",
  footerNavLabel: "Навигация в подвале",
  languageLabel: "Язык",
  switchTo: "Переключить на английский",
  themeToLight: "Включить светлую тему",
  themeToDark: "Включить тёмную тему",
  footerTag: "Из высокогорий Кении в любую точку мира",
  footerQuote: "«Качество, которому доверяют»",
  footerBlurb:
    "Оптовые поставки для обжарщиков, импортёров и кофейных компаний по всей России и за её пределами",
  months: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  regions: {
    nyeri: "Ньери",
    kirinyaga: "Кириньяга",
    muranga: "Муранга",
    embu: "Эмбу",
    kiambu: "Киамбу",
    elgon: "Бунгома · Элгон",
  },
  metres: "м",
  showAsTable: "Показать таблицей",
  readMore: "Подробнее →",
  photoCreditsTitle: "Авторы фотографий",
  photoCreditsNote:
    "Фотографии используются по лицензиям Creative Commons. Ниже указан автор каждого снимка и ссылка на оригинал.",
  photoBy: "Фото:",
};

export const common: Record<Locale, CommonCopy> = { en, ru };

export function getCommon(lang: Locale): CommonCopy {
  return common[lang];
}
