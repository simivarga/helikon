import { DEFAULT_LOCALE, type Locale } from './ui';

/**
 * Copy for the per-room detail pages (/rooms/<slug>/). Kept apart from ui.ts so
 * the room pages can evolve without touching the shared dictionary. Room names,
 * descriptions, amenity labels and the price wording still come from ui.ts, so
 * a renamed room updates everywhere at once.
 *
 * Placeholders in braces are filled from the second argument of `rp()`.
 */
const strings: Record<Locale, Record<string, string>> = {
  uk: {
    // <title> stays within 60 characters and the description within 155 for
    // the longest room name in each language.
    'rp.metaTitle': '{name} | Готель Гелікон біля Берегового',
    'rp.metaDesc':
      '{name} у готелі «Гелікон» у Яноші біля Берегового: {cap}, сніданок включено, від {price} ₴ за ніч. Бронюйте онлайн або телефонуйте.',
    'rp.hotel': 'Готель Гелікон',
    'rp.home': 'Головна',
    'rp.breadcrumb': 'Навігаційний ланцюжок',
    'rp.allRooms': 'Усі номери',
    'rp.priceLabel': 'Орієнтовна ціна',
    'rp.priceNote': 'Точну ціну на ваші дати побачите під час бронювання.',
    'rp.bookOnline': 'Забронювати на Booking.com',
    'rp.directTitle': 'Бронюйте напряму',
    'rp.directText': 'Зателефонуйте на рецепцію або напишіть у WhatsApp. Підкажемо, чи є вільний номер на ваші дати, і відповімо на запитання.',
    'rp.call': 'Зателефонувати',
    'rp.whatsapp': 'Написати у WhatsApp',
    'rp.stayTitle': 'Варто знати',
    'rp.capacity': 'Місткість',
    'rp.breakfast': 'Сніданок',
    'rp.breakfastValue': 'шведський стіл, входить у вартість',
    'rp.checkIn': 'Заїзд',
    'rp.checkInValue': 'з {time}',
    'rp.checkOut': 'Виїзд',
    'rp.checkOutValue': 'до {time}',
    'rp.parking': 'Парковка',
    'rp.parkingValue': 'безкоштовна, на території готелю',
    'rp.amenitiesTitle': 'У номері',
    'rp.hotelTitle': 'Для гостей готелю',
    'rp.hotel.pool': 'Басейн',
    'rp.hotel.poolNote': 'безкоштовно для гостей, у сезон',
    'rp.hotel.restaurant': 'Ресторан',
    'rp.hotel.restaurantNote': 'закарпатська та угорська кухня',
    'rp.hotel.wellness': 'Сауна й соляна кімната',
    'rp.hotel.wellnessNote': 'за попереднім записом',
    'rp.otherTitle': 'Інші номери',
    'rp.from': 'від {price} ₴ за ніч',
  },
  hu: {
    'rp.metaTitle': '{name} | Hotel Helikon, Beregszász mellett',
    'rp.metaDesc':
      '{name} szoba a Hotel Helikonban, Makkosjánosiban, Beregszász mellett. {cap}, reggelivel, már {price} UAH/éj. Foglalj online vagy hívj minket.',
    'rp.hotel': 'Hotel Helikon',
    'rp.home': 'Főoldal',
    'rp.breadcrumb': 'Navigációs útvonal',
    'rp.allRooms': 'Az összes szoba',
    'rp.priceLabel': 'Irányár',
    'rp.priceNote': 'A kiválasztott napokra szóló pontos árat foglaláskor látod.',
    'rp.bookOnline': 'Foglalás a Booking.com-on',
    'rp.directTitle': 'Foglalj közvetlenül',
    'rp.directText': 'Hívd a recepciót, vagy írj WhatsAppon. Megmondjuk, van-e szabad szoba azokra a napokra, és válaszolunk a kérdéseidre.',
    'rp.call': 'Hívás',
    'rp.whatsapp': 'Írj WhatsAppon',
    'rp.stayTitle': 'Jó, ha tudod',
    'rp.capacity': 'Férőhely',
    'rp.breakfast': 'Reggeli',
    'rp.breakfastValue': 'svédasztalos, benne van az árban',
    'rp.checkIn': 'Érkezés',
    'rp.checkInValue': '{time}-tól',
    'rp.checkOut': 'Távozás',
    'rp.checkOutValue': '{time}-ig',
    'rp.parking': 'Parkolás',
    'rp.parkingValue': 'ingyenes, a szálloda területén',
    'rp.amenitiesTitle': 'A szobában',
    'rp.hotelTitle': 'A szállodában',
    'rp.hotel.pool': 'Medence',
    'rp.hotel.poolNote': 'szállóvendégeknek ingyenes, szezonban',
    'rp.hotel.restaurant': 'Étterem',
    'rp.hotel.restaurantNote': 'kárpátaljai és magyar konyha',
    'rp.hotel.wellness': 'Szauna és sószoba',
    'rp.hotel.wellnessNote': 'előzetes egyeztetéssel',
    'rp.otherTitle': 'További szobák',
    'rp.from': 'már {price} UAH / éj',
  },
  en: {
    'rp.metaTitle': '{name} | Hotel Helikon near Berehove',
    'rp.metaDesc':
      '{name} at Hotel Helikon near Berehove, Transcarpathia. {cap}, breakfast included, from {price} UAH a night. Book online or call us.',
    'rp.hotel': 'Hotel Helikon',
    'rp.home': 'Home',
    'rp.breadcrumb': 'Breadcrumb',
    'rp.allRooms': 'All rooms',
    'rp.priceLabel': 'Indicative price',
    'rp.priceNote': 'You will see the exact rate for your dates when you book.',
    'rp.bookOnline': 'Book on Booking.com',
    'rp.directTitle': 'Book directly',
    'rp.directText': 'Call reception or message us on WhatsApp. We will tell you whether the room is available on your dates and answer any questions.',
    'rp.call': 'Call',
    'rp.whatsapp': 'Message on WhatsApp',
    'rp.stayTitle': 'Good to know',
    'rp.capacity': 'Occupancy',
    'rp.breakfast': 'Breakfast',
    'rp.breakfastValue': 'buffet, included in the price',
    'rp.checkIn': 'Check-in',
    'rp.checkInValue': 'from {time}',
    'rp.checkOut': 'Check-out',
    'rp.checkOutValue': 'until {time}',
    'rp.parking': 'Parking',
    'rp.parkingValue': 'free, on the hotel grounds',
    'rp.amenitiesTitle': 'In the room',
    'rp.hotelTitle': 'At the hotel',
    'rp.hotel.pool': 'Swimming pool',
    'rp.hotel.poolNote': 'free for hotel guests, in season',
    'rp.hotel.restaurant': 'Restaurant',
    'rp.hotel.restaurantNote': 'Transcarpathian and Hungarian cooking',
    'rp.hotel.wellness': 'Sauna and salt room',
    'rp.hotel.wellnessNote': 'by prior arrangement',
    'rp.otherTitle': 'Other rooms',
    'rp.from': 'from {price} UAH / night',
  },
};

/** Room-page translation helper; same fallback order as `useTranslations`. */
export function useRoomPageStrings(locale: Locale) {
  return function rp(key: string, vars: Record<string, string | number> = {}): string {
    const raw = strings[locale][key] ?? strings[DEFAULT_LOCALE][key] ?? key;
    return raw.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
  };
}
