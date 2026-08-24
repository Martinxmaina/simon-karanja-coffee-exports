// "Our farms" — the photo-led page: the cooperative model, the gallery, the
// regions we buy from. Figures live here as numbers and are formatted per
// locale, so 0,3–0,5 / 0.3–0.5 is never typed by hand.
import { altitudeCeiling, altitudeFloor, bagKg, regions, type RegionKey } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";
import type { PhotoSlot } from "@/lib/photos";

/** Gallery order = the order the coffee actually moves, tree to ship. */
export const gallerySlots = [
  "highlands",
  "farm",
  "cherries",
  "farmers",
  "drying",
  "parchment",
  "greenbeans",
  "port",
] as const satisfies readonly PhotoSlot[];

export type GallerySlot = (typeof gallerySlots)[number];

// Figures quoted in the prose and the captions.
const SMALLHOLDERS = 700_000; // coffee-growing households in Kenya
const COOP_MILLS = 32; // cooperative wet mills we contract with
const MEMBERS = 4_200; // farmer members behind those mills
const PLOT_HA = [0.3, 0.5] as const;
const TREES = [200, 400] as const;
const DRY_DAYS = [7, 15] as const;
const MOISTURE = [10, 12] as const;
const WATER_ACTIVITY = 0.55;
const FERMENT_H = 36;
const SEA_NOVOROSSIYSK = [25, 32] as const;
const SEA_STPETERSBURG = [35, 45] as const;

/** Nyeri carries the flagship AA lots, so its altitude band is quoted directly. */
const nyeri = regions.find((r) => r.key === "nyeri") ?? {
  minAlt: altitudeFloor,
  maxAlt: altitudeCeiling,
};

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  heroLede: string;
  /** Four figures across the hero band: [value, label]. */
  facts: [string, string][];

  introEyebrow: string;
  introTitle: string;
  introLede: string;
  introBody: string[];

  galleryEyebrow: string;
  galleryTitle: string;
  galleryLede: string;
  captions: Record<GallerySlot, string>;

  regionsEyebrow: string;
  regionsTitle: string;
  regionsLede: string;
  tableCaption: string;
  tableHeads: [string, string, string, string];
  regionNotes: Record<RegionKey, string>;
  regionsFootLabel: string;
  regionsFootText: string;
};

