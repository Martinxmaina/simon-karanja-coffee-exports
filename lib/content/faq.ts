// FAQ page copy: the fourteen questions a roaster or importer actually asks
// before the first contract — volumes, samples, Incoterms, payment, transit
// times, packing, documents, certification, claims, storage and who to call.
//
// The page renders these as native <details> accordions AND as FAQPage
// JSON-LD, both read off `groups`, so the structured data can never drift
// from what a human reads on the page.
//
// Every figure is a number formatted with num()/range(), so 19,2 / 19.2 and
// 1 000 / 1,000 are a locale concern rather than a string typed twice.
import { bagKg, company, lotPassport } from "@/lib/data";
import { num, range, type Locale } from "@/lib/i18n";

/** One question and its answer, one paragraph per array entry. */
type QA = { q: string; a: string[] };

/** One themed block of questions, rendered as its own section. */
type Group = { key: string; eyebrow: string; title: string; lede: string; items: QA[] };

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  heroLead: string;

  glanceEyebrow: string;
  glanceTitle: string;
  glanceLede: string;
  /** Big figure / small caption pairs for the band strip. */
  facts: [string, string][];

  groups: Group[];

  closeEyebrow: string;
  closeTitle: string;
  closeLede: string;
  closeSecondary: string;
  /** Icon list on the closing band: the three routes into the office. */
  closeRoutes: string[];
  closeNote: string;
};

// ---------------------------------------------------------------------------
// Specifications quoted in the answers. One definition, both languages.
// ---------------------------------------------------------------------------
const OFFER_SAMPLE_G = 300; // free cupping sample
const TRIAL_KG = 30; // paid trial lot, air freight
const MOQ_KG = 300; // smallest commercial lot
const MOQ_BAGS = MOQ_KG / bagKg; // 5 bags of 60 kg
const REGULAR_KG = 1000;
const CONTAINER_T = 5; // from here we quote as a container job
const CONTAINER_BAGS = 320; // 20' loose-stowed
const CONTAINER_MAX_T = (CONTAINER_BAGS * bagKg) / 1000; // 19.2 t
const PALLET_LOSS_PCT = 15; // bags lost to palletised stow
const AIR_DAYS = [7, 10] as const;
const SEA_NOVOROSSIYSK = [25, 32] as const;
const SEA_STPETERSBURG = [35, 45] as const;
const CONTRACT_TO_LOAD = [10, 14] as const;
const CLEARANCE_DAYS = [5, 10] as const;
const INLAND_DAYS = [3, 5] as const;
const TOTAL_NOVOROSSIYSK = [45, 60] as const;
const TOTAL_STPETERSBURG = [55, 75] as const;
const COURIER_DAYS = [4, 6] as const;
const CLAIM_DAYS = 14;
const SCA_TOLERANCE = 1.0;
const MOISTURE_MAX = 12.5;
const STORE_C = [15, 20] as const;
const STORE_RH = [50, 60] as const;
const PEAK_MONTHS = [3, 6] as const;
const GOOD_MONTHS = 12;
const PAST_CROP_MONTHS = [14, 18] as const;
const DOC_YEARS = 7;

