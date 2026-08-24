// Quality-control page copy: the QC plan, the cupping protocol, green grading
// and the sample-approval gate before a container is booked.
// Every figure is formatted here with num()/range() so 10,5 / 10.5 and
// 0,55 / 0.55 never ship as literal strings.
import { cupTotal, lotPassport } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

/** One row of the QC checkpoint table. */
type Check = { stage: string; measure: string; threshold: string; method: string };

/** One row of the green-grading defect table. */
type Defect = { name: string; category: 1 | 2; beans: string };

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  heroLead: string;

  checksEyebrow: string;
  checksTitle: string;
  checksIntro: string;
  /** Four column headings: checkpoint, what is measured, threshold, method. */
  checksHeads: [string, string, string, string];
  checksCaption: string;
  checks: Check[];
  checksNoteLabel: string;
  checksNote: string;

  cupEyebrow: string;
  cupTitle: string;
  cupLede: string;
  cupBody: string[];
  /** Header of the protocol spec card: title + crop year. */
  protocolTitle: string;
  protocolSeason: string;
  /** Label / value rows of the protocol spec card. */
  protocol: [string, string][];
  /** Figure / caption pairs for the band strip. */
  facts: [string, string][];
  cupCta: string;

  physEyebrow: string;
  physTitle: string;
  physLede: string;
  physBody: string[];
  photoAlt: string;
  photoCaption: string;

  defectsEyebrow: string;
  defectsTitle: string;
  defectsLede: string;
  /** Three column headings: defect, category, beans per full defect. */
  defectsHeads: [string, string, string];
  defectsCaption: string;
  defects: Defect[];
  defectsNoteLabel: string;
  defectsNote: string;

  sampleEyebrow: string;
  sampleTitle: string;
  sampleLede: string;
  /** The approval sequence, rendered as the icon list on the band. */
  sampleSteps: string[];
  sampleNote: string;
  sampleCta: string;

  failEyebrow: string;
  failTitle: string;
  failLede: string;
  failBody: string[];
  failPledges: { title: string; text: string }[];
};