const en: Copy = {
  metaTitle: "Our farms",
  metaDescription: `The cooperatives and smallholders behind our lots: ${num(COOP_MILLS, "en")} partner wet mills across ${num(regions.length, "en")} Kenyan regions, day-lot buying, and what every stage from cherry to container actually looks like.`,

  eyebrow: "Where the coffee comes from",
  h1: "Our farms",
  heroLede:
    "Not one estate but several thousand smallholdings, gathered by cooperative wet mills on the slopes around Mount Kenya. This is who grows the coffee we ship, and how the lot in your contract is assembled.",
  facts: [
    [num(COOP_MILLS, "en"), "Partner wet mills"],
    [num(MEMBERS, "en"), "Farmer members"],
    [num(regions.length, "en"), "Sourcing regions"],
    [`${range(altitudeFloor, altitudeCeiling, "en")} m`, "Altitude range"],
  ],

  introEyebrow: "How we buy",
  introTitle: "Cooperatives, not plantations",
  introLede: `Around ${num(SMALLHOLDERS, "en")} Kenyan households grow coffee, most of them on ${range(PLOT_HA[0], PLOT_HA[1], "en", 1)} ha — ${range(TREES[0], TREES[1], "en")} trees behind the house. There is no plantation behind these lots. There is a cooperative wet mill, and several hundred neighbours who carry cherry to it by hand every afternoon of the harvest.`,
  introBody: [
    "That structure decides how the coffee has to be bought. We contract at the factory — the Kenyan word for a cooperative wet mill — and we contract before the parchment is milled, not on the auction floor afterwards. The unit we buy is the day lot: one mill, one delivery day, one drying regime. It is the smallest quantity that still tastes like one single thing, and it is what we reserve, ship and put your name on.",
    `We work with ${num(COOP_MILLS, "en")} factories across ${num(regions.length, "en")} regions. During the main crop we are at the mills weekly, cupping day lots as they come off the beds and holding back the ones that match the profiles our roasters buy every season. Because volume is confirmed at the mill before pulping, we can give you a shipping window in advance instead of explaining one after the fact.`,
    `Farmers are paid twice for the same cherry: an advance on delivery, then a second payment once the lot has sold. Every lot passport we issue names the cooperative and the wet mill, so that second payment is attached to the coffee you actually bought rather than to a regional average. Ask us for the mill's cherry price for the season and we will send it.`,
    "The mills recirculate washing water and return pulp to the members as compost; drying is solar, on raised beds, with no mechanical dryers in the chain. None of that is a certificate — it is simply how a cooperative with a river below it and a hillside above it has to operate.",
  ],

  galleryEyebrow: "From the highlands",
  galleryTitle: "What the harvest actually looks like",
  galleryLede:
    "Cherry to container, in the order it happens. Each of these stages is one your lot passes through, and each one is a place where a good lot can quietly be lost.",
  captions: {
    highlands: `The Mount Kenya massif. Nyeri and Kirinyaga sit on its southern slopes at ${range(nyeri.minAlt, nyeri.maxAlt, "en")} m: cold nights slow cherry maturation for months, and that slowness is where the blackcurrant acidity Kenya is bought for comes from.`,
    farm: `A smallholding in Kiambu — coffee under shade trees on volcanic red soil. Holdings of ${range(PLOT_HA[0], PLOT_HA[1], "en", 1)} ha like this one, not estates, make up the bulk of what we ship.`,
    cherries: "Sorting at the receiving table before the cherry is weighed in. Under-ripes and floaters are pulled out here, in daylight, by the people who picked them — cup cleanliness is decided at this table, long before anyone opens a cupping bowl.",
    farmers: "Cooperative members deliver the day's picking on foot in the late afternoon. Cherry is pulped the same evening it is picked; anything held overnight ferments in the sack and would carry that into the cup.",
    drying: `Parchment turned by hand on raised beds — ${range(DRY_DAYS[0], DRY_DAYS[1], "en")} days down to ${range(MOISTURE[0], MOISTURE[1], "en")} % moisture, shaded through the midday heat. Slow, even drying is what holds water activity around ${num(WATER_ACTIVITY, "en", 2)} and keeps the lot stable through a month at sea.`,
    parchment: `Dry parchment in the mill's conditioning store after a ${num(FERMENT_H, "en")}-hour ferment and a clean-water wash. Lots rest in parchment and are only hulled to green shortly before shipment, so the coffee ages as little as possible before it reaches your roastery.`,
    greenbeans: "Milled green, graded over screens and by density: AA 17/18, AB 15/16, PB. Grading happens at the dry mill in Nairobi, and every export lot is cupped after grading — a screen size is a size, not a promise about the cup.",
    port: `Mombasa. Coffee leaves in GrainPro liners inside jute, FOB or CFR as you prefer — ${range(SEA_NOVOROSSIYSK[0], SEA_NOVOROSSIYSK[1], "en")} days to Novorossiysk, ${range(SEA_STPETERSBURG[0], SEA_STPETERSBURG[1], "en")} to St Petersburg.`,
  },

  regionsEyebrow: "Origins",
  regionsTitle: "The regions we buy from",
  regionsLede:
    "Six growing areas, each with its own soil, altitude band and cup. We keep standing relationships in all six so that a poor season in one region does not become your problem.",
  tableCaption: "Sourcing regions · current crop",
  tableHeads: ["Region", "Varieties", "Altitude", "In the cup"],
  regionNotes: {
    nyeri: "The classic Kenyan profile — blackcurrant, tomato, wine-like acidity. Our flagship AA lots come from here and are allocated first.",
    kirinyaga: "Cleaner and more floral, grapefruit rather than blackcurrant. Strong, well-run factories and the most dependable AA/AB volume of the six.",
    muranga: "Rounder and sweeter with softer acidity. The most consistent AB availability, and our usual recommendation for a blend base.",
    embu: "Lower and warmer: ripe red fruit, heavier body, less bite. Good value for espresso where the acidity of Nyeri would fight the milk.",
    kiambu: "Estates and cooperatives close to Nairobi. Balanced, approachable cup and the shortest run to the dry mill, so turnaround on samples is fastest here.",
    elgon: "Western Kenya on the Mount Elgon slopes. Milder and tea-like, without the classic central-highland acidity — a genuinely different lot when you want one.",
  },
  regionsFootLabel: "On request:",
  regionsFootText: `single-cooperative lots from any of these regions, with the mill named on the contract. The minimum for a named single-mill lot is one full ${num(bagKg, "en")} kg bag per grade.`,
};

