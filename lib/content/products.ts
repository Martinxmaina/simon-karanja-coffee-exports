// Products page copy: grade specification + cup profile.
// Locale-neutral figures (screen sizes, cup scores, crop share, bag weight)
// live in lib/data.ts; anything numeric that appears inside a sentence is
// formatted here with num()/range() so 10,8 / 10.8 never ships as a literal.
import type { GradeCopy } from "@/components/GradeCards";
import { bagKg, type CupKey } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  heroLead: string;

  gradesEyebrow: string;
  gradesTitle: string;
  gradesIntro: string;
  /** One entry per grade in lib/data.ts `grades`, matched by code. */
  gradeCards: GradeCopy[];
  /** One entry per row in lib/data.ts `gradesExtra`, matched by code. */
  gradeExtra: { code: string; cupProfile: string; minLot: string }[];
  tableHeads: string[];
  tableCaption: string;
  densityLabel: string;
  densityValue: string;
  profileLabel: string;
  shareLabel: string;
  minLotLabel: string;
  packingNote: string;

  photoAlt: string;
  photoCaption: string;

  cupEyebrow: string;
  cupTitle: string;
  cupIntro: string;
  cupLabels: Record<CupKey, string>;
  cupCaption: string;
  cupTableCaption: string;
  cupHeads: [string, string];
  cupBonusRow: string;
  cupTotalRow: string;
  outOf: string;

  descriptorsTitle: string;
  /** The two signature notes — rendered as accented tags. */
  descriptorsPrimary: string[];
  descriptorsSecondary: string[];
  descriptorsBody: string;
  roastNote: string;
  scoreLabel: string;
  sampleLabel: string;
  sampleValue: string;
  cta: string;
};

