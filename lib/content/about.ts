import { bagKg, company } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

type Item = { title: string; text: string };

type Copy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroLead: string;
  howEyebrow: string;
  howTitle: string;
  howIntro: string;
  /** Four items, in the order WhyGrid's icons expect: cup, leaf, hands, search. */
  why: Item[];
  photoAlt: string;
  photoCaption: string;
  roleEyebrow: string;
  roleTitle: string;
  roleLede: string;
  roleBody: string[];
  pledgeEyebrow: string;
  pledgeTitle: string;
  pledges: Item[];
};

const en: Copy = {
  metaTitle: "About us",
  metaDescription:
    "Simon & Sons Coffee Ltd. buys green coffee direct from Kenyan cooperatives and small estates, cups every lot before it ships, and exports FOB Mombasa, CFR or CIF to roasters and importers.",
  eyebrow: "About us",
  h1: "Between a Kenyan wet mill and your roastery",
  heroLead: `${company.legal} works at the top of the chain: we buy the fresh crop from cooperatives and small estates, oversee processing and cupping, clear the export paperwork and follow the container through to your warehouse.`,
  howEyebrow: "How we work",
  howTitle: "Four principles behind every shipment",
  howIntro:
    "None of these is a slogan. Each one is something you can check against the sample, the cupping sheet and the documents that travel with the coffee.",
  why: [
    {
      title: "Bright, structured cups",
      text: "Blackcurrant and tomato acidity, juicy body and a long finish — the character SL28 and SL34 develop on volcanic soils at altitude.",
    },
    {
      title: "Sustainable production",
      text: "We buy through farmer cooperatives and small estates: a fair cherry price, responsible water handling at the wet mills, slow drying on raised beds.",
    },
    {
      title: "Supply you can plan around",
      text: "Volumes are committed against the harvest, not scraped together after it: confirmed tonnage per season, fixed shipping windows, feedback on every lot.",
    },
    {
      title: "Full traceability",
      text: "Each lot carries its cooperative, wet mill, county, altitude, variety and harvest date. The cupping sheet ships with the coffee.",
    },
  ],
  photoAlt: "Coffee under shade trees near Kawaida Falls, Kiambu County, Kenya",
  photoCaption: "Kiambu County · one of the six growing areas we buy from",
  roleEyebrow: "Our role",
  roleTitle: "A link in the chain, not a broker in the middle",
  roleLede:
    "We do not pick coffee up at auction after the fact. We work directly with cooperative wet mills before the harvest is in, which is why we can confirm volume, profile and shipping window in advance.",
  roleBody: [
    "Every lot is cupped in house before a container is booked. If the profile has drifted from the sample you approved, the lot does not ship. That costs us margin and saves you a claim.",
    `Our Nairobi export office handles the documents and the inland leg to the port of Mombasa — invoice, packing list, certificate of origin, phytosanitary certificate, ICO marks and the lot's cupping sheet. From there it moves FOB Mombasa, CFR or CIF, ${range(25, 32, "en")} days at sea to Novorossiysk or St Petersburg with the lines we ship on regularly.`,
    `Coffee travels in ${num(bagKg, "en")} kg jute over GrainPro, or vacuum packs for sample lots. Trial shipments start at a single bag; a full 20-foot container is booked against the same contract and the same cupping standard.`,
  ],
  pledgeEyebrow: "Our commitment",
  pledgeTitle: "Three things we answer for",
  pledges: [
    {
      title: "Quality, not leftovers",
      text: "Lots are chosen on the cupping table, not from what is still in the warehouse. If the profile does not match, it does not ship.",
    },
    {
      title: "Straight pricing",
      text: "One quote, broken out into FOB, freight and charges. Clear payment terms, no margin hidden in the logistics line.",
    },
    {
      title: "Season-to-season partnership",
      text: "We reserve tonnage against your annual plan and hold the same profile from one crop to the next.",
    },
  ],
};

