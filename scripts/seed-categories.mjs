import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PROMO MARKET katalog tuzilishi (17 kategoriya + subkategoriyalar)
const tree = [
  {
    icon: 'Shirt', nameRu: 'Промо текстиль', nameUz: 'Promo tekstil', slug: 'promo-tekstil',
    children: [
      { nameRu: 'Футболки', nameUz: 'Futbolkalar', slug: 'futbolki' },
      { nameRu: 'Поло', nameUz: 'Polo', slug: 'polo' },
      { nameRu: 'Свитшоты', nameUz: 'Svitshotlar', slug: 'svitshoty' },
      { nameRu: 'Худи', nameUz: 'Hudi', slug: 'hudi' },
      { nameRu: 'Бомберы', nameUz: 'Bomberlar', slug: 'bombery' },
      { nameRu: 'Рубашки', nameUz: 'Koʻylaklar', slug: 'rubashki' },
      { nameRu: 'Ветровки', nameUz: 'Vetrovkalar', slug: 'vetrovki' },
      { nameRu: 'Жилетки', nameUz: 'Jiletlar', slug: 'jiletki' },
      { nameRu: 'Брюки и шорты', nameUz: 'Shim va shortlar', slug: 'bryuki-shorty' },
      { nameRu: 'Кепки', nameUz: 'Kepkalar', slug: 'kepki' },
      { nameRu: 'Козырьки', nameUz: 'Kozirkalar', slug: 'kozyrki' },
      { nameRu: 'Панамки', nameUz: 'Panamalar', slug: 'panamki' },
      { nameRu: 'Бандана', nameUz: 'Bandana', slug: 'bandana' },
      { nameRu: 'Галстуки', nameUz: 'Galstuklar', slug: 'galstuki' },
      { nameRu: 'Платки', nameUz: 'Roʻmollar', slug: 'platki' },
      { nameRu: 'Шапки', nameUz: 'Shapkalar', slug: 'shapki' },
      { nameRu: 'Шарфы', nameUz: 'Sharflar', slug: 'sharfy' },
      { nameRu: 'Вязаные наборы', nameUz: 'Trikotaj toʻplamlar', slug: 'vyazanye-nabory' },
      { nameRu: 'Пледы', nameUz: 'Pledlar', slug: 'pledy' },
      { nameRu: 'Подушки', nameUz: 'Yostiqlar', slug: 'podushki' },
      { nameRu: 'Скатерти', nameUz: 'Dasturxonlar', slug: 'skaterti' },
      { nameRu: 'Фартуки', nameUz: 'Fartuklar', slug: 'fartuki' },
      { nameRu: 'Нарукавники', nameUz: 'Yeng qoplamalari', slug: 'narukavniki' },
      { nameRu: 'Салфетки', nameUz: 'Salfetkalar', slug: 'salfetki' },
      { nameRu: 'Полотенца', nameUz: 'Sochiqlar', slug: 'polotenca' },
      { nameRu: 'Носки', nameUz: 'Paypoqlar', slug: 'noski' },
      { nameRu: 'Грелка на чайник', nameUz: 'Choynak issiqlik qopi', slug: 'grelka-chaynik' },
      { nameRu: 'Раннер (дорожка на стол)', nameUz: 'Stol yoʻlakchasi', slug: 'ranner' },
      { nameRu: 'Повязка на голову', nameUz: 'Bosh bogʻlami', slug: 'povyazka-golova' },
      { nameRu: 'Медицинский халат', nameUz: 'Tibbiy xalat', slug: 'med-halat-pt' },
      { nameRu: 'Повязка для спорта', nameUz: 'Sport bogʻlami', slug: 'povyazka-sport' },
      { nameRu: 'Эко-сумки', nameUz: 'Eko sumkalar', slug: 'eko-sumki' },
      { nameRu: 'Шоппер', nameUz: 'Shopper', slug: 'shopper' },
      { nameRu: 'Прямая сумка', nameUz: 'Toʻgʻri sumka', slug: 'pryamaya-sumka' },
      { nameRu: 'Рюкзак', nameUz: 'Ryukzak', slug: 'ryukzak-pt' },
      { nameRu: 'Прихватка', nameUz: 'Issiqdan ushlagich', slug: 'prihvatka' },
      { nameRu: 'Флаги', nameUz: 'Bayroqlar', slug: 'flagi' },
      { nameRu: 'Подушка для шеи', nameUz: 'Boʻyin yostigʻi', slug: 'podushka-shei' },
      { nameRu: 'Чехол на стул', nameUz: 'Stul gʻilofi', slug: 'chehol-stul' },
      { nameRu: 'Мешочки', nameUz: 'Xaltachalar', slug: 'meshochki' },
    ],
  },
  {
    icon: 'Coffee', nameRu: 'Посуда', nameUz: 'Idishlar', slug: 'posuda',
    children: [
      { nameRu: 'Кружки', nameUz: 'Krujkalar', slug: 'krujki' },
      { nameRu: 'Чашки', nameUz: 'Piyolalar', slug: 'chashki' },
      { nameRu: 'Термокружки', nameUz: 'Termokrujkalar', slug: 'termokrujki' },
      { nameRu: 'Термосы', nameUz: 'Termoslar', slug: 'termosy' },
      { nameRu: 'Для спорта', nameUz: 'Sport uchun', slug: 'posuda-sport' },
      { nameRu: 'Тарелки', nameUz: 'Likopchalar', slug: 'tarelki' },
      { nameRu: 'Эко дерево', nameUz: 'Eko yogʻoch', slug: 'eko-derevo' },
      { nameRu: 'Бутылка для воды', nameUz: 'Suv idishi', slug: 'butylka-vody' },
      { nameRu: 'Чайники', nameUz: 'Choynaklar', slug: 'chayniki' },
      { nameRu: 'Стаканы', nameUz: 'Stakanlar', slug: 'stakany' },
      { nameRu: 'Ланч-боксы', nameUz: 'Lanch-bokslar', slug: 'lanch-boksy' },
    ],
  },
  {
    icon: 'BookOpen', nameRu: 'Ежедневники и блокноты', nameUz: 'Kundaliklar va bloknotlar', slug: 'ezhednevniki-bloknoty',
    children: [
      { nameRu: 'Ежедневники', nameUz: 'Kundaliklar', slug: 'ezhednevniki' },
      { nameRu: 'Блокноты', nameUz: 'Bloknotlar', slug: 'bloknoty' },
      { nameRu: 'Календари', nameUz: 'Kalendarlar', slug: 'kalendari' },
      { nameRu: 'Упаковка', nameUz: 'Qadoqlash', slug: 'upakovka' },
      { nameRu: 'Планинги', nameUz: 'Planinglar', slug: 'planingi' },
    ],
  },
  {
    icon: 'Pen', nameRu: 'Ручки', nameUz: 'Ruchkalar', slug: 'ruchki',
    children: [
      { nameRu: 'Пластиковые', nameUz: 'Plastik', slug: 'ruchki-plastik' },
      { nameRu: 'Металлические', nameUz: 'Metall', slug: 'ruchki-metall' },
      { nameRu: 'Эко', nameUz: 'Eko', slug: 'ruchki-eko' },
      { nameRu: 'ВИП', nameUz: 'VIP', slug: 'ruchki-vip' },
    ],
  },
  {
    icon: 'Clock', nameRu: 'Часы', nameUz: 'Soatlar', slug: 'chasy',
    children: [
      { nameRu: 'Настенные', nameUz: 'Devor soatlari', slug: 'chasy-nastennye' },
      { nameRu: 'Песочные', nameUz: 'Qum soatlari', slug: 'chasy-pesochnye' },
      { nameRu: 'Спортивные', nameUz: 'Sport soatlari', slug: 'chasy-sport' },
      { nameRu: 'Настольные', nameUz: 'Stol soatlari', slug: 'chasy-nastolnye' },
    ],
  },
  {
    icon: 'Smartphone', nameRu: 'Электроника', nameUz: 'Elektronika', slug: 'elektronika',
    children: [
      { nameRu: 'Флешки', nameUz: 'Fleshkalar', slug: 'fleshki' },
      { nameRu: 'Повербанки', nameUz: 'Powerbanklar', slug: 'powerbanki' },
      { nameRu: 'Увлажнители', nameUz: 'Namlagichlar', slug: 'uvlazhniteli' },
      { nameRu: 'Беспроводная зарядка', nameUz: 'Simsiz quvvatlagich', slug: 'besprovodnaya-zaryadka' },
      { nameRu: 'Портативные колонки', nameUz: 'Portativ kolonkalar', slug: 'portativnye-kolonki' },
      { nameRu: 'Bluetooth колонки', nameUz: 'Bluetooth kolonkalar', slug: 'bluetooth-kolonki' },
      { nameRu: 'Держатель для телефона', nameUz: 'Telefon ushlagichi', slug: 'derzhatel-telefona' },
      { nameRu: 'Увлажнитель воздуха', nameUz: 'Havo namlagichi', slug: 'uvlazhnitel-vozduha' },
      { nameRu: 'Метеостанция', nameUz: 'Meteostansiya', slug: 'meteostanciya' },
      { nameRu: 'Датчик температуры', nameUz: 'Harorat datchigi', slug: 'datchik-temperatury' },
      { nameRu: 'Весы', nameUz: 'Tarozilar', slug: 'vesy' },
    ],
  },
  {
    icon: 'Gift', nameRu: 'Подарочные наборы', nameUz: 'Sovgʻa toʻplamlari', slug: 'podarochnye-nabory',
    children: [],
  },
  {
    icon: 'PartyPopper', nameRu: 'Праздники', nameUz: 'Bayramlar', slug: 'prazdniki',
    children: [],
  },
  {
    icon: 'Award', nameRu: 'Наградная символика', nameUz: 'Sovrin ramzlari', slug: 'nagradnaya-simvolika',
    children: [
      { nameRu: 'Металлический значок', nameUz: 'Metall nishon', slug: 'znachok-metall' },
      { nameRu: 'Эмалированный значок', nameUz: 'Emalli nishon', slug: 'znachok-emal' },
      { nameRu: 'Медали', nameUz: 'Medallar', slug: 'medali' },
      { nameRu: 'Другие', nameUz: 'Boshqalar', slug: 'nagrady-drugie' },
    ],
  },
  {
    icon: 'ToyBrick', nameRu: 'Игрушки', nameUz: 'Oʻyinchoqlar', slug: 'igrushki',
    children: [
      { nameRu: 'Плюшевые игрушки', nameUz: 'Plyush oʻyinchoqlar', slug: 'igrushki-plyushevye' },
      { nameRu: 'Мягкие игрушки', nameUz: 'Yumshoq oʻyinchoqlar', slug: 'igrushki-myagkie' },
      { nameRu: 'Антистресс', nameUz: 'Antistress', slug: 'antistress' },
      { nameRu: 'Разные', nameUz: 'Turli', slug: 'igrushki-raznye' },
    ],
  },
  {
    icon: 'Dumbbell', nameRu: 'Спорт', nameUz: 'Sport', slug: 'sport',
    children: [
      { nameRu: 'Мяч большой', nameUz: 'Katta toʻp', slug: 'myach-bolshoy' },
      { nameRu: 'Мяч маленький', nameUz: 'Kichik toʻp', slug: 'myach-malenkiy' },
    ],
  },
  {
    icon: 'Printer', nameRu: 'Полиграфия', nameUz: 'Poligrafiya', slug: 'poligrafiya',
    children: [],
  },
  {
    icon: 'Package', nameRu: 'Коробки и пакеты', nameUz: 'Quti va paketlar', slug: 'korobki-pakety',
    children: [
      { nameRu: 'Пакеты', nameUz: 'Paketlar', slug: 'pakety' },
      { nameRu: 'Сумки', nameUz: 'Sumkalar', slug: 'sumki-korobki' },
      { nameRu: 'Коробки', nameUz: 'Qutilar', slug: 'korobki' },
    ],
  },
  {
    icon: 'Sparkles', nameRu: 'Промо аксессуары', nameUz: 'Promo aksessuarlar', slug: 'promo-aksessuary',
    children: [
      { nameRu: 'Брелоки', nameUz: 'Brelloklar', slug: 'breloki' },
      { nameRu: 'Бейджи и ленты', nameUz: 'Beyjlar va lentalar', slug: 'beydzhi-lenty' },
      { nameRu: 'Значки', nameUz: 'Nishonlar', slug: 'znachki' },
      { nameRu: 'Браслеты', nameUz: 'Bilakuzuklar', slug: 'braslety' },
      { nameRu: 'Сумочные аксессуары', nameUz: 'Sumka aksessuarlari', slug: 'sumochnye-aksessuary' },
      { nameRu: 'Для телефона', nameUz: 'Telefon uchun', slug: 'aks-telefon' },
      { nameRu: 'Для путешествий', nameUz: 'Sayohat uchun', slug: 'aks-puteshestviya' },
      { nameRu: 'Для авто', nameUz: 'Avto uchun', slug: 'aks-avto' },
      { nameRu: 'Прочие аксессуары', nameUz: 'Boshqa aksessuarlar', slug: 'aks-prochie' },
    ],
  },
  {
    icon: 'Wallet', nameRu: 'Канцелярия', nameUz: 'Kanselyariya', slug: 'kancelyariya',
    children: [
      { nameRu: 'Кошельки', nameUz: 'Hamyonlar', slug: 'koshelki' },
      { nameRu: 'Кардхолдеры', nameUz: 'Kardxolderlar', slug: 'kardholdery' },
      { nameRu: 'Футляр для очков', nameUz: 'Koʻzoynak gʻilofi', slug: 'futlyar-ochki' },
      { nameRu: 'Обложка для паспорта', nameUz: 'Pasport gʻilofi', slug: 'oblozhka-pasport' },
      { nameRu: 'Сумка для ноутбука', nameUz: 'Noutbuk sumkasi', slug: 'sumka-noutbuk' },
      { nameRu: 'Косметичка', nameUz: 'Kosmetichka', slug: 'kosmetichka' },
    ],
  },
  {
    icon: 'Umbrella', nameRu: 'Зонты', nameUz: 'Soyabonlar', slug: 'zonty',
    children: [
      { nameRu: 'Зонт складной автомат', nameUz: 'Avtomat yigʻiladigan soyabon', slug: 'zont-skladnoy-avtomat' },
      { nameRu: 'Зонт складной полуавтомат', nameUz: 'Yarim avtomat soyabon', slug: 'zont-skladnoy-poluavtomat' },
      { nameRu: 'Зонт-трость автомат', nameUz: 'Hassa-soyabon avtomat', slug: 'zont-trost-avtomat' },
    ],
  },
  {
    icon: 'Stethoscope', nameRu: 'Для медицины', nameUz: 'Tibbiyot uchun', slug: 'dlya-mediciny',
    children: [],
  },
]

