'use client'
import { useEffect, useState } from 'react'

const services = [
  {
    icon: '🎁',
    ru: 'Корпоративные подарки и сувениры с логотипом: кружки, ежедневники, брелоки, флешки',
    uz: "Korporativ sovg'alar va logotipli suvenirlar: krujkalar, kundaliklar, kalitlar, flesh-disklar",
  },
  {
    icon: '👕',
    ru: 'Брендированная одежда: футболки, поло, худи, кепки с нанесением логотипа компании',
    uz: 'Brendlangan kiyim: futbolkalar, polo, xudi, kepkalar — kompaniya logotipi bilan',
  },
  {
    icon: '🖨️',
    ru: 'Рекламная полиграфия: листовки, баннеры, визитки, каталоги и POS-материалы',
    uz: "Reklama poligrafiyasi: varaqalar, bannerlar, vizit kartalar, kataloglar va POS materiallar",
  },
  {
    icon: '📦',
    ru: 'Подарочные наборы и упаковка: фирменные коробки, пакеты, лента и наполнение',
    uz: "Sovg'a to'plamlari va qadoqlash: brendlangan qutichalar, paketlar, lenta va to'ldiruvchilar",
  },
  {
    icon: '💡',
    ru: 'Промо аксессуары: ручки, брелоки, зонты, флаги, значки и другая сувенирная продукция',
    uz: "Promo aksessuarlar: qalamlar, kalitlar, soyabonlar, bayroqlar, nishonlar va suvenir mahsulotlar",
  },
  {
    icon: '👤',
    ru: 'Персональный менеджер и сопровождение на всех этапах заказа — от дизайна до доставки',
    uz: "Shaxsiy menejer va buyurtmaning barcha bosqichlarida qo'llab-quvvatlash — dizayndan yetkazishgacha",
  },
]

const content = {
  ru: {
    tag: 'PROMO MARKET',
    hero: 'Ведущий поставщик промо сувениров в Узбекистане',
    heroSub: 'PROMO MARKET — производство и поставка корпоративных подарков, рекламной продукции и брендированных сувениров в Узбекистане.',
    p1: 'Компания PROMO MARKET является одним из ведущих поставщиков промо продукции и корпоративных сувениров в Узбекистане. Широкий ассортимент и собственное производство обеспечивают конкурентоспособные цены и высокое качество.',
    p2: 'Приоритетом нашей компании является точное выполнение брендирования и быстрые сроки поставки. Каждому клиенту мы предлагаем решения «под ключ» — от разработки дизайна до готовой упакованной продукции с логотипом.',
    p3: 'Каждому заказчику выделяется персональный менеджер, который отвечает за сроки и качество. Мы помогаем подобрать подходящие сувениры, нанести фирменный логотип и организовать доставку по всему Узбекистану.',
    services: 'Наши услуги',
  },
  uz: {
    tag: 'PROMO MARKET',
    hero: "O'zbekistondagi etakchi promo suvenir yetkazib beruvchi",
    heroSub: "PROMO MARKET — O'zbekistonda korporativ sovg'alar, reklama mahsulotlari va brendlangan suvenirlar ishlab chiqarish va yetkazib berish.",
    p1: "PROMO MARKET kompaniyasi O'zbekistondagi promo mahsulotlar va korporativ suvenirlarning yetakchi yetkazib beruvchilaridan biridir. Keng assortiment va o'z ishlab chiqarish bazasi raqobatbardosh narxlar va yuqori sifatni ta'minlaydi.",
    p2: "Kompaniyamizning ustuvor yo'nalishi — brendlashni aniq bajarish va buyurtmalarni tez yetkazib berish. Har bir mijozga dizayn ishlab chiqishdan tortib logotipli tayyor qadoqlangan mahsulotgacha 'kalit topshirish' yechimlarini taklif qilamiz.",
    p3: "Har bir buyurtmachiga shaxsiy menejer ajratiladi, u muddatlar va ijro sifati uchun javob beradi. Mos suvenirlarni tanlashda yordam beramiz, brendlangan logotip joylashtiramiz va O'zbekiston bo'ylab yetkazib beramiz.",
    services: 'Bizning xizmatlar',
  },
}

export default function AboutPage() {
  const [lang, setLang] = useState<'ru' | 'uz'>('ru')
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'ru' | 'uz' | null
    if (saved) setLang(saved)

    const onLangChange = () => {
      const l = localStorage.getItem('lang') as 'ru' | 'uz' | null
      if (l) setLang(l)
    }
    window.addEventListener('langchange', onLangChange)
    fetch('/api/settings').then(r => r.json()).then(setSettings).catch(() => {})
    return () => window.removeEventListener('langchange', onLangChange)
  }, [])

  const t = content[lang]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px 60px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #F57C00, #BF360C)', borderRadius: 20, padding: '36px 32px', color: '#fff', marginBottom: 40 }}>
        <p style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7, marginBottom: 10 }}>{t.tag}</p>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 14, letterSpacing: -0.5 }}>{t.hero}</h1>
        <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.6, maxWidth: 560 }}>
          {lang === 'ru' ? (settings?.aboutRu || t.heroSub) : (settings?.aboutUz || t.heroSub)}
        </p>
      </div>

      {/* Description */}
      <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
        {[t.p1, t.p2, t.p3].map((text, i) => (
          <p key={i} style={{ fontSize: 15, color: '#444', lineHeight: 1.8 }}>{text}</p>
        ))}
      </div>

      {/* Services */}
      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 20, letterSpacing: -0.3 }}>{t.services}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {services.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#fff', border: '1.5px solid #F0F0F0', borderRadius: 14, padding: '16px' }}>
            <span style={{ fontSize: 26, flexShrink: 0 }}>{s.icon}</span>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{lang === 'ru' ? s.ru : s.uz}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