const ru: Copy = {
  metaTitle: "О компании",
  metaDescription:
    "Simon & Sons Coffee — прямые поставки зелёного кофе от кооперативов Кении обжарщикам и импортёрам России.",
  eyebrow: "О компании",
  h1: "Мост между фермой в Кении и обжарочной в России",
  heroLead: `${company.legal} работает у истока цепочки поставки: закупает свежий урожай у кооперативов и небольших эстейтов, контролирует обработку и каппинг, оформляет экспорт и сопровождает груз до вашего склада.`,
  howEyebrow: "Как мы работаем",
  howTitle: "Четыре принципа, на которых строится каждая поставка",
  howIntro:
    "Это не лозунги: каждый пункт проверяется по образцу, каппинг-листу и документам, которые едут вместе с кофе.",
  why: [
    {
      title: "Яркий и насыщенный вкус",
      text: "Плотная кислотность чёрной смородины и томата, сочное тело, длительное послевкусие — характер сортов SL28 и SL34 на вулканических почвах.",
    },
    {
      title: "Устойчивое производство",
      text: "Закупка через фермерские кооперативы и небольшие эстейты: справедливая цена за вишню, ответственный водооборот на мойках, сушка на солнечных грядках.",
    },
    {
      title: "Надёжные и стабильные поставки",
      text: "Планирование от урожая, а не от случая: подтверждённые объёмы на сезон, фиксированные окна отгрузки, обратная связь по каждой партии.",
    },
    {
      title: "Полная прослеживаемость",
      text: "По каждому лоту известны кооператив, мойка, регион, высота, сорт и дата урожая. Каппинг-лист прилагается к отгрузке.",
    },
  ],
  photoAlt: "Кофейные посадки в тени деревьев близ водопада Каваида, округ Киамбу, Кения",
  photoCaption: "Округ Киамбу · один из шести регионов, где мы закупаем урожай",
  roleEyebrow: "Наша роль",
  roleTitle: "Не посредник, а звено с ответственностью",
  roleLede:
    "Мы не скупаем кофе на аукционе постфактум — мы работаем напрямую с мойками и кооперативами до сбора урожая, поэтому можем подтвердить объём, профиль и сроки заранее.",
  roleBody: [
    "Каждый лот проходит внутренний каппинг перед бронированием контейнера: если профиль не совпадает с образцом, который вы утвердили, — лот не отгружается. Это стоит нам части маржи, но экономит вам время на рекламации.",
    `Экспортный офис в Найроби ведёт документы и логистику до порта Момбаса: инвойс, упаковочный лист, сертификат происхождения, фитосанитарный сертификат, ICO-маркировка и каппинг-лист лота. Дальше — FOB Момбаса, CFR или CIF, ${range(25, 32, "ru")} дня морем до Новороссийска или Санкт-Петербурга на линиях, которыми мы отгружаем регулярно.`,
    `Кофе едет в джуте по ${num(bagKg, "ru")} кг с вкладышем GrainPro, пробные лоты — в вакууме. Тестовая отгрузка возможна от одного мешка; полный 20-футовый контейнер бронируется по тому же контракту и тому же стандарту каппинга.`,
  ],
  pledgeEyebrow: "Наше обязательство",
  pledgeTitle: "Три вещи, за которые мы отвечаем",
  pledges: [
    {
      title: "Премиальное качество",
      text: "Отбираем лоты по результатам каппинга, а не по остаткам на складе. Не совпал профиль — не отгружаем.",
    },
    {
      title: "Честные отношения",
      text: "Прозрачная цена с разбивкой по FOB, фрахту и сборам. Оплата в понятной схеме, без скрытых надбавок.",
    },
    {
      title: "Долгосрочное партнёрство",
      text: "Резервируем объём под ваш годовой план и держим профиль от сезона к сезону.",
    },
  ],
};

export const about: Record<Locale, Copy> = { en, ru };
