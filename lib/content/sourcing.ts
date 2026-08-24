// Sourcing & traceability page copy.
// Figures come from lib/data and are formatted per locale here, so the same
// number never appears twice as a hand-typed string.
import { altitudeCeiling, altitudeFloor, volumes, type LaneKey } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

type Step = { title: string; text: string };

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroLede: string;

  /** Altitude figure. */
  altTitle: string;
  altNote: string;
  /** Uppercase caption over the shaded specialty band; the range is appended. */
  altZone: string;
  /** Screen-reader sentence; "{range}" is replaced by the sourced altitude span. */
  altAria: string;
  altFootLabel: string;
  altFootText: string;

  /** Harvest calendar. */
  calEyebrow: string;
  calTitle: string;
  calLede: string;
  calFigTitle: string;
  calFigNote: string;
  calLanes: Record<LaneKey, string>;
  /** Three swatch captions: main crop, fly crop, processing / shipping. */
  calLegend: string[];
  calFootLabel: string;
  calFootText: string;

  /** Farm-to-cup chain. */
  chainEyebrow: string;
  chainTitle: string;
  chainLede: string;
  stepWord: string;
  steps: Step[];
  photoAlt: string;
  photoCaption: string;

  /** Traceability + lot passport. */
  traceEyebrow: string;
  traceTitleTop: string;
  traceTitleBottom: string;
  traceLede: string;
  traceBody: string[];
  lotCaption: string;
  lotFoot: string;
  /** Row labels, in the order the page builds them. */
  lotLabels: {
    region: string;
    coop: string;
    mill: string;
    altitude: string;
    variety: string;
    process: string;
    grade: string;
    harvest: string;
    moisture: string;
    score: string;
  };
  /** Locale-specific values that are prose rather than data. */
  lotRegionSuffix: string;
  lotScreen: string;
  lotAsl: string;
  lotProcess: string;
  lotHarvest: string;
};

const sampleKg = volumes.find((v) => v.key === "sample")?.kg ?? 30;

/** Drying window on raised beds, in days. */
const DRYING_DAYS = [7, 15] as const;
/** Contract moisture window for washed parchment, in percent. */
const MOISTURE = [10, 12] as const;
/** Lead time we ask buyers to allow before a shipping window, in weeks. */
const LEAD_WEEKS = [6, 10] as const;

