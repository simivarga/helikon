export const LOCALES = ['uk', 'hu', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'uk';

/** Shown in the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = { uk: 'UA', hu: 'HU', en: 'EN' };

/** Used for <html lang> and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = { uk: 'uk-UA', hu: 'hu-HU', en: 'en' };

/**
 * Verified facts, shared across locales so a number can never drift between
 * translations. Anything not on the hotel's own site carries its source.
 * Unconfirmed figures (sauna pricing, exact hall capacities) are deliberately
 * absent — the copy asks the guest to call instead of stating a wrong number.
 */
export const FACTS = {
  phone: '+380505943791',
  phoneDisplay: '+380 (50) 594 37 91',
  // Printed on the hotel's own roadside billboard, so this one is confirmed.
  phoneReception: '+380502603591',
  phoneReceptionDisplay: '+380 (50) 260 35 91',
  phoneEvents: '+380505502217',
  phoneEventsDisplay: '+380 (50) 550 22 17',
  email: 'helikon.janosi@gmail.com',
  whatsapp: 'https://wa.me/380505943791',
  viber: 'viber://chat?number=%2B380505943791',
  booking: 'https://www.booking.com/hotel/ua/otiel-gielikon.html',
  // Coordinates, never a name search: "Hotel Helikon" also matches the
  // unrelated hotel at Lake Balaton, and Google routed there instead.
  lat: 48.2503708,
  lng: 22.6191476,
  maps: 'https://www.google.com/maps/search/?api=1&query=48.2503708%2C22.6191476',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=48.2503708%2C22.6191476',
  instagram: 'https://www.instagram.com/hotel.helikon',
  facebook: 'https://www.facebook.com/helikonhotel/',
  telegram: 'https://t.me/helikon_hotel',
  menuPdf: 'https://drive.google.com/file/d/18llioTw88nqLrxZzrloEY-VK8LHE4HtX/view',
  established: 2005,
  // Booking.com, fetched 2026-08-01
  ratingScore: '8,6',
  ratingScoreEn: '8.6',
  ratingCount: 254,
  stars: 3,
  roomCount: 63,
  // Pool — Kárpátinfo, 2025-08-29
  poolLength: 18,
  poolWidth: 8.5,
  poolDepth: 1.5,
  poolTempMin: 26,
  poolTempMax: 28,
  // Salt room — the hotel's own site
  saltMinutes: 45,
  saltPrice: 100,
  saltPass: 700,
  // Owner interview (UMDSZ) — restaurant seating
  restaurantSeats: 300,
  checkIn: '14:00',
  checkOut: '11:00',
} as const;

type Dict = Record<string, string>;

export const ui: Record<Locale, Dict> = {
  /* ==================================================================== UK */
  uk: {
    'site.name': 'Гелікон',
    'site.tagline': 'Готель · Ресторан · Сауна',
    'site.title': 'Готель Гелікон, Закарпаття — басейн, сауна, ресторан у Яноші',
    'site.description':
      'Готель «Гелікон» на Закарпатті — у Яноші, за 6 км від Берегового. Підігрітий басейн, сауна, соляна кімната, закарпатська кухня та зали для подій.',

    'nav.rooms': 'Номери',
    'nav.pool': 'Басейн',
    'nav.restaurant': 'Ресторан',
    'nav.wellness': 'Велнес',
    'nav.events': 'Події',
    'nav.contact': 'Контакти',
    'nav.book': 'Забронювати',
    'nav.menu': 'Меню',
    'nav.language': 'Мова',
    'nav.skipToContent': 'Перейти до основного вмісту',
    'carousel.prev': 'Попереднє фото',
    'carousel.next': 'Наступне фото',
    'carousel.photo': 'Фото',

    'hero.eyebrow': 'Яноші · Закарпаття',
    'hero.title': 'Втілення гостинності та смаку в серці природи',
    'hero.rating': 'на Booking.com',
    'hero.reviews.one': 'відгук',
    'hero.reviews.few': 'відгуки',
    'hero.reviews.many': 'відгуків',
    'hero.reviews.other': 'відгуку',
    'hero.cta.book': 'Забронювати',
    'hero.cta.rooms': 'Наші номери',
    'hero.scroll': 'Гортайте',
    'hero.imageAlt': 'Парк готелю Гелікон із містком через ставок',

    'welcome.eyebrow': 'Ласкаво просимо',
    'welcome.title': 'Родинний готель, який росте разом із гостями',
    'welcome.body1':
      'Гелікон стоїть у Яноші, за шість кілометрів від Берегового, просто біля дороги на кордон. Починали ми з дев’ятнадцяти номерів — сьогодні їх шістдесят три, а поруч виріс парк зі ставком, містком і альтанками.',
    'welcome.body2':
      'Тут зупиняються родини, компанії друзів і ті, хто їде далі через кордон. Сніданок входить у вартість, паркування безкоштовне, а до басейну й соляної кімнати — хвилина пішки.',
    'welcome.stat.rooms': 'номерів',
    'welcome.stat.stars': 'зірки',
    'welcome.stat.years': 'років',
    'welcome.stat.yearsValue': '20+',
    'welcome.stat.breakfast': 'Сніданок',
    'welcome.stat.breakfastValue': 'включено',

    'pool.eyebrow': 'Новинка від 2025 року',
    'pool.title': 'Басейн, у якому справді можна плавати',
    'pool.body':
      'Вода нагрівається двома тепловими насосами, що працюють від сонячних батарей, тож купатися комфортно з початку літа до середини жовтня. Глибша частина — півтора метра: тут плавають, а не просто хлюпаються.',
    'pool.free': 'Для гостей готелю — безкоштовно',
    'pool.imageAlt': 'Підігрітий басейн готелю Гелікон з висоти пташиного польоту',
    'pool.cap.morning': 'Ранок біля басейну',
    'pool.cap.loungers': 'Шезлонги та парасолі',
    'pool.stat.size': 'Розмір',
    'pool.stat.temp': 'Температура води',
    'pool.stat.depth': 'Глибина',
    'pool.stat.season': 'Сезон',
    'pool.stat.seasonValue': 'до середини жовтня',

    'rooms.eyebrow': 'Проживання',
    'rooms.title': 'Шість типів номерів',
    'rooms.lede':
      'Від мансарди з вікном у небо до двокімнатного сімейного номера. У кожному — кондиціонер, власна ванна кімната, телевізор і безкоштовний Wi-Fi.',
    'rooms.from': 'від',
    'rooms.night': 'за ніч',
    'rooms.details': 'Детальніше',
    'rooms.book': 'Забронювати',
    'rooms.note': 'Сніданок входить у вартість усіх номерів.',

    'cap2': 'до 2 осіб',
    'cap3': 'до 3 осіб',
    'cap4': 'до 4 осіб',

    'room.mansard.name': 'Мансард',
    'room.mansard.desc': 'Номер під дахом із вікном у небо — тихо й затишно.',
    'room.standard.name': 'Стандарт двомісний',
    'room.standard.desc': 'Світлий номер із балконом — для пари або для поїздки у справах.',
    'room.standard3.name': 'Стандарт тримісний',
    'room.standard3.desc': 'Просторий номер для друзів або невеликої родини.',
    'room.half_lux.name': 'Напівлюкс',
    'room.half_lux.desc': 'Більше місця та власне патіо, комфортно для двох.',
    'room.lux.name': 'Люкс однокімнатний',
    'room.lux.desc': 'Однокімнатний люкс до чотирьох осіб — із додатковим простором.',
    'room.family.name': 'Сімейний двокімнатний',
    'room.family.desc': 'Дві окремі кімнати, щоб усім вистачило місця.',

    'am.ac': 'Кондиціонер',
    'am.patio': 'Патіо',
    'am.bath': 'Власна ванна кімната',
    'am.tv': 'Телевізор',
    'am.sound': 'Звукоізоляція',
    'am.wifi': 'Безкоштовний Wi-Fi',
    'am.balcony': 'Балкон',
    'am.fridge': 'Холодильник',

    'restaurant.eyebrow': 'Ресторан',
    'restaurant.title': 'Угорська кухня, як удома',
    'restaurant.body':
      'Готуємо закарпатські та угорські страви зі свіжих місцевих продуктів. Сніданок — накритий стіл із теплими стравами, сирами й фруктами — входить у вартість номера. Гарячі страви подаємо до вечора — у залі на триста гостей.',
    'restaurant.menuCta': 'Переглянути меню',
    'restaurant.tableCta': 'Забронювати стіл',
    'restaurant.stat.seats': 'місць у залі',
    'restaurant.stat.breakfast': 'Сніданок',
    'restaurant.stat.breakfastValue': 'у вартості',
    'restaurant.stat.cuisine': 'Кухня',
    'restaurant.stat.cuisineValue': 'закарпатська та угорська',

    'wellness.eyebrow': 'Велнес',
    'wellness.title': 'Сауна й соляна кімната',
    'wellness.lede': 'Дві причини не виїжджати з території навіть у дощ.',
    'wellness.sauna.name': 'Сауна',
    'wellness.sauna.desc':
      'Фінська та інфрачервона сауна з басейном для контрастного занурення. Працює за попереднім бронюванням — запитуйте за телефоном.',
    'wellness.sauna.cta': 'Забронювати сауну',
    'wellness.salt.name': 'Соляна кімната',
    'wellness.salt.desc':
      'Сеанс у соляній кімнаті допомагає легше дихати — особливо дітям після простуди.',
    'wellness.salt.duration': 'Тривалість',
    'wellness.salt.price': 'Сеанс',
    'wellness.salt.pass': 'Абонемент',
    'wellness.salt.min': 'хв',

    'events.eyebrow': 'Події',
    'events.title': 'Весілля, конференції, родинні свята',
    'events.lede':
      'Перше весілля ми провели у 2014 році, відтоді їх були сотні. До ваших послуг — власна кухня, номери для гостей і паркування на території.',
    'events.banquet.name': 'Банкетна зала',
    'events.banquet.desc':
      'Велика зала для весіль і ювілеїв: сцена, світло, окремий вхід. Меню складаємо разом із вами.',
    'events.conf.name': 'Конференц-зали',
    'events.conf.desc':
      'Зали для навчань, презентацій і корпоративних зустрічей — з проєктором, звуком і кава-паузами з нашої кухні.',
    'events.banquet.tableAlt': 'Накритий стіл у банкетній залі готелю Гелікон',
    'events.cta': 'Запитати про зал',
    'events.callLabel': 'Телефон для подій',

    'grounds.eyebrow': 'Територія',
    'grounds.title': 'Парк, ставок, більярд',
    'grounds.lede':
      'Територія відкрита для гостей: доріжки під старими деревами, місток через ставок, альтанки для пікніка, дитячий майданчик і більярдна.',
    'grounds.alt.bridge': 'Місток через ставок у парку готелю',
    'grounds.alt.path': 'Доріжка парку з лавками',
    'grounds.alt.gazebos': 'Альтанки для пікніка',
    'grounds.alt.billiards': 'Більярдна',
    'grounds.alt.monument': 'Пам’ятник на території',
    'grounds.alt.exterior': 'Головний вхід готелю Гелікон',
    'grounds.alt.terrace': 'Тераса ресторану',
    'grounds.alt.reception': 'Рецепція',

    'story.eyebrow': 'Наша історія',
    'story.title': 'Від зачиненого будинку до шістдесяти трьох номерів',
    'story.body1':
      'У 2004 році Тібор Біро взяв в оренду закинуту будівлю колишнього ресторану в Яноші. За рік тут відкрився готель — спершу на дев’ятнадцять номерів.',
    'story.body2':
      'Розширення припало на 2014 рік, коли туризм завмер. Будівництво все одно довели до кінця — і того ж року провели перше весілля. Сьогодні готелем родина опікується разом із доньками Діаною та Дороттею та їхніми сім’ями.',
    'story.q1': '2004',
    'story.q1label': 'Орендували будівлю',
    'story.q2': '2005',
    'story.q2label': 'Відкриття готелю',
    'story.q3': '2014',
    'story.q3label': 'Перше весілля',
    'story.q4': '2025',
    'story.q4label': 'Новий басейн',

    'contact.eyebrow': 'Контакти',
    'contact.title': 'Як нас знайти',
    'contact.address': 'Адреса',
    'contact.addressValue': 'вул. Шевченка, 45, с. Яноші, Берегівський р-н',
    'contact.hours': 'Графік роботи',
    'contact.hoursValue': 'Пн–Нд · 8:00–22:00',
    'contact.checkin': 'Заїзд / виїзд',
    'contact.reception': 'Рецепція',
    'contact.events': 'Події',
    'contact.email': 'Email',
    'contact.callCta': 'Зателефонувати',
    'contact.mapsCta': 'Відкрити в Google Картах',
    'contact.directionsCta': 'Прокласти маршрут',
    'contact.borderNote':
      'Тихе село за шість кілометрів від Берегового. Термальні купальні, винні погреби та замки — усе поруч.',

    'footer.tagline': 'Готель, ресторан і сауна в Яноші, у серці закарпатської природи.',
    'footer.explore': 'Розділи',
    'footer.contactCol': 'Контакти',
    'footer.followCol': 'Ми в мережі',
    'footer.bookCol': 'Бронювання',
    'footer.bookingLink': 'Booking.com',
    'footer.rights': 'Усі права захищено.',
  },

  /* ==================================================================== HU */
  hu: {
    'site.name': 'Helikon',
    'site.tagline': 'Szálloda · Étterem · Szauna',
    'site.title': 'Hotel Helikon Kárpátalja — medencés szálloda Beregszász mellett',
    'site.description':
      'Hotel Helikon Kárpátalján: szálloda, étterem és szauna Makkosjánosiban, Beregszásztól 6 km-re. Fűtött medence, sószoba, magyar konyha, rendezvénytermek. Nem a keszthelyi Hotel Helikon.',

    'nav.rooms': 'Szobák',
    'nav.pool': 'Medence',
    'nav.restaurant': 'Étterem',
    'nav.wellness': 'Wellness',
    'nav.events': 'Rendezvények',
    'nav.contact': 'Kapcsolat',
    'nav.book': 'Foglalás',
    'nav.menu': 'Menü',
    'nav.language': 'Nyelv',
    'nav.skipToContent': 'Ugrás a fő tartalomra',
    'carousel.prev': 'Előző fénykép',
    'carousel.next': 'Következő fénykép',
    'carousel.photo': 'Fénykép',

    'hero.eyebrow': 'Makkosjánosi · Kárpátalja',
    'hero.title': 'Vendégszeretet és jó ízek a természet ölelésében',
    'hero.rating': 'a Booking.com-on',
    'hero.reviews.one': 'értékelés',
    'hero.reviews.few': 'értékelés',
    'hero.reviews.many': 'értékelés',
    'hero.reviews.other': 'értékelés',
    'hero.cta.book': 'Foglalás',
    'hero.cta.rooms': 'Szobáink',
    'hero.scroll': 'Görgess',
    'hero.imageAlt': 'A Helikon parkja a tavon átvezető kishíddal',

    'welcome.eyebrow': 'Üdvözlünk',
    'welcome.title': 'Családi szálloda, ami a vendégeivel együtt nőtt',
    'welcome.body1':
      'A Helikon Makkosjánosiban áll, Beregszásztól hat kilométerre, közvetlenül a határ felé vezető út mellett. Tizenkilenc szobával kezdtük, ma hatvanhárom van, és közben kinőtt mellé a park a tavacskával, a kishíddal és a filagóriákkal.',
    'welcome.body2':
      'Megszállnak nálunk családok, baráti társaságok, és azok is, akik csak átutaznak a határ felé. A reggeli benne van az árban, a parkolás ingyenes, a medence és a sószoba pedig egyperces séta.',
    'welcome.stat.rooms': 'szoba',
    'welcome.stat.stars': 'csillag',
    'welcome.stat.years': 'év',
    'welcome.stat.yearsValue': '20+',
    'welcome.stat.breakfast': 'Reggeli',
    'welcome.stat.breakfastValue': 'az árban',

    'pool.eyebrow': 'Új — 2025 óta',
    'pool.title': 'Medence, amiben tényleg lehet úszni',
    'pool.body':
      'A vizet két napelemes hőszivattyú fűti, így a nyár elejétől október közepéig kellemes a fürdés. A mélyebbik rész másfél méter: itt úszni lehet, nem csak pancsolni.',
    'pool.free': 'Szállóvendégeinknek ingyenes',
    'pool.imageAlt': 'A Helikon szálloda fűtött medencéje madártávlatból',
    'pool.cap.morning': 'Reggel a medence mellett',
    'pool.cap.loungers': 'Napozóágyak és napernyők',
    'pool.stat.size': 'Méret',
    'pool.stat.temp': 'Vízhőmérséklet',
    'pool.stat.depth': 'Mélység',
    'pool.stat.season': 'Szezon',
    'pool.stat.seasonValue': 'október közepéig',

    'rooms.eyebrow': 'Szállás',
    'rooms.title': 'Hat szobatípus',
    'rooms.lede':
      'A tetőablakos manzárdtól a kétszobás családi lakosztályig. Mindegyikben légkondi, saját fürdőszoba, tévé és ingyenes wifi.',
    'rooms.from': 'már',
    'rooms.night': '/ éj',
    'rooms.details': 'Részletek',
    'rooms.book': 'Foglalás',
    'rooms.note': 'A reggeli minden szoba árában benne van.',

    'cap2': '2 főig',
    'cap3': '3 főig',
    'cap4': '4 főig',

    'room.mansard.name': 'Manzárd',
    'room.mansard.desc': 'Tetőtéri szoba tetőablakkal — csendes és otthonos.',
    'room.standard.name': 'Kétágyas standard',
    'room.standard.desc': 'Világos szoba erkéllyel, pároknak vagy üzleti úton érkezőknek.',
    'room.standard3.name': 'Háromágyas standard',
    'room.standard3.desc': 'Tágas szoba baráti társaságnak vagy kis családnak.',
    'room.half_lux.name': 'Félluxus',
    'room.half_lux.desc': 'Több hely és saját terasz, kényelmesen két főnek.',
    'room.lux.name': 'Egyszobás luxus',
    'room.lux.desc': 'Egyszobás lakosztály akár négy főnek, extra térrel.',
    'room.family.name': 'Kétszobás családi',
    'room.family.desc': 'Két külön szoba, hogy mindenkinek jusson hely.',

    'am.ac': 'Légkondicionáló',
    'am.patio': 'Terasz',
    'am.bath': 'Saját fürdőszoba',
    'am.tv': 'Televízió',
    'am.sound': 'Hangszigetelés',
    'am.wifi': 'Ingyenes wifi',
    'am.balcony': 'Erkély',
    'am.fridge': 'Hűtőszekrény',

    'restaurant.eyebrow': 'Étterem',
    'restaurant.title': 'Magyar konyha, ahogy otthon',
    'restaurant.body':
      'Kárpátaljai és magyar fogásokat készítünk friss, helyi alapanyagokból. A reggeli — meleg ételekkel, sajtokkal, gyümölccsel megrakott asztal — a szoba árában van. Meleg ételt estig kérhetsz, a háromszáz fős étteremben.',
    'restaurant.menuCta': 'Étlap megnyitása',
    'restaurant.tableCta': 'Asztalfoglalás',
    'restaurant.stat.seats': 'fős étterem',
    'restaurant.stat.breakfast': 'Reggeli',
    'restaurant.stat.breakfastValue': 'az árban',
    'restaurant.stat.cuisine': 'Konyha',
    'restaurant.stat.cuisineValue': 'kárpátaljai és magyar',

    'wellness.eyebrow': 'Wellness',
    'wellness.title': 'Szauna és sószoba',
    'wellness.lede': 'Két ok, amiért esőben sem kell elhagyni a területet.',
    'wellness.sauna.name': 'Szauna',
    'wellness.sauna.desc':
      'Finn és infraszauna merülőmedencével. Előzetes egyeztetéssel működik, az áráról telefonon érdeklődj.',
    'wellness.sauna.cta': 'Szaunát foglalok',
    'wellness.salt.name': 'Sószoba',
    'wellness.salt.desc':
      'Egy sószobai ülés könnyebbé teszi a légzést — a gyerekeknek különösen jót tesz megfázás után.',
    'wellness.salt.duration': 'Időtartam',
    'wellness.salt.price': 'Egy ülés',
    'wellness.salt.pass': 'Bérlet',
    'wellness.salt.min': 'perc',

    'events.eyebrow': 'Rendezvények',
    'events.title': 'Esküvő, konferencia, családi ünnep',
    'events.lede':
      'Az első esküvőt 2014-ben tartottuk, azóta több száz követte. A termek mellé saját konyha, szobák a vendégeknek és parkolás a területen belül jár.',
    'events.banquet.name': 'Bankett-terem',
    'events.banquet.desc':
      'Nagy terem esküvőkre és jubileumokra: színpad, világítás, külön bejárat. A menüt közösen állítjuk össze.',
    'events.conf.name': 'Konferenciatermek',
    'events.conf.desc':
      'Termek képzésekhez, prezentációkhoz és céges találkozókhoz — projektorral, hangosítással és kávészünettel a saját konyhánkról.',
    'events.banquet.tableAlt': 'Terített asztal a Helikon bankett-termében',
    'events.cta': 'Érdeklődöm a teremről',
    'events.callLabel': 'Rendezvények telefonon',

    'grounds.eyebrow': 'A terület',
    'grounds.title': 'Park, tavacska, biliárd',
    'grounds.lede':
      'A terület a vendégeké: sétautak öreg fák alatt, kishíd a tavon, filagóriák a piknikhez, játszótér és biliárdszalon.',
    'grounds.alt.bridge': 'Kishíd a szálloda parkjának tavacskája fölött',
    'grounds.alt.path': 'Parki sétaút padokkal',
    'grounds.alt.gazebos': 'Filagóriák a piknikhez',
    'grounds.alt.billiards': 'Biliárdszalon',
    'grounds.alt.monument': 'Emlékmű a területen',
    'grounds.alt.exterior': 'A Helikon szálloda főbejárata',
    'grounds.alt.terrace': 'Az étterem terasza',
    'grounds.alt.reception': 'Recepció',

    'story.eyebrow': 'A történetünk',
    'story.title': 'Egy bezárt épülettől hatvanhárom szobáig',
    'story.body1':
      '2004-ben Bíró Tibor kivette bérbe a makkosjánosi egykori étterem elhagyott épületét. Egy évvel később már szálloda működött benne — először tizenkilenc szobával.',
    'story.body2':
      'A bővítés 2014-re esett, amikor a turizmus leállt. Az építkezést mégis végigvitték, és még abban az évben megtartották az első esküvőt. Ma a szállodát a család vezeti: Bíró Tibor a lányaival, Dianával és Dorottyával, valamint az ő családjaikkal együtt.',
    'story.q1': '2004',
    'story.q1label': 'Az épület bérbevétele',
    'story.q2': '2005',
    'story.q2label': 'A szálloda megnyitása',
    'story.q3': '2014',
    'story.q3label': 'Az első esküvő',
    'story.q4': '2025',
    'story.q4label': 'Az új medence',

    'contact.eyebrow': 'Kapcsolat',
    'contact.title': 'Hogyan találsz meg minket',
    'contact.address': 'Cím',
    'contact.addressValue': 'Sevcsenko utca 45, Makkosjánosi, Beregszászi járás',
    'contact.hours': 'Nyitvatartás',
    'contact.hoursValue': 'H–V · 8:00–22:00',
    'contact.checkin': 'Érkezés / távozás',
    'contact.reception': 'Recepció',
    'contact.events': 'Rendezvények',
    'contact.email': 'E-mail',
    'contact.callCta': 'Hívás',
    'contact.mapsCta': 'Megnyitás a Google Térképen',
    'contact.directionsCta': 'Útvonalterv',
    'contact.borderNote':
      'Csendes falu Beregszásztól hat kilométerre. Termálfürdők, borospincék és várak is mind a közelben vannak.',

    'footer.tagline': 'Szálloda, étterem és szauna Makkosjánosiban, a kárpátaljai természet szívében.',
    'footer.explore': 'Tartalom',
    'footer.contactCol': 'Kapcsolat',
    'footer.followCol': 'Kövess minket',
    'footer.bookCol': 'Foglalás',
    'footer.bookingLink': 'Booking.com',
    'footer.rights': 'Minden jog fenntartva.',
  },

  /* ==================================================================== EN */
  en: {
    'site.name': 'Helikon',
    'site.tagline': 'Hotel · Restaurant · Sauna',
    'site.title': 'Hotel Helikon Transcarpathia — pool and sauna hotel in Ukraine',
    'site.description':
      'Hotel Helikon in Transcarpathia, Ukraine — in Jánosi, 6 km from Berehove. Heated pool, sauna, salt room, Transcarpathian-Hungarian cooking and event halls.',

    'nav.rooms': 'Rooms',
    'nav.pool': 'Pool',
    'nav.restaurant': 'Restaurant',
    'nav.wellness': 'Wellness',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.book': 'Book now',
    'nav.menu': 'Menu',
    'nav.language': 'Language',
    'nav.skipToContent': 'Skip to main content',
    'carousel.prev': 'Previous photo',
    'carousel.next': 'Next photo',
    'carousel.photo': 'Photo',

    'hero.eyebrow': 'Jánosi · Transcarpathia',
    'hero.title': 'Hospitality and good taste in the heart of nature',
    'hero.rating': 'on Booking.com',
    'hero.reviews.one': 'review',
    'hero.reviews.few': 'reviews',
    'hero.reviews.many': 'reviews',
    'hero.reviews.other': 'reviews',
    'hero.cta.book': 'Book a stay',
    'hero.cta.rooms': 'Our rooms',
    'hero.scroll': 'Scroll',
    'hero.imageAlt': 'The Helikon park with the little bridge over the pond',

    'welcome.eyebrow': 'Welcome',
    'welcome.title': 'A family hotel that grew with its guests',
    'welcome.body1':
      'Helikon stands in Jánosi, six kilometres from Berehove, right on the road to the Hungarian border. We started with nineteen rooms; today there are sixty-three, and a park has grown beside them with a pond, a little bridge and picnic gazebos.',
    'welcome.body2':
      'Families stay here, groups of friends, and travellers simply passing through towards the border. Breakfast is included, parking is free, and the pool and salt room are a minute away on foot.',
    'welcome.stat.rooms': 'rooms',
    'welcome.stat.stars': 'stars',
    'welcome.stat.years': 'years',
    'welcome.stat.yearsValue': '20+',
    'welcome.stat.breakfast': 'Breakfast',
    'welcome.stat.breakfastValue': 'included',

    'pool.eyebrow': 'New since 2025',
    'pool.title': 'A pool you can actually swim in',
    'pool.body':
      'Two solar-powered heat pumps keep the water warm, so swimming stays comfortable from early summer to the middle of October. The deep end is a metre and a half: room to swim properly, not just wade.',
    'pool.free': 'Free for hotel guests',
    'pool.imageAlt': 'Aerial view of the heated swimming pool at Hotel Helikon',
    'pool.cap.morning': 'Morning by the pool',
    'pool.cap.loungers': 'Loungers and parasols',
    'pool.stat.size': 'Size',
    'pool.stat.temp': 'Water temperature',
    'pool.stat.depth': 'Depth',
    'pool.stat.season': 'Season',
    'pool.stat.seasonValue': 'until mid-October',

    'rooms.eyebrow': 'Stay',
    'rooms.title': 'Six room types',
    'rooms.lede':
      'From an attic room with a skylight to a two-room family suite. Every one has air conditioning, a private bathroom, a TV and free Wi-Fi.',
    'rooms.from': 'from',
    'rooms.night': '/ night',
    'rooms.details': 'View details',
    'rooms.book': 'Book this room',
    'rooms.note': 'Breakfast is included with every room.',

    'cap2': 'up to 2 guests',
    'cap3': 'up to 3 guests',
    'cap4': 'up to 4 guests',

    'room.mansard.name': 'Mansard',
    'room.mansard.desc': 'An attic room with a skylight — quiet and homely.',
    'room.standard.name': 'Standard double',
    'room.standard.desc': 'A bright room with a balcony, for couples or business trips.',
    'room.standard3.name': 'Standard triple',
    'room.standard3.desc': 'A spacious room for friends or a small family.',
    'room.half_lux.name': 'Junior suite',
    'room.half_lux.desc': 'More space and a private patio, comfortable for two.',
    'room.lux.name': 'One-room suite',
    'room.lux.desc': 'A one-room suite for up to four, with extra space.',
    'room.family.name': 'Two-room family suite',
    'room.family.desc': 'Two separate rooms, so there is space for everyone.',

    'am.ac': 'Air conditioning',
    'am.patio': 'Patio',
    'am.bath': 'Private bathroom',
    'am.tv': 'TV',
    'am.sound': 'Soundproofing',
    'am.wifi': 'Free Wi-Fi',
    'am.balcony': 'Balcony',
    'am.fridge': 'Fridge',

    'restaurant.eyebrow': 'Restaurant',
    'restaurant.title': 'Hungarian cooking, the way you would make it at home',
    'restaurant.body':
      'We cook Transcarpathian and Hungarian dishes using fresh local ingredients. Breakfast — a table set with warm dishes, cheeses and fruit — comes with the room. For everything else, a three-hundred-seat dining room stays open into the evening.',
    'restaurant.menuCta': 'Open the menu',
    'restaurant.tableCta': 'Book a table',
    'restaurant.stat.seats': 'seats',
    'restaurant.stat.breakfast': 'Breakfast',
    'restaurant.stat.breakfastValue': 'included',
    'restaurant.stat.cuisine': 'Cuisine',
    'restaurant.stat.cuisineValue': 'Transcarpathian & Hungarian',

    'wellness.eyebrow': 'Wellness',
    'wellness.title': 'Sauna and salt room',
    'wellness.lede': 'Two reasons not to leave the grounds even when it rains.',
    'wellness.sauna.name': 'Sauna',
    'wellness.sauna.desc':
      'Finnish and infrared saunas with a plunge pool. Available by arrangement — call us for prices.',
    'wellness.sauna.cta': 'Book the sauna',
    'wellness.salt.name': 'Salt room',
    'wellness.salt.desc':
      'A session in the salt room makes breathing easier — children especially benefit after a cold.',
    'wellness.salt.duration': 'Duration',
    'wellness.salt.price': 'One session',
    'wellness.salt.pass': 'Pass',
    'wellness.salt.min': 'min',

    'events.eyebrow': 'Events',
    'events.title': 'Weddings, conferences, family celebrations',
    'events.lede':
      'We held our first wedding in 2014, and hundreds have followed. The halls come with our own kitchen, rooms for your guests and parking on site.',
    'events.banquet.name': 'Banquet hall',
    'events.banquet.desc':
      'A large hall for weddings and anniversaries: stage, lighting, its own entrance. We build the menu together with you.',
    'events.conf.name': 'Conference halls',
    'events.conf.desc':
      'Halls for training, presentations and company meetings — with a projector, sound, and coffee breaks from our kitchen.',
    'events.banquet.tableAlt': 'A laid table in the banquet hall at Hotel Helikon',
    'events.cta': 'Ask about a hall',
    'events.callLabel': 'Call about events',

    'grounds.eyebrow': 'The grounds',
    'grounds.title': 'Park, pond, billiards',
    'grounds.lede':
      'The grounds are for our guests: paths under old trees, a bridge over the pond, gazebos for a picnic, a playground and a billiard room.',
    'grounds.alt.bridge': 'The little bridge over the pond in the hotel park',
    'grounds.alt.path': 'A park path with benches',
    'grounds.alt.gazebos': 'Picnic gazebos',
    'grounds.alt.billiards': 'The billiard room',
    'grounds.alt.monument': 'A monument on the grounds',
    'grounds.alt.exterior': 'The main entrance of Hotel Helikon',
    'grounds.alt.terrace': 'The restaurant terrace',
    'grounds.alt.reception': 'Reception',

    'story.eyebrow': 'Our story',
    'story.title': 'From a shuttered building to sixty-three rooms',
    'story.body1':
      'In 2004 Tibor Bíró took on the lease of an abandoned former restaurant in Jánosi. A year later it opened as a hotel — nineteen rooms to start with.',
    'story.body2':
      'The expansion came in 2014, just as tourism stopped. The building was finished anyway, and the first wedding was held that same year. Today the hotel is run together with his daughters, Diana and Dorottya, and their families.',
    'story.q1': '2004',
    'story.q1label': 'The lease is taken on',
    'story.q2': '2005',
    'story.q2label': 'The hotel opens',
    'story.q3': '2014',
    'story.q3label': 'The first wedding',
    'story.q4': '2025',
    'story.q4label': 'The new pool',

    'contact.eyebrow': 'Contact',
    'contact.title': 'How to find us',
    'contact.address': 'Address',
    'contact.addressValue': '45 Shevchenka St, Jánosi, Berehove District',
    'contact.hours': 'Opening hours',
    'contact.hoursValue': 'Mon–Sun · 8:00–22:00',
    'contact.checkin': 'Check-in / check-out',
    'contact.reception': 'Reception',
    'contact.events': 'Events',
    'contact.email': 'Email',
    'contact.callCta': 'Call us',
    'contact.mapsCta': 'Open in Google Maps',
    'contact.directionsCta': 'Get directions',
    'contact.borderNote':
      'A quiet village six kilometres from Berehove. Thermal baths, wine cellars and castles are all close by.',

    'footer.tagline': 'Hotel, restaurant and sauna in Jánosi — in the heart of Transcarpathian nature.',
    'footer.explore': 'Explore',
    'footer.contactCol': 'Contact',
    'footer.followCol': 'Follow us',
    'footer.bookCol': 'Booking',
    'footer.bookingLink': 'Booking.com',
    'footer.rights': 'All rights reserved.',
  },
};
