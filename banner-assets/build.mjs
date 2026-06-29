// Promo market banner generator — RU + UZ, desktop + mobile. Run: node banner-assets/build.mjs
// Sources in banner-assets/. Outputs to public/banners/. Dimensions: desktop 1420x540, mobile 1080x1296.
import sharp from 'sharp'

const OUT = 'public/banners'
const DW = 1420, DH = 540, MW = 1080, MH = 1296
const suf = (lang) => (lang === 'uz' ? '-uz' : '')
const tr = async (p) => { const b = await sharp(p).trim().png().toBuffer(); const m = await sharp(b).metadata(); return { b, m } }

const T = {
  gift: { accent: '#F57C00', head: '#E65100', corner: { ru: 'ПОДАРКИ', uz: "SOVG'ALAR" }, dProdH: 380, mProdW: 950, dHeadSize: 52,
    h: { ru: ['КОРПОРАТИВНЫЕ', 'ПОДАРКИ'], uz: ['KORPORATIV', "SOVG'ALAR"] },
    sub: { ru: 'Ежедневники · ручки · наборы с логотипом', uz: "Kundaliklar · ruchkalar · logoli to'plamlar" } },
}

async function productBanner(key, src, fileBase) {
  const C = T[key]
  for (const lang of ['ru', 'uz']) {
    const corner = C.corner[lang], L = C.h[lang], hs = C.dHeadSize || 56
    // DESKTOP
    const dW = Math.round(src.m.width * C.dProdH / src.m.height)
    const dProd = await sharp(src.b).resize({ height: C.dProdH }).toBuffer()
    const svgD = `<svg width="${DW}" height="${DH}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,0 330,0 0,214" fill="${C.accent}"/>
      <text x="40" y="76" fill="#fff" font-family="Arial" font-weight="900" font-size="28" letter-spacing="1">${corner}</text>
      <text x="58" y="248" fill="${C.head}" font-family="Arial" font-weight="900" font-size="${hs}">${L[0]}</text>
      <text x="58" y="${248 + hs + 12}" fill="${C.head}" font-family="Arial" font-weight="900" font-size="${hs}">${L[1]}</text>
      <text x="60" y="${248 + hs + 72}" fill="#444" font-family="Arial" font-weight="600" font-size="19">${C.sub[lang]}</text></svg>`
    await sharp({ create: { width: DW, height: DH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: dProd, left: DW - dW - 50, top: Math.round((DH - C.dProdH) / 2) + 20 }, { input: Buffer.from(svgD), left: 0, top: 0 }])
      .png().toFile(`${OUT}/${fileBase}${suf(lang)}.png`)
    // MOBILE
    const mH = Math.round(src.m.height * C.mProdW / src.m.width)
    const mProd = await sharp(src.b).resize({ width: C.mProdW }).toBuffer()
    const svgM = `<svg width="${MW}" height="${MH}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,0 300,0 0,196" fill="${C.accent}"/>
      <text x="32" y="72" fill="#fff" font-family="Arial" font-weight="900" font-size="30" letter-spacing="1">${corner}</text>
      <text x="56" y="300" fill="${C.head}" font-family="Arial" font-weight="900" font-size="76">${L[0]}</text>
      <text x="56" y="392" fill="${C.head}" font-family="Arial" font-weight="900" font-size="76">${L[1]}</text>
      <text x="58" y="450" fill="#444" font-family="Arial" font-weight="600" font-size="26">${C.sub[lang]}</text></svg>`
    await sharp({ create: { width: MW, height: MH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: mProd, left: Math.round((MW - C.mProdW) / 2), top: MH - mH - 60 }, { input: Buffer.from(svgM), left: 0, top: 0 }])
      .png().toFile(`${OUT}/${fileBase}-mobile${suf(lang)}.png`)
  }
}

const gift = await tr('banner-assets/gift.png')
await productBanner('gift', gift, 'banner-gift')
console.log('Promo banners built (RU+UZ, desktop+mobile)')
