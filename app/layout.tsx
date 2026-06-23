import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: "PROMO MARKET — Промо сувениры и корпоративные подарки в Ташкенте",
    template: "%s | PROMO MARKET",
  },
  description: "Рекламные сувениры, корпоративные подарки, нанесение логотипов, промо текстиль на заказ в Ташкенте. Быстро, качественно, любой тираж.",
  keywords: [
    "промо сувениры Ташкент", "промо сувениры Узбекистан", "корпоративные подарки", "рекламная продукция", "нанесение логотипа", "брендирование", "рекламные сувениры", "бизнес подарки", "сувениры с логотипом", "ручки с логотипом", "ежедневники", "кружки с логотипом",
    "promo suvenirlar Toshkent", "promo suvenirlar Uzbekiston", "korporativ sovgalar", "reklama mahsulotlari", "logotip bosish", "brendlangan mahsulotlar", "esdalik sovgalar", "biznes sovgalar", "ruchkalar", "daftarlar", "krujkalar",
    "Toshkent buyurtma", "Uzbekiston arzon", "sifatli", "narx",
    // Mahsulot kategoriyalari
    "промо текстиль", "посуда с логотипом", "ежедневники и блокноты", "ручки", "часы с логотипом", "электроника с логотипом",
    "подарочные наборы", "сувениры к праздникам", "наградная символика", "кубки и медали", "игрушки с логотипом",
    "спортивная атрибутика", "полиграфия", "коробки и пакеты", "промо аксессуары", "косметология", "зонты с логотипом", "продукция для медицины",
    // Targetlangan kombinatsiyalar
    "корпоративные подарки Ташкент", "сувениры с логотипом Ташкент", "ежедневники на заказ", "кружки с логотипом оптом",
    "зонты с логотипом Ташкент", "наградная символика Узбекистан", "брендирование продукции Ташкент", "подарочные наборы для сотрудников",
    // O'zbekcha kategoriyalar
    "soyabonlar", "sovrin ramzlari", "sovg'a to'plamlari", "poligrafiya", "krujka logotip bilan", "soatlar logotip bilan"
  ],
  authors: [{ name: "PROMO MARKET" }],
  creator: "PROMO MARKET",
  metadataBase: new URL("https://www.promomarket.uz"),
  verification: { google: "85CLV09Wh7f2-cszA8tzNMND6Vj7OKhjWRNL_STRFMw" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "PROMO MARKET",
    title: "PROMO MARKET — Промо сувениры и корпоративные подарки в Ташкенте",
    description: "Рекламные сувениры, корпоративные подарки, нанесение логотипов на заказ в Ташкенте.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "PROMO MARKET — Промо сувениры и корпоративные подарки",
  image: "https://www.promomarket.uz/logo.png",
  "@id": "https://www.promomarket.uz",
  url: "https://www.promomarket.uz",
  telephone: "+998777416688",
  email: "info@promomarket.uz",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Юнус Ражабий 14/2",
    addressLocality: "Ташкент",
    addressRegion: "Яккасарайский район",
    addressCountry: "UZ",
  },
  areaServed: "Узбекистан",
  description:
    "Рекламные сувениры, корпоративные подарки, промотекстиль и брендированная продукция с нанесением логотипа на заказ в Ташкенте.",
  sameAs: ["https://t.me/PromoMarket_Tashkent"],
  makesOffer: [
    "Промо текстиль", "Ежедневники и блокноты", "Ручки с логотипом", "Кружки с логотипом", "Подарочные наборы",
    "Наградная символика", "Зонты с логотипом", "Полиграфия", "Корпоративные подарки", "Промо аксессуары",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
