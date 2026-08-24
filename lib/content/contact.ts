// Contact page copy: the direct-line list and every string the price-request
// form needs — labels, placeholders, select options, toasts and the composed
// e-mail body. The form is a client component, so its copy is passed down as
// one `form` object rather than imported there (a client file importing this
// module would ship both locales to the browser).
import { company } from "@/lib/data";
import { num, type Locale } from "@/lib/i18n";

type Field = { label: string; placeholder: string };

/** Everything <ContactForm> renders. Exported so the component types its prop. */
export type ContactFormCopy = {
  name: Field;
  company: Field;
  contact: Field;
  city: Field;
  message: Field;
  /** Options are plain strings: they travel verbatim into the e-mail body. */
  grade: { label: string; options: string[] };
  volume: { label: string; options: string[] };
  submit: string;
  copy: string;
  /** mailto: subject line. The locale tag is appended by the component. */
  subject: string;
  /** First line of the composed e-mail. */
  bodyTitle: string;
  /** Stand-in for a field the buyer left empty. */
  blank: string;
  errContact: string;
  toastMail: string;
  toastCopied: string;
  toastCopyFailed: string;
  note: string;
};

type Line = { note: string };

type Copy = {
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  h1: string;
  heroLede: string;
  /** Four hero figures: [big, caption]. */
  facts: [string, string][];

  linesEyebrow: string;
  linesTitle: string;
  linesLede: string;
  /** Captions under each number/address, in the order the page lists them. */
  lines: { phoneKe: Line; phoneRu: Line; email: Line; site: Line; office: Line };
  /** Office location — a proper noun, so it is translated rather than in lib/data. */
  officeValue: string;
  mailSubject: string;
  hoursNote: string;

  formTitle: string;
  form: ContactFormCopy;
};

const en: Copy = {
  metaTitle: "Contact and price requests",
  metaDescription:
    "Reach Simon Karanja Coffee Exports direct: phone and WhatsApp in Kenya and Russia, e-mail, and a price request form for AA, AB and PB green coffee — FOB Mombasa through to DAP your warehouse.",

  eyebrow: "Contact · Price requests",
  h1: "Request a price list and a sample",
  heroLede:
    "Tell us the grade, the volume and the delivery city. You get prices per grade, the lots actually in store right now, and a landed cost on the basis you contract on — within one working day.",
  facts: [
    [`${num(1, "en")} working day`, "reply to a price request"],
    [`${num(30, "en")} kg`, "smallest sample lot we ship"],
    ["FOB · CFR · CIF · DAP", "price bases we quote"],
    ["EN · RU", "languages we contract in"],
  ],

  linesEyebrow: "Direct lines",
  linesTitle: "You are talking to the exporter, not an agent",
  linesLede:
    "The same people mill the coffee, cup it and sign the bill of lading. Prices, sample availability and shipping dates come back from the desk that actually controls them.",
  lines: {
    phoneKe: { note: "Kenya · WhatsApp available" },
    phoneRu: { note: "Russia · calls and WhatsApp" },
    email: { note: "commercial enquiries" },
    site: { note: "company website" },
    office: { note: "exporter's office and warehouse" },
  },
  officeValue: "Nairobi, Kenya",
  mailSubject: "Price request",
  hoursNote:
    "Nairobi runs on EAT (UTC+3) — the same clock as Moscow, so there is no time difference to work around. We answer Monday to Friday, 08:00–18:00, and read WhatsApp on Saturdays during the harvest.",

  formTitle: "Price request",
  form: {
    name: { label: "Name", placeholder: "How should we address you" },
    company: { label: "Company", placeholder: "Roastery, importer, trader" },
    contact: { label: "E-mail or phone", placeholder: "so we can reply" },
    city: { label: "Delivery city", placeholder: "Moscow, Novosibirsk, Almaty…" },
    message: {
      label: "Comments",
      placeholder: "Roast profile, timing, document requirements",
    },
    grade: {
      label: "Grade",
      options: [
        "AA · screen 17/18",
        "AB · screen 15/16",
        "PB · peaberry",
        "Not sure — please advise",
      ],
    },
    volume: {
      label: "Volume",
      options: [
        `${num(30, "en")} kg — sample lot`,
        `${num(300, "en")} kg`,
        `${num(1, "en")} tonne`,
        `${num(5, "en")}+ tonnes / container`,
      ],
    },
    submit: "Send the request",
    copy: "Copy the text",
    subject: "Price request — Kenyan green coffee",
    bodyTitle: "Price request for Kenyan green coffee",
    blank: "—",
    errContact: "Add an e-mail or a phone number — otherwise we cannot reply.",
    toastMail: "Opening your mail client…",
    toastCopied: "Request text copied.",
    toastCopyFailed: "Copying failed — select the text manually.",
    note: `The button opens your mail client with the message ready to send to ${company.email}. If nothing opens, copy the text and send it to us on WhatsApp.`,
  },
};

