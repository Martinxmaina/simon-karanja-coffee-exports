// Market updates page copy: dated notes on the 2025/26 Kenyan crop — harvest
// progress, Nairobi Coffee Exchange activity, shipping space and transit to
// the Black Sea and the Baltic, cup quality and booking advice.
//
// Dates are ISO strings and stay unformatted here: the page renders them with
// Intl.DateTimeFormat so "11 August 2026" / "11 августа 2026 г." is a
// presentation concern, not two hand-typed strings. Every figure goes through
// num()/range() for the same reason.
import { num, range, type Locale } from "@/lib/i18n";

type Note = {
  /** ISO date (YYYY-MM-DD), newest first. Formatted per locale by the page. */
  date: string;
  /** Short category: harvest / auction / logistics / quality. */
  tag: string;
  title: string;
  paras: string[];
};

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  heroLede: string;

  listEyebrow: string;
  listTitle: string;
  listLede: string;
  /** Newest first. Nothing dated later than the current season. */
  notes: Note[];

  ctaEyebrow: string;
  ctaTitle: string;
  ctaLede: string;
  disclaimerLabel: string;
  disclaimerText: string;
  cta: string;
};

const en: Copy = {
  metaTitle: "Market updates from the 2025/26 Kenyan crop",
  metaDescription:
    "Dated notes for green buyers: main crop progress and volumes, what is moving at the Nairobi Coffee Exchange, shipping space and transit to Black Sea and Baltic ports, cup quality on the 2025/26 crop and when to book.",

  eyebrow: "Market updates · 2025/26 season",
  h1: "Market notes from the 2025/26 crop",
  heroLede:
    "Short, dated notes on the things a green buyer actually tracks: how the crop is picking, what is moving at the Nairobi auction, how space and transit to the Black Sea and the Baltic look this month, and how the current crop is cupping on our table.",

  listEyebrow: "Newest first",
  listTitle: "Six notes from the season",
  listLede:
    "We publish a note when something changes that would move a buying decision — a harvest running late, a catalogue clearing out faster than anyone expected, sailings tightening. Older notes stay up unedited, so you can see how the season actually developed rather than how it reads in hindsight.",

  notes: [
    {
      date: "2026-08-11",
      tag: "Logistics",
      title: "Book December and January sailings now",
      paras: [
        `Space out of Mombasa for December and January loading is already being taken. Our forwarders are holding fewer open slots than they had in March, and the Red Sea routing still adds a leg to most rotations. Carriage terms are confirmed in your offer for the specific shipment window rather than carried over from the last one.`,
        `Transit itself is holding: ${range(25, 32, "en")} days to Novorossiysk, ${range(35, 45, "en")} days to St Petersburg. The variance sits in the transhipment. A missed connection at Jebel Ali or Salalah adds ${range(4, 7, "en")} days and there is no way to buy that risk down after the fact, so we are booking ${range(3, 4, "en")} weeks ahead of the vessel instead of the usual two.`,
        `Practical deadline: a new-crop lot contracted by mid-October ships in December and clears at destination in February. Contract later and you are buying whatever is left in the warehouse in March. We put the vessel and the ETA on the confirmation, not just the shipping month, so the date you plan production around is one you can hold us to.`,
      ],
    },
    {
      date: "2026-07-14",
      tag: "Auction",
      title: "Season closes on thin catalogues, and AB is the lot we would take",
      paras: [
        `The Nairobi Coffee Exchange ran the last sale of the 2025/26 season on Tuesday with about ${num(8400, "en")} bags on offer, against the ${range(14000, 18000, "en")} bags that were changing hands in February. End-of-season catalogues are thin and picked over: the Nyeri and Kirinyaga AA that did come forward was spoken for quickly, mostly by buyers who already had a standing relationship with the wet mill.`,
        `What the season competed for was screen size for single-origin menus, not cup score. AB out of the same wet mills moved in smaller parcels and later in the day — a demand story, not a quality one.`,
        `Our read for the coming months is that AB from a mill whose AA you already like is the lot to take: same picking day, same fermentation, same drying tables, ${range(1, 2, "en")} points off the cup and the same behaviour in the roaster. Where the profile matters more than the bean size, ask for AB — we quote both grades off the same mill on request.`,
      ],
    },
    {
      date: "2026-06-09",
      tag: "Harvest",
      title: "Fly crop picking under way in Embu and Murang'a",
      paras: [
        `Pickers moved into the lower Embu and Murang'a blocks in the last week of May, about ten days later than usual after a cool, wet April. The fly crop is small by design — we expect ${range(1900, 2400, "en")} bags of washed coffee against roughly ${num(11000, "en")} from the same societies in the main crop — but until January it is the only fresh Kenyan arrival.`,
        `On the table it does what fly crop does: clean, bright, a shorter finish, ${range(83.5, 85, "en", 1)} points on most lots. We buy it as a blend component and as cover for espresso programmes rather than as a single origin. If your Kenya slot is empty until new crop lands, this is what fills it.`,
        `Volumes are allocated in order of confirmation and we are not splitting these lots below ${num(300, "en")} kg. Samples ship the week a lot finishes drying.`,
      ],
    },
    {
      date: "2026-04-21",
      tag: "Quality",
      title: "What the main crop is showing on the table",
      paras: [
        `We have cupped ${num(240, "en")} main-crop lots since January, ours and other people's. The season average sits at ${num(85.4, "en", 1)} points with the best Nyeri AA lots at ${num(87.5, "en", 1)}; the same table averaged ${num(84.8, "en", 1)} last season. The lift is mostly in acidity and sweetness, which is what late, cool ripening tends to give you.`,
        `Profile: blackcurrant and dried plum from Nyeri and Kirinyaga, more tomato leaf and grapefruit out of Murang'a, a heavier cocoa-leaning body from the Bungoma and Elgon side. Moisture at shipment is running ${range(10.2, 11, "en", 1)}% with water activity ${range(0.53, 0.58, "en", 2)}, so the coffee is stable but not dried down hard — expect it to open up rather than fade.`,
        `Roasting note: these lots are dense and they are not ready on arrival. Give them ${range(30, 45, "en")} days off the boat before you profile, and re-cup rather than reusing last year's curve. The acidity structure is different enough to hear on a light-medium roast.`,
      ],
    },
    {
      date: "2026-02-18",
      tag: "Auction",
      title: "February bidding narrows to the top screens",
      paras: [
        `Yesterday's sale carried ${num(16200, "en")} bags, one of the larger catalogues of the season, and still cleared almost completely. AA from the Central Kenya mills went first, AB out of the same lots followed, and PB found its buyers late in the day — the pattern all season has been bidding concentrating on the top screens.`,
        `Two things are driving it. Global arabica supply is tight, so buyers are covering earlier in the season than usual. And the main crop we called at ${range(50000, 53000, "en")} t in December has come in near the bottom of that range, at about ${num(50800, "en")} t clean.`,
        `For anyone still uncovered on Kenya this year: availability will not get easier before the fly crop, and the fly crop will not cover a serious programme. Cover the volume you know you need now and leave the speculative tonnage alone.`,
      ],
    },
    {
      date: "2025-12-02",
      tag: "Harvest",
      title: "Late short rains push the main-crop peak into December",
      paras: [
        `The short rains reached Nyeri and Kirinyaga two to three weeks behind schedule, so flowering and ripening both slipped. Peak main-crop picking now runs from mid-November to the end of December instead of finishing in November, and the wet mills are working ${range(14, 16, "en")}-hour days to keep every delivery pulped within ${num(8, "en")} hours.`,
        `Volumes look reasonable rather than large. We put the national clean-coffee crop at ${range(50000, 53000, "en")} t against ${num(48000, "en")} t last season, with cherry density and bean size both good in the ${range(1650, 1900, "en")} m blocks. The rain came late but it came steadily, which is the version we want.`,
        `Shipping consequence: milling and grading run through January, so the first new-crop containers leave Mombasa from mid-January and land in Novorossiysk in February. If you want new crop in the first quarter, contract in December and let the lot mill against your name.`,
      ],
    },
  ],

  ctaEyebrow: "Before you act on any of this",
  ctaTitle: "Ask for what sits behind a note",
  ctaLede:
    "Every figure above comes from a lot, a sale or a booking we were part of. If one of them matters to a decision you are making, we will show you where it came from — the auction slip, the cupping sheet or the booking confirmation.",
  disclaimerLabel: "Indicative, not trading advice.",
  disclaimerText:
    "These are our own observations from the mills, the auction floor and our forwarders' booking desks. Volumes and transit times are indicative, move week to week, and are not an offer, a quotation or trading advice. For a firm price on a specific grade and shipment window, ask us for a current offer sheet.",
  cta: "Request a current offer sheet",
};

