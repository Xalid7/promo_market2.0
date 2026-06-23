import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с PROMO MARKET — производителем промо сувениров в Ташкенте. Телефон, адрес, Telegram. Бесплатный расчёт стоимости заказа.",
  keywords: ["контакты промо сувениры Ташкент", "заказать сувениры", "PROMO MARKET телефон"],
  alternates: { canonical: "https://www.promomarket.uz/contacts" },
}

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children
}
