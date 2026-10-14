import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { introSlides } from '../data/portfolio'
import { useEscape, useScrollLock } from '../hooks'

/* [PI-1] Highlight reel. Space = pause, arrows = navigate, Esc = close. */
export default function PlayIntro({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = introSlides.length
  const next = useCallback(() => setI(v => (v + 1) % n), [n])
  const prev = useCallback(() => setI(v => (v - 1 + n) % n), [n])

  useScrollLock(true)
  useEscape(onClose)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(next, 4200)
    return () => clearTimeout(t)
  }, [i, paused, next])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === ' ') { e.preventDefault(); setPaused(p => !p) }
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [next, prev])

  const s = introSlides[i]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(225,29,46,.25),transparent_70%)]" />
      <div className="absolute top-0 inset-x-0 flex gap-1.5 p-4">
        {introSlides.map((_, k) => (
          <div key={k} className="h-0.5 flex-1 bg-white/20 overflow-hidden rounded">
            <div className="h-full bg-accent" style={{ width: k < i ? '100%' : k === i ? (paused ? '50%' : '100%') : '0%', transition: k === i && !paused ? 'width 4.2s linear' : 'none' }} />
          </div>
        ))}
      </div>
      <button onClick={onClose} className="absolute top-8 right-5 text-2xl text-mute hover:text-ink" aria-label="Close">✕</button>
      <button className="absolute inset-y-0 left-0 w-1/4" onClick={prev} aria-label="Previous" />
      <button className="absolute inset-y-0 right-0 w-1/4" onClick={next} aria-label="Next" />
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }} className="relative text-center px-8 max-w-3xl pointer-events-none">
          <p className="text-accent tracking-[0.4em] text-xs mb-4">{s.kicker.toUpperCase()}</p>
          <h3 className="font-display text-6xl sm:text-8xl leading-none">{s.title}</h3>
          <p className="mt-5 text-lg text-mute">{s.body}</p>
        </motion.div>
      </AnimatePresence>
      <p className="absolute bottom-5 text-xs text-mute/60">Space pause · ← → navigate · Esc close</p>
    </motion.div>
  )
}