async function main() {
  const allNewSlugs = []
  for (const cat of tree) {
    allNewSlugs.push(cat.slug)
    for (const sub of cat.children) allNewSlugs.push(sub.slug)
  }

  // 1) Yangi kategoriyalarni upsert (avval yaratamiz)
  for (let i = 0; i < tree.length; i++) {
    const { children, ...catData } = tree[i]
    const parent = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: { nameRu: catData.nameRu, nameUz: catData.nameUz, icon: catData.icon, order: i, parentId: null },
      create: { ...catData, order: i, parentId: null },
    })
    console.log(`  ✓ ${catData.icon} ${catData.nameRu}`)
    for (let j = 0; j < children.length; j++) {
      const sub = children[j]
      await prisma.category.upsert({
        where: { slug: sub.slug },
        update: { nameRu: sub.nameRu, nameUz: sub.nameUz, order: j, parentId: parent.id },
        create: { ...sub, order: j, parentId: parent.id },
      })
    }
  }

  // 2) Eski kategoriyalardagi mahsulotlarni birinchi yangi kategoriyaga ko'chirish
  const firstCat = await prisma.category.findFirst({ where: { slug: tree[0].slug } })
  if (firstCat) {
    const oldCats = await prisma.category.findMany({ where: { slug: { notIn: allNewSlugs } } })
    for (const old of oldCats) {
      const moved = await prisma.product.updateMany({ where: { categoryId: old.id }, data: { categoryId: firstCat.id } })
      if (moved.count) console.log(`  ↪ "${old.nameRu}" → "${firstCat.nameRu}" (${moved.count} mahsulot)`)
    }
  }

  // 3) Eski kategoriyalarni o'chirish — avval subkategoriyalar (FK xatosini oldini olish), keyin asosiy
  const delSub = await prisma.category.deleteMany({ where: { slug: { notIn: allNewSlugs }, parentId: { not: null } } })
  const delTop = await prisma.category.deleteMany({ where: { slug: { notIn: allNewSlugs }, parentId: null } })
  if (delSub.count + delTop.count) console.log(`  🗑️  ${delSub.count + delTop.count} ta eski kategoriya o'chirildi`)

  console.log('\n✅ 17 kategoriya + subkategoriyalar muvaffaqiyatli yangilandi!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
