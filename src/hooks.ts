import { useEffect, useState } from 'react'
import Lenis from 'lenis'

/* [H-1] Smooth scroll. Disabled automatically for reduced-motion users. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1 })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled])
}

/* [H-2] Lock page scroll while an overlay is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

/* [H-3] Close overlay on Escape. */
export function useEscape(onEsc: () => void, active = true) {
  useEffect(() => {
    if (!active) return
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onEsc()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onEsc, active])
}

/* [H-4] Media query helper (e.g. pointer: fine). */
export function useMedia(query: string) {
  const [match, setMatch] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches))
  useEffect(() => {
    const m = window.matchMedia(query)
    const h = () => setMatch(m.matches)
    m.addEventListener('change', h)
    return () => m.removeEventListener('change', h)
  }, [query])
  return match
}
