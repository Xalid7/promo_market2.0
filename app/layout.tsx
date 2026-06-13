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
    "Toshkent buyurtma", "Uzbekiston arzon", "sifatli", "narx"
  ],
  authors: [{ name: "PROMO MARKET" }],
  creator: "PROMO MARKET",
  metadataBase: new URL("https://promomarket.uz"),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