const en: Copy = {
  metaTitle: "FAQ for buyers",
  metaDescription: `Minimum order ${num(MOQ_KG, "en")} kg, free ${num(OFFER_SAMPLE_G, "en")} g samples, FOB Mombasa / CFR / CIF terms, payment by T/T or L/C at sight, ${range(TOTAL_NOVOROSSIYSK[0], TOTAL_NOVOROSSIYSK[1], "en")} days order to warehouse via Novorossiysk — fourteen buyer questions on Kenyan green coffee, answered in full.`,

  eyebrow: "Buyer questions · answered plainly",
  h1: "Questions we get before the first contract",
  heroLead:
    "Volumes, samples, Incoterms, payment, transit times, packing, documents, claims and storage — the fourteen things every roaster and importer asks us, answered with real specifications rather than “contact us for details”. Prices are quoted per contract, against the lot and the volume you actually want.",

  glanceEyebrow: "The short version",
  glanceTitle: "Four numbers that answer most of the email",
  glanceLede:
    "If you are sizing up a first order, these are the figures that decide whether it fits your business. Everything below is the detail behind them.",
  facts: [
    [`${num(MOQ_KG, "en")} kg`, "minimum commercial lot"],
    [`${num(TRIAL_KG, "en")} kg`, "trial lot, sent by air"],
    [`${num(CONTAINER_MAX_T, "en", 1)} t`, "full 20′ container load"],
    [range(SEA_NOVOROSSIYSK[0], SEA_NOVOROSSIYSK[1], "en"), "days at sea to Novorossiysk"],
  ],

  groups: [
    {
      key: "orders",
      eyebrow: "Volumes and samples",
      title: "Starting an order",
      lede: "What the smallest workable order looks like, how to taste the coffee before you commit to it, and when in the crop year to book.",
      items: [
        {
          q: "What is your minimum order quantity?",
          a: [
            `The smallest commercial lot we ship is ${num(MOQ_KG, "en")} kg — ${num(MOQ_BAGS, "en")} jute bags of ${num(bagKg, "en")} kg from a single named lot. Below that we work in samples rather than orders: a free ${num(OFFER_SAMPLE_G, "en")} g cupping sample, or a ${num(TRIAL_KG, "en")} kg trial lot by air.`,
            `Most first orders land between ${num(MOQ_KG, "en")} kg and ${num(REGULAR_KG, "en")} kg — enough to run a coffee through a season's menu without committing to a container. From ${num(CONTAINER_T, "en")} t we quote it as a container job: groupage, or a full ${num(20, "en")}′ load of up to ${num(CONTAINER_MAX_T, "en", 1)} t.`,
            `Split orders are fine. A ${num(REGULAR_KG, "en")} kg contract can be ${num(600, "en")} kg AA and ${num(400, "en")} kg AB, as long as no single grade drops below ${num(MOQ_KG, "en")} kg — under that we cannot keep the lot separate through milling and bagging.`,
          ],
        },
        {
          q: "Do you send samples?",
          a: [
            `A ${num(OFFER_SAMPLE_G, "en")} g offer sample of any lot on the current list is free, air courier included — ${range(AIR_DAYS[0], AIR_DAYS[1], "en")} days door to door to Moscow or St Petersburg. It ships with the lot's cupping sheet, moisture and water activity readings, so you can check our numbers against your own roast.`,
            "We draw offer samples from the bagged lot, not from a pre-selected showpiece. If the lot is already sold out by the time you cup it, we say so rather than substituting something similar.",
            "The only thing we ask in return is a note on how it cupped, positive or not. That is how we learn which profiles to hold for you next season.",
          ],
        },
        {
          q: `We need more than ${num(OFFER_SAMPLE_G, "en")} g. How does a ${num(TRIAL_KG, "en")} kg trial lot work?`,
          a: [
            `${num(OFFER_SAMPLE_G, "en")} g is enough to cup on a sample roaster. It is not enough to profile a coffee on a production machine, and that is where most buying decisions are actually made. So we ship a ${num(TRIAL_KG, "en")} kg trial lot — half a jute bag, packed in GrainPro, by air courier on the same ${range(AIR_DAYS[0], AIR_DAYS[1], "en")} day timing.`,
            `The trial lot is quoted per contract, with the airway bill attached. We credit the air freight back against your first order of ${num(MOQ_KG, "en")} kg or more from the same lot, so a trial that turns into business is not an extra line for you.`,
            "The trial comes out of the sealed lot we would later ship you, not from a lookalike bag. That is the entire point of sending it.",
          ],
        },
        {
          q: "When should we book against the harvest?",
          a: [
            "Kenya has two crops, so there are two booking windows. Main crop is picked October to December, dried and milled through November to January, and starts shipping in January. The fly crop is picked April to June and ships from July.",
            "Main-crop samples go out in December and January, and the good named lots are spoken for by February. If you want a specific cooperative rather than whatever is left on the list, book in January. For fly crop, book in May.",
            "If your blend needs the same profile all year, we reserve tonnage across both crops on a season contract and release it against call-offs. It is the only reliable way to hold a blend component steady through a Kenyan crop year — the auction in April looks nothing like the auction in January.",
          ],
        },
      ],
    },
    {
      key: "price",
      eyebrow: "Quoting and payment",
      title: "How we quote and how you pay",
      lede: "Which Incoterms we work on, how a firm offer is put together, and the payment structures we use at each volume.",
      items: [
        {
          q: "Do you quote FOB, CFR or CIF?",
          a: [
            "All three — your choice. The base is FOB Mombasa: coffee milled, graded, bagged, documented and loaded on board. CFR adds the ocean freight to Novorossiysk or St Petersburg. CIF adds marine insurance on the customary institute cargo clauses.",
            "Whichever term you work on, the offer is broken out into FOB, freight, insurance and charges as separate lines rather than one lump. You can see exactly what the logistics leg carries and put your own forwarder against it if theirs is sharper. There is nothing hidden in the freight line.",
            "DAP to a Russian warehouse we quote case by case. Customs clearance and the inland leg depend on your import setup and your broker, and most buyers run that side better than we could from Nairobi.",
          ],
        },
        {
          q: "How do we get a quote?",
          a: [
            "Tell us the grade, the volume, the port and the Incoterm you work on. We come back with the lots we can actually cover and an offer sample for each. Figures are quoted per contract and stay off this page — the auction moves every week, and a stale number on a website helps nobody.",
            "The firm offer follows sample approval. It names the lot, the grade, the Incoterm and the shipping window, so what you sign is what you cupped.",
            "Nothing here is sold off a list. Every offer is built against a named lot, already milled or still in parchment, and we tell you which it is before you commit.",
          ],
        },
        {
          q: "What are the payment terms?",
          a: [
            "Payment is by bank transfer (T/T) against the documents named in the contract — normally the scanned bill of lading and the full document set. The schedule is agreed lot by lot in the contract itself, not fixed on a web page.",
            "From container volumes we also work on an irrevocable letter of credit at sight, payable in Nairobi and confirmed by a first-class bank. L/C is the normal route for a first container with a new counterparty — it protects both sides — and we carry our own bank charges.",
            "Samples and trial lots are prepaid. Invoicing is in USD, and originals of the document set go by courier as soon as payment clears.",
          ],
        },
      ],
    },
    {
      key: "shipping",
      eyebrow: "Transit, packing, documents",
      title: "Getting it to your warehouse",
      lede: "Realistic lead times to each Russian port, the packing options your warehouse can actually handle, and the paperwork that travels with the coffee.",
      items: [
        {
          q: "How long does it take from order to arrival?",
          a: [
            `Contract signature to loaded on board in Mombasa: ${range(CONTRACT_TO_LOAD[0], CONTRACT_TO_LOAD[1], "en")} days if the lot is already milled and in the warehouse. If it is still in parchment, add the milling and conditioning window — we will tell you which it is before you sign.`,
            `Sea leg: ${range(SEA_NOVOROSSIYSK[0], SEA_NOVOROSSIYSK[1], "en")} days Mombasa to Novorossiysk, ${range(SEA_STPETERSBURG[0], SEA_STPETERSBURG[1], "en")} days to St Petersburg — the gap is routing and the number of transhipments. Add ${range(CLEARANCE_DAYS[0], CLEARANCE_DAYS[1], "en")} days for discharge and customs clearance, then ${range(INLAND_DAYS[0], INLAND_DAYS[1], "en")} days by road to Moscow; the Urals and Siberia go by rail and take longer.`,
            `Plan on ${range(TOTAL_NOVOROSSIYSK[0], TOTAL_NOVOROSSIYSK[1], "en")} days order to warehouse via Novorossiysk and ${range(TOTAL_STPETERSBURG[0], TOTAL_STPETERSBURG[1], "en")} days via St Petersburg. Air freight collapses that to ${range(AIR_DAYS[0], AIR_DAYS[1], "en")} days, but the economics only work up to about ${num(TRIAL_KG, "en")} kg.`,
            "You get a written update at three points — lot sealed, container loaded, B/L issued — plus the vessel and booking reference. You should never have to ask us where your coffee is.",
          ],
        },
        {
          q: "How is the coffee packed?",
          a: [
            `Standard packing is a ${num(bagKg, "en")} kg jute bag with a GrainPro liner inside. The liner is what holds moisture and water activity at the values we measured in Nairobi, through the equator and through a Russian winter — jute alone will not do it.`,
            `We also pack ${num(TRIAL_KG, "en")} kg and ${num(15, "en")} kg bags to order — more liners, more labour and more pallet space on our side, but a great deal less decanting on yours if your roastery works in ${num(15, "en")} kg batches.`,
            `A ${num(20, "en")}′ container takes ${num(CONTAINER_BAGS, "en")} bags of ${num(bagKg, "en")} kg loose-stowed, so ${num(CONTAINER_MAX_T, "en", 1)} t. Palletised stow takes about ${num(PALLET_LOSS_PCT, "en")} % off that bag count but unloads with a forklift instead of a crew; the exact figure goes on the packing list before loading.`,
            "Every bag is stencilled with the lot number, grade, crop year, net weight and the ICO mark, so a bag on your floor can still be traced back to a wet mill in Nyeri.",
          ],
        },
        {
          q: "What documents come with the shipment?",
          a: [
            "The standard set travels with every container: commercial invoice, packing list, certificate of origin, phytosanitary certificate from KEPHIS, the ICO certificate of origin and marks, bill of lading, the Coffee Directorate weight and quality certificate, and the lot's cupping sheet with its moisture and water activity readings. Under CIF, the marine insurance certificate goes with it.",
            "On request we add a fumigation certificate and a certificate of analysis covering ochratoxin A, moisture and pesticide residues. Some Russian importers want them in the customs file and some do not — tell us at contract stage, because a few of them cannot be issued retrospectively.",
            `Scans go out the day the B/L is issued. Originals follow by courier, normally ${range(COURIER_DAYS[0], COURIER_DAYS[1], "en")} days to Moscow. We keep a complete set on file for ${num(DOC_YEARS, "en")} years, so a re-issue is a phone call rather than a problem.`,
          ],
        },
      ],
    },
    {
      key: "quality",
      eyebrow: "Quality, risk, aftercare",
      title: "What happens when something is wrong",
      lede: "How far traceability actually goes, what certification we can and cannot offer, your remedies if a lot arrives off-profile, and how to keep the good ones good.",
      items: [
        {
          q: "Is the coffee certified? How far does traceability go?",
          a: [
            `Traceability first, because it is the part we can promise on every single lot: cooperative or estate, wet mill, region, altitude, variety, harvest date and milling date, printed on the lot passport that ships with the coffee. Ask us about ${lotPassport.id} and we can name the wet mill in Nyeri it came off and the week it was picked.`,
            "Certification is lot by lot, not company-wide. We have Rainforest Alliance and Fairtrade lots from several of the cooperatives we buy through, quoted on request against the specific lot. Certified organic is genuinely scarce in Kenya and we will not pretend otherwise — where it exists the volumes are small and booked early.",
            "We also collect GPS polygons for the plots behind our main-crop lots. That work started as EU deforestation-regulation compliance, but it is useful to any buyer: it is the difference between saying a coffee is traceable and being able to show where it grew.",
          ],
        },
        {
          q: "What happens if a lot is rejected on arrival?",
          a: [
            "We keep a sealed pre-shipment sample of every lot, drawn from the bagged coffee rather than from the offer. If your arrival sample does not match ours, that is our problem to fix, and the retained sample is what we both argue from.",
            `Contracts are written on European Contract for Coffee terms. Quality claims are raised within ${num(CLAIM_DAYS, "en")} days of discharge, on an arrival sample drawn to the same standard. If the cup is more than ${num(SCA_TOLERANCE, "en", 1)} SCA point off the sample you approved, or moisture reads above ${num(MOISTURE_MAX, "en", 1)} %, or the defect count exceeds the contract, you have a claim.`,
            "The remedies are the usual three: a price allowance against the invoice, replacement out of the next shipment, or return of the lot at our cost. We would far rather settle it directly, and in practice that is what happens. Where we genuinely cannot agree, quality arbitration goes to the European coffee trade arbitration in Hamburg and both of us live with the finding.",
            "One thing worth saying plainly: a lot that fails our own pre-shipment cupping never leaves Mombasa. Claims should be rare, and they are — but the mechanism exists because the sea is long.",
          ],
        },
        {
          q: "How should we store green coffee, and how long does it keep?",
          a: [
            `${range(STORE_C[0], STORE_C[1], "en")} °C, ${range(STORE_RH[0], STORE_RH[1], "en")} % relative humidity, off the floor on pallets, away from anything aromatic. Green coffee takes up the smell of spices, cleaning chemicals and diesel, and it does not give them back.`,
            `Stored like that in the GrainPro it arrived in, a Kenyan lot cups at its best for ${range(PEAK_MONTHS[0], PEAK_MONTHS[1], "en")} months from arrival and stays commercially good for around ${num(GOOD_MONTHS, "en")} months. After that it flattens — acidity goes first, then sweetness — and by ${range(PAST_CROP_MONTHS[0], PAST_CROP_MONTHS[1], "en")} months you are roasting past crop and your customers will taste it.`,
            `Two practical points. Do not open the liner until you are working through the bag: once it is open the coffee equilibrates to your warehouse, not to the water activity of ${num(lotPassport.waterActivity, "en", 2)} we shipped it at. And rotate strictly by lot number — losing a good lot at the back of the rack is the most common way an expensive coffee gets wasted.`,
          ],
        },
        {
          q: "Who do we talk to?",
          a: [
            `Commercial questions — price, availability, samples, contracts — go to ${company.email}, or to our Russian number ${company.phoneRu}, which takes calls and WhatsApp through Moscow working hours. We answer within one working day, and when the answer is “that lot is gone”, we say that instead of offering you something else.`,
            `Documents, shipping and everything after the container is booked are handled by the export office in Nairobi on ${company.phoneKe}. Timezones are not an issue: Kenya runs UTC+3, the same clock as Moscow.`,
            "If you already know what you want, the price-list request form is the fastest route in. Tell us the grade, the volume and the port, and you will have a firm quote and a sample offer back the same or the next working day.",
          ],
        },
      ],
    },
  ],

  closeEyebrow: "Still unanswered",
  closeTitle: "Ask us the one that is not on this page",
  closeLede:
    "Every roastery has a question this list does not cover — a blend component you need matched, a warehouse that only takes pallets, an import structure that changes the Incoterm. Send it over; a specific question gets a specific answer.",
  closeSecondary: "See volumes and routes",
  closeRoutes: [
    "Commercial enquiries and samples: reply within one working day, Moscow hours.",
    "Nairobi export office for documents, bookings and anything already in transit.",
    "Firm quotes name the lot, the grade, the Incoterm and the shipping window — not a price range.",
  ],
  closeNote:
    "Figures on this page are indicative and are confirmed against the specific lot, line and booking date in your contract.",
};

