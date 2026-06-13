import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "О компании",
  description: "PROMO MARKET — производитель рекламной продукции и промо сувениров в Ташкенте. Корпоративные подарки, нанесение логотипов с 2014 года.",
  keywords: ["промо сувениры компания Ташкент", "производитель сувениров Узбекистан", "о компании PROMO MARKET"],
  alternates: { canonical: "https://promomarket.uz/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
