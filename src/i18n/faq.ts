import { FACTS, type Locale } from './ui';

/**
 * Pre-booking questions, answered only from facts that have a source (see
 * FACTS in ui.ts and the hotel's verified-facts note). The same strings feed
 * the visible FAQ and its FAQPage structured data, so the two can never drift
 * apart: Google treats FAQ markup that differs from the page as spam.
 *
 * Answers are plain text on purpose. Links or markup inside them would make
 * the structured-data copy differ from what a reader sees.
 */
export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCopy {
  eyebrow: string;
  title: string;
  more: string;
  moreCta: string;
  items: FaqItem[];
}

const { checkIn, checkOut, poolLength, poolTempMin, poolTempMax } = FACTS;

const num = (locale: Locale, n: number) => new Intl.NumberFormat(locale === 'en' ? 'en-GB' : locale).format(n);

export const FAQ: Record<Locale, FaqCopy> = {
  uk: {
    eyebrow: 'Питання та відповіді',
    title: 'Що варто знати перед бронюванням',
    more: 'Маєте інше питання? Напишіть або зателефонуйте нам.',
    moreCta: 'Контакти',
    items: [
      {
        q: 'Чи входить сніданок у вартість?',
        a: 'Так. Сніданок «шведський стіл» входить у вартість кожного номера.',
      },
      {
        q: 'Чи є парковка і зарядка для електромобіля?',
        a: 'Так. Парковка на території готелю безкоштовна й під відеонаглядом, а для електромобілів є зарядна станція.',
      },
      {
        q: 'Чи можна приїхати з домашньою твариною?',
        a: 'Так, з домашніми тваринами можна. За тварину може бути додаткова плата, тож, будь ласка, попередьте нас під час бронювання.',
      },
      {
        q: 'О котрій заїзд і виїзд?',
        a: `Заїзд з ${checkIn}, виїзд до ${checkOut}.`,
      },
      {
        q: 'Як можна оплатити проживання?',
        a: 'Оплатити можна готівкою або банківською карткою.',
      },
      {
        q: 'Як далеко готель від Берегового?',
        a: 'Приблизно 6 км. Готель «Гелікон» розташований у селі Яноші Берегівського району на Закарпатті.',
      },
      {
        q: 'Коли працює басейн?',
        a: `Басейн ${poolLength} × ${num('uk', FACTS.poolWidth)} м підігрівають до ${poolTempMin}–${poolTempMax} °C два теплові насоси на сонячних батареях. Сезон починається влітку й триває приблизно до середини жовтня. Глибша частина має ${num('uk', FACTS.poolDepth)} м, а для гостей готелю вхід безкоштовний.`,
      },
      {
        q: 'Чи є в готелі ліфт?',
        a: 'Так, ліфт є, тож валізи сходами носити не доведеться.',
      },
    ],
  },
  hu: {
    eyebrow: 'Gyakori kérdések',
    title: 'Amit érdemes tudnod foglalás előtt',
    more: 'Más kérdésed van? Írj nekünk, vagy hívj fel minket.',
    moreCta: 'Kapcsolat',
    items: [
      {
        q: 'Benne van a reggeli az árban?',
        a: 'Igen. A svédasztalos reggeli minden szoba árában benne van.',
      },
      {
        q: 'Van parkoló? Tölthetek elektromos autót?',
        a: 'Igen. A szálloda területén ingyen parkolhatsz, a parkolót kamera figyeli, és elektromos autót is tölthetsz nálunk.',
      },
      {
        q: 'Hozhatok háziállatot?',
        a: 'Igen, háziállattal is jöhetsz. Előfordulhat, hogy felárat kérünk érte, ezért foglaláskor jelezd, hogy állattal érkezel.',
      },
      {
        q: 'Mikor lehet érkezni és távozni?',
        a: `A szobát ${checkIn}-tól foglalhatod el, és ${checkOut}-ig kell átadnod.`,
      },
      {
        q: 'Hogyan fizethetek?',
        a: 'Készpénzzel és bankkártyával is fizethetsz.',
      },
      {
        q: 'Milyen messze van a szálloda Beregszásztól?',
        a: 'Körülbelül 6 kilométerre. A Hotel Helikon Makkosjánosiban található, a Beregszászi járásban, Kárpátalján.',
      },
      {
        q: 'Mikor lehet használni a medencét?',
        a: `A ${poolLength} × ${num('hu', FACTS.poolWidth)} méteres medencét két napelemes hőszivattyú fűti ${poolTempMin}–${poolTempMax} °C-osra. A szezon nyáron kezdődik, és nagyjából október közepéig tart. A mélyebbik része ${num('hu', FACTS.poolDepth)} méteres. Szállóvendégeinknek ingyenes.`,
      },
      {
        q: 'Van lift a szállodában?',
        a: 'Igen, van lift, így a csomagjaidat nem kell a lépcsőn cipelned.',
      },
    ],
  },
  en: {
    eyebrow: 'Questions and answers',
    title: 'Good to know before you book',
    more: 'Anything else you would like to know? Call or message us.',
    moreCta: 'Contact',
    items: [
      {
        q: 'Is breakfast included?',
        a: 'Yes. The buffet breakfast is included in the price of every room.',
      },
      {
        q: 'Is there parking, and can I charge an electric car?',
        a: 'Yes. Parking on the hotel grounds is free and covered by CCTV, and there is a charger for electric cars.',
      },
      {
        q: 'Can I bring my pet?',
        a: 'Yes, pets are welcome. A fee may apply, so please mention your pet when you book.',
      },
      {
        q: 'What are the check-in and check-out times?',
        a: `Check-in is from ${checkIn} and check-out is by ${checkOut}.`,
      },
      {
        q: 'How can I pay?',
        a: 'You can pay in cash or by card.',
      },
      {
        q: 'How far is Hotel Helikon from Berehove?',
        a: 'About 6 km. The hotel is in the village of Jánosi (Makkosjánosi) in Berehove District, Transcarpathia, Ukraine.',
      },
      {
        q: 'When is the heated pool open?',
        a: `The ${poolLength} × ${num('en', FACTS.poolWidth)} m pool is heated to ${poolTempMin}–${poolTempMax} °C by two solar-powered heat pumps. The season starts in summer and runs until about mid-October. The deep end is ${num('en', FACTS.poolDepth)} m, and hotel guests swim free.`,
      },
      {
        q: 'Is there a lift?',
        a: 'Yes, so you will not have to carry your luggage up the stairs.',
      },
    ],
  },
};

/**
 * JSON for a <script type="application/ld+json"> body. JSON.stringify alone is
 * not safe there: a string containing `</script>` or `<!--` would end or
 * corrupt the script element. Escaping `<`, `>` and `&` as \u sequences keeps
 * the JSON identical to a parser while giving the HTML tokenizer nothing to
 * act on. U+2028/2029 are escaped for older JavaScript consumers.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
