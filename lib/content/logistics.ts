// Logistics page copy: order volumes, Incoterms, the sea route and the export
// document pack. Every figure comes from lib/data or is formatted here with
// num()/range(), so "19,2 т" / "19.2 t" is never a hand-typed string.
import { bagKg, type VolumeKey } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

type Tier = { key: VolumeKey; title: string; text: string };
type Term = { code: string; includes: string; risk: string };
type Doc = { doc: string; issuer: string; when: string };

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  heroLede: string;
  /** Four hero figures: [big number, caption]. */
  facts: [string, string][];

  /** Volumes + packing. */
  volEyebrow: string;
  volTitle: string;
  volLede: string;
  /** One entry per tier in lib/data.ts `volumes`, matched by key. */
  tiers: Tier[];
  bagWord: string;
  packingNote: string;
  specTitle: string;
  specMeta: string;
  specRows: [string, string][];

  /** Incoterms and what each basis buys. */
  termsEyebrow: string;
  termsTitle: string;
  termsLede: string;
  termsHeads: [string, string, string];
  termsCaption: string;
  terms: Term[];
  termsFootLabel: string;
  termsFootText: string;

  /** Route to Russia. */
  routeEyebrow: string;
  routeTitle: string;
  routeLede: string;
  /** Five nodes in geographic order for RouteMap. */
  routeNodes: { label: string; meta: string }[];
  legFast: string;
  legSlow: string;
  routeAria: string;
  photoAlt: string;
  photoCaption: string;
  legsTitle: string;
  /** One line per leg; the page pairs them with icons. */
  legs: string[];
  transitNote: string;

  /** Export document pack. */
  docsEyebrow: string;
  docsTitle: string;
  docsLede: string;
  docsHeads: [string, string, string];
  docsCaption: string;
  docs: Doc[];
  docsFootLabel: string;
  docsFootText: string;
  cta: string;
};

