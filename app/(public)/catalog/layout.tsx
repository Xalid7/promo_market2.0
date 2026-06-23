import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Каталог",
  description: "Каталог промо сувениров и рекламной продукции PROMO MARKET. Ручки, ежедневники, кружки, флешки, одежда с логотипом — заказать в Ташкенте.",
  keywords: ["каталог промо сувениров", "купить сувениры Ташкент", "корпоративные подарки каталог", "реклама продукция Узбекистан"],
  alternates: { canonical: "https://www.promomarket.uz/catalog" },
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
