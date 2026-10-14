import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/portfolio'
import Portrait from './Portrait'

/* [O-1] Opening sequence: black, studio card, name, "THE SERIES", portrait, PLAY.
   Enter / Esc / click on Skip jumps to the end. */
export default function Opening({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(reduced ? 4 : 0)
  const [skipped, setSkipped] = useState(false)

  /* [O-2] Jump to the final frame AND cancel the pending timers (otherwise they replay the intro). */
  const skip = () => { setSkipped(true); setStep(4) }

  useEffect(() => {
    if (reduced || skipped) return
    const t = [700, 2500, 4300, 6000].map((ms, i) => setTimeout(() => setStep(i + 1), ms))
    return () => t.forEach(clearTimeout)
  }, [reduced, skipped])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') step < 4 ? skip() : onDone()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [step, onDone])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p key="studio" initial={{ opacity: 0, letterSpacing: '0.2em' }} animate={{ opacity: 1, letterSpacing: '0.5em' }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }} className="text-xs sm:text-sm text-mute text-center px-6">
            {profile.originalLabel}
          </motion.p>
        )}
        {step === 2 && (
          <motion.h1 key="name" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="font-display text-[22vw] sm:text-[14vw] leading-none text-ink text-center">
            {profile.name.toUpperCase()}
          </motion.h1>
        )}
        {step === 3 && (
          <motion.h1 key="series" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="font-display text-[18vw] sm:text-[11vw] leading-none text-accent text-center tracking-[0.12em]">
            THE SERIES
          </motion.h1>
        )}
        {step >= 4 && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="relative h-full w-full flex flex-col items-center justify-end">
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(225,29,46,.35),transparent_70%)]" />
            <Portrait priority className="relative h-[78vh] w-auto object-contain object-bottom" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
            <motion.button
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              onClick={onDone}
              className="absolute bottom-10 sm:bottom-14 flex items-center gap-3 bg-ink text-black font-semibold px-8 py-3 rounded-md hover:bg-accent hover:text-white transition-colors"
            >
              <span aria-hidden>▶</span> PLAY
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {step < 4 && (
        <button onClick={skip} className="absolute top-5 right-5 text-xs text-mute hover:text-ink">Skip</button>
      )}
    </div>
  )
}
