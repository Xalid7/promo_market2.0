import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TelegramFloat from '@/components/ui/TelegramFloat'

export const metadata: Metadata = {
  alternates: { canonical: "https://www.promomarket.uz" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://www.promomarket.uz",
  "name": "PROMO MARKET",
  "description": "Рекламные сувениры, корпоративные подарки, промотекстиль и брендированная продукция с нанесением логотипа на заказ в Ташкенте.",
  "url": "https://www.promomarket.uz",
  "image": "https://www.promomarket.uz/logo.png",
  "telephone": "+998777416688",
  "email": "info@promomarket.uz",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Юнус Ражабий 14/2",
    "addressLocality": "Ташкент",
    "addressRegion": "Яккасарайский район",
    "addressCountry": "UZ"
  },
  "areaServed": "Узбекистан",
  "openingHours": "Mo-Sa 09:00-18:00",
  "priceRange": "$$",
  "sameAs": ["https://t.me/PromoMarket_Tashkent"],
  "makesOffer": [
    "Промо текстиль", "Ежедневники и блокноты", "Ручки с логотипом", "Кружки с логотипом", "Подарочные наборы",
    "Наградная символика", "Зонты с логотипом", "Полиграфия", "Корпоративные подарки", "Промо аксессуары"
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name } }))
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <TelegramFloat />
    </>
  )
}