const ru: Copy = {
  metaTitle: "Вопросы и ответы для покупателей",
  metaDescription: `Минимальная партия ${num(MOQ_KG, "ru")} кг, бесплатный образец ${num(OFFER_SAMPLE_G, "ru")} г, условия поставки FOB Момбаса / CFR / CIF, оплата T/T или аккредитивом, ${range(TOTAL_NOVOROSSIYSK[0], TOTAL_NOVOROSSIYSK[1], "ru")} дней от заказа до склада через Новороссийск — четырнадцать вопросов о кенийском зелёном кофе с развёрнутыми ответами.`,

  eyebrow: "Вопросы покупателей · ответы по существу",
  h1: "Вопросы, которые задают до первого контракта",
  heroLead:
    "Объёмы, образцы, условия Incoterms, оплата, сроки доставки, упаковка, документы, претензии и хранение — четырнадцать вопросов, которые нам задают чаще всего, с конкретными характеристиками вместо «уточняйте у менеджера». Цену мы называем по конкретному лоту и объёму — по запросу.",

  glanceEyebrow: "Коротко",
  glanceTitle: "Четыре цифры, которые закрывают половину переписки",
  glanceLede:
    "Если вы прикидываете первый заказ, всё решают эти четыре значения. Ниже — подробности за каждым из них.",
  facts: [
    [`${num(MOQ_KG, "ru")} кг`, "минимальная партия"],
    [`${num(TRIAL_KG, "ru")} кг`, "пробная партия авиа"],
    [`${num(CONTAINER_MAX_T, "ru", 1)} т`, "полный 20-футовый контейнер"],
    [range(SEA_NOVOROSSIYSK[0], SEA_NOVOROSSIYSK[1], "ru"), "дня морем до Новороссийска"],
  ],

  groups: [
    {
      key: "orders",
      eyebrow: "Объёмы и образцы",
      title: "Как начать поставку",
      lede: "Какой заказ считается минимальным, как попробовать кофе до контракта и в какой момент сезона бронировать объём.",
      items: [
        {
          q: "Какой минимальный объём заказа?",
          a: [
            `Минимальная коммерческая партия — ${num(MOQ_KG, "ru")} кг, то есть ${num(MOQ_BAGS, "ru")} джутовых мешков по ${num(bagKg, "ru")} кг из одного конкретного лота. Всё, что меньше, — это уже не заказ, а проба: бесплатный образец ${num(OFFER_SAMPLE_G, "ru")} г или пробная партия ${num(TRIAL_KG, "ru")} кг авиадоставкой.`,
            `Большинство первых заказов укладывается в ${num(MOQ_KG, "ru")}–${num(REGULAR_KG, "ru")} кг: этого достаточно, чтобы отработать кофе в сезонном меню и не брать на себя контейнер. От ${num(CONTAINER_T, "ru")} т мы считаем поставку как контейнерную — сборный груз или полный ${num(20, "ru")}-футовый контейнер до ${num(CONTAINER_MAX_T, "ru", 1)} т.`,
            `Комбинированные заказы — нормальная практика. Контракт на ${num(REGULAR_KG, "ru")} кг может быть разбит на ${num(600, "ru")} кг AA и ${num(400, "ru")} кг AB, если ни один грейд не опускается ниже ${num(MOQ_KG, "ru")} кг: меньший объём мы физически не удержим отдельным лотом на обмолоте и фасовке.`,
          ],
        },
        {
          q: "Вы отправляете образцы?",
          a: [
            `Образец ${num(OFFER_SAMPLE_G, "ru")} г любого лота из текущего листа — бесплатно, вместе с авиадоставкой: ${range(AIR_DAYS[0], AIR_DAYS[1], "ru")} дней до двери в Москве или Санкт-Петербурге. К образцу прилагается каппинг-лист лота, влажность и водная активность, чтобы вы могли сверить наши цифры со своей обжаркой.`,
            "Образцы мы отбираем из уже упакованного лота, а не из специально подготовленной витрины. Если к моменту каппинга лот продан, мы так и пишем, а не подменяем его «похожим».",
            "Единственная просьба взамен — короткий отзыв по чашке, положительный или нет. Так мы понимаем, какие профили держать для вас в следующем сезоне.",
          ],
        },
        {
          q: `Нужно больше ${num(OFFER_SAMPLE_G, "ru")} г. Как работает пробная партия ${num(TRIAL_KG, "ru")} кг?`,
          a: [
            `${num(OFFER_SAMPLE_G, "ru")} г хватает на каппинг на сэмпл-ростере, но не на профиль для производственного ростера — а решение о закупке принимается именно там. Поэтому мы отправляем пробную партию ${num(TRIAL_KG, "ru")} кг: полмешка GrainPro, авиадоставкой, те же ${range(AIR_DAYS[0], AIR_DAYS[1], "ru")} дней.`,
            `Пробная партия котируется под контракт, с приложением авианакладной. Авиафрахт мы засчитываем в счёт первого заказа от ${num(MOQ_KG, "ru")} кг из того же лота — проба, которая переросла в поставку, не становится для вас отдельной статьёй.`,
            "Пробная партия отбирается из того же опечатанного лота, который потом уйдёт вам контейнером, а не из похожего мешка. В этом весь смысл пробы.",
          ],
        },
        {
          q: "Когда бронировать объём под урожай?",
          a: [
            "В Кении два урожая, поэтому и окон бронирования два. Основной урожай собирают с октября по декабрь, сушат и обмолачивают с ноября по январь, отгрузка начинается в январе. Промежуточный урожай собирают с апреля по июнь, отгрузка — с июля.",
            "Образцы основного урожая уходят в декабре и январе, и к февралю хорошие именные лоты уже разобраны. Если вам нужен конкретный кооператив, а не остатки листа, бронируйте в январе. По промежуточному урожаю — в мае.",
            "Если бленду нужен один и тот же профиль круглый год, мы резервируем тоннаж сразу по двум урожаям сезонным контрактом и отгружаем его по заявкам. Это единственный надёжный способ удержать компонент бленда: аукцион в апреле не имеет ничего общего с аукционом в январе.",
          ],
        },
      ],
    },
    {
      key: "price",
      eyebrow: "Котировка и оплата",
      title: "Как формируется предложение и как платить",
      lede: "На каких условиях Incoterms мы работаем, как собирается твёрдое предложение и какие схемы оплаты используем на разных объёмах.",
      items: [
        {
          q: "Вы котируете на условиях FOB, CFR или CIF?",
          a: [
            "Все три — по вашему выбору. База — FOB Момбаса: кофе обмолочен, откалиброван, упакован, оформлен и погружен на борт. CFR добавляет морской фрахт до Новороссийска или Санкт-Петербурга. CIF добавляет морское страхование на стандартных institute cargo clauses.",
            "На любых условиях предложение разбито по строкам: FOB, фрахт, страхование, сборы — а не одной суммой. Вы видите, что именно берёт на себя логистика, и можете поставить рядом своего экспедитора, если у него условия лучше. В строке фрахта ничего не спрятано.",
            "DAP до склада в России считаем индивидуально. Таможенное оформление и внутреннее плечо зависят от вашей схемы импорта и брокера, и почти все покупатели ведут эту часть лучше, чем это можно сделать из Найроби.",
          ],
        },
        {
          q: "Как получить предложение?",
          a: [
            "Напишите грейд, объём, порт назначения и условия поставки. В ответ придут лоты, которые мы реально можем закрыть, и офферный образец по каждому. Цифры идут в предложении под контракт и на сайте не публикуются: аукцион двигается каждую неделю, и устаревшая цифра на сайте не помогает никому.",
            "Твёрдое предложение выходит после утверждения образца. В нём названы лот, грейд, условия поставки и окно отгрузки — вы подписываете то, что каппинговали.",
            "Мы не торгуем «по прайсу вообще». Каждое предложение собирается под конкретный лот — уже обмолоченный или ещё в пергаменте, — и мы говорим об этом до подписания.",
          ],
        },
        {
          q: "Какие условия оплаты?",
          a: [
            "Оплата — банковским переводом (T/T) против документов, названных в контракте: как правило, скан коносамента и полный пакет. График согласуется по каждому лоту в самом контракте, а не фиксируется на сайте.",
            "От контейнерных объёмов мы также работаем по безотзывному аккредитиву с платежом по предъявлении, исполняемому в Найроби и подтверждённому первоклассным банком. Для первого контейнера с новым контрагентом это обычная схема — она защищает обе стороны, — и свои банковские комиссии мы несём сами.",
            "Образцы и пробные партии — по предоплате. Счета выставляются в долларах США, оригиналы документов уходят курьером сразу после поступления оплаты.",
          ],
        },
      ],
    },
    {
      key: "shipping",
      eyebrow: "Сроки, упаковка, документы",
      title: "Как кофе доедет до вашего склада",
      lede: "Реальные сроки по каждому российскому порту, варианты фасовки под ваш склад и пакет документов, который идёт вместе с грузом.",
      items: [
        {
          q: "Сколько времени проходит от заказа до прибытия?",
          a: [
            `От подписания контракта до погрузки на борт в Момбасе — ${range(CONTRACT_TO_LOAD[0], CONTRACT_TO_LOAD[1], "ru")} дней, если лот уже обмолочен и лежит на складе. Если он ещё в пергаменте, добавляется окно обмолота и отлёжки — мы скажем об этом до подписания.`,
            `Морское плечо: ${range(SEA_NOVOROSSIYSK[0], SEA_NOVOROSSIYSK[1], "ru")} дня Момбаса — Новороссийск и ${range(SEA_STPETERSBURG[0], SEA_STPETERSBURG[1], "ru")} дней до Санкт-Петербурга; разница — в маршруте и количестве перевалок. Плюс ${range(CLEARANCE_DAYS[0], CLEARANCE_DAYS[1], "ru")} дней на выгрузку и таможенное оформление и ${range(INLAND_DAYS[0], INLAND_DAYS[1], "ru")} дня автотранспортом до Москвы; на Урал и в Сибирь груз идёт по железной дороге и дольше.`,
            `Ориентируйтесь на ${range(TOTAL_NOVOROSSIYSK[0], TOTAL_NOVOROSSIYSK[1], "ru")} дней от заказа до склада через Новороссийск и ${range(TOTAL_STPETERSBURG[0], TOTAL_STPETERSBURG[1], "ru")} дней через Санкт-Петербург. Для проб доступна авиадоставка ${range(AIR_DAYS[0], AIR_DAYS[1], "ru")} дней, но экономически она оправдана примерно до ${num(TRIAL_KG, "ru")} кг.`,
            "Вы получаете письменное уведомление в трёх точках — лот опечатан, контейнер загружен, коносамент выпущен — вместе с судном и номером букинга. Спрашивать «где мой кофе» не приходится.",
          ],
        },
        {
          q: "Как упакован кофе?",
          a: [
            `Стандартная упаковка — джутовый мешок ${num(bagKg, "ru")} кг с вкладышем GrainPro. Именно вкладыш удерживает влажность и водную активность на тех значениях, которые мы замерили в Найроби, — через экватор и через русскую зиму. Один джут этого не даёт.`,
            `Возможна фасовка ${num(TRIAL_KG, "ru")} и ${num(15, "ru")} кг под ваш склад: с нашей стороны это больше вкладышей, ручного труда и места на паллете, зато у вас нет перефасовки, если производство работает партиями по ${num(15, "ru")} кг.`,
            `В ${num(20, "ru")}-футовый контейнер входит ${num(CONTAINER_BAGS, "ru")} мешков по ${num(bagKg, "ru")} кг навалом, то есть ${num(CONTAINER_MAX_T, "ru", 1)} т. Паллетная загрузка отнимает около ${num(PALLET_LOSS_PCT, "ru")} % от этого количества, зато выгружается погрузчиком, а не бригадой; точная цифра фиксируется в упаковочном листе до погрузки.`,
            "На каждом мешке трафаретом нанесены номер лота, грейд, год урожая, вес нетто и маркировка ICO — мешок на вашем складе по-прежнему прослеживается до конкретной мойки в Ньери.",
          ],
        },
        {
          q: "Какой пакет документов идёт с поставкой?",
          a: [
            "Стандартный комплект идёт с каждым контейнером: инвойс, упаковочный лист, сертификат происхождения, фитосанитарный сертификат KEPHIS, сертификат происхождения и маркировка ICO, коносамент, сертификат веса и качества Coffee Directorate и каппинг-лист лота с влажностью и водной активностью. На условиях CIF к нему добавляется страховой сертификат.",
            "По запросу оформляем сертификат фумигации и протокол испытаний по охратоксину A, влажности и остаткам пестицидов. Одним российским импортёрам они нужны в таможенное досье, другим нет — скажите об этом на этапе контракта: часть документов задним числом уже не выпустить.",
            `Сканы уходят в день выпуска коносамента, оригиналы — курьером, обычно ${range(COURIER_DAYS[0], COURIER_DAYS[1], "ru")} дней до Москвы. Полный комплект хранится у нас ${num(DOC_YEARS, "ru")} лет, поэтому повторная выдача — это один звонок, а не проблема.`,
          ],
        },
      ],
    },
    {
      key: "quality",
      eyebrow: "Качество, риски, хранение",
      title: "Что делать, если что-то пошло не так",
      lede: "Насколько глубока прослеживаемость, что можно и чего нельзя обещать по сертификации, какие у вас средства защиты при несоответствии лота и как сохранить хороший кофе хорошим.",
      items: [
        {
          q: "Кофе сертифицирован? Насколько глубока прослеживаемость?",
          a: [
            `Сначала прослеживаемость, потому что её мы гарантируем по каждому лоту: кооператив или эстейт, мойка, регион, высота, сорт, дата сбора и дата обмолота — всё это напечатано в паспорте лота, который идёт вместе с кофе. Спросите про ${lotPassport.id}, и мы назовём мойку в Ньери и неделю сбора.`,
            "Сертификация — вопрос конкретного лота, а не компании целиком. У части кооперативов, с которыми мы работаем, есть лоты Rainforest Alliance и Fairtrade — они котируются по запросу под конкретный лот. Сертифицированной органики в Кении объективно мало, и мы не станем делать вид, что это не так: там, где она есть, объёмы небольшие и разбираются заранее.",
            "По основным урожаям мы также собираем GPS-полигоны участков. Эта работа начиналась под европейский регламент о вырубке лесов, но полезна любому покупателю: это разница между словами «кофе прослеживаемый» и возможностью показать, где именно он вырос.",
          ],
        },
        {
          q: "Что будет, если лот не примут по прибытии?",
          a: [
            "По каждому лоту мы храним опечатанный предотгрузочный образец, отобранный из упакованного кофе, а не из офферного образца. Если ваш прибывший образец с ним не совпал — это наша зона ответственности, и спор ведётся именно от контрольного образца.",
            `Контракты составляются по правилам European Contract for Coffee. Претензия по качеству заявляется в течение ${num(CLAIM_DAYS, "ru")} дней с момента выгрузки, по образцу, отобранному по тому же стандарту. Если чашка расходится с утверждённым образцом более чем на ${num(SCA_TOLERANCE, "ru", 1)} балла SCA, или влажность выше ${num(MOISTURE_MAX, "ru", 1)} %, или количество дефектов превышает контрактное — основание для претензии есть.`,
            "Варианты урегулирования стандартные: скидка к инвойсу, замена из следующей отгрузки или возврат партии за наш счёт. Мы предпочитаем договариваться напрямую, и на практике так и происходит. Если договориться действительно не удаётся, качественный спор передаётся в арбитраж европейской кофейной торговли в Гамбурге, и решение обязательно для обеих сторон.",
            "Отдельно стоит сказать прямо: лот, не прошедший наш собственный предотгрузочный каппинг, из Момбасы не выходит. Претензии должны быть редкими — и они редкие, — но механизм существует, потому что море длинное.",
          ],
        },
        {
          q: "Как хранить зелёный кофе и сколько он живёт?",
          a: [
            `${range(STORE_C[0], STORE_C[1], "ru")} °C, относительная влажность ${range(STORE_RH[0], STORE_RH[1], "ru")} %, на паллетах, не на полу, вдали от всего ароматного. Зелёное зерно вбирает запах специй, моющей химии и солярки и обратно его не отдаёт.`,
            `При таком хранении, в том же GrainPro, кенийский лот держит пик ${range(PEAK_MONTHS[0], PEAK_MONTHS[1], "ru")} месяцев с момента прибытия и остаётся коммерчески пригодным около ${num(GOOD_MONTHS, "ru")} месяцев. Дальше чашка выравнивается: первой уходит кислотность, затем сладость, а к ${range(PAST_CROP_MONTHS[0], PAST_CROP_MONTHS[1], "ru")} месяцам вы обжариваете past crop, и гости это почувствуют.`,
            `Два практических момента. Не вскрывайте вкладыш, пока не начали работать с мешком: после вскрытия зерно приходит в равновесие с влажностью вашего склада, а не с водной активностью ${num(lotPassport.waterActivity, "ru", 2)}, с которой мы его отгрузили. И ведите строгую ротацию по номеру лота — забытый в глубине стеллажа мешок остаётся самой частой причиной, по которой дорогой кофе пропадает зря.`,
          ],
        },
        {
          q: "С кем разговаривать?",
          a: [
            `Коммерческие вопросы — цена, наличие, образцы, контракты — на ${company.email} или на российский номер ${company.phoneRu}: звонки и WhatsApp в московские рабочие часы. Отвечаем в течение рабочего дня, и если ответ «этого лота больше нет», мы так и говорим, а не предлагаем взамен что-нибудь другое.`,
            `Документы, отгрузка и всё, что происходит после букинга контейнера, — на экспортном офисе в Найроби, ${company.phoneKe}. Разницы во времени нет: Кения живёт по UTC+3, как и Москва.`,
            "Если вы уже знаете, что вам нужно, быстрее всего — форма запроса прайса. Укажите грейд, объём и порт назначения, и вы получите твёрдую котировку и предложение по образцу в тот же или на следующий рабочий день.",
          ],
        },
      ],
    },
  ],

  closeEyebrow: "Остался вопрос",
  closeTitle: "Задайте тот, которого нет на этой странице",
  closeLede:
    "У каждого производства есть вопрос, который не закрывается общим списком: компонент бленда, который нужно подобрать, склад, принимающий только паллеты, схема импорта, меняющая условия поставки. Напишите — на конкретный вопрос будет конкретный ответ.",
  closeSecondary: "Объёмы и маршруты",
  closeRoutes: [
    "Коммерческие запросы и образцы: ответ в течение рабочего дня, по московскому времени.",
    "Экспортный офис в Найроби — документы, букинги и всё, что уже в пути.",
    "Твёрдая котировка называет лот, грейд, условия поставки и окно отгрузки, а не диапазон цены.",
  ],
  closeNote:
    "Цифры на этой странице ориентировочные и уточняются под конкретный лот, линию и дату букинга в вашем контракте.",
};

export const faq: Record<Locale, Copy> = { en, ru };
