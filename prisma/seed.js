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
    { nameRu: "Брендированная одежда",  nameUz: "Brendlangan kiyim",       slug: "brendirovannaya-odezhda",  order: 0, imageUrl: "/uploads/svc-branded-clothing.jpg" },
    { nameRu: "Рекламные сувениры",     nameUz: "Reklama suvenirlari",     slug: "reklamnye-suveniry",       order: 1, imageUrl: "/uploads/svc-suveniry.jpg" },
    { nameRu: "Корпоративные подарки",  nameUz: "Korporativ sovg'alar",    slug: "korporativnye-podarki",    order: 2, imageUrl: "/uploads/svc-podarki.jpg" },
    { nameRu: "Нанесение логотипов",    nameUz: "Logotip bosish",          slug: "nanesenie-logotipov",      order: 3, imageUrl: "/uploads/svc-logotipy.jpg" },
    { nameRu: "Рекламная полиграфия",   nameUz: "Reklama poligrafiyasi",   slug: "reklamnaya-poligrafiya",   order: 4, imageUrl: "/uploads/svc-poligrafiya.jpg" },
    { nameRu: "Промо аксессуары",       nameUz: "Promo aksessuarlar",      slug: "promo-aksessuary-svc",     order: 5, imageUrl: "/uploads/svc-aksessuary.jpg" },
    { nameRu: "Подарочные наборы",      nameUz: "Sovg'a to'plamlari",      slug: "podarochnye-nabory-svc",   order: 6, imageUrl: "/uploads/svc-nabory.jpg" },
    { nameRu: "Электроника и гаджеты",  nameUz: "Elektronika va gadjetlar",slug: "elektronika-gadzhety",     order: 7, imageUrl: "/uploads/svc-elektronika.jpg" },
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
