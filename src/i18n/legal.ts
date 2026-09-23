import { FACTS, type Locale } from './ui';

/**
 * Copy for the privacy policy and the terms page, in all three languages.
 *
 * Every statement about the website describes what the code actually does
 * (no cookies, no storage, no analytics, no forms, fonts and images served
 * with the site). If any of that changes, this copy must change with it.
 *
 * Nothing here states a rule the hotel has not confirmed: cancellation,
 * deposits, payment methods, children, pets and extra beds are deliberately
 * left to what the hotel confirms at booking.
 *
 * Inline tokens: `{email}` and `{phone}` render as links on the page.
 */

export const LEGAL_UPDATED = '2026-09-23';

export type LegalBlock = { p: string } | { list: string[] } | { contact: true };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  /** <title> */
  title: string;
  /** <meta name="description"> */
  description: string;
  eyebrow: string;
  heading: string;
  lede: string;
  sections: LegalSection[];
}

export type LegalKind = 'privacy' | 'terms';

interface LegalLocale {
  privacy: LegalDoc;
  terms: LegalDoc;
  /** Footer link labels. */
  links: Record<LegalKind, string>;
  /** Accessible name for the footer's legal link group. */
  linksLabel: string;
  updated: string;
  /** Postal address of the data controller, one line per entry. */
  address: string[];
  emailLabel: string;
  phoneLabel: string;
}

const ADDRESS: Record<Locale, string[]> = {
  uk: ['Готель «Гелікон»', 'вул. Шевченка, 45, с. Яноші', 'Берегівський р-н, Закарпатська обл., 90233', 'Україна'],
  hu: ['Hotel Helikon', 'Sevcsenko utca 45, Makkosjánosi', 'Beregszászi járás, Kárpátalja, 90233', 'Ukrajna'],
  en: ['Hotel Helikon', '45 Shevchenka St, Jánosi', 'Berehove District, Zakarpattia Oblast, 90233', 'Ukraine'],
};

const INLINE_ADDRESS: Record<Locale, string> = {
  uk: 'вул. Шевченка, 45, с. Яноші, Закарпатська обл., Україна',
  hu: 'Sevcsenko utca 45, Makkosjánosi, Kárpátalja, Ukrajna',
  en: '45 Shevchenka St, Jánosi, Zakarpattia Oblast, Ukraine',
};

