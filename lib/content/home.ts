// Homepage copy. Locale-neutral figures (altitudes, grades, bag weight, volume
// tiers) live in lib/data.ts and are formatted in the page — nothing numeric
// that a Russian reader would see with different separators belongs here.
import type { Locale } from "@/lib/i18n";
import type { RouteKey, WhyKey } from "@/lib/data";

/** Every route the card grid can link to: home is where we are, about sits in the header. */
export type HomeCardKey = Exclude<RouteKey, "home" | "about">;

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1Top: string;
  h1Bottom: string;
  h1Accent: string;
  heroSub: string;
  heroLede: string;

  gradesLabel: string;
  chipScreen: string;
  chipPeaberry: string;
  ctaWhatsapp: string;
  ctaSpecs: string;

  kg: string;
  tonnes: string;

  offer: {
    title: string;
    season: string;
    origin: string;
    originValue: string;
    variety: string;
    varietyValue: string;
    process: string;
    processValue: string;
    altitude: string;
    moisture: string;
    packing: string;
    packingValue: string;
    minLot: string;
    minLotValue: string;
  };

  facts: {
    altitude: string;
    volume: string;
    grades: string;
    ports: string;
    portsValue: string;
  };

  whyEyebrow: string;
  whyTitle: string;
  whyLede: string;
  why: Record<WhyKey, { title: string; text: string }>;

  photoAlt: string;
  photoCaption: string;

  cardsEyebrow: string;
  cardsTitle: string;
  cards: Record<HomeCardKey, string>;
};

const en: Copy = {
  metaTitle: "Kenyan green coffee, wholesale from origin",
  metaDescription:
    "Fully washed Kenyan arabica in AA, AB and PB, bought direct from cooperatives in Nyeri, Kirinyaga and Embu. Samples from 30 kg, containers from 5 t, FOB Mombasa or CIF Novorossiysk and St Petersburg.",

  eyebrow: "Kenya → Russia · wholesale green coffee",
  h1Top: "Kenyan",
  h1Bottom: "green",
  h1Accent: "coffee",
  heroSub: "Specialty at origin · Quality · Traceability · Trust",
  heroLede:
    "We supply specialty arabica direct from Kenyan farmers and cooperatives to roasters, importers and coffee companies across Russia. A cup you can recognise blind, a lot you can trace to the wet mill, and shipping windows we hold to.",

  gradesLabel: "Grades available",
  chipScreen: "screen",
  chipPeaberry: "peaberry",
  ctaWhatsapp: "Message us on WhatsApp",
  ctaSpecs: "See the specifications",

  kg: "kg",
  tonnes: "t",

  offer: {
    title: "Current offer",
    season: "2025/26 crop",
    origin: "Origin",
    originValue: "Kenya, central highlands",
    variety: "Varieties",
    varietyValue: "SL28 · SL34 · Ruiru 11 · Batian",
    process: "Process",
    processValue: "Fully washed",
    altitude: "Altitude",
    moisture: "Moisture",
    packing: "Packing",
    packingValue: "jute / GrainPro",
    minLot: "Minimum lot",
    minLotValue: "sample",
  },

  facts: {
    altitude: "growing altitude",
    volume: "from sample to container",
    grades: "grades in stock",
    ports: "Novorossiysk · St Petersburg",
    portsValue: "RU ports",
  },

  whyEyebrow: "Why Kenyan coffee",
  whyTitle: "Four reasons roasters keep coming back",
  whyLede:
    "Kenya is one of the few origins where altitude, variety and fully washed processing meet in a cup profile buyers recognise blind. We work at the start of that chain, not at the end of it.",
  why: {
    flavour: {
      title: "Bright, structured cup",
      text: "Blackcurrant and tomato acidity with a juicy body and a long finish — what SL28 and SL34 do on volcanic soil at height. Consistent enough to build a filter menu or a signature blend around.",
    },
    sustainable: {
      title: "Sustainable production",
      text: "We buy through farmer cooperatives and small estates: a fair cherry price, responsible water handling at the wet mills, and slow sun-drying on raised beds instead of mechanical shortcuts.",
    },
    reliable: {
      title: "Reliable, repeatable supply",
      text: "Planned against the harvest, not against luck: volumes confirmed for the season, fixed shipping windows, and a written update on every lot as it moves.",
    },
    traceable: {
      title: "Full traceability",
      text: "Every lot carries its cooperative, wet mill, region, altitude, variety and harvest date. The cupping sheet travels with the shipment, not after it.",
    },
  },

  photoAlt: "Kenyan farmers hand-sorting ripe coffee cherries after picking",
  photoCaption: "Selective hand-picking, central Kenya — only ripe cherry goes to the wet mill the same day",

  cardsEyebrow: "On this site",
  cardsTitle: "Work through the supply, step by step",
  cards: {
    products: "Grades AA, AB and PB — screen sizes, bean shape and the SCA cup profile.",
    sourcing: "Region altitudes, the harvest calendar and the route from cherry to green bean.",
    farms: "The cooperatives, estates and wet mills we buy from, region by region.",
    quality: "Cupping to the SCA protocol, moisture and water activity, defect counts before shipment.",
    logistics: "Volume tiers, Incoterms, sea and air routes, and the full document set.",
    faq: "Payment terms, minimum volumes, lead times and samples — answered plainly.",
    news: "Crop notes, Nairobi auction prices and what freight is doing this month.",
    contact: "Phone, WhatsApp and the price-list request form. We reply within one working day.",
  },
};