const en: Copy = {
  metaTitle: "Quality control",
  metaDescription: `How every lot is checked before it ships: SCA cupping by two Q graders, moisture held at ${range(10, 12, "en")} %, water activity around ${num(0.55, "en", 2)}, defect counting on a ${num(300, "en")} g sample, screen and density grading, and written sample approval before the container is booked.`,

  eyebrow: "Quality control · Nairobi lab",
  h1: "Quality control, lot by lot",
  heroLead:
    "Every lot we offer is green-graded on a black tray, cupped blind by two Q graders and measured for moisture and water activity — once when it is offered, and again from the bagged lot before it is loaded. If it no longer matches the sample you approved, it does not travel.",

  checksEyebrow: "Control points",
  checksTitle: "Eight checks between the drying bed and the container",
  checksIntro:
    "Quality control on a green coffee lot is not one cupping session at the end. It is a short list of measurements taken at points where the coffee can still be corrected, each one recorded against the lot number that later appears on your invoice.",
  checksHeads: ["Checkpoint", "What is measured", "Threshold", "Method"],
  checksCaption: "QC plan · every lot, every shipment · 2025/26 crop",
  checks: [
    {
      stage: "Cherry intake",
      measure: "Ripeness, floaters, foreign matter",
      threshold: `≥ ${num(95, "en")} % ripe`,
      method:
        "Visual sort at the hopper and flotation in the receiving tank at the wet mill, on the day of picking. Unripes and floaters are separated into a lower lot, not blended back in.",
    },
    {
      stage: "Drying beds",
      measure: "Moisture in parchment",
      threshold: `${range(10, 12, "en")} %`,
      method: `Handheld Wile/Sinar meter, three points per bed, twice a day across the ${range(7, 15, "en")} days on raised tables. Beds are covered at midday and overnight.`,
    },
    {
      stage: "Conditioning",
      measure: "Moisture and water activity after resting",
      threshold: `${range(10.5, 11.5, "en", 1)} % · aw ≤ ${num(0.6, "en", 2)}`,
      method: `Water activity meter at ${num(25, "en")} °C after ${num(30, "en")}+ days in conditioning bins. A lot that reads above ${num(0.6, "en", 2)} goes back to the store, not to the huller.`,
    },
    {
      stage: "Hulling and screening",
      measure: "Screen retention after the huller",
      threshold: "AA 17/18 · AB 15/16 · PB",
      method: `Kenyan round-hole screens, ${num(300, "en")} g sample shaken for ${num(60, "en")} seconds. Retention below ${num(90, "en")} % on the nominal screen sends the lot back over the sizer.`,
    },
    {
      stage: "Density grading",
      measure: "Bulk density after the gravity table",
      threshold: `${range(700, 750, "en")} g/l`,
      method:
        "Gravimetric cylinder on a drawn sample. Light beans, shells and broken fragments come off the table as TT and are sold as TT — never returned to the AA or AB line.",
    },
    {
      stage: "Green grading",
      measure: "Full defects and colour uniformity",
      threshold: `≤ ${num(5, "en")} / ${num(300, "en")} g`,
      method: `SCA green grading protocol: ${num(300, "en")} g at export moisture, hand-counted on a black tray under daylight-balanced light, category 1 and category 2 defects logged separately.`,
    },
    {
      stage: "Cupping",
      measure: "SCA total score and cup faults",
      threshold: `≥ ${num(84, "en", 2)}`,
      method: `Five cups per lot, ${num(8.25, "en", 2)} g per ${num(150, "en")} ml, blind, scored independently by two Q graders. One fermented or phenolic cup in five fails the lot outright.`,
    },
    {
      stage: "Pre-shipment sample",
      measure: "Match to the sample you approved",
      threshold: "Written approval",
      method: `A ${num(300, "en")} g sample drawn from the bagged lot is cupped against the sealed control sample and sent to you. No booking, no bill of lading until the approval email is in.`,
    },
  ],
  checksNoteLabel: "In practice:",
  checksNote:
    "a failed check sends the lot backwards, not forwards. Wet parchment goes back to the beds, a high defect count goes back through the sorting line, and a lot that will not cup to the profile it was offered at is re-offered at the grade it actually is — to somebody else.",

  cupEyebrow: "Cupping",
  cupTitle: "How a lot is scored",
  cupLede: `We score on the SCA cupping form: seven attributes rated from ${num(6, "en", 2)} to ${num(10, "en", 2)}, plus sweetness, uniformity and clean cup at ${num(10, "en", 2)} each, less any defect deductions.`,
  cupBody: [
    `Sampling comes first, and it is where most of the honesty lives. Samples are drawn with a bag trier across at least ${num(20, "en")} % of the bags in a lot, combined, quartered down and reduced to a ${num(1, "en")} kg working sample. A lot sampled from three convenient bags at the front of the stack is not a lot that has been sampled.`,
    `Samples are roasted on a ${num(100, "en")} g sample roaster to Agtron ${range(58, 63, "en")} whole bean, between ${num(8, "en")} and ${num(12, "en")} minutes, rested ${range(8, 24, "en")} hours and ground immediately before the session. Dose is ${num(8.25, "en", 2)} g per ${num(150, "en")} ml at ${num(93, "en")} °C, five cups per lot, evaluated at crust break and then repeatedly as the liquor cools to room temperature — most Kenyan defects only show themselves below ${num(40, "en")} °C.`,
    `Two Q graders score blind with the lot code masked. Where the two totals sit within ${num(2, "en")} points the scores are averaged; anything wider is re-cupped the next morning on a fresh roast before a number leaves the lab. The signed cupping sheet — attribute scores, descriptors, moisture, water activity and defect count — travels with the offer and again with the shipment.`,
    `The score is a release decision, not decoration. AA lots are released at ${num(84, "en", 2)} and above, anything under ${num(80, "en", 2)} leaves the specialty programme entirely, and the average across our AA lots this crop sits at ${num(cupTotal, "en", 2)}.`,
  ],
  protocolTitle: "Cupping protocol",
  protocolSeason: "2025/26 crop",
  protocol: [
    ["Sample roast", `Agtron ${range(58, 63, "en")}`],
    ["Rest before cupping", `${range(8, 24, "en")} h`],
    ["Dose", `${num(8.25, "en", 2)} g / ${num(150, "en")} ml`],
    ["Water", `${num(93, "en")} °C · ${range(125, 175, "en")} ppm`],
    ["Cups per lot", num(5, "en")],
    ["Panel", `${num(2, "en")} Q graders, blind`],
    ["Form", `SCA · ${num(100, "en")} points`],
    ["Release floor", `${num(84, "en", 2)} for AA`],
  ],
  facts: [
    [`${range(10, 12, "en")} %`, "Moisture at export"],
    [num(0.55, "en", 2), "Water activity, target"],
    [`≤ ${num(5, "en")}`, `Full defects per ${num(300, "en")} g`],
    [num(cupTotal, "en", 2), "Average SCA score, AA lots"],
  ],
  cupCta: "See the cup profile",

  physEyebrow: "Moisture · density · size",
  physTitle: "The measurements that decide how the lot travels",
  physLede:
    "Cup score sells a lot. Moisture, water activity and density are what keep that score intact through six weeks at sea and however long the coffee then sits in your warehouse.",
  physBody: [
    `Moisture is held between ${range(10, 12, "en")} %. Below ${num(10, "en")} % the coffee has been dried too fast and the cup goes flat and papery within weeks; above ${num(12, "en")} % you are shipping water and inviting mould in a warm container. Readings are taken on parchment during drying, on green after hulling, and once more from the bagged lot at export.`,
    `Water activity is the more useful number of the two, because it measures free water rather than total water. We target ${num(0.55, "en", 2)} and treat ${num(0.6, "en", 2)} as a hard ceiling — the point at which mould growth becomes possible and shelf life starts to shorten measurably. Two lots can both read ${num(11, "en")} % moisture and behave completely differently at ${num(0.5, "en", 2)} and ${num(0.62, "en", 2)} aw. The reference lot in our passport, ${lotPassport.id}, shipped at ${num(lotPassport.moisture, "en", 1)} % and ${num(lotPassport.waterActivity, "en", 2)} aw.`,
    `Screen sorting and density grading come after hulling and before cupping. Size is graded on round-hole screens — AA on 17/18, AB on 15/16, peaberry off the shape sorter — and density on a gravity table, which is what actually separates a hard, high-grown bean from a light one of the same screen. Density is why an AA specification reads ${range(700, 750, "en")} g/l and not simply “large”.`,
  ],
  photoAlt: "Washed parchment coffee resting in the conditioning store before hulling",
  photoCaption:
    "Parchment in conditioning — moisture and water activity are read here, before the lot is hulled, screened and graded.",

  defectsEyebrow: "Green grading",
  defectsTitle: "Primary and secondary defects",
  defectsLede: `Defects are counted, not estimated. A ${num(300, "en")} g sample at export moisture is spread on a black tray and every defective bean is removed and classified. Category 1 defects are the ones that ruin a cup on their own; category 2 defects are tolerated in small numbers. Both are converted to “full defect” equivalents, which is the number that actually goes in the contract.`,
  defectsHeads: ["Defect", "Category", "Beans per full defect"],
  defectsCaption: `SCA green grading · ${num(300, "en")} g sample at ${range(10, 12, "en")} % moisture`,
  defects: [
    { name: "Full black", category: 1, beans: num(1, "en") },
    { name: "Full sour", category: 1, beans: num(1, "en") },
    { name: "Dried cherry / pod", category: 1, beans: num(1, "en") },
    { name: "Fungus damaged", category: 1, beans: num(1, "en") },
    { name: "Foreign matter (stone, stick)", category: 1, beans: num(1, "en") },
    { name: "Severe insect damage", category: 1, beans: num(5, "en") },
    { name: "Partial black", category: 2, beans: num(3, "en") },
    { name: "Partial sour", category: 2, beans: num(3, "en") },
    { name: "Parchment (unhulled)", category: 2, beans: num(5, "en") },
    { name: "Floater", category: 2, beans: num(5, "en") },
    { name: "Immature / quaker", category: 2, beans: num(5, "en") },
    { name: "Shell", category: 2, beans: num(5, "en") },
    { name: "Broken / chipped / cut", category: 2, beans: num(5, "en") },
    { name: "Slight insect damage", category: 2, beans: num(10, "en") },
  ],
  defectsNoteLabel: "Our release limit:",
  defectsNote: `a maximum of ${num(5, "en")} full defects per ${num(300, "en")} g and zero category 1 defects for any lot offered as specialty, against the ${num(15, "en")} full defects the exchange standard would still let us call Grade 1. A single fermented, phenolic or mouldy cup on the table fails the lot no matter what the defect count says.`,

  sampleEyebrow: "Approval",
  sampleTitle: "You approve the sample before we book the container",
  sampleLede:
    "No lot is shipped on a description. Two samples cross your bench before anything is loaded, and both are cupped by you, on your roast profile, on your water.",
  sampleSteps: [
    `Type sample — ${num(300, "en")} g of the offered lot leaves Nairobi within ${num(48, "en")} hours of the offer, with the cupping sheet, moisture, water activity and defect count for that specific lot number.`,
    "Your approval in writing. You cup it, you decide, and nothing is booked before that email. Counter-samples are free and we would rather send three than argue about one.",
    "Pre-shipment sample (PSS) — drawn from the bulked, bagged lot, sealed and sent for the second approval. This is the sample the shipment is contractually matched against, not the type sample.",
    `A sealed control sample of every shipped lot stays in our Nairobi store for ${num(12, "en")} months, so any question about a shipment can be cupped against the same coffee rather than argued from memory.`,
  ],
  sampleNote: `First sample of a season is at our cost. Air courier to Moscow or St Petersburg runs ${range(7, 10, "en")} days; sample lots up to ${num(30, "en")} kg move the same way when you need enough to run a real production roast.`,
  sampleCta: "Request a sample",

  failEyebrow: "Non-conformance",
  failTitle: "What happens when a lot misses its profile",
  failLede:
    "Occasionally a lot moves between the type sample and the pre-shipment sample — a slow patch of drying weather, a wet mill that changed fermentation time, a bulking that pulled in one bad day of cherry.",
  failBody: [
    "When that happens we tell you before you find out from the container. The pre-shipment sample is re-cupped by both graders, checked against the retained control sample, and the deviation is written down as a number: attribute by attribute, moisture, water activity and defect count.",
    "What we do not do is ship it and negotiate afterwards. A discount on a coffee that will not perform in your roastery costs you more than the shipment is worth, and it costs us the account.",
  ],
  failPledges: [
    {
      title: "It is not shipped",
      text: "A lot that no longer matches the sample you approved does not leave the warehouse under that contract. We select lots on cup results, not on what is left in the store.",
    },
    {
      title: "You get a replacement, not an argument",
      text: "The remaining lots from the same wet mill are re-cupped that week and a replacement is offered at the contracted grade and price. If nothing matches, we say so and release you from the volume instead of substituting quietly.",
    },
    {
      title: "Retained samples settle claims",
      text: "Every claim is cupped against the sealed control sample from the same lot — by us, and by a third-party lab in Nairobi or at destination if you want one. Whoever turns out to be wrong pays for the cupping.",
    },
  ],
};

