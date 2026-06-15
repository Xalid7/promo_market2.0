'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

const PARTNER_LOGOS = [
  { src: '/partners/akfa_logo.svg', name: 'Akfa' },
  { src: '/partners/cocacola_logo.svg', name: 'Coca-Cola' },
  { src: '/partners/evos_logo.svg', name: 'EVOS' },
  { src: '/partners/golden_house_logo.svg', name: 'Golden House' },
  { src: '/partners/kapitalbank_logo.svg', name: 'Kapital Bank' },
  { src: '/partners/lg_logo.svg', name: 'LG' },
  { src: '/partners/murad_buildings_logo.svg', name: 'Murad Buildings' },
  { src: '/partners/pepsi_logo.svg', name: 'Pepsi' },
  { src: '/partners/romstar_logo.svg', name: 'Romstar' },
  { src: '/partners/samsung_logo.svg', name: 'Samsung' },
  { src: '/partners/undp_logo.svg', name: 'UNDP' },
  { src: '/partners/uzauto_motors_logo.svg', name: 'UzAuto Motors' },
  { src: '/partners/uzbekneftegaz_logo.svg', name: 'Uzbekneftegaz' },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  })
}

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return val
}

function AnimatedWave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  const path = flip
    ? 'M0,26 C240,0 480,52 720,26 C960,0 1200,52 1440,26 L1440,52 L0,52 Z'
    : 'M0,26 C240,52 480,0 720,26 C960,52 1200,0 1440,26 L1440,52 L0,52 Z'
  return (
    <div style={{ background: from, lineHeight: 0, overflow: 'hidden', position: 'relative', height: 52 }}>
      <div style={{ animation: 'waveSlide 8s linear infinite', display: 'flex', width: '200%', position: 'absolute', bottom: 0 }}>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '50%', height: 52, display: 'block', flexShrink: 0 }}>
          <path d={path} fill={to} />
        </svg>
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '50%', height: 52, display: 'block', flexShrink: 0 }}>
          <path d={path} fill={to} />
        </svg>
      </div>
    </div>
  )
}