const en: Copy = {
  metaTitle: "Sourcing and traceability",
  metaDescription:
    "Growing altitudes across the six Kenyan counties we buy from, the two-harvest calendar, the six documented steps from cherry to container, and the lot passport that ships with every order.",
  eyebrow: "Sourcing · Traceability",
  h1: "From the Kenyan highlands, lot by lot",
  heroLede:
    "The higher the farm, the slower the cherry ripens and the denser the bean — which is where Kenya's structured acidity comes from. Below: the counties we buy in, the season we buy in, and the record that follows each lot to your warehouse.",

  altTitle: "Growing altitude by county",
  altNote: "Metres above sea level · typical ranges",
  altZone: "SPECIALTY ZONE",
  altAria:
    "Altitude ranges for the six Kenyan counties we source from, spanning {range} metres above sea level.",
  altFootLabel: "How to read this:",
  altFootText:
    "each bar is the altitude the farms in that county sit at. The shaded band marks the elevations we select specialty lots from — above it, yields fall away; below it, the cup loses its edge.",

  calEyebrow: "Infographic · Seasonality",
  calTitle: "Harvest and shipping calendar",
  calLede: `Kenya harvests twice a year. Fresh crop is committed at the mill before it is milled, so raise your enquiry ${range(LEAD_WEEKS[0], LEAD_WEEKS[1], "en")} weeks ahead of the shipping window you need.`,
  calFigTitle: "Harvest, processing and shipping windows",
  calFigNote: "Calendar year · Kenya",
  calLanes: {
    main: "Main crop",
    fly: "Fly crop",
    processing: "Processing and drying",
    shipping: "Shipping windows",
  },
  calLegend: ["Main crop", "Fly crop", "Processing / shipping"],
  calFootLabel: "In practice:",
  calFootText: `the most interesting main-crop lots are allocated in November and December. Out of season a ${num(sampleKg, "en")} kg sample still ships from current-crop stock held in our Nairobi warehouse.`,

  chainEyebrow: "Infographic · Supply chain",
  chainTitle: "From farm to cup",
  chainLede:
    "Six steps, every one of them documented. That is what traceability means here: give us a lot number and we can pull its whole history — mill records, drying log, cupping sheet.",
  stepWord: "Step",
  steps: [
    {
      title: "Cherry picking",
      text: `Selective hand-picking of ripe cherry only, at ${range(altitudeFloor, altitudeCeiling, "en")} m, delivered to the wet mill the same day it is picked.`,
    },
    {
      title: "Washed processing",
      text: "Pulping, fermentation in tanks and washing in clean mountain water at the cooperative wet mill, then a soak before the drying tables.",
    },
    {
      title: "Drying on raised beds",
      text: `Slow drying on raised beds for ${range(DRYING_DAYS[0], DRYING_DAYS[1], "en")} days down to ${range(MOISTURE[0], MOISTURE[1], "en")} % moisture, turned by hand and covered through the midday heat.`,
    },
    {
      title: "Dry milling",
      text: "Hulling of the parchment, then grading by screen size and density into AA, AB and PB, with density tables and colour sorting.",
    },
    {
      title: "Cupping and QC",
      text: "A sample is roasted and cupped, moisture, water activity and defect count are recorded. That same sample goes to you before anything is confirmed.",
    },
    {
      title: "Export",
      text: "Packing in GrainPro liners inside 60 kg jute, full document set issued, container loaded and shipped out of Mombasa.",
    },
  ],
  photoAlt: "Coffee spread across raised drying beds and turned by hand at a Kenyan wet mill",
  photoCaption: "Step 03 · slow drying on raised beds, turned by hand",

  traceEyebrow: "Our commitment",
  traceTitleTop: "Every bag",
  traceTitleBottom: "has an address",
  traceLede:
    "A lot passport travels with every shipment. Alongside is an example of exactly what arrives with the coffee.",
  traceBody: [
    "It is generated at the dry mill rather than written up afterwards: cooperative, wet mill, county, altitude, variety, fermentation time, screen, moisture, water activity and the score from the sample you approved.",
    "We keep the file for five years. If your customer or an auditor asks where a specific bag came from, quote the lot number on the ICO marking and the original mill records and cupping sheet come back to you within two business days.",
  ],
  lotCaption: "lot passport",
  lotFoot: "Sample entry · your own lot data is issued before shipment",
  lotLabels: {
    region: "County",
    coop: "Cooperative",
    mill: "Wet mill",
    altitude: "Altitude",
    variety: "Variety",
    process: "Process",
    grade: "Grade",
    harvest: "Harvest",
    moisture: "Moisture / aw",
    score: "SCA score",
  },
  lotRegionSuffix: "Central Kenya",
  lotScreen: "screen",
  lotAsl: "a.s.l.",
  lotProcess: "Washed, 36 h fermentation",
  lotHarvest: "November 2025",
};