const en: Copy = {
  metaTitle: "Volumes, shipping and export documents",
  metaDescription: `Order sizes from a ${num(30, "en")} kg sample to a full container, sea transit from Mombasa to Novorossiysk and St Petersburg, Incoterms, and the export document pack that travels with every lot.`,

  eyebrow: "Volumes · Shipping to Russia",
  h1: `From a ${num(30, "en")} kg sample to a full container`,
  heroLede: `Start with ${num(30, "en")} kg, roast it and cost it properly. Scale up on the same lot, the same mill and the same paperwork — nothing about the coffee changes except the number of bags.`,
  facts: [
    [`${num(30, "en")} kg`, "smallest sample lot we ship"],
    [`${num(19.2, "en", 1)} t`, `full 20' DC · ${num(320, "en")} bags`],
    [`${range(25, 32, "en")} days`, "Mombasa to Novorossiysk by sea"],
    [`${range(7, 10, "en")} days`, "samples by air to Moscow"],
  ],

  volEyebrow: "Order sizes",
  volTitle: "Four ways to buy the same coffee",
  volLede:
    "Every tier draws on the same lots and the same quality file. The only thing that changes between a sample and a container is freight and how far ahead we reserve the coffee for you.",
  tiers: [
    {
      key: "sample",
      title: "Sample lot",
      text: "One GrainPro bag — enough to roast a full profile, cup it against your current Kenya and cost the landed price.",
    },
    {
      key: "small",
      title: "Trial order",
      text: "A first commercial purchase for a seasonal menu or a limited release, usually LCL.",
    },
    {
      key: "regular",
      title: "Standing order",
      text: "A repeat lot held to one profile so a blend tastes the same from shipment to shipment.",
    },
    {
      key: "container",
      title: "Container load",
      text: `Part or full 20' DC, up to ${num(19.2, "en", 1)} t on a single bill of lading.`,
    },
  ],
  bagWord: "bags",
  packingNote: `Standard packing is a ${num(bagKg, "en")} kg jute bag with a GrainPro liner. We also fill ${num(30, "en")} and ${num(15, "en")} kg units if that suits your warehouse better. Samples go out vacuum-packed by courier at our cost once a lot is under discussion.`,
  specTitle: "Shipment spec",
  specMeta: "20' DC",
  specRows: [
    ["Bag", `Jute ${num(bagKg, "en")} kg · GrainPro liner`],
    ["Alt. packing", `${num(30, "en")} / ${num(15, "en")} kg on request`],
    ["Container load", `${num(320, "en")} bags · ${num(19.2, "en", 1)} t`],
    ["Palletised", `${num(10, "en")} pallets × ${num(32, "en")} bags`],
    ["Moisture at loading", `${num(10, "en")}–${num(11.5, "en", 1)} %`],
    ["Marking", "ICO mark · lot no. · grade · net weight"],
    ["Minimum order", `${num(30, "en")} kg sample · ${num(300, "en")} kg commercial`],
  ],

  termsEyebrow: "Incoterms 2020",
  termsTitle: "What each price basis actually covers",
  termsLede:
    "We quote on whichever basis you contract on. The difference is not the coffee — it is how much of the chain sits on our side of the invoice and where the risk changes hands.",
  termsHeads: ["Basis", "Included in the price", "Risk passes"],
  termsCaption: "Price bases we quote · Incoterms 2020",
  terms: [
    {
      code: "FOB Mombasa",
      includes:
        "Lot preparation, milling, bags and liners, export clearance and documents, haulage to Mombasa and loading on board.",
      risk: "On board at Mombasa",
    },
    {
      code: "CFR Novorossiysk",
      includes: "FOB scope plus ocean freight and terminal charges to the named discharge port.",
      risk: "On board at Mombasa",
    },
    {
      code: "CIF St Petersburg",
      includes: `CFR scope plus marine cargo insurance at ${num(110, "en")} % of invoice value, Institute Cargo Clauses (A).`,
      risk: "On board at Mombasa",
    },
    {
      code: "DAP warehouse",
      includes:
        "CIF scope plus rail or road carriage to your warehouse. Import duty, VAT and customs clearance stay with you.",
      risk: "On arrival at your warehouse",
    },
  ],
  termsFootLabel: "Payment and validity.",
  termsFootText: `Offers are quoted in USD per lb FOB Mombasa and hold for ${num(5, "en")} working days; freight and insurance are shown as separate lines so you can see how CIF is built. Standard terms are ${num(30, "en")} % on lot confirmation and ${num(70, "en")} % against scanned documents, or an irrevocable L/C at sight from container volume up.`,

  routeEyebrow: "Legs and transit",
  routeTitle: "Nairobi to your warehouse",
  routeLede:
    "Coffee is trucked from our Nairobi warehouse, stuffed at the port of Mombasa and sails on a weekly service to Novorossiysk or St Petersburg, most often with one transhipment.",
  routeNodes: [
    { label: "Nairobi", meta: "exporter's warehouse" },
    { label: "Mombasa", meta: "port of loading" },
    { label: "Novorossiysk", meta: "port of discharge" },
    { label: "St Petersburg", meta: "port of discharge" },
    { label: "Russia", meta: "road · rail" },
  ],
  legFast: `BY SEA · ${range(25, 32, "en")} DAYS`,
  legSlow: `BY SEA · ${range(35, 45, "en")} DAYS`,
  routeAria:
    "Route diagram: Nairobi to Mombasa, then by sea to Novorossiysk or St Petersburg, then inland to your warehouse in Russia.",
  photoAlt: "Container ship leaving the port of Mombasa, Kenya",
  photoCaption: "Port of Mombasa · loaded containers leave on the next weekly service after clearance",
  legsTitle: "Leg by leg",
  legs: [
    `Nairobi → Mombasa: ${num(480, "en")} km by road, ${range(1, 2, "en")} days, stuffed and sealed at the port terminal.`,
    `Mombasa → Novorossiysk: ${range(25, 32, "en")} days at sea, usually transhipped at Jebel Ali or Salalah.`,
    `Mombasa → St Petersburg: ${range(35, 45, "en")} days at sea via a European or Middle Eastern hub.`,
    `Discharge port → warehouse: ${range(3, 10, "en")} days by road or rail, depending on the city.`,
    `Samples up to ${num(30, "en")} kg fly separately: ${range(7, 10, "en")} days door to door.`,
  ],
  transitNote:
    "Transit times are indicative and are confirmed against the actual carrier and booking date.",

  docsEyebrow: "Paperwork",
  docsTitle: "The export document pack",
  docsLede:
    "Every shipment travels with the same set. Scans go to you and your broker the day the vessel sails; originals follow by courier so nothing holds up clearance at the discharge port.",
  docsHeads: ["Document", "Issued by", "Provided"],
  docsCaption: "Standard document set per shipment",
  docs: [
    {
      doc: "Commercial invoice and packing list",
      issuer: "Simon & Sons Coffee Ltd.",
      when: "Day of sailing",
    },
    { doc: "Bill of lading", issuer: "Carrier / forwarder", when: `${range(3, 5, "en")} days after sailing` },
    { doc: "Certificate of origin", issuer: "Kenya National Chamber of Commerce", when: "Before loading" },
    { doc: "Phytosanitary certificate", issuer: "KEPHIS", when: "On lot inspection" },
    { doc: "ICO certificate and export permit", issuer: "Coffee Directorate (AFA)", when: "At Mombasa clearance" },
    { doc: "Cupping sheet and lot quality report", issuer: "Our lab / independent Q grader", when: "With the pre-shipment sample" },
    { doc: "Weight and quality certificate", issuer: "SGS or Intertek, on request", when: "At container stuffing" },
    { doc: "Fumigation certificate", issuer: "Licensed operator", when: "If the importer requires it" },
  ],
  docsFootLabel: "On the Russian side.",
  docsFootText:
    "The EAEU declaration of conformity under TR CU 021/2011 is filed by the importer. We supply the moisture, defect and pesticide-residue reports it is based on, plus the ICO marks needed for the customs declaration.",
  cta: "Ask for a shipping quote",
};