function StatCard({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active)
  return (
    <div style={{ textAlign: 'center', padding: '0 16px' }}>
      <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#F57C00', lineHeight: 1, marginBottom: 6 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function HomePage() {
  const [banners, setBanners] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [navServices, setNavServices] = useState<any[]>([])
  const [current, setCurrent] = useState(0)
  const [lang, setLang] = useState<'ru' | 'uz'>('ru')
  const [statsActive, setStatsActive] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<any>(null)

  useReveal()

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'ru' | 'uz' | null
    if (saved) setLang(saved)
    const onLangChange = () => { const l = localStorage.getItem('lang') as 'ru'|'uz'|null; if (l) setLang(l) }
    window.addEventListener('langchange', onLangChange)
    fetch('/api/banners').then(r => r.json()).then(setBanners).catch(() => {})
    fetch('/api/products').then(r => r.json()).then(d => {
      if (!Array.isArray(d)) return setProducts([])
      const seen = new Set<string>()
      const sample: any[] = []
      for (const p of d) {
        if (!seen.has(p.categoryId)) { seen.add(p.categoryId); sample.push(p) }
      }
      setProducts(sample)
    }).catch(() => {})
    fetch('/api/nav-services').then(r => r.json()).then(setNavServices).catch(() => {})
    return () => window.removeEventListener('langchange', onLangChange)
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true); io.disconnect() } }, { threshold: 0.3 })
    io.observe(statsRef.current)
    return () => io.disconnect()
  }, [])

  const goNext = useCallback(() => setCurrent(c => (c + 1) % Math.max(banners.length, 1)), [banners.length])
  const goPrev = useCallback(() => setCurrent(c => (c - 1 + Math.max(banners.length, 1)) % Math.max(banners.length, 1)), [banners.length])

  useEffect(() => {
    if (banners.length < 2) return
    intervalRef.current = setInterval(goNext, 5000)
    return () => clearInterval(intervalRef.current)
  }, [banners.length, goNext])

  const services = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>, ru: 'Брендированная одежда', uz: 'Brendlangan kiyim' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, ru: 'Рекламные сувениры', uz: 'Reklama suvenirlari' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>, ru: 'Корпоративные подарки', uz: "Korporativ sovg'alar" },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>, ru: 'Нанесение логотипов', uz: 'Logotip bosish' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="14 2 14 8 20 8"/><path d="M20 8l-6-6H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>, ru: 'Рекламная полиграфия', uz: 'Reklama poligrafiyasi' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>, ru: 'Промо аксессуары', uz: 'Promo aksessuarlar' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>, ru: 'Подарочные наборы', uz: "Sovg'a to'plamlari" },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, ru: 'Электроника и гаджеты', uz: 'Elektronika va gadjetlar' },
  ]

  return (
    <div>

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {banners.length === 0 ? (
          <div style={{ background: 'linear-gradient(-45deg, #EF6C00, #BF360C, #F57C00, #BF360C)', backgroundSize: '400% 400%', animation: 'gradientShift 8s ease infinite', minHeight: 520, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* Animated background shapes */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '55%', height: '120%', background: 'rgba(255,255,255,0.04)', borderRadius: '60% 0 0 60%', animation: 'float 7s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', bottom: '-20%', left: '30%', width: 400, height: 400, background: 'rgba(255,255,255,0.03)', borderRadius: '50%', animation: 'float 9s ease-in-out infinite reverse' }} />
              <div style={{ position: 'absolute', top: '10%', right: '15%', width: 12, height: 12, background: 'rgba(255,255,255,0.25)', borderRadius: '50%', animation: 'float 4s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: 8, height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', animation: 'float 5s ease-in-out infinite 1s' }} />
              <div style={{ position: 'absolute', top: '40%', right: '8%', width: 6, height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite 0.5s' }} />
            </div>

            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
              <div>
                <div className="hero-text-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF8A80', animation: 'pulseRed 1.8s ease infinite' }} />
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
                    {lang === 'ru' ? 'Производство в Узбекистане' : "O'zbekistonda ishlab chiqarish"}
                  </span>
                </div>
                <h1 className="hero-text-2" style={{ color: '#fff', fontSize: 'clamp(32px, 5.5vw, 60px)', fontWeight: 900, letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 20 }}>
                  {lang === 'ru' ? <><span style={{ display: 'block' }}>Промо сувениры</span><span style={{ display: 'block', color: 'rgba(255,255,255,0.7)' }}>и подарки</span></> : <><span style={{ display: 'block' }}>Promo suvenirlar</span><span style={{ display: 'block', color: 'rgba(255,255,255,0.7)' }}>va sovg'alar</span></>}
                </h1>
                <p className="hero-text-3" style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(14px, 1.8vw, 17px)', marginBottom: 36, maxWidth: 420, lineHeight: 1.6 }}>
                  {lang === 'ru' ? 'Рекламная продукция, корпоративные подарки, брендированные сувениры под заказ по всему Узбекистану' : "Reklama mahsulotlari, korporativ sovg'alar, brendlangan suvenirlar — buyurtma asosida O'zbekiston bo'ylab"}
                </p>
                <div className="hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/catalog" className="btn-cta" style={{ background: '#fff', color: '#F57C00', padding: '14px 28px', borderRadius: 99, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 6px 20px rgba(0,0,0,0.25)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M3 12h18M3 18h12"/></svg>
                    {lang === 'ru' ? 'Каталог' : 'Katalog'}
                  </Link>
                  <Link href="/services" style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff', padding: '14px 28px', borderRadius: 99, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                  >
                    {lang === 'ru' ? 'Услуги' : 'Xizmatlar'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', transition: 'transform .5s cubic-bezier(.4,0,.2,1)', transform: `translateX(-${current * 100}%)` }}>
              {banners.map((b: any) => (
                <div key={b.id} style={{ minWidth: '100%', position: 'relative' }}>
                  <div style={{ width: '100%', aspectRatio: '16/9', minHeight: 320, background: '#f5f5f5', position: 'relative', overflow: 'hidden' }}>
                    <img src={b.imageUrl} alt={b.titleRu || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                    {(b.titleRu || b.ctaText) && (
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, transparent 75%)', display: 'flex', alignItems: 'center', padding: '0 5%' }}>
                        <div style={{ maxWidth: 520, color: '#fff' }}>
                          {b.titleRu && <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 42px)', fontWeight: 900, letterSpacing: -0.5, marginBottom: 8, lineHeight: 1.1 }}>{lang === 'ru' ? b.titleRu : b.titleUz}</h2>}
                          {b.subtitleRu && <p style={{ fontSize: 'clamp(13px, 1.8vw, 18px)', opacity: 0.85, marginBottom: 24 }}>{lang === 'ru' ? b.subtitleRu : b.subtitleUz}</p>}
                          {b.ctaText && b.ctaLink && (
                            <Link href={b.ctaLink} style={{ display: 'inline-block', background: '#F57C00', color: '#fff', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>{b.ctaText}</Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {banners.length > 1 && (
              <>
                <button onClick={goPrev} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button onClick={goNext} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', zIndex: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
                  {banners.map((_: any, i: number) => (
                    <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 99, background: i === current ? '#F57C00' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', transition: 'all .3s' }} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      {banners.length === 0 && <AnimatedWave from="#BF360C" to="#fff" />}

      {/* ══════════ STATS ══════════ */}
      <section ref={statsRef} style={{ background: '#fff', borderBottom: '1px solid #F0F0F0' }}>
        <div className="stats-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, alignItems: 'center' }}>
          <StatCard value={5} suffix="+" label={lang === 'ru' ? 'Лет опыта' : 'Yil tajriba'} active={statsActive} />
          <StatCard value={500} suffix="+" label={lang === 'ru' ? 'Клиентов' : 'Mijozlar'} active={statsActive} />
          <StatCard value={3000} suffix="+" label={lang === 'ru' ? 'Видов продукции' : 'Mahsulot turi'} active={statsActive} />
          <StatCard value={8} suffix="+" label={lang === 'ru' ? 'Видов брендинга' : 'Brendlash usullari'} active={statsActive} />
        </div>
        <style>{`
          @media (max-width: 600px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0 !important; }
          }
        `}</style>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section style={{ background: '#FAFAFA', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, color: '#111', letterSpacing: -0.5 }}>
              {lang === 'ru' ? 'Наши услуги' : 'Xizmatlarimiz'}
            </h2>
          </div>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {(navServices.length > 0 ? navServices : services).map((s: any, i: number) => (
              <Link key={s.id || i} href={s.slug ? `/xizmatlar/${s.slug}` : '/services'} className="reveal"
                style={{ textDecoration: 'none', transitionDelay: `${i * 0.05}s` }}
              >
                <div style={{ background: '#fff', border: '1.5px solid #EEEEEE', borderRadius: 18, overflow: 'hidden', transition: 'all .28s cubic-bezier(0.34,1.56,0.64,1)', cursor: 'pointer', height: '100%' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(245,124,0,0.13)'; e.currentTarget.style.borderColor = '#F57C00' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#EEEEEE' }}
                >
                  {/* Image */}
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
                    {s.imageUrl ? (
                      <img src={s.imageUrl} alt={lang === 'ru' ? s.nameRu : s.nameUz}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s cubic-bezier(0.34,1.2,0.64,1)', display: 'block' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = '')}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#FFF0F0,#FFE0E0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F57C00' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                      </div>
                    )}
                  </div>
                  {/* Name */}
                  <div style={{ padding: '14px 16px 16px' }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111', lineHeight: 1.35 }}>
                      {lang === 'ru' ? (s.nameRu || s.ru) : (s.nameUz || s.uz || s.nameRu || s.ru)}
                    </p>
                    <p style={{ fontSize: 12, color: '#F57C00', marginTop: 4, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3 }}>
                      {lang === 'ru' ? 'Подробнее' : 'Batafsil'}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#F57C00', fontWeight: 700, fontSize: 14, textDecoration: 'none', border: '1.5px solid #F57C00', padding: '10px 24px', borderRadius: 99, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F57C00'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#F57C00' }}
            >
              {lang === 'ru' ? 'Все услуги' : "Barcha xizmatlar"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ PRODUCTS ══════════ */}
      {products.length > 0 && (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ color: '#F57C00', fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
                {lang === 'ru' ? 'Ассортимент' : 'Assortiment'}
              </p>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#111', letterSpacing: -0.5 }}>
                {lang === 'ru' ? 'Популярные товары' : 'Mashhur mahsulotlar'}
              </h2>
            </div>
            <Link href="/catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#F57C00', fontWeight: 700, textDecoration: 'none', transition: 'gap .2s' }}
              onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
              onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
            >
              {lang === 'ru' ? 'Весь каталог' : "Barcha mahsulotlar"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 20 }}>
            {products.map((p: any, idx: number) => {
              const imgs = (() => { try { return JSON.parse(p.images) } catch { return [] } })()
              return (
                <Link key={p.id} href={`/catalog/${p.slug}`} className="product-card-3d reveal"
                  style={{ textDecoration: 'none', display: 'block', borderRadius: 18, overflow: 'visible', transitionDelay: `${idx * 0.05}s` }}
                >
                  <div className="product-card-inner" style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s' }}>
                    <div className="prod-img" style={{ aspectRatio: '4/3', background: '#fff', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {imgs[0] ? (
                        <img src={imgs[0]} alt={p.nameRu} style={{ width: '88%', height: '88%', objectFit: 'contain' }} className="product-img" />
                      ) : (
                        <div style={{ fontSize: 52, color: '#DDD' }}>📦</div>
                      )}
                      {p.isNew && (
                        <span className="badge-anim" style={{ position: 'absolute', top: 10, left: 10, background: 'linear-gradient(135deg,#F57C00,#FF5252)', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 7, letterSpacing: 0.8, boxShadow: '0 2px 8px rgba(245,124,0,0.4)' }}>NEW</span>
                      )}
                    </div>
                    <div style={{ padding: '12px 14px 16px' }}>
                      <p style={{ fontSize: 11, color: '#F57C00', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{lang === 'ru' ? p.category?.nameRu : p.category?.nameUz}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#111', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {lang === 'ru' ? p.nameRu : p.nameUz}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      <AnimatedWave from="#fff" to="#F57C00" flip />

      {/* ══════════ WHY US ══════════ */}
      <section style={{ background: 'linear-gradient(135deg, #F57C00 0%, #E65100 100%)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, color: '#fff', letterSpacing: -0.5, marginBottom: 12 }}>
              {lang === 'ru' ? 'Почему выбирают нас?' : 'Nima uchun bizni tanlashadi?'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>
              {lang === 'ru' ? 'Надёжный партнёр в сфере промо сувениров и корпоративных подарков' : "Promo suvenirlar va korporativ sovg'alar sohasida ishonchli hamkor"}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {(lang === 'ru' ? [
              { num: '01', title: 'Огромный ассортимент', desc: 'Сувениры, корпоративные подарки, брендированная одежда и рекламная продукция — всё в одном месте' },
              { num: '02', title: 'Брендинг под ключ', desc: 'Нанесение логотипа на любой продукт: печать, вышивка, гравировка и другие методы' },
              { num: '03', title: 'Быстрое исполнение', desc: 'Выполняем заказы в срок, работаем с юридическими и физическими лицами' },
              { num: '04', title: 'Доставка по Узбекистану', desc: 'Оптовые и розничные поставки промо продукции по всему Узбекистану' },
            ] : [
              { num: '01', title: 'Keng assortiment', desc: "Suvenirlar, korporativ sovg'alar, brendlangan kiyim va reklama mahsulotlari — hammasi bir joyda" },
              { num: '02', title: "To'liq brendlash", desc: "Har qanday mahsulotga logotip qo'yish: bosma, kashta, gravyura va boshqa usullar" },
              { num: '03', title: 'Tez bajarish', desc: "Buyurtmalarni o'z vaqtida bajaramiz, yuridik va jismoniy shaxslar bilan ishlaymiz" },
              { num: '04', title: "O'zbekiston bo'ylab yetkazish", desc: "O'zbekiston bo'ylab promo mahsulotlarni ulgurji va chakana yetkazib berish" },
            ]).map((item, i) => (
              <div key={i} className="reveal" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '28px 24px', backdropFilter: 'blur(4px)', transition: 'background .25s', transitionDelay: `${i * 0.08}s`, cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                <div style={{ fontSize: 36, fontWeight: 900, color: 'rgba(255,255,255,0.2)', lineHeight: 1, marginBottom: 16 }}>{item.num}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedWave from="#E65100" to="#fff" />

      {/* ══════════ PARTNERS ══════════ */}
      <section style={{ padding: '56px 0', background: '#fff', borderTop: '1px solid #F0F0F0' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, color: '#111', letterSpacing: -0.3 }}>
            {lang === 'ru' ? 'Наши партнёры' : 'Hamkorlarimiz'}
          </h2>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #fff, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div className="marquee-track" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div key={i} style={{ flexShrink: 0, padding: '0 36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo.src} alt={logo.name} style={{ height: 44, width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.5, transition: 'all .3s' }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = '' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedWave from="#fff" to="#111" flip />

      {/* ══════════ CTA ══════════ */}
      <section style={{ background: '#111', padding: '64px 24px' }}>
        <div className="reveal" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, color: '#fff', marginBottom: 16, letterSpacing: -0.5 }}>
            {lang === 'ru' ? 'Готовы сделать заказ?' : "Buyurtma berishga tayyormisiz?"}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
            {lang === 'ru' ? 'Свяжитесь с нами — рассчитаем стоимость и сроки бесплатно' : "Biz bilan bog'laning — narx va muddatni bepul hisoblaymiz"}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contacts" className="btn-cta" style={{ background: '#F57C00', color: '#fff', padding: '14px 32px', borderRadius: 99, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
              {lang === 'ru' ? 'Связаться с нами' : "Biz bilan bog'lanish"}
            </Link>
            <Link href="/catalog" style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff', padding: '14px 32px', borderRadius: 99, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-block', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              {lang === 'ru' ? 'Смотреть каталог' : "Katalogni ko'rish"}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes waveSlide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .product-card-3d:hover .product-card-inner {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 48px rgba(0,0,0,0.13), 0 4px 12px rgba(245,124,0,0.07) !important;
        }
        .product-card-3d:hover .product-img { transform: scale(1.1); }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseRed {
          0%,100% { box-shadow: 0 0 0 0 rgba(245,124,0,0.4); }
          60% { box-shadow: 0 0 0 8px rgba(245,124,0,0); }
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
