import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// AI generatsiya qilingan mahsulotlar (har kategoriya/subkategoriyaga bittadan).
// upsert: slug bo'yicha — admin qo'shgan mahsulotlarni O'CHIRMAYDI, faqat shularni qo'shadi/yangilaydi.
const products = [
  // ── Asosiy 17 kategoriya ──
  { nameRu: 'Футболка', nameUz: 'Futbolka', slug: 'tovar-promo-tekstil', catSlug: 'promo-tekstil', img: 'cat-promo-tekstil.png' },
  { nameRu: 'Кружка', nameUz: 'Krujka', slug: 'tovar-posuda', catSlug: 'posuda', img: 'cat-posuda.png' },
  { nameRu: 'Ежедневник', nameUz: 'Kundalik', slug: 'tovar-ezhednevniki', catSlug: 'ezhednevniki-bloknoty', img: 'cat-ezhednevniki-bloknoty.png' },
  { nameRu: 'Ручка', nameUz: 'Ruchka', slug: 'tovar-ruchki', catSlug: 'ruchki', img: 'cat-ruchki.png' },
  { nameRu: 'Часы настенные', nameUz: 'Devor soati', slug: 'tovar-chasy', catSlug: 'chasy', img: 'cat-chasy.png' },
  { nameRu: 'Power bank', nameUz: 'Power bank', slug: 'tovar-elektronika', catSlug: 'elektronika', img: 'cat-elektronika.png' },
  { nameRu: 'Подарочный набор', nameUz: 'Sovgʻa toʻplami', slug: 'tovar-podarochnye-nabory', catSlug: 'podarochnye-nabory', img: 'cat-podarochnye-nabory.png' },
  { nameRu: 'Праздничный набор', nameUz: 'Bayram toʻplami', slug: 'tovar-prazdniki', catSlug: 'prazdniki', img: 'cat-prazdniki.png' },
  { nameRu: 'Кубок наградной', nameUz: 'Sovrin kubogi', slug: 'tovar-nagradnaya', catSlug: 'nagradnaya-simvolika', img: 'cat-nagradnaya-simvolika.png' },
  { nameRu: 'Плюшевая игрушка', nameUz: 'Plyush oʻyinchoq', slug: 'tovar-igrushki', catSlug: 'igrushki', img: 'cat-igrushki.png' },
  { nameRu: 'Спортивная бутылка', nameUz: 'Sport idishi', slug: 'tovar-sport', catSlug: 'sport', img: 'cat-sport.png' },
  { nameRu: 'Визитки', nameUz: 'Vizitkalar', slug: 'tovar-poligrafiya', catSlug: 'poligrafiya', img: 'cat-poligrafiya.png' },
  { nameRu: 'Подарочный пакет', nameUz: 'Sovgʻa paketi', slug: 'tovar-korobki-pakety', catSlug: 'korobki-pakety', img: 'cat-korobki-pakety.png' },
  { nameRu: 'Брелок', nameUz: 'Brellok', slug: 'tovar-promo-aksessuary', catSlug: 'promo-aksessuary', img: 'cat-promo-aksessuary.png' },
  { nameRu: 'Кошелёк', nameUz: 'Hamyon', slug: 'tovar-kancelyariya', catSlug: 'kancelyariya', img: 'cat-kancelyariya.png' },
  { nameRu: 'Зонт', nameUz: 'Soyabon', slug: 'tovar-zonty', catSlug: 'zonty', img: 'cat-zonty.png' },
  { nameRu: 'Медицинский халат', nameUz: 'Tibbiy xalat', slug: 'tovar-dlya-mediciny', catSlug: 'dlya-mediciny', img: 'cat-dlya-mediciny.png' },
  // ── Subkategoriyalar bu yerga qo'shiladi (keyingi bosqich) ──
]

async function main() {
  const cats = await prisma.category.findMany({ select: { id: true, slug: true } })
  const catMap = Object.fromEntries(cats.map(c => [c.slug, c.id]))
  let ok = 0, skip = 0
  for (const p of products) {
    const categoryId = catMap[p.catSlug]
    if (!categoryId) { console.log(`  ⚠️ kategoriya topilmadi: ${p.catSlug}`); skip++; continue }
    const images = JSON.stringify([`/uploads/${p.img}`])
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { nameRu: p.nameRu, nameUz: p.nameUz, images, categoryId, isNew: true },
      create: { nameRu: p.nameRu, nameUz: p.nameUz, slug: p.slug, images, categoryId, isNew: true },
    })
    ok++
  }
  console.log(`\n✅ ${ok} ta mahsulot qo'shildi/yangilandi (skip: ${skip})`)
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