const ru: Copy = {
  metaTitle: "Объёмы, доставка и экспортные документы",
  metaDescription:
    "Объёмы поставки от пробной партии до контейнера, маршрут доставки в Россию и пакет экспортных документов.",

  eyebrow: "Объёмы · Доставка в Россию",
  h1: "От пробной партии до контейнера",
  heroLede: `Начните с ${num(30, "ru")} кг, чтобы обжарить и посчитать экономику. Дальше — тем же лотом, той же мойкой и теми же документами, в любом объёме.`,
  facts: [
    [`${num(30, "ru")} кг`, "минимальная пробная партия"],
    [`${num(19.2, "ru", 1)} т`, `полный 20' контейнер · ${num(320, "ru")} мешков`],
    [`${range(25, 32, "ru")} дней`, "Момбаса — Новороссийск морем"],
    [`${range(7, 10, "ru")} дней`, "образцы авиадоставкой в Москву"],
  ],

  volEyebrow: "Доступные объёмы",
  volTitle: "Четыре формата одной и той же поставки",
  volLede:
    "Любой объём собирается из тех же лотов и сопровождается тем же пакетом по качеству. Меняются только фрахт и то, насколько заранее мы резервируем под вас кофе.",
  tiers: [
    {
      key: "sample",
      title: "Пробная партия",
      text: "Мешок GrainPro для обжарки и каппинга у вас на производстве.",
    },
    {
      key: "small",
      title: "Малая партия",
      text: "Первая закупка под сезонное меню или лимитированную линейку.",
    },
    {
      key: "regular",
      title: "Регулярная поставка",
      text: "Постоянный лот под бленд с повторяемым профилем.",
    },
    {
      key: "container",
      title: "Контейнерная поставка",
      text: `Сборный или полный 20-футовый контейнер, до ${num(19.2, "ru", 1)} т по одному коносаменту.`,
    },
  ],
  bagWord: "меш.",
  packingNote: `Стандартная упаковка — джутовый мешок ${num(bagKg, "ru")} кг с вкладышем GrainPro. Возможна фасовка ${num(30, "ru")} и ${num(15, "ru")} кг под ваш склад. Образцы отправляем в вакуумной упаковке курьерской службой за наш счёт.`,
  specTitle: "Спецификация отгрузки",
  specMeta: "20' DC",
  specRows: [
    ["Мешок", `джут ${num(bagKg, "ru")} кг · вкладыш GrainPro`],
    ["Другая фасовка", `${num(30, "ru")} / ${num(15, "ru")} кг по запросу`],
    ["Контейнер", `${num(320, "ru")} мешков · ${num(19.2, "ru", 1)} т`],
    ["Паллетирование", `${num(10, "ru")} паллет × ${num(32, "ru")} мешка`],
    ["Влажность при отгрузке", `${num(10, "ru")}–${num(11.5, "ru", 1)} %`],
    ["Маркировка", "ICO-марка · номер лота · грейд · вес нетто"],
    ["Минимальный заказ", `${num(30, "ru")} кг проба · ${num(300, "ru")} кг коммерческий`],
  ],

  termsEyebrow: "Инкотермс 2020",
  termsTitle: "Что входит в каждый базис поставки",
  termsLede:
    "Котируем на любом базисе, на котором вам удобно заключать контракт. Отличается не кофе, а то, какая часть цепочки остаётся на нашей стороне и где переходит риск.",
  termsHeads: ["Базис", "Что включено в цену", "Переход риска"],
  termsCaption: "Базисы поставки, на которых мы котируем · Инкотермс 2020",
  terms: [
    {
      code: "FOB Момбаса",
      includes:
        "Подготовка лота, обмолот, мешки и вкладыши, экспортное оформление и документы, доставка в Момбасу и погрузка на борт.",
      risk: "на борту в Момбасе",
    },
    {
      code: "CFR Новороссийск",
      includes: "Всё по FOB плюс морской фрахт и терминальные сборы до порта назначения.",
      risk: "на борту в Момбасе",
    },
    {
      code: "CIF Санкт-Петербург",
      includes: `Всё по CFR плюс страхование груза на ${num(110, "ru")} % стоимости инвойса, оговорки Institute Cargo Clauses (A).`,
      risk: "на борту в Момбасе",
    },
    {
      code: "DAP склад",
      includes:
        "Всё по CIF плюс доставка авто или ж-д до вашего склада. Пошлина, НДС и таможенное оформление — на стороне покупателя.",
      risk: "по прибытии на ваш склад",
    },
  ],
  termsFootLabel: "Оплата и срок действия цены.",
  termsFootText: `Цены указываются в долларах США за фунт на базисе FOB Момбаса и действительны ${num(5, "ru")} рабочих дней; фрахт и страхование показываем отдельными строками, чтобы было видно, из чего складывается CIF. Стандартная схема — ${num(30, "ru")} % при подтверждении лота и ${num(70, "ru")} % против скан-копий документов, от контейнера — безотзывный аккредитив по предъявлении.`,

  routeEyebrow: "Плечи доставки",
  routeTitle: "От Найроби до вашего склада",
  routeLede:
    "Кофе выезжает с нашего склада в Найроби, загружается в контейнер в порту Момбасы и идёт еженедельным сервисом на Новороссийск или Санкт-Петербург, как правило с одной перевалкой.",
  routeNodes: [
    { label: "Найроби", meta: "склад экспортёра" },
    { label: "Момбаса", meta: "порт отгрузки" },
    { label: "Новороссийск", meta: "порт назначения" },
    { label: "Санкт-Петербург", meta: "порт назначения" },
    { label: "Россия", meta: "авто / ж-д" },
  ],
  legFast: `МОРЕМ · ${range(25, 32, "ru")} ДНЯ`,
  legSlow: `МОРЕМ · ${range(35, 45, "ru")} ДНЕЙ`,
  routeAria:
    "Схема маршрута: Найроби — Момбаса, далее морем в Новороссийск или Санкт-Петербург и внутренним транспортом до склада в России.",
  photoAlt: "Контейнеровоз выходит из порта Момбасы, Кения",
  photoCaption: "Порт Момбасы · после таможенной очистки контейнер уходит ближайшим еженедельным сервисом",
  legsTitle: "По плечам",
  legs: [
    `Найроби → Момбаса: ${num(480, "ru")} км автотранспортом, ${range(1, 2, "ru")} дня, загрузка и пломбировка на терминале порта.`,
    `Момбаса → Новороссийск: ${range(25, 32, "ru")} дня морем, обычно с перевалкой в Джебель-Али или Салале.`,
    `Момбаса → Санкт-Петербург: ${range(35, 45, "ru")} дней морем через европейский или ближневосточный хаб.`,
    `Порт назначения → склад: ${range(3, 10, "ru")} дней авто или ж-д, в зависимости от города.`,
    `Пробы до ${num(30, "ru")} кг летят отдельно: ${range(7, 10, "ru")} дней «от двери до двери».`,
  ],
  transitNote:
    "Сроки указаны ориентировочно и уточняются под конкретную линию и дату букинга.",

  docsEyebrow: "Документы",
  docsTitle: "Пакет экспортных документов",
  docsLede:
    "Каждая отгрузка идёт с одним и тем же комплектом. Сканы уходят вам и вашему брокеру в день выхода судна, оригиналы — курьерской службой, чтобы оформление в порту назначения не ждало бумаг.",
  docsHeads: ["Документ", "Кто выдаёт", "Когда предоставляется"],
  docsCaption: "Стандартный комплект документов на отгрузку",
  docs: [
    {
      doc: "Коммерческий инвойс и упаковочный лист",
      issuer: "Simon & Sons Coffee Ltd.",
      when: "в день выхода судна",
    },
    { doc: "Коносамент", issuer: "линия или экспедитор", when: `${range(3, 5, "ru")} дней после выхода судна` },
    { doc: "Сертификат происхождения", issuer: "Торгово-промышленная палата Кении", when: "до погрузки" },
    { doc: "Фитосанитарный сертификат", issuer: "KEPHIS", when: "по итогам инспекции партии" },
    { doc: "Сертификат ICO и экспортное разрешение", issuer: "Coffee Directorate (AFA)", when: "при оформлении в Момбасе" },
    { doc: "Каппинг-лист и отчёт по качеству лота", issuer: "наша лаборатория / независимый Q-грейдер", when: "вместе с предотгрузочным образцом" },
    { doc: "Сертификат веса и качества", issuer: "SGS или Intertek, по запросу", when: "при загрузке контейнера" },
    { doc: "Сертификат фумигации", issuer: "лицензированный оператор", when: "если требует импортёр" },
  ],
  docsFootLabel: "На стороне импортёра.",
  docsFootText:
    "Декларация о соответствии ТР ТС 021/2011 оформляется импортёром. Мы предоставляем протоколы по влажности, дефектам и остаточным пестицидам, на которых она строится, а также ICO-маркировку для таможенной декларации.",
  cta: "Запросить расчёт доставки",
};

export const logistics: Record<Locale, Copy> = { en, ru };
