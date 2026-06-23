// Avtomatik tavsif generatori (RU + UZ) — promo / korporativ sovg'alar uchun.
// Bepul, API kalit kerak emas. Mahsulot nomi + kategoriyadan turini aniqlab unikal tavsif tuzadi.
// Bir xil mahsulot uchun har doim bir xil natija (hash orqali), random emas.

type Desc = { descRu: string; descUz: string }

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}
const pick = <T,>(arr: T[], seed: number, salt = 0): T => arr[(seed + salt) % arr.length]

type Bucket =
  | 'pen' | 'notebook' | 'mug' | 'watch' | 'electronics' | 'umbrella'
  | 'giftset' | 'award' | 'toy' | 'sport' | 'print' | 'box' | 'cosmetic'
  | 'textile' | 'cap' | 'polo' | 'jacket' | 'vest' | 'medical' | 'generic'

function detectBucket(s: string): Bucket {
  const t = s.toLowerCase()
  // Tartib muhim: aniqroq so'zlar avval
  if (/награ|кубок|кубк|медал|диплом|sovrin|kubok|medal/.test(t)) return 'award'
  if (/полиграф|визитк|буклет|листовк|календар|флаер|poligraf|vizitka/.test(t)) return 'print'
  if (/коробк|пакет|упаковк|quti|paket/.test(t)) return 'box'
  if (/набор|подарочн|to‘plam|to'plam|sovg‘a to|sovga to/.test(t)) return 'giftset'
  if (/кружк|чашк|посуд|стакан|термос|krujka|chashka|idish/.test(t)) return 'mug'
  if (/ручк|карандаш|\bpen\b|ruchka|qalam/.test(t)) return 'pen'
  if (/ежедневник|блокнот|тетрад|daftar|bloknot|planshet/.test(t)) return 'notebook'
  if (/час(ы|ов|ы)|настольные час|наручные|\bsoat/.test(t)) return 'watch'
  if (/электрон|powerbank|повербанк|флешк|usb|наушник|колонк|elektron/.test(t)) return 'electronics'
  if (/зонт|soyabon|umbrella/.test(t)) return 'umbrella'
  if (/игрушк|плюшев|мягкая игруш|o‘yinchoq|oyinchoq/.test(t)) return 'toy'
  if (/спорт|фитнес|бутылк|sport|fitnes/.test(t)) return 'sport'
  if (/космет|kosmet/.test(t)) return 'cosmetic'
  if (/медиц|халат|хирург|tibbiy|jarroh/.test(t)) return 'medical'
  if (/жилет|jilet|vest/.test(t)) return 'vest'
  if (/кепк|бейсбол|каскетк|панам|колпак|шапк|\bkep\b|panam/.test(t)) return 'cap'
  if (/текстиль|полотен|постел|сумк|футбол|худи|толстов|свитшот|tekstil|sumka|futbol/.test(t)) return 'textile'
  if (/поло|polo|туник/.test(t)) return 'polo'
  if (/куртк|ветровк|kurtka/.test(t)) return 'jacket'
  return 'generic'
}

const BENEFIT: Record<Bucket, { ru: string[]; uz: string[] }> = {
  pen: {
    ru: ['практичный рекламный сувенир и недорогой корпоративный подарок', 'удобная ручка для офиса и промоакций с фирменной символикой', 'популярный промо-подарок, который всегда на виду у клиента'],
    uz: ['amaliy reklama suveniri va arzon korporativ sovg‘a', 'ofis va promoaksiyalar uchun firma belgili qulay ruchka', 'mijoz doim ko‘rib turadigan ommabop promo-sovg‘a'],
  },
  notebook: {
    ru: ['стильный ежедневник для делового подарка и корпоративного набора', 'удобный блокнот с фирменной символикой для офиса и партнёров', 'практичный деловой подарок, который используют каждый день'],
    uz: ['ishbilarmon sovg‘a va korporativ to‘plam uchun zamonaviy daftar', 'ofis va hamkorlar uchun firma belgili qulay bloknot', 'har kuni ishlatiladigan amaliy ishbilarmon sovg‘a'],
  },
  mug: {
    ru: ['кружка с нанесением логотипа — тёплый и запоминающийся корпоративный подарок', 'практичная посуда с фирменной символикой для офиса и подарков', 'популярный промо-сувенир, который остаётся с клиентом надолго'],
    uz: ['logotip tushirilgan krujka — iliq va esda qoladigan korporativ sovg‘a', 'ofis va sovg‘alar uchun firma belgili amaliy idish', 'mijoz bilan uzoq qoladigan ommabop promo-suvenir'],
  },
  watch: {
    ru: ['презентабельные часы с логотипом для статусного корпоративного подарка', 'стильный аксессуар с фирменной символикой для партнёров и сотрудников', 'элегантный деловой подарок, подчёркивающий имидж компании'],
    uz: ['nufuzli korporativ sovg‘a uchun logotipli ko‘rkam soat', 'hamkor va xodimlar uchun firma belgili zamonaviy aksessuar', 'kompaniya imidjini ta’kidlovchi nafis ishbilarmon sovg‘a'],
  },
  electronics: {
    ru: ['полезный электронный гаджет с логотипом — современный корпоративный подарок', 'практичная брендированная электроника для партнёров и клиентов', 'востребованный промо-подарок с высокой ценностью для получателя'],
    uz: ['logotipli foydali elektron gadjet — zamonaviy korporativ sovg‘a', 'hamkor va mijozlar uchun amaliy brendlangan elektronika', 'qabul qiluvchi uchun qadrli ommabop promo-sovg‘a'],
  },
  umbrella: {
    ru: ['зонт с нанесением логотипа — практичный и заметный рекламный сувенир', 'надёжный зонт с фирменной символикой, который работает как наружная реклама', 'полезный корпоративный подарок на каждый день'],
    uz: ['logotip tushirilgan soyabon — amaliy va ko‘zga tashlanadigan reklama suveniri', 'tashqi reklama vazifasini bajaruvchi firma belgili ishonchli soyabon', 'har kun uchun foydali korporativ sovg‘a'],
  },
  giftset: {
    ru: ['готовый подарочный набор для сотрудников, клиентов и партнёров', 'презентабельный корпоративный набор с фирменной символикой', 'комплексный деловой подарок в едином стиле компании'],
    uz: ['xodimlar, mijoz va hamkorlar uchun tayyor sovg‘a to‘plami', 'firma belgili ko‘rkam korporativ to‘plam', 'kompaniya yagona uslubidagi kompleks ishbilarmon sovg‘a'],
  },
  award: {
    ru: ['наградная символика для церемоний, конкурсов и корпоративных мероприятий', 'кубок с гравировкой для награждения сотрудников и победителей', 'презентабельная награда, подчёркивающая значимость события'],
    uz: ['marosim, tanlov va korporativ tadbirlar uchun sovrin ramzi', 'xodim va g‘oliblarni taqdirlash uchun o‘yma kubok', 'tadbir ahamiyatini ta’kidlovchi ko‘rkam mukofot'],
  },
  toy: {
    ru: ['игрушка с фирменной символикой — оригинальный промо-подарок для акций', 'мягкий и приятный сувенир, который радует детей и взрослых', 'запоминающийся рекламный подарок с брендированием'],
    uz: ['firma belgili o‘yinchoq — aksiyalar uchun original promo-sovg‘a', 'bolalar va kattalarni xursand qiluvchi yumshoq va yoqimli suvenir', 'brendlangan esda qoladigan reklama sovg‘asi'],
  },
  sport: {
    ru: ['спортивный аксессуар с логотипом для активных промокампаний и команд', 'практичный товар для спорта и отдыха с фирменной символикой', 'полезный промо-подарок для здорового образа жизни'],
    uz: ['faol promokampaniya va jamoalar uchun logotipli sport aksessuari', 'sport va dam olish uchun firma belgili amaliy mahsulot', 'sog‘lom turmush uchun foydali promo-sovg‘a'],
  },
  print: {
    ru: ['качественная полиграфия для презентации бренда и деловых коммуникаций', 'печатная продукция с фирменным дизайном — визитки, буклеты, календари', 'профессиональное оформление для имиджа компании'],
    uz: ['brendni taqdim etish va ishbilarmon aloqa uchun sifatli poligrafiya', 'firma dizaynli bosma mahsulot — vizitka, buklet, kalendar', 'kompaniya imidji uchun professional bezak'],
  },
  box: {
    ru: ['брендированная упаковка, коробки и пакеты для подарков и продукции', 'качественная подарочная упаковка с фирменной символикой', 'презентабельное оформление, которое усиливает ценность подарка'],
    uz: ['sovg‘a va mahsulot uchun brendlangan quti va paketlar', 'firma belgili sifatli sovg‘a o‘rovi', 'sovg‘a qadrini oshiruvchi ko‘rkam bezak'],
  },
  cosmetic: {
    ru: ['продукция для косметологии и ухода с возможностью брендирования', 'практичный набор с фирменной символикой для салонов и подарков', 'качественный товар с нанесением логотипа компании'],
    uz: ['kosmetologiya va parvarish mahsuloti, brendlash imkoniyatli', 'salon va sovg‘alar uchun firma belgili amaliy to‘plam', 'kompaniya logotipi tushirilgan sifatli mahsulot'],
  },
  textile: {
    ru: ['промотекстиль с нанесением логотипа для команд, акций и подарков', 'практичный текстиль с фирменной символикой из качественной ткани', 'брендированное изделие для корпоративного стиля'],
    uz: ['jamoa, aksiya va sovg‘alar uchun logotipli promo tekstil', 'sifatli matodan firma belgili amaliy tekstil', 'korporativ uslub uchun brendlangan buyum'],
  },
  cap: {
    ru: ['кепка с нанесением логотипа для промоакций, команд и мероприятий', 'удобный головной убор с фирменной символикой и регулируемой застёжкой', 'заметный промо-аксессуар, который дополнит фирменный стиль'],
    uz: ['promoaksiya, jamoa va tadbirlar uchun logotipli kep', 'firma belgili va sozlanadigan to‘qqili qulay bosh kiyim', 'firma uslubini to‘ldiruvchi ko‘zga tashlanadigan promo-aksessuar'],
  },
  polo: {
    ru: ['рубашка поло с фирменной символикой — аккуратная корпоративная форма', 'презентабельное поло для персонала и промокампаний', 'удобная форма с вышивкой логотипа для команды'],
    uz: ['firma belgili polo ko‘ylak — ozoda korporativ forma', 'xodimlar va promokampaniyalar uchun ko‘rkam polo', 'jamoa uchun logotip tikuvli qulay forma'],
  },
  jacket: {
    ru: ['куртка или ветровка с логотипом для команды и наружных мероприятий', 'практичная верхняя одежда с фирменной символикой', 'тёплый брендированный аксессуар для активной работы'],
    uz: ['jamoa va tashqi tadbirlar uchun logotipli kurtka yoki shamolqaytargich', 'firma belgili amaliy ustki kiyim', 'faol ish uchun issiq brendlangan buyum'],
  },
  vest: {
    ru: ['жилет с фирменной символикой — заметная форма для персонала и промо', 'практичный брендированный жилет для команд и мероприятий', 'удобная форма, которая выделит сотрудников'],
    uz: ['firma belgili jilet — xodim va promo uchun ko‘zga tashlanadigan forma', 'jamoa va tadbirlar uchun amaliy brendlangan jilet', 'xodimlarni ajratib turuvchi qulay forma'],
  },
  medical: {
    ru: ['медицинская продукция с возможностью нанесения логотипа клиники', 'практичное изделие для медучреждений с фирменной символикой', 'качественный товар для клиник, аптек и лабораторий'],
    uz: ['klinika logotipini tushirish imkoniyatli tibbiyot mahsuloti', 'tibbiyot muassasalari uchun firma belgili amaliy buyum', 'klinika, dorixona va laboratoriyalar uchun sifatli mahsulot'],
  },
  generic: {
    ru: ['рекламный сувенир с нанесением логотипа для корпоративных подарков и промо', 'практичный брендированный товар для бизнеса и мероприятий', 'качественное изделие под фирменную символику любым тиражом'],
    uz: ['korporativ sovg‘a va promo uchun logotipli reklama suveniri', 'biznes va tadbirlar uchun amaliy brendlangan mahsulot', 'firma belgisi ostida har qanday tirajdagi sifatli buyum'],
  },
}

const CLOSE_RU = [
  'Наносим логотип шелкографией, вышивкой, УФ-печатью или тиснением — любой тираж под заказ в Ташкенте.',
  'Брендируем вашей символикой, изготавливаем под корпоративный заказ оптом по Узбекистану.',
  'Нанесение логотипа компании, доставка по Ташкенту и всему Узбекистану.',
  'Любой тираж, фирменное брендирование и быстрое изготовление от PROMO MARKET.',
]
const CLOSE_UZ = [
  'Logotipni shelkografiya, tikuv, UF-bosma yoki bo‘rttirma bilan tushiramiz — Toshkentda har qanday tirajda buyurtma.',
  'Belgingiz bilan brendlaymiz, O‘zbekiston bo‘ylab ulgurji korporativ buyurtma tayyorlaymiz.',
  'Kompaniya logotipini tushiramiz, Toshkent va butun O‘zbekiston bo‘ylab yetkazib berish.',
  'Har qanday tiraj, firma brendlash va PROMO MARKET dan tez tayyorlash.',
]

/** Mahsulot nomi (+ ixtiyoriy kategoriya) dan unikal RU/UZ tavsif yaratadi. */
export function generateDescription(nameRu: string, nameUz?: string, categoryRu?: string): Desc {
  const basis = `${nameRu} ${categoryRu || ''}`
  const seed = hash(basis)
  const bucket = detectBucket(basis)

  const benefitRu = pick(BENEFIT[bucket].ru, seed)
  const benefitUz = pick(BENEFIT[bucket].uz, seed)
  const closeRu = pick(CLOSE_RU, seed, 1)
  const closeUz = pick(CLOSE_UZ, seed, 1)

  const descRu = `${nameRu} — ${benefitRu}. ${closeRu}`
  const descUz = `${nameUz || nameRu} — ${benefitUz}. ${closeUz}`
  return { descRu, descUz }
}