const ru: Copy = {
  metaTitle: "Наши фермы",
  metaDescription: `Кооперативы и мелкие фермеры за нашими лотами: ${num(COOP_MILLS, "ru")} партнёрские мойки в ${num(regions.length, "ru")} регионах Кении, закупка дневными лотами и весь путь от вишни до контейнера в фотографиях.`,

  eyebrow: "Откуда наш кофе",
  h1: "Наши фермы",
  heroLede:
    "Не одно поместье, а несколько тысяч маленьких хозяйств, которые собираются в лоты на кооперативных мойках по склонам вокруг горы Кения. Здесь показано, кто выращивает кофе и как складывается партия, указанная в вашем контракте.",
  facts: [
    [num(COOP_MILLS, "ru"), "Партнёрских моек"],
    [num(MEMBERS, "ru"), "Фермеров-членов"],
    [num(regions.length, "ru"), "Регионов закупки"],
    [`${range(altitudeFloor, altitudeCeiling, "ru")} м`, "Диапазон высот"],
  ],

  introEyebrow: "Как мы закупаем",
  introTitle: "Кооперативы, а не плантации",
  introLede: `Кофе в Кении выращивают около ${num(SMALLHOLDERS, "ru")} крестьянских хозяйств, у большинства — ${range(PLOT_HA[0], PLOT_HA[1], "ru", 1)} га, то есть ${range(TREES[0], TREES[1], "ru")} деревьев за домом. За такими лотами стоит не плантация, а кооперативная мойка и несколько сотен соседей, которые каждый день урожая приносят на неё вишню вручную.`,
  introBody: [
    "Из этой структуры следует и способ закупки. Мы договариваемся напрямую с factory — так в Кении называют кооперативную мойку — и договариваемся до обмолота пергамента, а не на аукционе после него. Единица закупки — дневной лот: одна мойка, один день приёмки, один режим сушки. Это наименьший объём, который ещё звучит в чашке как что-то одно, и именно его мы резервируем, отгружаем и подписываем вашим именем.",
    `Мы работаем с ${num(COOP_MILLS, "ru")} мойками в ${num(regions.length, "ru")} регионах. В основной урожай бываем на них еженедельно: каппим дневные лоты прямо с грядок и придерживаем те, что попадают в профили, которые наши обжарщики берут из сезона в сезон. Объём подтверждается на мойке ещё до депульпации — поэтому окно отгрузки мы называем заранее, а не объясняем задним числом.`,
    "Фермер получает деньги за одну и ту же вишню дважды: аванс при сдаче и вторую выплату после продажи лота. В паспорте лота всегда указаны кооператив и мойка, так что вторая выплата привязана к тому кофе, который вы действительно купили, а не к среднему по региону. Попросите — пришлём цену за вишню по этой мойке за сезон.",
    "Мойки работают с оборотной водой и возвращают мякоть членам кооператива как компост; сушка — солнечная, на приподнятых грядках, механических сушилок в цепочке нет. Это не сертификат: просто так вынужден работать кооператив, у которого внизу река, а наверху склон.",
  ],

  galleryEyebrow: "С высокогорий",
  galleryTitle: "Как на самом деле выглядит урожай",
  galleryLede:
    "От вишни до контейнера, в том порядке, в котором это происходит. Ваш лот проходит каждый из этих этапов — и на каждом хороший лот можно незаметно потерять.",
  captions: {
    highlands: `Массив горы Кения. Ньери и Кириньяга лежат на её южных склонах на высоте ${range(nyeri.minAlt, nyeri.maxAlt, "ru")} м: холодные ночи месяцами замедляют созревание вишни, и именно из этой медленности берётся смородиновая кислотность, за которую покупают Кению.`,
    farm: `Небольшое хозяйство в Киамбу — кофе под теневыми деревьями на вулканической красной почве. Основную часть наших отгрузок дают именно такие участки по ${range(PLOT_HA[0], PLOT_HA[1], "ru", 1)} га, а не эстейты.`,
    cherries: "Сортировка на приёмном столе до взвешивания. Недозревшую и всплывшую вишню отбирают здесь, при дневном свете, те же люди, которые её собирали, — чистота чашки решается за этим столом, задолго до первой каппинг-пиалы.",
    farmers: "Члены кооператива приносят дневной сбор пешком ближе к вечеру. Вишню депульпируют в тот же вечер: то, что осталось в мешке на ночь, забраживает и обязательно проявится в чашке.",
    drying: `Пергамент на приподнятых столах, с перекладкой вручную: ${range(DRY_DAYS[0], DRY_DAYS[1], "ru")} дней до влажности ${range(MOISTURE[0], MOISTURE[1], "ru")} %, в полуденную жару под тентом. Медленная равномерная сушка держит водную активность около ${num(WATER_ACTIVITY, "ru", 2)} — благодаря ей лот спокойно переносит месяц в море.`,
    parchment: `Сухой пергамент на отлёжке после ферментации ${num(FERMENT_H, "ru")} ч и промывки чистой горной водой. Лоты хранятся в пергаменте и обмолачиваются в зелёное зерно незадолго до отгрузки, чтобы кофе как можно меньше старел до вашей обжарки.`,
    greenbeans: "Зелёное зерно после обмолота, калибровка по скрину и плотности: AA 17/18, AB 15/16, PB. Калибруют на сухой мельнице в Найроби, и каждый экспортный лот каппится уже после калибровки — размер зерна остаётся размером, а не обещанием по чашке.",
    port: `Момбаса. Кофе уходит в GrainPro внутри джута, на условиях FOB или CFR — ${range(SEA_NOVOROSSIYSK[0], SEA_NOVOROSSIYSK[1], "ru")} дня до Новороссийска и ${range(SEA_STPETERSBURG[0], SEA_STPETERSBURG[1], "ru")} дней до Санкт-Петербурга.`,
  },

  regionsEyebrow: "Регионы",
  regionsTitle: "Откуда мы закупаем",
  regionsLede:
    "Шесть районов выращивания, у каждого своя почва, свой диапазон высот и свой характер в чашке. Мы держим постоянные отношения во всех шести, чтобы слабый сезон в одном регионе не стал вашей проблемой.",
  tableCaption: "Регионы закупки · текущий кроп",
  tableHeads: ["Регион", "Сорта", "Высота", "В чашке"],
  regionNotes: {
    nyeri: "Классический кенийский профиль: чёрная смородина, томат, винная кислотность. Отсюда наши флагманские лоты AA — их расписывают первыми.",
    kirinyaga: "Чище и более цветочно, скорее грейпфрут, чем смородина. Сильные, хорошо управляемые мойки и самый предсказуемый объём AA/AB из шести регионов.",
    muranga: "Округлее и слаще, кислотность мягче. Самое стабильное наличие AB — наш обычный совет, когда нужна основа для бленда.",
    embu: "Ниже и теплее: спелые красные ягоды, плотное тело, меньше резкости. Хорошее соотношение цены и качества для эспрессо, где кислотность Ньери спорила бы с молоком.",
    kiambu: "Эстейты и кооперативы рядом с Найроби. Сбалансированная, понятная чашка и самое короткое плечо до сухой мельницы — поэтому образцы отсюда приходят быстрее всего.",
    elgon: "Западная Кения, склоны горы Элгон. Мягче и с чайным характером, без классической кислотности центральных высокогорий, — по-настоящему другой лот, когда он нужен.",
  },
  regionsFootLabel: "По запросу:",
  regionsFootText: `лоты одного кооператива из любого из этих регионов, с указанием мойки в контракте. Минимум для именного лота с одной мойки — один мешок ${num(bagKg, "ru")} кг на каждый грейд.`,
};

export const farms: Record<Locale, Copy> = { en, ru };