const ru: Copy = {
  metaTitle: "Контакты",
  metaDescription:
    "Свяжитесь с Simon Karanja Coffee Exports: телефоны, WhatsApp, e-mail и форма запроса прайса на кенийский зелёный кофе.",

  eyebrow: "Контакты · Запрос прайса",
  h1: "Запросите прайс и образец",
  heroLede:
    "Ответим в течение одного рабочего дня: актуальные цены по грейдам, доступные лоты и условия доставки в ваш город.",
  facts: [
    [`${num(1, "ru")} рабочий день`, "срок ответа на запрос"],
    [`${num(30, "ru")} кг`, "минимальная пробная партия"],
    ["FOB · CFR · CIF · DAP", "базисы, по которым котируем"],
    ["RU · EN", "языки переписки и контракта"],
  ],

  linesEyebrow: "Прямые контакты",
  linesTitle: "Вы общаетесь с экспортёром, а не с посредником",
  linesLede:
    "Те же люди обрабатывают кофе, каппингуют его и подписывают коносамент. Цены, наличие образцов и даты отгрузки приходят от тех, кто ими реально распоряжается.",
  lines: {
    phoneKe: { note: "Кения · WhatsApp доступен" },
    phoneRu: { note: "Россия · звонки и WhatsApp" },
    email: { note: "коммерческие запросы" },
    site: { note: "сайт компании" },
    office: { note: "офис и склад экспортёра" },
  },
  officeValue: "Найроби, Кения",
  mailSubject: "Запрос прайса",
  hoursNote:
    "Найроби живёт по EAT (UTC+3) — это то же время, что и в Москве, разницы в часах нет. Отвечаем с понедельника по пятницу, 08:00–18:00, а в сезон урожая читаем WhatsApp и по субботам.",

  formTitle: "Запрос прайса",
  form: {
    name: { label: "Имя", placeholder: "Как к вам обращаться" },
    company: { label: "Компания", placeholder: "Обжарочная, импортёр" },
    contact: { label: "E-mail или телефон", placeholder: "для ответа" },
    city: { label: "Город доставки", placeholder: "Москва, Новосибирск…" },
    message: {
      label: "Комментарий",
      placeholder: "Профиль обжарки, сроки, требования к документам",
    },
    grade: {
      label: "Грейд",
      options: [
        "AA · скрин 17/18",
        "AB · скрин 15/16",
        "PB · пиберри",
        "Нужна консультация",
      ],
    },
    volume: {
      label: "Объём",
      options: [
        `${num(30, "ru")} кг — пробная партия`,
        `${num(300, "ru")} кг`,
        `${num(1, "ru")} тонна`,
        `${num(5, "ru")}+ тонн / контейнер`,
      ],
    },
    submit: "Отправить запрос",
    copy: "Скопировать текст",
    subject: "Запрос прайса — зелёный кофе Кении",
    bodyTitle: "Запрос прайса на кенийский зелёный кофе",
    blank: "—",
    errContact: "Укажите e-mail или телефон — иначе мы не сможем ответить.",
    toastMail: "Открываем почтовый клиент…",
    toastCopied: "Текст запроса скопирован.",
    toastCopyFailed: "Скопировать не удалось — выделите текст вручную.",
    note: `Кнопка открывает ваш почтовый клиент с готовым письмом на ${company.email}. Если письмо не открылось — скопируйте текст и отправьте нам в WhatsApp.`,
  },
};

export const contact: Record<Locale, Copy> = { en, ru };
