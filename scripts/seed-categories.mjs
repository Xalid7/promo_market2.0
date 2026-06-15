import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const tree = [
  {
    icon: 'ShieldCheck', nameRu: 'Спецодежда', nameUz: 'Maxsus kiyim', slug: 'specodejda',
    children: [
      { nameRu: 'Летняя спецодежда',  nameUz: 'Yozgi maxsus kiyim',  slug: 'letnyaya-specodejda-pm' },
      { nameRu: 'Зимняя спецодежда',  nameUz: 'Qishki maxsus kiyim', slug: 'zimnyaya-specodejda-pm' },
      { nameRu: 'Сигнальная одежда',  nameUz: 'Signal kiyimi',       slug: 'signalnaya-odezhda-pm' },
    ],
  },
  {
    icon: 'Briefcase', nameRu: 'Униформа', nameUz: 'Forma', slug: 'uniforma',
    children: [
      { nameRu: 'Для охранных структур',           nameUz: 'Qo\'riqchilar formasi',           slug: 'forma-ohrany-pm' },
      { nameRu: 'Для поваров и официантов',         nameUz: 'Oshpaz va ofitsiantlar formasi',   slug: 'forma-povary-pm' },
      { nameRu: 'Для обслуживающего персонала',     nameUz: 'Xizmat ko\'rsatuvchi xodimlar',    slug: 'forma-obsluzhivayushchiy-pm' },
    ],
  },
  {
    icon: 'Stethoscope', nameRu: 'Медицинская униформа', nameUz: 'Tibbiy forma', slug: 'medicinskaya-uniforma',
    children: [
      { nameRu: 'Халаты медицинские', nameUz: 'Tibbiy xalatlar',     slug: 'halaty-medicinskie-pm' },
      { nameRu: 'Хирургическая форма',nameUz: 'Jarrohlik formasi',    slug: 'hirurgicheskaya-forma-pm' },
      { nameRu: 'Форма скорой помощи',nameUz: 'Tez yordam formasi',   slug: 'forma-skoroy-pomoshchi-pm' },
    ],
  },
  {
    icon: 'Tag', nameRu: 'Промотекстиль', nameUz: 'Promotekstil', slug: 'promotekstil',
    children: [
      { nameRu: 'Футболки',           nameUz: 'Futbolkalar',          slug: 'futbolki-pm' },
      { nameRu: 'Худи и свитшоты',    nameUz: 'Hudi va svitshotlar',  slug: 'hudi-svitshoty-pm' },
      { nameRu: 'Ветровки и куртки',  nameUz: 'Vetrovkalar va kurtkalar', slug: 'vetrovki-kurtki-pm' },
      { nameRu: 'Фартуки',            nameUz: 'Fartuкlar',            slug: 'fartuki-pm' },
      { nameRu: 'Жилеты',             nameUz: 'Jiletlar',             slug: 'jiletki-pm' },
      { nameRu: 'Поло рубашки',       nameUz: 'Polo ko\'ylaklar',     slug: 'polo-rubashki-pm' },
    ],
  },
  {
    icon: 'Layers', nameRu: 'Трикотажные изделия', nameUz: 'Trikotaj mahsulotlar', slug: 'trikotajnye-izdeliya',
    children: [],
  },
  {
    icon: 'Scissors', nameRu: 'Тканевые изделия', nameUz: "To'qima mahsulotlar", slug: 'tkanevye-izdeliya',
    children: [],
  },
  {
    icon: 'GraduationCap', nameRu: 'Головные уборы', nameUz: 'Bosh kiyimlar', slug: 'golovnye-ubory',
    children: [
      { nameRu: 'Кепки',    nameUz: 'Kepkalar',   slug: 'kepki-pm' },
      { nameRu: 'Шапки',    nameUz: 'Shapkalar',  slug: 'shapki-pm' },
      { nameRu: 'Каскетки', nameUz: 'Kasketkalar',slug: 'kasketki-pm' },
    ],
  },
  {
    icon: 'Shirt', nameRu: 'Сорочки, рубашки', nameUz: "Ko'ylaklar", slug: 'sorochki-rubashki',
    children: [],
  },
  {
    icon: 'BedDouble', nameRu: 'Постельное белье', nameUz: "Yotoq to'shamalari", slug: 'postelnoe-belye',
    children: [],
  },
  {
    icon: 'TowelRack', nameRu: 'Полотенце', nameUz: 'Sochiq', slug: 'polotence',
    children: [
      { nameRu: 'Полотенце махровое', nameUz: 'Mahram sochiq',  slug: 'polotence-mahrovoe-pm' },
      { nameRu: 'Полотенце вафельное',nameUz: 'Vafelli sochiq', slug: 'polotence-vafelnoe-pm' },
    ],
  },
  {
    icon: 'ShoppingBag', nameRu: 'Сумки и рюкзаки', nameUz: 'Sumkalar va ryukzaklar', slug: 'sumki-ryukzaki',
    children: [
      { nameRu: 'Эко сумки', nameUz: 'Eko sumkalar', slug: 'eko-sumki-pm' },
      { nameRu: 'Рюкзаки',   nameUz: 'Ryukzaklar',   slug: 'ryukzaki-pm' },
    ],
  },
  {
    icon: 'Footprints', nameRu: 'Спецобувь', nameUz: 'Maxsus poyabzal', slug: 'specobuvj',
    children: [],
  },
  {
    icon: 'Hand', nameRu: 'СИЗ', nameUz: 'Shaxsiy himoya vositalari', slug: 'siz',
    children: [],
  },
  {
    icon: 'Gift', nameRu: 'Сувенирная продукция', nameUz: "Sovg'a mahsulotlar", slug: 'suvenirnaya-produkciya',
    children: [
      { nameRu: 'Ручки',        nameUz: 'Ruchkalar',   slug: 'ruchki-pm' },
      { nameRu: 'Кружки',       nameUz: 'Krujkalar',   slug: 'krujki-pm' },
      { nameRu: 'Термокружки',  nameUz: 'Termokrujkalar', slug: 'termokrujki-pm' },
      { nameRu: 'Подарочные наборы', nameUz: "Sovg'a to'plamlari", slug: 'podarochnye-nabory-pm' },
    ],
  },
]

async function main() {
  const allNewSlugs = []
  for (const cat of tree) {
    allNewSlugs.push(cat.slug)
    for (const sub of cat.children) allNewSlugs.push(sub.slug)
  }

  // Eski kategoriyalardagi mahsulotlarni birinchi yangi kategoriyaga ko'chirish
  const firstCat = await prisma.category.findFirst({ where: { slug: tree[0].slug } })
  if (firstCat) {
    const oldCats = await prisma.category.findMany({ where: { slug: { notIn: allNewSlugs } } })
    for (const old of oldCats) {
      const moved = await prisma.product.updateMany({ where: { categoryId: old.id }, data: { categoryId: firstCat.id } })
      if (moved.count) console.log(`  ↪ "${old.nameRu}" → "${firstCat.nameRu}" (${moved.count} mahsulot)`)
    }
  }

  // Eski kategoriyalarni o'chirish (faqat subkategoriyalar emas bo'lganlarni)
  const deleted = await prisma.category.deleteMany({ where: { slug: { notIn: allNewSlugs }, parentId: null } })
  if (deleted.count) console.log(`  🗑️  ${deleted.count} ta eski kategoriya o'chirildi`)

  // Asosiy kategoriyalarni upsert
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
      console.log(`      └ ${sub.nameRu}`)
    }
  }

  console.log('\n✅ Kategoriyalar muvaffaqiyatli yangilandi!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