const en: Copy = {
  metaTitle: "Grades and cup profile",
  metaDescription:
    "Kenyan green coffee in AA, AB, PB, E and TT: screen sizes, bean specification, packing and the SCA cup profile of our 2025/26 AA lots.",

  eyebrow: "Specialty arabica from Kenya",
  h1: "Grades: AA · AB · PB",
  heroLead:
    "Kenyan coffee is sorted by bean size and shape after milling, and the sort you buy moves both the price and the roast. The silhouettes below are drawn to the real screen proportions; the table is the specification we contract on.",

  gradesEyebrow: "Specification · 2025/26 crop",
  gradesTitle: "What the grade letter actually buys you",
  gradesIntro: `A Kenyan grade describes size and density after hulling, not cup quality on its own — AA and AB off the same wet mill can sit ${num(0.5, "en", 1)} SCA points apart and are quoted separately. Screen, size, cup character and minimum lot are the four lines that end up in the contract.`,
  gradeCards: [
    {
      code: "AA",
      profile: "filter · espresso",
      cupProfile: "Blackcurrant, tomato, dense acidity",
      description:
        "Large, dense beans off the highest farms. The most complex cup we ship and the sharpest acidity — the flagship lot for filter and single origin.",
    },
    {
      code: "AB",
      profile: "blends · espresso",
      cupProfile: "Red berries, citrus, juicy body",
      description:
        "The workhorse of the Kenyan crop: the same character with the acidity a shade calmer. The best value per kilo for blends and volume roasting.",
    },
    {
      code: "PB",
      profile: "filter · pour-over",
      cupProfile: "Sweetness, intense aroma, even roast",
      description:
        "One round bean instead of two — it ripens faster and roasts more evenly. Concentrated sweetness, pronounced aroma, and a small volume that commits early.",
    },
  ],
  gradeExtra: [
    { code: "E", cupProfile: "Elephant bean, limited lots", minLot: "on request" },
    { code: "TT", cupProfile: "Light fraction of AA/AB, commercial grade", minLot: "on request" },
  ],
  tableHeads: ["Grade", "Screen", "Size, mm", "Cup character", "Min. lot"],
  tableCaption: "Grade specification · 2025/26 crop",
  densityLabel: "Density",
  densityValue: `${range(700, 750, "en")} g/l`,
  profileLabel: "Best for",
  shareLabel: "Share of crop",
  minLotLabel: `${num(30, "en")} kg`,
  packingNote: `Every grade ships in ${num(bagKg, "en")} kg jute with a GrainPro liner; sample lots go vacuum-packed. Contract moisture ${range(10, 12, "en")} %, water activity at or below ${num(0.6, "en", 2)}, screen tolerance ±${num(2, "en")} %, and no more than ${num(5, "en")} full defects per ${num(300, "en")} g.`,

  photoAlt: "Unroasted Kenyan green coffee beans, screen-sized after milling",
  photoCaption: "Screen-sized green coffee · a sample is drawn from every lot before it ships",

  cupEyebrow: "Cupping · SCA protocol",
  cupTitle: "Cup profile",
  cupIntro:
    "Average SCA scores for the AA lots cupped this season. Every shipment carries its own sheet, and a lot that misses the profile does not leave the Nairobi warehouse.",
  cupLabels: {
    aroma: "Aroma",
    flavour: "Flavour",
    aftertaste: "Aftertaste",
    acidity: "Acidity",
    body: "Body",
    balance: "Balance",
    overall: "Overall",
  },
  cupCaption: `SCA scale ${range(6, 10, "en", 2)} · average of ${num(14, "en")} lots · sweetness, uniformity and clean cup at ${num(10, "en", 2)} each`,
  cupTableCaption: "Cupping sheet · AA averages, 2025/26 crop",
  cupHeads: ["Attribute", "Score"],
  cupBonusRow: "Sweetness · uniformity · clean cup",
  cupTotalRow: "Total",
  outOf: `/ ${num(10, "en")}`,

  descriptorsTitle: "Descriptors",
  descriptorsPrimary: ["blackcurrant", "tomato"],
  descriptorsSecondary: ["grapefruit", "black tea", "brown sugar", "jasmine", "winey acidity"],
  descriptorsBody:
    "Washed Kenyan arabica is recognisable blind: winey acidity over a savoury, tomato-like depth. That is the signature. Roast light and the berry and citrus come forward; take it to a medium and you get caramel sweetness and black tea.",
  roastNote:
    "A roast note travels with every sample — drop temperature, development time and the profile we cupped the lot on — so your first roast is a comparison rather than a guess.",
  scoreLabel: "SCA total",
  sampleLabel: "Sample",
  sampleValue: `AA · ${num(14, "en")} lots · 2025/26`,
  cta: "Request samples and a price list",
};

