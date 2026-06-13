import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Услуги",
  description: "Услуги PROMO MARKET: брендирование одежды, нанесение логотипов, рекламные сувениры, корпоративные подарки, полиграфия в Ташкенте.",
  keywords: ["нанесение логотипа сувениры", "брендирование Ташкент", "рекламная полиграфия Узбекистан", "корпоративные подарки услуги"],
  alternates: { canonical: "https://promomarket.uz/services" },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