export const legal: Record<Locale, LegalLocale> = {
  /* ==================================================================== UK */
  uk: {
    links: { privacy: 'Політика конфіденційності', terms: 'Умови використання' },
    linksLabel: 'Правова інформація',
    updated: 'Оновлено',
    address: ADDRESS.uk,
    emailLabel: 'Email',
    phoneLabel: 'Телефон',

    privacy: {
      title: 'Політика конфіденційності | Готель «Гелікон», Яноші',
      description:
        'Як готель «Гелікон» у Яноші на Закарпатті поводиться з персональними даними: сайт без cookie та відстеження, і що відбувається, коли ви телефонуєте чи пишете нам.',
      eyebrow: 'Правова інформація',
      heading: 'Політика конфіденційності',
      lede: 'Коротко: цей сайт не використовує cookie, аналітику чи будь-яке відстеження, і форм на ньому немає. Ваші персональні дані потрапляють до нас лише тоді, коли ви самі звертаєтеся до нас або бронюєте проживання.',
      sections: [
        {
          heading: 'Хто ми',
          blocks: [
            { p: 'Володілець персональних даних: готель «Гелікон». Наші контакти:' },
            { contact: true },
            { p: 'З усіх питань щодо ваших персональних даних пишіть на {email}.' },
          ],
        },
        {
          heading: 'Що збирає цей сайт',
          blocks: [
            { p: 'Сам сайт не збирає нічого. А саме:' },
            {
              list: [
                'Жодних cookie. Сайт їх не встановлює і нічого іншого у вашому браузері не зберігає, тому й банера про cookie тут немає.',
                'Жодної аналітики, статистики відвідувань, рекламних пікселів чи інших скриптів відстеження.',
                'Жодних форм. Ввести свої дані на сайті неможливо: з нами можна зв’язатися телефоном, електронною поштою або в месенджері.',
                'Шрифти й зображення завантажуються з того самого сервера, що й сам сайт. Тож коли ви відкриваєте сторінку, браузер не звертається ні до Google Fonts, ні до інших сторонніх сервісів.',
              ],
            },
          ],
        },
        {
          heading: 'Журнали сервера',
          blocks: [
            {
              p: 'Як і майже кожен сайт, цей працює на серверах хостинг-провайдера. Провайдер може вести стандартні технічні журнали запитів: IP-адреса, час, запитана сторінка. Вони потрібні для роботи та захисту сервісу.',
            },
          ],
        },
        {
          heading: 'Посилання на інші сервіси',
          blocks: [
            {
              p: 'На сайті є посилання на сервіси інших компаній. Доки ви не натиснете на посилання, з них нічого не завантажується. Щойно ви переходите на такий сервіс, діє його власна політика конфіденційності, а не ця:',
            },
            {
              list: [
                'Booking.com: бронювання;',
                'Google Карти: розташування й маршрут;',
                'Google Диск: меню ресторану у форматі PDF;',
                'WhatsApp, Viber і Telegram: листування з нами;',
                'Instagram і Facebook: наші сторінки.',
              ],
            },
          ],
        },
        {
          heading: 'Коли ви звертаєтеся до нас або бронюєте',
          blocks: [
            {
              p: 'Коли ви телефонуєте, надсилаєте лист чи повідомлення, ми отримуємо те, чим ви поділилися: зазвичай ім’я, номер телефону або адресу електронної пошти, дати, кількість гостей і все, що ви розповіли самі. Ці дані ми використовуємо, щоб відповісти на ваш запит, оформити бронювання й подбати про ваше проживання.',
            },
            {
              p: 'Якщо ви бронюєте через Booking.com, ваші дані обробляє Booking.com за своєю політикою конфіденційності та передає нам деталі бронювання, щоб ми могли вас прийняти.',
            },
            {
              p: 'Повідомлення у WhatsApp, Viber, Telegram, Instagram чи Facebook проходять через ці сервіси, тож на них поширюються і їхні правила.',
            },
            {
              p: 'Дані ми зберігаємо стільки, скільки потрібно для цих цілей, або довше, якщо цього вимагає закон.',
            },
          ],
        },
        {
          heading: 'Ваші права',
          blocks: [
            {
              p: 'Закон України «Про захист персональних даних» дає вам низку прав. Якщо ви перебуваєте в Угорщині чи іншій країні ЄС, подібні права гарантує вам і Загальний регламент ЄС про захист даних (GDPR). Простими словами, ви можете:',
            },
            {
              list: [
                'дізнатися, які ваші дані ми маємо, і отримати їх копію (доступ);',
                'виправити неточні або неповні дані (виправлення);',
                'вимагати видалити дані, якщо вони нам більше не потрібні або ми не маємо права їх зберігати (видалення);',
                'заперечити проти використання ваших даних (заперечення);',
                'поскаржитися до наглядового органу (скарга).',
              ],
            },
            { p: 'Щоб скористатися будь-яким із цих прав, напишіть на {email}. Ми відповімо якнайшвидше.' },
            {
              p: 'В Україні скарги розглядає Уповноважений Верховної Ради України з прав людини, також можна звернутися до суду. В Угорщині наглядовий орган називається NAIH (Nemzeti Adatvédelmi és Információszabadság Hatóság), а в інших країнах ЄС це національний орган із захисту даних.',
            },
          ],
        },
        {
          heading: 'Зміни',
          blocks: [
            {
              p: 'Якщо сайт зміниться, наприклад з’явиться форма бронювання чи статистика відвідувань, ми оновимо цю сторінку та дату вгорі.',
            },
          ],
        },
      ],
    },

    terms: {
      title: 'Умови використання | Готель «Гелікон», Яноші',
      description:
        'Умови користування сайтом готелю «Гелікон» і що варто знати перед поїздкою в Яноші: орієнтовні ціни, підтвердження бронювання, час заїзду та виїзду.',
      eyebrow: 'Правова інформація',
      heading: 'Умови використання',
      lede: 'Ці умови стосуються користування сайтом і основних правил проживання. Усе, що стосується саме вашого перебування, ми підтверджуємо під час бронювання.',
      sections: [
        {
          heading: 'Про сайт',
          blocks: [
            {
              p: `Сайт належить готелю «Гелікон» (${INLINE_ADDRESS.uk}). Тут ми розповідаємо про готель, номери, ресторан і наші послуги. Інформація на сайті має довідковий характер: сама по собі вона не є бронюванням.`,
            },
            {
              p: 'Ми стежимо, щоб усе було актуальним, але графік роботи, послуги чи сезон басейну можуть змінюватися. Якщо щось важливо для ваших планів, уточніть у нас.',
            },
          ],
        },
        {
          heading: 'Ціни',
          blocks: [
            {
              p: 'Ціни на номери, вказані на сайті, орієнтовні: це ціни «від» за ніч у гривнях. Остаточною є ціна, яку вам підтвердить готель або Booking.com під час бронювання. Те саме стосується й інших цін на сайті.',
            },
          ],
        },
        {
          heading: 'Бронювання',
          blocks: [
            {
              p: 'Бронювання через Booking.com регулюється умовами Booking.com і правилами, які показані для вашого номера й тарифу на момент бронювання.',
            },
            {
              p: 'Якщо ви бронюєте напряму в нас, телефоном, листом чи в месенджері, діє те, що ми підтвердили вам письмово.',
            },
            {
              p: 'Скасування, передоплату чи депозит, способи оплати, проживання з дітьми або тваринами та додаткові ліжка ми погоджуємо під час бронювання. Загальних правил щодо цього ми тут не публікуємо, тож просто запитайте.',
            },
          ],
        },
        {
          heading: 'Заїзд і виїзд',
          blocks: [
            {
              p: `Заїзд з ${FACTS.checkIn}, виїзд до ${FACTS.checkOut}. Якщо вам потрібно приїхати раніше або виїхати пізніше, запитайте нас заздалегідь.`,
            },
          ],
        },
        {
          heading: 'Посилання на інші сайти',
          blocks: [
            {
              p: 'Посилання на Booking.com, Google Карти, месенджери й соцмережі ведуть на сторонні сервіси з власними умовами. За їхній вміст ми не відповідаємо.',
            },
          ],
        },
        {
          heading: 'Фото й тексти',
          blocks: [
            {
              p: 'Фотографії та тексти на сайті належать готелю «Гелікон». Будь ласка, не копіюйте й не використовуйте їх без нашого дозволу. А от поділитися посиланням на сайт можна завжди.',
            },
          ],
        },
        {
          heading: 'Питання',
          blocks: [{ p: 'Пишіть на {email} або телефонуйте: {phone}.' }],
        },
      ],
    },
  },

  /* ==================================================================== HU */
  hu: {
    links: { privacy: 'Adatvédelem', terms: 'Felhasználási feltételek' },
    linksLabel: 'Jogi információk',
    updated: 'Utoljára frissítve',
    address: ADDRESS.hu,
    emailLabel: 'E-mail',
    phoneLabel: 'Telefon',

    privacy: {
      title: 'Adatvédelmi tájékoztató | Hotel Helikon, Makkosjánosi',
      description:
        'Hogyan kezeli a makkosjánosi Hotel Helikon a személyes adatokat: sütik és követés nélküli weboldal, és mi történik, ha felhívsz vagy írsz nekünk.',
      eyebrow: 'Jogi információk',
      heading: 'Adatvédelmi tájékoztató',
      lede: 'Röviden: ez a weboldal nem használ sütiket, látogatottságmérést vagy bármilyen követést, és űrlap sincs rajta. A személyes adataidat csak akkor kapjuk meg, ha te keresel meg minket, vagy szállást foglalsz.',
      sections: [
        {
          heading: 'Kik vagyunk',
          blocks: [
            { p: 'Az adatkezelő a Hotel Helikon. Az elérhetőségeink:' },
            { contact: true },
            { p: 'Ha a személyes adataiddal kapcsolatban bármilyen kérdésed van, írj a {email} címre.' },
          ],
        },
        {
          heading: 'Mit gyűjt ez a weboldal?',
          blocks: [
            { p: 'Maga a weboldal semmit. Pontosabban:' },
            {
              list: [
                'Nincsenek sütik. Az oldal nem helyez el sütit, és mást sem tárol a böngésződben, ezért sütikről szóló felugró ablakot sem látsz.',
                'Nincs látogatottságmérés, statisztika, hirdetési pixel vagy más követőkód.',
                'Nincs űrlap. Az oldalon nem tudsz személyes adatot megadni: telefonon, e-mailben vagy üzenetküldőn érsz el minket.',
                'A betűtípusok és a képek ugyanarról a szerverről töltődnek be, mint maga a weboldal. Amikor megnyitsz egy oldalt, a böngésződ nem fordul sem a Google Fontshoz, sem más külső szolgáltatáshoz.',
              ],
            },
          ],
        },
        {
          heading: 'Szervernaplók',
          blocks: [
            {
              p: 'Mint szinte minden weboldal, ez is egy tárhelyszolgáltató szerverein fut. A szolgáltató vezethet szokásos technikai naplót a kérésekről (IP-cím, időpont, lekért oldal). Ezekre a szolgáltatás működtetéséhez és védelméhez van szükség.',
            },
          ],
        },
        {
          heading: 'Linkek más szolgáltatásokra',
          blocks: [
            {
              p: 'Az oldalon más cégek szolgáltatásaira mutató linkek is vannak. Amíg nem kattintasz rájuk, tőlük semmi sem töltődik be. Ha megnyitod valamelyiket, onnantól az adott szolgáltatás saját adatvédelmi szabályai érvényesek, nem ez a tájékoztató:',
            },
            {
              list: [
                'Booking.com: foglalás;',
                'Google Térkép: helyszín és útvonal;',
                'Google Drive: az étterem étlapja PDF-ben;',
                'WhatsApp, Viber és Telegram: üzenetküldés;',
                'Instagram és Facebook: a saját oldalaink.',
              ],
            },
          ],
        },
        {
          heading: 'Ha megkeresel minket vagy foglalsz',
          blocks: [
            {
              p: 'Ha felhívsz, e-mailt vagy üzenetet küldesz, azt kapjuk meg, amit megosztasz velünk: általában a nevedet, a telefonszámodat vagy az e-mail-címedet, az időpontokat, a vendégek számát és mindent, amit még elmondasz. Ezeket arra használjuk, hogy válaszoljunk a kérdésedre, intézzük a foglalásodat, és minden rendben menjen, amíg nálunk vagy.',
            },
            {
              p: 'Ha a Booking.com-on foglalsz, az adataidat a Booking.com a saját adatvédelmi szabályai szerint kezeli, és a foglalás részleteit továbbítja nekünk, hogy fogadni tudjunk.',
            },
            {
              p: 'A WhatsAppon, Viberen, Telegramon, Instagramon vagy Facebookon küldött üzenetek ezeken a szolgáltatásokon is keresztülmennek, így rájuk az ő szabályaik is vonatkoznak.',
            },
            {
              p: 'Az adatokat addig őrizzük meg, amíg ezekhez a célokhoz szükség van rájuk, vagy tovább, ha jogszabály így írja elő.',
            },
          ],
        },
        {
          heading: 'A jogaid',
          blocks: [
            {
              p: 'Ha az EU-ból, például Magyarországról érkezel hozzánk, a jogaidat az általános adatvédelmi rendelet (GDPR) biztosítja. Hasonló jogokat ad a személyes adatok védelméről szóló ukrán törvény is. Egyszerűen fogalmazva:',
            },
            {
              list: [
                'megkérdezheted, milyen adatod van nálunk, és másolatot kérhetsz róla (hozzáférés);',
                'kérheted, hogy a téves vagy hiányos adatot javítsuk ki (helyesbítés);',
                'kérheted az adataid törlését, ha már nincs rájuk szükségünk, vagy nincs jogunk megőrizni őket (törlés);',
                'tiltakozhatsz az adataid felhasználása ellen (tiltakozás);',
                'panaszt tehetsz a felügyeleti hatóságnál (panasz).',
              ],
            },
            {
              p: 'Bármelyik jogodat úgy gyakorolhatod, hogy írsz a {email} címre. A lehető leghamarabb válaszolunk.',
            },
            {
              p: 'Magyarországon a felügyeleti hatóság a Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), az EU többi országában az ottani adatvédelmi hatóság. Ukrajnában az ukrán parlament emberi jogi biztosához fordulhatsz, vagy bírósághoz.',
            },
          ],
        },
        {
          heading: 'Változások',
          blocks: [
            {
              p: 'Ha a weboldal megváltozik, például foglalási űrlap vagy látogatottságmérés kerül rá, frissítjük ezt a tájékoztatót és a fenti dátumot.',
            },
          ],
        },
      ],
    },

    terms: {
      title: 'Felhasználási feltételek | Hotel Helikon, Makkosjánosi',
      description:
        'A Hotel Helikon weboldalának felhasználási feltételei, és amit érdemes tudnod az utazás előtt: tájékoztató árak, a foglalás visszaigazolása, érkezés és távozás.',
      eyebrow: 'Jogi információk',
      heading: 'Felhasználási feltételek',
      lede: 'Ezek a feltételek a weboldal használatára és a nálunk töltött idő alapjaira vonatkoznak. Ami kifejezetten a te foglalásodat érinti, azt foglaláskor igazoljuk vissza.',
      sections: [
        {
          heading: 'A weboldalról',
          blocks: [
            {
              p: `A weboldalt a Hotel Helikon működteti (${INLINE_ADDRESS.hu}). Itt mutatjuk be a szállodát, a szobákat, az éttermet és a szolgáltatásainkat. Az oldalon található információk tájékoztató jellegűek, önmagukban nem jelentenek foglalást.`,
            },
            {
              p: 'Igyekszünk mindent naprakészen tartani, de a nyitvatartás, a szolgáltatások vagy a medenceszezon változhat. Ha valami fontos a terveidhez, kérdezz rá nálunk.',
            },
          ],
        },
        {
          heading: 'Árak',
          blocks: [
            {
              p: 'A szobáknál látható árak tájékoztató jellegű kezdőárak: egy éjszakára szólnak, hrivnyában. A ténylegesen fizetendő ár az, amelyet foglaláskor a szálloda vagy a Booking.com visszaigazol. Ugyanez érvényes az oldalon szereplő többi árra is.',
            },
          ],
        },
        {
          heading: 'Foglalás',
          blocks: [
            {
              p: 'A Booking.com-on leadott foglalásra a Booking.com feltételei, valamint a foglaláskor az adott szobánál és díjcsomagnál feltüntetett szabályok vonatkoznak.',
            },
            {
              p: 'Ha közvetlenül nálunk foglalsz (telefonon, e-mailben vagy üzenetküldőn), az érvényes, amit írásban visszaigazolunk neked.',
            },
            {
              p: 'A lemondás, az előleg vagy kaució, a fizetési módok, a gyerekkel vagy háziállattal érkezés és a pótágy feltételeit foglaláskor egyeztetjük. Ezekre itt nem teszünk közzé általános szabályt, ezért kérdezz nyugodtan.',
            },
          ],
        },
        {
          heading: 'Érkezés és távozás',
          blocks: [
            {
              p: `Érkezés ${FACTS.checkIn}-tól, távozás ${FACTS.checkOut}-ig. Ha korábban érkeznél vagy később indulnál, jelezd nekünk előre.`,
            },
          ],
        },
        {
          heading: 'Más weboldalak',
          blocks: [
            {
              p: 'A Booking.com-ra, a Google Térképre, az üzenetküldőkre és a közösségi oldalakra mutató linkek külső szolgáltatásokhoz visznek, amelyeknek saját feltételeik vannak. Ezek tartalmáért nem tudunk felelősséget vállalni.',
            },
          ],
        },
        {
          heading: 'Fotók és szövegek',
          blocks: [
            {
              p: 'Az oldalon látható fényképek és szövegek a Hotel Helikon tulajdonában vannak. Kérjük, engedélyünk nélkül ne másold és ne használd fel őket. A weboldal linkjét viszont bármikor nyugodtan megoszthatod.',
            },
          ],
        },
        {
          heading: 'Kérdésed van?',
          blocks: [{ p: 'Írj a {email} címre, vagy hívj minket: {phone}.' }],
        },
      ],
    },
  },

  /* ==================================================================== EN */
  en: {
    links: { privacy: 'Privacy policy', terms: 'Terms and conditions' },
    linksLabel: 'Legal',
    updated: 'Last updated',
    address: ADDRESS.en,
    emailLabel: 'Email',
    phoneLabel: 'Phone',

    privacy: {
      title: 'Privacy policy | Hotel Helikon, Jánosi',
      description:
        'How Hotel Helikon in Jánosi, Transcarpathia handles personal data: a website with no cookies or tracking, and what happens when you call, email or message us.',
      eyebrow: 'Legal',
      heading: 'Privacy policy',
      lede: 'In short: this website uses no cookies, no analytics and no tracking of any kind, and it has no forms. We only receive your personal data when you get in touch with us or book a stay.',
      sections: [
        {
          heading: 'Who we are',
          blocks: [
            { p: 'The data controller is Hotel Helikon. You can reach us here:' },
            { contact: true },
            { p: 'For any question about your personal data, write to {email}.' },
          ],
        },
        {
          heading: 'What this website collects',
          blocks: [
            { p: 'The website itself collects nothing. To be specific:' },
            {
              list: [
                'No cookies. The site sets none and stores nothing else in your browser, which is why there is no cookie banner.',
                'No analytics, visitor statistics, advertising pixels or other tracking scripts.',
                'No forms. There is nowhere on the site to enter personal data: you reach us by phone, email or messenger instead.',
                'Fonts and images are served from the same server as the site itself, so opening a page does not make your browser contact Google Fonts or any other outside service.',
              ],
            },
          ],
        },
        {
          heading: 'Server logs',
          blocks: [
            {
              p: 'Like almost every website, this one runs on a hosting provider’s servers. The provider may keep standard technical logs of requests, such as your IP address, the time and the page requested. These logs are there to run and protect the service.',
            },
          ],
        },
        {
          heading: 'Links to other services',
          blocks: [
            {
              p: 'The site links to services run by other companies. Nothing loads from them until you click. Once you open one, that service’s own privacy policy applies, not this one:',
            },
            {
              list: [
                'Booking.com, for bookings;',
                'Google Maps, for our location and directions;',
                'Google Drive, for the restaurant menu as a PDF;',
                'WhatsApp, Viber and Telegram, for messaging us;',
                'Instagram and Facebook, for our pages.',
              ],
            },
          ],
        },
        {
          heading: 'When you contact us or book',
          blocks: [
            {
              p: 'When you call, email or message us, we receive what you choose to share: usually your name, your phone number or email address, your dates, the number of guests and anything else you tell us. We use it to answer your enquiry, arrange your booking and look after you during your stay.',
            },
            {
              p: 'If you book through Booking.com, Booking.com handles your data under its own privacy policy and passes the reservation details on to us so that we can host you.',
            },
            {
              p: 'Messages sent through WhatsApp, Viber, Telegram, Instagram or Facebook also pass through those services, so their rules apply to them too.',
            },
            {
              p: 'We keep the data for as long as we need it for these purposes, or longer where the law requires it.',
            },
          ],
        },
        {
          heading: 'Your rights',
          blocks: [
            {
              p: 'If you are visiting from the EU, for example from Hungary, the General Data Protection Regulation (GDPR) gives you the rights below. The Law of Ukraine “On Personal Data Protection” grants similar ones. In plain terms, you can:',
            },
            {
              list: [
                'ask what data we hold about you and get a copy of it (access);',
                'have wrong or incomplete data corrected (rectification);',
                'ask us to delete your data when we no longer need it or have no right to keep it (erasure);',
                'object to our use of your data (objection);',
                'complain to a supervisory authority (complaint).',
              ],
            },
            { p: 'To use any of these rights, write to {email}. We will reply as soon as we can.' },
            {
              p: 'In Hungary the supervisory authority is the Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH); elsewhere in the EU, it is your national data protection authority. In Ukraine you can turn to the Ukrainian Parliament Commissioner for Human Rights, or to the courts.',
            },
          ],
        },
        {
          heading: 'Changes',
          blocks: [
            {
              p: 'If the website changes, for instance if we add a booking form or visitor statistics, we will update this page and the date at the top.',
            },
          ],
        },
      ],
    },

    terms: {
      title: 'Terms and conditions | Hotel Helikon, Jánosi',
      description:
        'Terms for using the Hotel Helikon website and what to know before a stay in Jánosi: indicative prices, how bookings are confirmed, check-in and check-out times.',
      eyebrow: 'Legal',
      heading: 'Terms and conditions',
      lede: 'These terms cover the use of this website and the basics of staying with us. Anything specific to your own stay is what we confirm to you when you book.',
      sections: [
        {
          heading: 'About this website',
          blocks: [
            {
              p: `This website is run by Hotel Helikon (${INLINE_ADDRESS.en}). It tells you about the hotel, the rooms, the restaurant and our services. Its content is for information only, and nothing on it makes a booking by itself.`,
            },
            {
              p: 'We keep the information as current as we can, but things like opening hours, services or the pool season can change. If something matters for your plans, check with us.',
            },
          ],
        },
        {
          heading: 'Prices',
          blocks: [
            {
              p: 'Room prices on the site are indicative “from” prices per night, in Ukrainian hryvnias. The price that applies is the one the hotel or Booking.com confirms to you when you book. The same goes for any other price shown on the site.',
            },
          ],
        },
        {
          heading: 'Bookings',
          blocks: [
            {
              p: 'A booking made through Booking.com is governed by Booking.com’s terms and by the conditions shown for your room and rate at the time you book.',
            },
            {
              p: 'If you book directly with us, by phone, email or messenger, what we confirm to you in writing applies.',
            },
            {
              p: 'Cancellation, prepayment or deposit, payment methods, children, pets and extra beds are all agreed when you book. We do not publish general rules for them here, so please ask.',
            },
          ],
        },
        {
          heading: 'Check-in and check-out',
          blocks: [
            {
              p: `Check-in is from ${FACTS.checkIn} and check-out is by ${FACTS.checkOut}. If you need to arrive earlier or leave later, ask us in advance.`,
            },
          ],
        },
        {
          heading: 'Links to other websites',
          blocks: [
            {
              p: 'Links to Booking.com, Google Maps, messaging apps and social networks lead to outside services with their own terms. We are not responsible for their content.',
            },
          ],
        },
        {
          heading: 'Photos and texts',
          blocks: [
            {
              p: 'The photos and texts on this site belong to Hotel Helikon. Please do not copy or reuse them without our permission. Sharing a link to the site is always welcome.',
            },
          ],
        },
        {
          heading: 'Questions',
          blocks: [{ p: 'Write to {email} or call us on {phone}.' }],
        },
      ],
    },
  },
};
