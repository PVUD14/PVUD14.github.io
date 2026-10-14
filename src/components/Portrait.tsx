/* [P-1] Responsive transparent portrait. Rebuild files with: npm run images */
/* [P-2] BASE_URL keeps image paths working on GitHub Pages sub-paths. */
import { portraitSet } from '../data/portfolio'
const B = import.meta.env.BASE_URL
const F = `${B}assets/portrait-${portraitSet}`
/* [P-3] Soft fade on the sides and bottom so the photo's cropped edges never show as hard lines. */
const FADE = {
  WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect',
} as const

export default function Portrait({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <img
      src={`${F}-900.webp`}
      srcSet={`${F}-480.webp 480w, ${F}-900.webp 900w, ${F}-1400.webp 1400w`}
      sizes="(max-width: 768px) 80vw, 520px"
      alt="PVU Divakar portrait"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={FADE}
      draggable={false}
    />
  )
}