const ru: Copy = {
  metaTitle: "Продукция",
  metaDescription:
    "Грейды кенийского зелёного кофе AA, AB и PB: спецификации, силуэты зерна и профиль чашки по протоколу SCA.",

  eyebrow: "Специальная арабика из Кении",
  h1: "Грейды: AA · AB · PB",
  heroLead:
    "В Кении зерно сортируется по размеру и форме — это влияет и на цену, и на профиль обжарки. Силуэты ниже показаны в пропорции к реальному размеру скрина, а таблица — это спецификация, которая уходит в контракт.",

  gradesEyebrow: "Спецификация · сезон 2025/26",
  gradesTitle: "Что на самом деле означает буква грейда",
  gradesIntro: `Кенийский грейд описывает размер и плотность зерна после обмолота, а не качество чашки само по себе: AA и AB с одной мойки могут различаться на ${num(0.5, "ru", 1)} балла SCA и котируются отдельно. Скрин, размер, характер чашки и минимальная партия — четыре строки, которые попадают в контракт.`,
  gradeCards: [
    {
      code: "AA",
      profile: "фильтр · эспрессо",
      cupProfile: "Чёрная смородина, томат, плотная кислотность",
      description:
        "Крупное плотное зерно с высокогорий. Максимальная сложность чашки, самая яркая кислотность — флагманский лот для фильтра и моносортов.",
    },
    {
      code: "AB",
      profile: "бленды · эспрессо",
      cupProfile: "Красные ягоды, цитрус, сочное тело",
      description:
        "Рабочая лошадка кенийского урожая: тот же характер, чуть спокойнее в кислотности. Лучшее соотношение цены и качества для блендов и объёмной обжарки.",
    },
    {
      code: "PB",
      profile: "фильтр · воронка",
      cupProfile: "Сладость, интенсивный аромат, ровная обжарка",
      description:
        "Одно округлое зерно вместо двух — растёт быстрее и обжаривается ровнее. Концентрированная сладость, выраженный аромат, ограниченный объём.",
    },
  ],
  gradeExtra: [
    { code: "E", cupProfile: "«Слоновье» зерно, лимитированные лоты", minLot: "по запросу" },
    { code: "TT", cupProfile: "Лёгкая фракция AA/AB, коммерческий сегмент", minLot: "по запросу" },
  ],
  tableHeads: ["Грейд", "Скрин", "Размер, мм", "Характер чашки", "Мин. партия"],
  tableCaption: "Спецификация грейдов · сезон 2025/26",
  densityLabel: "Плотность",
  densityValue: `${range(700, 750, "ru")} г/л`,
  profileLabel: "Профиль",
  shareLabel: "Доля урожая",
  minLotLabel: `${num(30, "ru")} кг`,
  packingNote: `Любой грейд отгружается в джуте по ${num(bagKg, "ru")} кг с вкладышем GrainPro, пробные лоты — в вакууме. Контрактная влажность ${range(10, 12, "ru")} %, водная активность не выше ${num(0.6, "ru", 2)}, допуск по скрину ±${num(2, "ru")} %, не более ${num(5, "ru")} полных дефектов на ${num(300, "ru")} г.`,

  photoAlt: "Зелёное кенийское зерно после обмолота и калибровки по скрину",
  photoCaption: "Зерно, откалиброванное по скрину · образец отбирается от каждого лота до отгрузки",

  cupEyebrow: "Инфографика · Каппинг",
  cupTitle: "Профиль чашки",
  cupIntro:
    "Средние оценки по протоколу SCA для лотов AA сезона 2025/26. К каждой отгрузке прилагается собственный каппинг-лист, а лот, не попавший в профиль, со склада в Найроби не уезжает.",
  cupLabels: {
    aroma: "Аромат",
    flavour: "Вкус",
    aftertaste: "Послевкусие",
    acidity: "Кислотность",
    body: "Тело",
    balance: "Баланс",
    overall: "Впечатление",
  },
  cupCaption: `Шкала SCA ${range(6, 10, "ru", 2)} · выборка из ${num(14, "ru")} лотов · сладость, однородность и чистота — по ${num(10, "ru", 2)}`,
  cupTableCaption: "Каппинг-лист · средние оценки AA, сезон 2025/26",
  cupHeads: ["Атрибут", "Оценка"],
  cupBonusRow: "Сладость · однородность · чистота",
  cupTotalRow: "Итого",
  outOf: `из ${num(10, "ru")}`,

  descriptorsTitle: "Дескрипторы",
  descriptorsPrimary: ["чёрная смородина", "томат"],
  descriptorsSecondary: ["грейпфрут", "чёрный чай", "коричневый сахар", "жасмин", "винная кислотность"],
  descriptorsBody:
    "Кенийская мытая арабика узнаётся по кислотности винного типа и «томатной» глубине — это её подпись. При светлой обжарке на первый план выходят ягоды и цитрус, при средней — карамельная сладость и чёрный чай.",
  roastNote:
    "К каждому образцу прилагается рекомендация по обжарке: температура выгрузки, время развития и профиль, на котором мы каппили лот, — чтобы первая обжарка была сравнением, а не догадкой.",
  scoreLabel: "Балл SCA",
  sampleLabel: "Выборка",
  sampleValue: `AA · ${num(14, "ru")} лотов · 2025/26`,
  cta: "Запросить образцы и прайс",
};

export const products: Record<Locale, Copy> = { en, ru };