const ru: Copy = {
  metaTitle: "Снабжение",
  metaDescription:
    "Высота выращивания по регионам Кении, календарь урожая и путь кофе от фермы до отгрузки, с примером паспорта лота.",
  eyebrow: "Снабжение · Прослеживаемость",
  h1: "Из высокогорий Кении",
  heroLede:
    "Чем выше плантация, тем медленнее созревает вишня и плотнее зерно — отсюда яркая кислотность и структура чашки. Ниже — регионы, из которых мы закупаем, и путь, который проходит каждый лот.",

  altTitle: "Высота выращивания по регионам",
  altNote: "Метры над уровнем моря · типичные диапазоны",
  altZone: "ЗОНА SPECIALTY",
  altAria:
    "Диапазоны высот шести регионов Кении, из которых мы закупаем: {range} метров над уровнем моря.",
  altFootLabel: "Как это читать:",
  altFootText:
    "отрезок — диапазон высот, на которых расположены хозяйства региона. Подсвеченная полоса — высоты, с которых мы отбираем лоты specialty-класса.",

  calEyebrow: "Инфографика · Сезонность",
  calTitle: "Календарь урожая и отгрузок",
  calLede: `У Кении два урожая в год. Свежий кроп резервируют заранее — планируйте запрос за ${range(LEAD_WEEKS[0], LEAD_WEEKS[1], "ru")} недель до нужного окна отгрузки.`,
  calFigTitle: "Урожай, обработка и окна отгрузки",
  calFigNote: "Календарный год · Кения",
  calLanes: {
    main: "Основной урожай",
    fly: "Промежуточный урожай",
    processing: "Обработка и сушка",
    shipping: "Отгрузка в Россию",
  },
  calLegend: ["Основной урожай", "Промежуточный урожай", "Обработка / отгрузка"],
  calFootLabel: "Практика:",
  calFootText: `самые интересные лоты основного урожая расписываются в ноябре–декабре. Пробные ${num(sampleKg, "ru")} кг можно получить вне сезона — со склада текущего кропа в Найроби.`,

  chainEyebrow: "Инфографика · Цепочка поставки",
  chainTitle: "От фермы до чашки",
  chainLede:
    "Шесть шагов, каждый из которых документируется. Именно это и означает прослеживаемость: по номеру лота мы поднимаем всю историю — записи мойки, журнал сушки, каппинг-лист.",
  stepWord: "Шаг",
  steps: [
    {
      title: "Сбор вишни",
      text: `Ручной сбор только спелой вишни на высоте ${range(altitudeFloor, altitudeCeiling, "ru")} м, сдача на мойку в день сбора.`,
    },
    {
      title: "Мытая обработка",
      text: "Депульпация, ферментация в бассейнах, промывка в чистой горной воде на кооперативной мойке.",
    },
    {
      title: "Сушка на грядках",
      text: `Медленная сушка на приподнятых столах ${range(DRYING_DAYS[0], DRYING_DAYS[1], "ru")} дней до влажности ${range(MOISTURE[0], MOISTURE[1], "ru")} %, с перекладкой вручную.`,
    },
    {
      title: "Сухая обработка",
      text: "Обмолот пергамента, калибровка по скрину и плотности, разделение на AA, AB, PB.",
    },
    {
      title: "Каппинг и контроль",
      text: "Проба обжаривается и каппится, замеряются влажность, водная активность и дефекты. Образец — вам.",
    },
    {
      title: "Экспорт",
      text: "Упаковка в GrainPro и джут, документы, отгрузка из Момбасы в порт назначения.",
    },
  ],
  photoAlt: "Кофе на приподнятых сушильных грядках, перекладка вручную на кенийской мойке",
  photoCaption: "Шаг 03 · медленная сушка на приподнятых грядках, с перекладкой вручную",

  traceEyebrow: "Наше обязательство",
  traceTitleTop: "Каждый мешок",
  traceTitleBottom: "имеет адрес",
  traceLede:
    "К любой отгрузке прилагается паспорт лота. Пример того, что вы получаете вместе с кофе, — рядом.",
  traceBody: [
    "Паспорт формируется на сухой обработке, а не задним числом: кооператив, мойка, регион, высота, сорт, время ферментации, скрин, влажность, водная активность и балл того образца, который вы утвердили.",
    "Архив храним пять лет. Если ваш клиент или аудитор спросит, откуда конкретный мешок, назовите номер лота с ICO-маркировки — оригиналы документов мойки и каппинг-лист пришлём в течение двух рабочих дней.",
  ],
  lotCaption: "паспорт лота",
  lotFoot: "Пример заполнения · данные по вашему лоту предоставляются до отгрузки",
  lotLabels: {
    region: "Регион",
    coop: "Кооператив",
    mill: "Мойка",
    altitude: "Высота",
    variety: "Сорт",
    process: "Обработка",
    grade: "Грейд",
    harvest: "Урожай",
    moisture: "Влажность / aw",
    score: "Балл SCA",
  },
  lotRegionSuffix: "Центральная Кения",
  lotScreen: "скрин",
  lotAsl: "н.у.м.",
  lotProcess: "Мытая, ферментация 36 ч",
  lotHarvest: "ноябрь 2025",
};

export const sourcing: Record<Locale, Copy> = { en, ru };