const ru: Copy = {
  metaTitle: "Контроль качества",
  metaDescription: `Как проверяется каждый лот перед отгрузкой: каппинг по протоколу SCA двумя Q-грейдерами, влажность ${range(10, 12, "ru")} %, водная активность около ${num(0.55, "ru", 2)}, подсчёт дефектов на ${num(300, "ru")} г, калибровка по скрину и плотности и письменное одобрение образца до букинга.`,

  eyebrow: "Контроль качества · лаборатория в Найроби",
  h1: "Контроль качества: лот за лотом",
  heroLead:
    "Каждый лот проходит зелёную грейдацию на чёрном подносе, слепой каппинг двух Q-грейдеров и замер влажности и водной активности — при постановке в оферту и повторно уже из затаренного лота перед погрузкой. Не совпал профиль — не отгружаем.",

  checksEyebrow: "Контрольные точки",
  checksTitle: "Восемь проверок от сушильной грядки до контейнера",
  checksIntro:
    "Контроль качества зелёного кофе — это не один каппинг в конце. Это короткий список замеров в тех точках, где партию ещё можно поправить, и каждый замер записывается под номером лота, который потом стоит в вашем инвойсе.",
  checksHeads: ["Точка контроля", "Что измеряется", "Норма", "Метод"],
  checksCaption: "План контроля · каждый лот, каждая отгрузка · сезон 2025/26",
  checks: [
    {
      stage: "Приёмка вишни",
      measure: "Спелость, всплывающая вишня, посторонние примеси",
      threshold: `≥ ${num(95, "ru")} % спелой`,
      method:
        "Визуальная сортировка на приёмке и флотация в бассейне мойки в день сбора. Недозрелая вишня и флоаты уходят в отдельный лот и обратно не подмешиваются.",
    },
    {
      stage: "Сушильные грядки",
      measure: "Влажность в пергаменте",
      threshold: `${range(10, 12, "ru")} %`,
      method: `Портативный влагомер Wile/Sinar, три точки на грядке, дважды в день на протяжении ${range(7, 15, "ru")} дней сушки на приподнятых столах. В полуденные часы и на ночь грядки укрываются.`,
    },
    {
      stage: "Отлёжка",
      measure: "Влажность и водная активность после отлёжки",
      threshold: `${range(10.5, 11.5, "ru", 1)} % · aw ≤ ${num(0.6, "ru", 2)}`,
      method: `Измеритель водной активности при ${num(25, "ru")} °C после ${num(30, "ru")}+ дней в бункерах отлёжки. Лот выше ${num(0.6, "ru", 2)} возвращается на склад, а не идёт на обмолот.`,
    },
    {
      stage: "Обмолот и калибровка",
      measure: "Остаток на скрине после обмолота",
      threshold: "AA 17/18 · AB 15/16 · PB",
      method: `Кенийские сита с круглым отверстием, проба ${num(300, "ru")} г, встряхивание ${num(60, "ru")} секунд. Остаток ниже ${num(90, "ru")} % на номинальном скрине — лот идёт на пересев.`,
    },
    {
      stage: "Разделение по плотности",
      measure: "Насыпная плотность после гравитационного стола",
      threshold: `${range(700, 750, "ru")} г/л`,
      method:
        "Мерный цилиндр по отобранной пробе. Лёгкое зерно, ракушка и бой сходят со стола как TT и продаются как TT — в линию AA и AB не возвращаются.",
    },
    {
      stage: "Зелёная грейдация",
      measure: "Полные дефекты и однородность цвета",
      threshold: `≤ ${num(5, "ru")} / ${num(300, "ru")} г`,
      method: `Протокол SCA: ${num(300, "ru")} г при экспортной влажности, ручной подсчёт на чёрном подносе при дневном свете, дефекты первой и второй категории считаются отдельно.`,
    },
    {
      stage: "Каппинг",
      measure: "Балл SCA и дефекты чашки",
      threshold: `≥ ${num(84, "ru", 2)}`,
      method: `Пять чашек на лот, ${num(8.25, "ru", 2)} г на ${num(150, "ru")} мл, вслепую, два Q-грейдера оценивают независимо. Одна ферментированная или фенольная чашка из пяти — лот снимается.`,
    },
    {
      stage: "Предотгрузочный образец",
      measure: "Совпадение с одобренным вами образцом",
      threshold: "Письменное одобрение",
      method: `Проба ${num(300, "ru")} г из затаренного лота каппится против запечатанного контрольного образца и уходит вам. Без вашего письма нет ни букинга, ни коносамента.`,
    },
  ],
  checksNoteLabel: "На практике:",
  checksNote:
    "непройденная проверка возвращает лот назад, а не двигает вперёд. Сырой пергамент уходит обратно на грядки, высокий счёт дефектов — обратно на сортировочную линию, а лот, который не каппится под заявленный профиль, переоформляется под тот грейд, которому реально соответствует, и предлагается другому покупателю.",

  cupEyebrow: "Каппинг",
  cupTitle: "Как оценивается лот",
  cupLede: `Оценка идёт по форме SCA: семь атрибутов по шкале от ${num(6, "ru", 2)} до ${num(10, "ru", 2)} плюс сладость, однородность и чистота — по ${num(10, "ru", 2)}, за вычетом штрафов за дефекты.`,
  cupBody: [
    `Начинается всё с отбора пробы, и именно здесь заканчивается или начинается честность. Проба отбирается щупом не менее чем из ${num(20, "ru")} % мешков лота, объединяется, квартуется и сводится к рабочей пробе ${num(1, "ru")} кг. Лот, опробованный из трёх удобных мешков с краю штабеля, не считается опробованным.`,
    `Пробы обжариваются на образцовом ростере ${num(100, "ru")} г до Agtron ${range(58, 63, "ru")} по целому зерну, за ${range(8, 12, "ru")} минут, отлёживаются ${range(8, 24, "ru")} часов и мелются непосредственно перед сессией. Дозировка — ${num(8.25, "ru", 2)} г на ${num(150, "ru")} мл при ${num(93, "ru")} °C, пять чашек на лот, оценка на разломе корки и далее по мере остывания: большая часть кенийских дефектов проявляется ниже ${num(40, "ru")} °C.`,
    `Два Q-грейдера оценивают вслепую, номер лота закрыт. Если итоги расходятся не более чем на ${num(2, "ru")} балла — берётся среднее; расхождение больше — лот перекаппивается наутро на свежей обжарке, и до этого ни одна цифра из лаборатории не выходит. Подписанный каппинг-лист с оценками, дескрипторами, влажностью, водной активностью и счётом дефектов идёт с офертой и повторно с отгрузкой.`,
    `Балл — это решение о выпуске лота, а не украшение. Лоты AA выпускаются от ${num(84, "ru", 2)}, всё ниже ${num(80, "ru", 2)} выходит из specialty-программы, а средний балл по нашим лотам AA этого сезона — ${num(cupTotal, "ru", 2)}.`,
  ],
  protocolTitle: "Протокол каппинга",
  protocolSeason: "сезон 2025/26",
  protocol: [
    ["Обжарка пробы", `Agtron ${range(58, 63, "ru")}`],
    ["Отлёжка до каппинга", `${range(8, 24, "ru")} ч`],
    ["Дозировка", `${num(8.25, "ru", 2)} г / ${num(150, "ru")} мл`],
    ["Вода", `${num(93, "ru")} °C · ${range(125, 175, "ru")} ppm`],
    ["Чашек на лот", num(5, "ru")],
    ["Панель", `${num(2, "ru")} Q-грейдера, вслепую`],
    ["Форма", `SCA · ${num(100, "ru")} баллов`],
    ["Порог выпуска", `${num(84, "ru", 2)} для AA`],
  ],
  facts: [
    [`${range(10, 12, "ru")} %`, "Влажность при отгрузке"],
    [num(0.55, "ru", 2), "Водная активность, цель"],
    [`≤ ${num(5, "ru")}`, `Полных дефектов на ${num(300, "ru")} г`],
    [num(cupTotal, "ru", 2), "Средний балл SCA по лотам AA"],
  ],
  cupCta: "Смотреть профиль чашки",

  physEyebrow: "Влажность · плотность · размер",
  physTitle: "Замеры, от которых зависит, как лот доедет",
  physLede:
    "Балл каппинга продаёт лот. Влажность, водная активность и плотность — то, что сохраняет этот балл за полтора месяца в море и за всё время, пока кофе лежит у вас на складе.",
  physBody: [
    `Влажность держим в диапазоне ${range(10, 12, "ru")} %. Ниже ${num(10, "ru")} % — кофе пересушен, и чашка за считанные недели становится плоской и «бумажной»; выше ${num(12, "ru")} % вы платите за воду и получаете риск плесени в тёплом контейнере. Замеры делаются по пергаменту во время сушки, по зелёному зерну после обмолота и ещё раз из затаренного лота перед отгрузкой.`,
    `Водная активность — более полезная величина, потому что показывает свободную воду, а не общую. Целевое значение — ${num(0.55, "ru", 2)}, жёсткий потолок — ${num(0.6, "ru", 2)}: с этой точки становится возможен рост плесени и заметно сокращается срок хранения. Два лота могут показывать одинаковые ${num(11, "ru")} % влажности и вести себя совершенно по-разному при aw ${num(0.5, "ru", 2)} и ${num(0.62, "ru", 2)}. Референсный лот из нашего паспорта, ${lotPassport.id}, отгружен с ${num(lotPassport.moisture, "ru", 1)} % и aw ${num(lotPassport.waterActivity, "ru", 2)}.`,
    `Калибровка по скрину и плотности идёт после обмолота и до каппинга. Обмолот пергамента, калибровка по скрину и плотности, разделение на AA, AB, PB: размер — на ситах с круглым отверстием, форма пиберри — на сортировщике по форме, плотность — на гравитационном столе, который и отделяет твёрдое высокогорное зерно от лёгкого того же размера. Поэтому наш AA — это ${range(700, 750, "ru")} г/л, а не просто «крупное зерно».`,
  ],
  photoAlt: "Мытый пергаментный кофе на отлёжке перед обмолотом",
  photoCaption:
    "Пергамент на отлёжке — здесь снимаются влажность и водная активность, прежде чем лот пойдёт на обмолот и калибровку.",

  defectsEyebrow: "Зелёная грейдация",
  defectsTitle: "Дефекты первой и второй категории",
  defectsLede: `Дефекты считают, а не оценивают на глаз. Проба ${num(300, "ru")} г при экспортной влажности рассыпается на чёрном подносе, каждое дефектное зерно выбирается и классифицируется. Дефекты первой категории портят чашку сами по себе; дефекты второй допускаются в небольшом количестве. И те и другие пересчитываются в «полные дефекты» — именно это число попадает в контракт.`,
  defectsHeads: ["Дефект", "Категория", "Зёрен на один полный дефект"],
  defectsCaption: `Зелёная грейдация SCA · проба ${num(300, "ru")} г при влажности ${range(10, 12, "ru")} %`,
  defects: [
    { name: "Полностью чёрное зерно", category: 1, beans: num(1, "ru") },
    { name: "Полностью кислое зерно", category: 1, beans: num(1, "ru") },
    { name: "Сушёная вишня / оболочка", category: 1, beans: num(1, "ru") },
    { name: "Поражение плесенью", category: 1, beans: num(1, "ru") },
    { name: "Посторонние примеси (камень, ветка)", category: 1, beans: num(1, "ru") },
    { name: "Сильное повреждение насекомыми", category: 1, beans: num(5, "ru") },
    { name: "Частично чёрное зерно", category: 2, beans: num(3, "ru") },
    { name: "Частично кислое зерно", category: 2, beans: num(3, "ru") },
    { name: "Необмолоченный пергамент", category: 2, beans: num(5, "ru") },
    { name: "Флоат", category: 2, beans: num(5, "ru") },
    { name: "Незрелое зерно / квакер", category: 2, beans: num(5, "ru") },
    { name: "Ракушка", category: 2, beans: num(5, "ru") },
    { name: "Бой / скол / срез", category: 2, beans: num(5, "ru") },
    { name: "Лёгкое повреждение насекомыми", category: 2, beans: num(10, "ru") },
  ],
  defectsNoteLabel: "Наш порог выпуска:",
  defectsNote: `не более ${num(5, "ru")} полных дефектов на ${num(300, "ru")} г и ноль дефектов первой категории для любого лота, который идёт как specialty, — против ${num(15, "ru")} полных дефектов, при которых биржевой стандарт всё ещё разрешает называть партию Grade 1. Одна ферментированная, фенольная или заплесневелая чашка на столе снимает лот независимо от счёта дефектов.`,

  sampleEyebrow: "Одобрение образца",
  sampleTitle: "Вы одобряете образец до того, как мы забукируем контейнер",
  sampleLede:
    "Ни один лот не отгружается «по описанию». До погрузки через ваш стол проходят два образца, и оба вы каппите сами — на своей обжарке и своей воде.",
  sampleSteps: [
    `Типовой образец — ${num(300, "ru")} г предложенного лота уходит из Найроби в течение ${num(48, "ru")} часов после оферты, вместе с каппинг-листом, влажностью, водной активностью и счётом дефектов по этому номеру лота.`,
    "Ваше одобрение письмом. Вы каппите, вы решаете — до этого письма ничего не букируется. Контрпробы бесплатны: мы лучше отправим три образца, чем будем спорить об одном.",
    "Предотгрузочный образец (PSS) — отбирается из затаренного лота, запечатывается и уходит на второе одобрение. Именно с ним контрактно сверяется отгрузка, а не с типовым образцом.",
    `Запечатанный контрольный образец каждого отгруженного лота хранится у нас в Найроби ${num(12, "ru")} месяцев, чтобы любой вопрос по партии можно было отработать каппингом того же кофе, а не по памяти.`,
  ],
  sampleNote: `Первый образец сезона — за наш счёт. Для проб доступна авиадоставка 7–10 дней в Москву или Санкт-Петербург; пробные партии до ${num(30, "ru")} кг идут тем же каналом, когда нужен объём под полноценную производственную обжарку.`,
  sampleCta: "Запросить образец",

  failEyebrow: "Несоответствие",
  failTitle: "Что происходит, если лот не совпал с профилем",
  failLede:
    "Иногда лот уходит в сторону между типовым и предотгрузочным образцом: затяжная сырая погода на сушке, мойка изменила время ферментации, при бултовке в партию попал один неудачный день сбора.",
  failBody: [
    "В этом случае вы узнаёте об этом от нас, а не из контейнера. Предотгрузочный образец перекаппивается обоими грейдерами, сверяется с контрольным образцом, а отклонение фиксируется цифрами: по каждому атрибуту, плюс влажность, водная активность и счёт дефектов.",
    "Чего мы не делаем — так это не отгружаем «как есть» с расчётом договориться потом. Скидка на кофе, который не отработает у вас на производстве, обходится вам дороже самой партии, а нам стоит клиента.",
  ],
  failPledges: [
    {
      title: "Такой лот не отгружается",
      text: "Отбираем лоты по результатам каппинга, а не по остаткам на складе. Не совпал профиль — не отгружаем.",
    },
    {
      title: "Вы получаете замену, а не спор",
      text: "Оставшиеся лоты с той же мойки перекаппиваются в ту же неделю, и замена предлагается в том же грейде и по контрактной цене. Если ничего не совпадает — говорим прямо и снимаем с вас объём, а не подставляем другой кофе молча.",
    },
    {
      title: "Претензии закрываются контрольным образцом",
      text: "Любая претензия каппится против запечатанного контрольного образца того же лота — нами и, если нужно, независимой лабораторией в Найроби или в порту назначения. Каппинг оплачивает та сторона, которая оказалась неправа.",
    },
  ],
};

export const quality: Record<Locale, Copy> = { en, ru };
