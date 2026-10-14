// Rebuilds responsive portraits for BOTH photo sets + the social share image.
// Run: npm run images
// Sources (transparent PNG cutouts): assets-src/portrait-hoodie-cutout.png, assets-src/portrait-suit-cutout.png
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const OUT = 'public/assets'
const SETS = ['hoodie', 'suit']

// [IMG-1] Responsive WebP portraits (transparent) for each set
for (const set of SETS) {
  for (const w of [480, 900, 1400]) {
    await sharp(`assets-src/portrait-${set}-cutout.png`)
      .resize({ width: w })
      .webp({ quality: 86, alphaQuality: 92 })
      .toFile(`${OUT}/portrait-${set}-${w}.webp`)
  }
}

// [IMG-2] Which set the share image uses = portraitSet in src/data/portfolio.ts
const cfg = readFileSync('src/data/portfolio.ts', 'utf8')
const chosen = /portraitSet[^=]*=\s*'(hoodie|suit)'/.exec(cfg)?.[1] ?? 'hoodie'

// [IMG-3] Social share image (1200x630): dark base, red glow, portrait on the right
const portrait = await sharp(`assets-src/portrait-${chosen}-cutout.png`).resize({ height: 600 }).png().toBuffer()
const bg = Buffer.from(
  `<svg width="1200" height="630"><defs><radialGradient id="g" cx="75%" cy="45%" r="60%">
    <stop offset="0%" stop-color="#e11d2e" stop-opacity="0.55"/><stop offset="100%" stop-color="#0a0a0b" stop-opacity="0"/>
  </radialGradient></defs><rect width="1200" height="630" fill="#0a0a0b"/><rect width="1200" height="630" fill="url(#g)"/>
  <text x="70" y="280" font-family="Impact, Arial Black, sans-serif" font-size="110" fill="#ffffff" letter-spacing="2">PVU DIVAKAR</text>
  <text x="74" y="350" font-family="Arial, sans-serif" font-size="34" fill="#e11d2e" letter-spacing="12">THE SERIES</text>
  <text x="74" y="420" font-family="Arial, sans-serif" font-size="26" fill="#cfcfd2">Information Security Manager · Security Researcher</text>
  <text x="74" y="460" font-family="Arial, sans-serif" font-size="26" fill="#cfcfd2">CISM · OSCP · OSCP+ · CVE-2026-103473</text></svg>`
)
await sharp(bg).composite([{ input: portrait, gravity: 'east' }]).jpeg({ quality: 88 }).toFile(`${OUT}/share.jpg`)

console.log('Images rebuilt. Share image uses:', chosen)
