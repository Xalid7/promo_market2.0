const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin user
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@promomarket.uz' },
    update: {},
    create: { email: 'admin@promomarket.uz', password: hash, name: 'Admin' },
  });
  console.log('✓ Admin created');

  // Settings
  const existingSettings = await prisma.settings.findFirst();
  if (existingSettings) {
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: {
        telegram: "https://t.me/PromoMarket_Tashkent",
        email: "info@promomarket.uz",
      }
    });
  } else {
    await prisma.settings.create({
      data: {
        telegram: "https://t.me/PromoMarket_Tashkent",
        email: "info@promomarket.uz",
        phone: "+998 77 741 66 88",
        address: "Республика Узбекистан, г. Ташкент",
        mapLat: "41.2995",
        mapLng: "69.2401",
        aboutRu: "PROMO MARKET — ведущий производитель и поставщик корпоративной одежды, спецодежды, СИЗ и брендированной продукции в Узбекистане.",
        aboutUz: "PROMO MARKET — O'zbekistonda korporativ kiyim, maxsus kiyim, SHV va brendlangan mahsulotlarning yetakchi ishlab chiqaruvchisi va yetkazib beruvchisi.",
      }
    });
  }

  // Skip if data already exists
  const catCount = await prisma.category.count();
  if (catCount > 0) {
    console.log('Data exists, skipping categories/products/services.');
    return;
  }

  // Categories
  const cats = {};

  const catList = [
    { nameRu: "Спецодежда", nameUz: "Maxsus kiyim", icon: "🦺", slug: "specodezhda", order: 0 },
    { nameRu: "Спецобувь", nameUz: "Maxsus poyabzal", icon: "👢", slug: "specobuv", order: 1 },
    { nameRu: "СИЗ", nameUz: "Shaxsiy himoya vositalari", icon: "🧤", slug: "siz", order: 2 },
    { nameRu: "Корпоративная одежда", nameUz: "Korporativ kiyim", icon: "🧥", slug: "korporativnaya-odezhda", order: 3 },
    { nameRu: "Промотекстиль", nameUz: "Promotekstil", icon: "🧵", slug: "promotekstil", order: 4 },
    { nameRu: "Головные уборы", nameUz: "Bosh kiyimlar", icon: "🧢", slug: "golovnye-ubory", order: 5 },
    { nameRu: "Сувениры", nameUz: "Sovg'alar", icon: "🎁", slug: "suvenirnaya-produkciya", order: 6 },
    { nameRu: "Новинки", nameUz: "Yangiliklar", icon: "✨", slug: "new", order: 7 },
  ];

  for (const c of catList) {
    const created = await prisma.category.create({ data: c });
    cats[c.slug] = created.id;
    console.log('✓ Category:', c.nameRu);
  }

  // Products
  const products = [
    { nameRu: "Рабочий костюм летний", nameUz: "Yozgi ishchi kiyim to'plami", slug: "rabochiy-kostyum-letniy", isNew: true, isCollection: false, categorySlug: "specodezhda" },
    { nameRu: "Рабочий костюм зимний", nameUz: "Qishki ishchi kiyim to'plami", slug: "rabochiy-kostyum-zimniy", isNew: false, isCollection: false, categorySlug: "specodezhda" },
    { nameRu: "Костюм сварщика", nameUz: "Payvandchi kostyumi", slug: "kostyum-svarchika", isNew: false, isCollection: false, categorySlug: "specodezhda" },
    { nameRu: "Ботинки защитные кожаные", nameUz: "Charm himoya botinkalari", slug: "botinki-zaschitnye", isNew: true, isCollection: false, categorySlug: "specobuv" },
    { nameRu: "Сапоги резиновые рабочие", nameUz: "Rezina ishchi etiklari", slug: "sapogi-rezinovye", isNew: false, isCollection: false, categorySlug: "specobuv" },
    { nameRu: "Каска защитная строительная", nameUz: "Qurilish himoya dubulg'asi", slug: "kaska-zaschitnaya", isNew: false, isCollection: false, categorySlug: "siz" },
    { nameRu: "Перчатки нитриловые", nameUz: "Nitril qo'lqoplar", slug: "perchatki-nitrilovye", isNew: false, isCollection: false, categorySlug: "siz" },
    { nameRu: "Жилет сигнальный", nameUz: "Signal jilet", slug: "zhilet-signalnyy", isNew: false, isCollection: false, categorySlug: "siz" },
    { nameRu: "Рубашка корпоративная", nameUz: "Korporativ ko'ylak", slug: "rubashka-korporativnaya", isNew: true, isCollection: true, categorySlug: "korporativnaya-odezhda" },
    { nameRu: "Поло корпоративное с вышивкой", nameUz: "Kashtali korporativ polo", slug: "polo-korporativnoe", isNew: false, isCollection: true, categorySlug: "korporativnaya-odezhda" },
    { nameRu: "Футболка брендированная", nameUz: "Brendlangan futbolka", slug: "futbolka-brendirovannaya", isNew: true, isCollection: false, categorySlug: "promotekstil" },
    { nameRu: "Кепка с логотипом", nameUz: "Logotipli kepka", slug: "kepka-s-logotipom", isNew: false, isCollection: false, categorySlug: "golovnye-ubory" },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        nameRu: p.nameRu,
        nameUz: p.nameUz,
        slug: p.slug,
        isNew: p.isNew,
        isCollection: p.isCollection,
        isHoliday: false,
        images: '[]',
        categoryId: cats[p.categorySlug],
      }
    });
    console.log('✓ Product:', p.nameRu);
  }

  // Nav Services
  const services = [
    { nameRu: "Вышивка", nameUz: "Kashta tikish", slug: "vyshivka", order: 0 },
    { nameRu: "Шелкография", nameUz: "Shyolkografiya", slug: "shelkografiya", order: 1 },
    { nameRu: "УФ-печать", nameUz: "UF-bosma", slug: "uf-pechat", order: 2 },
    { nameRu: "Сублимация", nameUz: "Sublimatsiya", slug: "sublimatsiya", order: 3 },
    { nameRu: "DTF печать", nameUz: "DTF bosma", slug: "dtf-pechat", order: 4 },
    { nameRu: "Тиснение", nameUz: "Tisnenie", slug: "tisnenie", order: 5 },
    { nameRu: "Лазерная гравировка", nameUz: "Lazer gravirovka", slug: "lazernaya-gravirovka", order: 6 },
    { nameRu: "Тампопечать", nameUz: "Tampobosma", slug: "tampopechat", order: 7 },
  ];

  for (const s of services) {
    await prisma.navService.create({ data: s });
    console.log('✓ Service:', s.nameRu);
  }

  console.log('\nSeeding complete!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