const ru: Copy = {
  metaTitle: "Кенийский зелёный кофе оптом",
  metaDescription:
    "Мытая кенийская арабика AA, AB и PB напрямую от кооперативов Ньери, Кириньяги и Эмбу. Пробы от 30 кг, контейнеры от 5 т, FOB Момбаса или CIF Новороссийск и Санкт-Петербург.",

  eyebrow: "Кения → Россия · оптовые поставки",
  h1Top: "Кенийский",
  h1Bottom: "зелёный",
  h1Accent: "кофе",
  heroSub: "Премиум качество из источника · Качество · Прослеживаемость · Доверие",
  heroLede:
    "Мы поставляем специальную арабику напрямую от фермеров и кооперативов Кении — обжарщикам, импортёрам и кофейным компаниям по всей России. Отличный вкус, полная прослеживаемость, надёжные сроки.",

  gradesLabel: "Доступные грейды",
  chipScreen: "скрин",
  chipPeaberry: "пиберри",
  ctaWhatsapp: "Написать в WhatsApp",
  ctaSpecs: "Смотреть спецификации",

  kg: "кг",
  tonnes: "т",

  offer: {
    title: "Текущее предложение",
    season: "сезон 2025/26",
    origin: "Происхождение",
    originValue: "Кения, центральные высокогорья",
    variety: "Ботаника",
    varietyValue: "SL28 · SL34 · Ruiru 11 · Batian",
    process: "Обработка",
    processValue: "Мытая (washed)",
    altitude: "Высота",
    moisture: "Влажность",
    packing: "Упаковка",
    packingValue: "джут / GrainPro",
    minLot: "Мин. партия",
    minLotValue: "проба",
  },

  facts: {
    altitude: "высота выращивания",
    volume: "от пробы до контейнера",
    grades: "грейды в наличии",
    ports: "Новороссийск · Санкт-Петербург",
    portsValue: "порта РФ",
  },

  whyEyebrow: "Почему кенийский кофе",
  whyTitle: "Четыре причины, по которым обжарщики возвращаются",
  whyLede:
    "Кения — одно из немногих происхождений, где высота, сорт и мытая обработка сходятся в узнаваемом профиле чашки. Мы работаем в начале этой цепочки.",
  why: {
    flavour: {
      title: "Яркий и насыщенный вкус",
      text: "Плотная кислотность чёрной смородины и томата, сочное тело, длительное послевкусие — характер сортов SL28 и SL34 на вулканических почвах.",
    },
    sustainable: {
      title: "Устойчивое производство",
      text: "Закупка через фермерские кооперативы и небольшие эстейты: справедливая цена за вишню, ответственный водооборот на мойках, сушка на солнечных грядках.",
    },
    reliable: {
      title: "Надёжные и стабильные поставки",
      text: "Планирование от урожая, а не от случая: подтверждённые объёмы на сезон, фиксированные окна отгрузки, обратная связь по каждой партии.",
    },
    traceable: {
      title: "Полная прослеживаемость",
      text: "По каждому лоту известны кооператив, мойка, регион, высота, сорт и дата урожая. Каппинг-лист прилагается к отгрузке.",
    },
  },

  photoAlt: "Кенийские фермеры перебирают вручную спелую кофейную вишню после сбора",
  photoCaption: "Выборочный ручной сбор, Центральная Кения — на мойку в тот же день попадает только спелая вишня",

  cardsEyebrow: "На сайте",
  cardsTitle: "Изучите поставку по шагам",
  cards: {
    products: "Грейды AA, AB, PB — размер скрина, форма зерна и профиль чашки по протоколу SCA.",
    sourcing: "Высота регионов, календарь урожая, путь от фермы до чашки.",
    farms: "Кооперативы, эстейты и мойки, с которыми мы работаем — по регионам.",
    quality: "Каппинг по протоколу SCA, влажность и водная активность, контроль дефектов перед отгрузкой.",
    logistics: "Объёмы поставки, условия Incoterms, маршрут доставки и пакет документов.",
    faq: "Оплата, минимальный объём, сроки и пробы — короткие ответы по существу.",
    news: "Ход урожая, цены аукциона в Найроби и ситуация с фрахтом.",
    contact: "Телефоны, WhatsApp и форма запроса прайса. Отвечаем в течение рабочего дня.",
  },
};

export const home: Record<Locale, Copy> = { en, ru };
