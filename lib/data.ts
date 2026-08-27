// Locale-neutral facts: numbers, codes, proper nouns, booleans.
// Anything a translator would rewrite lives in lib/content/* instead.
// Figures are stored as numbers, not strings, so 8.25 / 8,25 and 1,780 / 1 780
// are a formatting concern (see lib/i18n.ts num/range) rather than duplicated data.

export const company = {
  name: "Simon & Sons Coffee",
  /** Header lockup only — the full name is too wide beside nine nav items. */
  shortName: "Simon & Sons",
  legal: "Simon & Sons Coffee Ltd.",
  phoneKe: "+254 705 951 082",
  phoneKeHref: "tel:+254705951082",
  phoneRu: "+7 929 640-11-62",
  phoneRuHref: "tel:+79296401162",
  whatsapp: "https://wa.me/79296401162",
  email: "info@simonandsons.store",
  site: "simonandsons.store",
  origin: "https://simonandsons.store",
} as const;

export const routes = [
  { key: "home", path: "" },
  { key: "about", path: "about" },
  { key: "products", path: "products" },
  { key: "sourcing", path: "sourcing" },
  { key: "farms", path: "farms" },
  { key: "quality", path: "quality" },
  { key: "logistics", path: "logistics" },
  { key: "faq", path: "faq" },
  { key: "news", path: "news" },
  { key: "contact", path: "contact" },
] as const;

export type RouteKey = (typeof routes)[number]["key"];

/** Order shown in the header (home is the logo, so it is excluded there). */
export const navOrder: RouteKey[] = [
  "about", "products", "sourcing", "farms", "quality", "logistics", "faq", "news", "contact",
];

export type RegionKey = "nyeri" | "kirinyaga" | "muranga" | "embu" | "kiambu" | "elgon";

export const regions: { key: RegionKey; varieties: string; minAlt: number; maxAlt: number }[] = [
  { key: "nyeri", varieties: "SL28 · SL34", minAlt: 1650, maxAlt: 1900 },
  { key: "kirinyaga", varieties: "SL28 · Batian", minAlt: 1600, maxAlt: 1900 },
  { key: "muranga", varieties: "SL34 · Ruiru 11", minAlt: 1500, maxAlt: 1800 },
  { key: "embu", varieties: "SL28 · Ruiru 11", minAlt: 1400, maxAlt: 1800 },
  { key: "kiambu", varieties: "SL34 · Batian", minAlt: 1500, maxAlt: 1750 },
  { key: "elgon", varieties: "SL28 · Ruiru 11", minAlt: 1500, maxAlt: 1900 },
];

/** Lowest and highest altitude we actually source from, derived not asserted. */
export const altitudeFloor = Math.min(...regions.map((r) => r.minAlt));
export const altitudeCeiling = Math.max(...regions.map((r) => r.maxAlt));

export type GradeCode = "AA" | "AB" | "PB";

export const grades: {
  code: GradeCode;
  screen: string;
  sizeMin: number;
  sizeMax: number;
  bean: "large" | "medium" | "round";
  sharePct: number;
}[] = [
  { code: "AA", screen: "17/18", sizeMin: 6.8, sizeMax: 7.2, bean: "large", sharePct: 20 },
  { code: "AB", screen: "15/16", sizeMin: 6.0, sizeMax: 6.6, bean: "medium", sharePct: 55 },
  { code: "PB", screen: "—", sizeMin: 5.5, sizeMax: 6.2, bean: "round", sharePct: 10 },
];

export const gradesExtra: { code: string; screen: string; size: string }[] = [
  { code: "E", screen: "19+", size: "7,2+" },
  { code: "TT", screen: "—", size: "—" },
];

export type CupKey =
  | "aroma" | "flavour" | "aftertaste" | "acidity" | "body" | "balance" | "overall";

export const cupScores: { key: CupKey; value: number }[] = [
  { key: "aroma", value: 8.0 },
  { key: "flavour", value: 8.25 },
  { key: "aftertaste", value: 7.75 },
  { key: "acidity", value: 8.5 },
  { key: "body", value: 8.0 },
  { key: "balance", value: 8.0 },
  { key: "overall", value: 8.0 },
];

/** Sweetness + uniformity + clean cup, 10.00 each under the SCA sheet. */
export const cupBonusTotal = 30.0;
export const cupTotal = cupScores.reduce((sum, s) => sum + s.value, 0) + cupBonusTotal;

export type LaneKey = "main" | "fly" | "processing" | "shipping";

export const calendarLanes: {
  key: LaneKey;
  kind: "main" | "fly" | "process";
  months: boolean[]; // 12 entries, Jan..Dec
}[] = [
  { key: "main", kind: "main", months: [false, false, false, false, false, false, false, false, false, true, true, true] },
  { key: "fly", kind: "fly", months: [false, false, false, true, true, true, false, false, false, false, false, false] },
  { key: "processing", kind: "process", months: [false, false, false, false, true, true, true, false, false, false, true, true] },
  { key: "shipping", kind: "process", months: [true, true, true, false, false, false, true, true, true, false, false, true] },
];

export type VolumeKey = "sample" | "small" | "regular" | "container";

/** bags is derived from kg at the standard 60 kg jute bag. */
export const volumes: { key: VolumeKey; kg: number }[] = [
  { key: "sample", kg: 30 },
  { key: "small", kg: 300 },
  { key: "regular", kg: 1000 },
  { key: "container", kg: 5000 },
];

export const bagKg = 60;

export const chainKeys = [
  "picking", "washing", "drying", "milling", "cupping", "export",
] as const;
export type ChainKey = (typeof chainKeys)[number];

export const whyKeys = ["flavour", "sustainable", "reliable", "traceable"] as const;
export type WhyKey = (typeof whyKeys)[number];

export const pledgeKeys = ["quality", "fair", "longterm"] as const;
export type PledgeKey = (typeof pledgeKeys)[number];

/** Example lot — the format a real shipment's passport arrives in. */
export const lotPassport = {
  id: "LOT KE-25/NY-0147",
  coop: "Gichathaini FCS",
  mill: "Wet mill №2",
  altitude: 1780,
  variety: "SL28 · SL34",
  grade: "AA · 17/18",
  moisture: 10.8,
  waterActivity: 0.55,
  score: 86.25,
} as const;
