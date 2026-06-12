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
  console.log('✓ Admin');

  // Settings
  const existingSettings = await prisma.settings.findFirst();
  if (existingSettings) {
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: { telegram: "https://t.me/PromoMarket_Tashkent", email: "info@promomarket.uz" }
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
        aboutRu: "PROMO MARKET — производство и поставка корпоративной одежды, рекламной продукции и брендированных сувениров в Узбекистане.",
        aboutUz: "PROMO MARKET — O'zbekistonda korporativ kiyim, reklama mahsulotlari va brendlangan sovg'alar ishlab chiqarish va yetkazib berish.",
      }
    });
  }

  // Clear old data and re-seed
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.navService.deleteMany({});
  console.log('✓ Old data cleared');

  // Categories
  const catList = [
    { nameRu: "Промо текстиль",          nameUz: "Promo to'qimachilik",      icon: "👕", slug: "promo-tekstil",        order: 0 },
    { nameRu: "Посуда",                   nameUz: "Idish-tovoq",              icon: "🍽️", slug: "posuda",               order: 1 },
    { nameRu: "Ежедневники и блокноты",   nameUz: "Kundaliklar va daftarlar", icon: "📓", slug: "ezhednevniki",         order: 2 },
    { nameRu: "Ручки",                    nameUz: "Qalamlar",                 icon: "🖊️", slug: "ruchki",               order: 3 },
    { nameRu: "Часы",                     nameUz: "Soatlar",                  icon: "⌚", slug: "chasy",                order: 4 },
    { nameRu: "Электроника",              nameUz: "Elektronika",              icon: "💻", slug: "elektronika",          order: 5 },
    { nameRu: "Подарочные наборы",        nameUz: "Sovg'a to'plamlari",       icon: "🎁", slug: "podarochnye-nabory",   order: 6 },
    { nameRu: "Праздники",                nameUz: "Bayramlar",                icon: "🎉", slug: "prazdniki",            order: 7 },
    { nameRu: "Наградная символика",      nameUz: "Mukofot ramzlari",         icon: "🏅", slug: "nagradnaya-simvolika", order: 8 },
    { nameRu: "Игрушки",                  nameUz: "O'yinchoqlar",             icon: "🧸", slug: "igrushki",             order: 9 },
    { nameRu: "Спорт",                    nameUz: "Sport",                    icon: "⚽", slug: "sport",                order: 10 },
    { nameRu: "Полиграфия",               nameUz: "Poligrafiya",              icon: "🖨️", slug: "poligrafiya",          order: 11 },
    { nameRu: "Коробки и пакеты",         nameUz: "Qutichalar va paketlar",   icon: "📦", slug: "korobki-pakety",       order: 12 },
    { nameRu: "Промо аксессуары",         nameUz: "Promo aksessuarlar",       icon: "🔑", slug: "promo-aksessuary",     order: 13 },
    { nameRu: "Косметология",             nameUz: "Kosmetologiya",            icon: "💄", slug: "kosmetologiya",        order: 14 },
    { nameRu: "Зонты",                    nameUz: "Soyabonlar",               icon: "☂️", slug: "zonty",                order: 15 },
    { nameRu: "Для медицины",             nameUz: "Tibbiyot uchun",           icon: "🏥", slug: "dlya-meditsiny",       order: 16 },
  ];

  for (const c of catList) {
    await prisma.category.create({ data: c });
    console.log('✓ Category:', c.nameRu);
  }

  // Nav Services (printing methods)
  const services = [
    { nameRu: "Вышивка",           nameUz: "Kashta tikish",   slug: "vyshivka",          order: 0 },
    { nameRu: "Шелкография",       nameUz: "Shyolkografiya",  slug: "shelkografiya",     order: 1 },
    { nameRu: "УФ-печать",         nameUz: "UF-bosma",        slug: "uf-pechat",         order: 2 },
    { nameRu: "Сублимация",        nameUz: "Sublimatsiya",    slug: "sublimatsiya",      order: 3 },
    { nameRu: "DTF печать",        nameUz: "DTF bosma",       slug: "dtf-pechat",        order: 4 },
    { nameRu: "Тиснение",          nameUz: "Tisnenie",        slug: "tisnenie",          order: 5 },
    { nameRu: "Лазерная гравировка", nameUz: "Lazer gravirovka", slug: "lazernaya-gravirovka", order: 6 },
    { nameRu: "Тампопечать",       nameUz: "Tampobosma",      slug: "tampopechat",       order: 7 },
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