const ru: Copy = {
  metaTitle: "Обзор рынка кенийского кофе — сезон 2025/26",
  metaDescription:
    "Датированные заметки для закупщиков: ход основного урожая и объёмы, что происходит на аукционе в Найроби, места на судах и сроки доставки в порты Чёрного и Балтийского морей, качество чашки текущего урожая и когда бронировать отгрузку.",

  eyebrow: "Обзор рынка · сезон 2025/26",
  h1: "Рынок кенийского кофе: сезон 2025/26",
  heroLede:
    "Короткие датированные заметки о том, что действительно влияет на закупку: как идёт сбор, что происходит на аукционе в Найроби, как обстоят дела с местами на судах и сроками доставки в Новороссийск и Санкт-Петербург и как текущий урожай ведёт себя на каппинг-столе.",

  listEyebrow: "Сначала свежие",
  listTitle: "Шесть заметок за сезон",
  listLede:
    "Мы публикуем заметку тогда, когда меняется что-то, способное повлиять на решение о закупке: сбор сдвинулся, каталог разобрали быстрее ожидаемого, на линии стало тесно с местами. Старые заметки остаются без правок — по ним видно, как сезон разворачивался на самом деле, а не как он выглядит задним числом.",

  notes: [
    {
      date: "2026-08-11",
      tag: "Логистика",
      title: "Места на декабрь и январь стоит бронировать сейчас",
      paras: [
        `Места из Момбасы под загрузку в декабре и январе разбирают уже сейчас. Свободных слотов у экспедиторов заметно меньше, чем было в марте, а маршрут в обход Красного моря по-прежнему добавляет плечо к большинству ротаций. Условия перевозки подтверждаем в предложении под конкретное отгрузочное окно, а не переносим из прошлого.`,
        `Сам транзит держится в рамках: ${range(25, 32, "ru")} дня до Новороссийска и ${range(35, 45, "ru")} дней до Санкт-Петербурга. Разброс даёт перевалка: пропущенная стыковка в Джебель-Али или Салале добавляет ${range(4, 7, "ru")} дней, и постфактум этот риск уже не выкупить. Поэтому букинг мы ставим за ${range(3, 4, "ru")} недели до судна, а не за привычные две.`,
        `Практический дедлайн: лот нового урожая, законтрактованный до середины октября, уходит в декабре и проходит оформление в порту назначения в феврале. Позже — это уже покупка того, что осталось на складе к марту. В подтверждении мы указываем судно и ETA, а не просто месяц отгрузки, чтобы дата, под которую вы планируете производство, была фиксированной.`,
      ],
    },
    {
      date: "2026-07-14",
      tag: "Аукцион",
      title: "Сезон закрылся тонкими каталогами: берём AB",
      paras: [
        `Во вторник Nairobi Coffee Exchange провёл последние торги сезона 2025/26: в каталоге было около ${num(8400, "ru")} мешков против ${range(14000, 18000, "ru")} мешков, которые уходили в феврале. Каталоги конца сезона тонкие и разобранные: AA из Ньери и Кириньяги, который всё же вышел на торги, ушёл быстро — в основном к покупателям, у которых уже есть отношения с мойкой.`,
        `Весь сезон конкуренция шла за размер сита под моносорта, а не за баллы в чашке. AB с тех же моек уходил спокойнее и меньшими партиями — это история про спрос, а не про качество.`,
        `Вывод на ближайшие месяцы: AB с той мойки, чей AA вам уже нравится, — та позиция, которую взяли бы мы. Тот же день сбора, та же ферментация, те же сушильные столы: минус ${range(1, 2, "ru")} балла в чашке и то же поведение в обжарке. Там, где важнее профиль, а не размер зерна, спрашивайте AB — оба грейда с одной мойки котируем по запросу.`,
      ],
    },
    {
      date: "2026-06-09",
      tag: "Урожай",
      title: "Промежуточный урожай: сбор пошёл в Эмбу и Муранге",
      paras: [
        `В последнюю неделю мая сборщики вышли на нижние участки Эмбу и Муранги — примерно на десять дней позже обычного после прохладного и влажного апреля. Промежуточный урожай мал по определению: ждём ${range(1900, 2400, "ru")} мешков мытого кофе против примерно ${num(11000, "ru")} мешков с тех же кооперативов в основном урожае. Но до января это единственное свежее кенийское поступление.`,
        `На столе он ведёт себя как и положено промежуточному: чисто, ярко, короткий финиш, ${range(83.5, 85, "ru", 1)} балла на большинстве лотов. Мы берём его в бленды и как страховку для эспрессо-программ, а не как моносорт. Если кенийская позиция в вашей линейке пустует до нового урожая — закрывается она именно этим.`,
        `Объёмы расписываются в порядке подтверждения заказов; дробить эти лоты меньше чем на ${num(300, "ru")} кг мы не будем. Образцы уходят на той же неделе, когда лот сходит с сушильных столов.`,
      ],
    },
    {
      date: "2026-04-21",
      tag: "Качество",
      title: "Что показывает основной урожай на каппинге",
      paras: [
        `С января мы прокаппили ${num(240, "ru")} лотов основного урожая — своих и чужих. Средний балл сезона — ${num(85.4, "ru", 1)}, лучшие лоты Ньери AA дают ${num(87.5, "ru", 1)}; в прошлом сезоне тот же стол давал в среднем ${num(84.8, "ru", 1)}. Прибавка пришлась на кислотность и сладость — обычный результат позднего вызревания в прохладе.`,
        `Профиль: чёрная смородина и чернослив в лотах Ньери и Кириньяги, больше томатного листа и грейпфрута в Муранге, более плотное тело с уклоном в какао со стороны Бунгомы и Элгона. Влажность при отгрузке ${range(10.2, 11, "ru", 1)} %, активность воды ${range(0.53, 0.58, "ru", 2)}: кофе стабилен, но не пересушен — он будет раскрываться, а не гаснуть.`,
        `Для обжарки: зерно плотное и по приезде к работе не готово. Дайте партии ${range(30, 45, "ru")} дней после порта, прежде чем строить профиль, и перекаппьте заново, а не берите прошлогоднюю кривую. Структура кислотности отличается достаточно, чтобы это было слышно на светло-средней обжарке.`,
      ],
    },
    {
      date: "2026-02-18",
      tag: "Аукцион",
      title: "Февральские торги: борьба идёт за верхние сита",
      paras: [
        `Вчерашние торги собрали ${num(16200, "ru")} мешков — один из крупнейших каталогов сезона — и разошлись почти полностью. AA с моек Центральной Кении ушёл первым, AB из тех же партий — следом, а PB нашёл покупателей ближе к концу торгов: весь сезон борьба идёт за верхние сита.`,
        `Причин две. Мировое предложение арабики остаётся дефицитным, поэтому покупатели закрывают потребность раньше обычного. И основной урожай, который в декабре мы оценивали в ${range(50000, 53000, "ru")} т, вышел ближе к нижней границе — около ${num(50800, "ru")} т чистого кофе.`,
        `Тем, кто ещё не закрыл кенийскую позицию на этот год: свободного кофе до промежуточного урожая больше не станет, а промежуточный урожай серьёзную программу не закроет. Закрывайте подтверждённую потребность сейчас и не трогайте спекулятивные объёмы.`,
      ],
    },
    {
      date: "2025-12-02",
      tag: "Урожай",
      title: "Поздние короткие дожди сдвинули пик основного урожая на декабрь",
      paras: [
        `Короткие дожди пришли в Ньери и Кириньягу на две-три недели позже графика, поэтому цветение и вызревание сдвинулись следом. Пик сбора основного урожая идёт теперь с середины ноября до конца декабря, а не заканчивается в ноябре, и мойки работают по ${range(14, 16, "ru")} часов, чтобы принятая ягода уходила на депульпацию в течение ${num(8, "ru")} часов.`,
        `Объёмы скорее нормальные, чем большие. Национальный урожай в чистом кофе оцениваем в ${range(50000, 53000, "ru")} т против ${num(48000, "ru")} т в прошлом сезоне; плотность ягоды и размер зерна на участках ${range(1650, 1900, "ru")} м хорошие. Дождь пришёл поздно, но ровно — это тот вариант, который нас устраивает.`,
        `Что это значит для отгрузок: обмолот и грейдинг идут весь январь, поэтому первые контейнеры нового урожая выходят из Момбасы с середины января и приходят в Новороссийск в феврале. Нужен новый урожай в первом квартале — контрактуйте в декабре, и лот пойдёт в обмолот уже под ваше имя.`,
      ],
    },
  ],

  ctaEyebrow: "Прежде чем действовать",
  ctaTitle: "Спросите, что стоит за заметкой",
  ctaLede:
    "За каждой цифрой выше стоит конкретный лот, торги или букинг, в которых мы участвовали. Если какая-то из них важна для вашего решения, покажем первоисточник: аукционный лист, каппинг-форму или подтверждение букинга.",
  disclaimerLabel: "Ориентировочно, не торговая рекомендация.",
  disclaimerText:
    "Это наши собственные наблюдения — с моек, с аукционных торгов и от букинг-отдела наших экспедиторов. Объёмы и сроки указаны ориентировочно, меняются от недели к неделе и не являются офертой, котировкой или торговой рекомендацией. Твёрдую цену на конкретный грейд и отгрузочное окно мы даём отдельным предложением.",
  cta: "Запросить актуальное предложение",
};

export const news: Record<Locale, Copy> = { en, ru };
