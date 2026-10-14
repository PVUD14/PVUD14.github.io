import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/portfolio'
import Portrait from './Portrait'

/* [HE-1] Billboard hero with parallax portrait and floating credential chips. */
export default function Hero({ onPlay }: { onPlay: () => void }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 90])
  const chips = ['CISM', 'OSCP', 'OSCP+', 'CVE-2026-103473']

  return (
    <header className="relative min-h-screen overflow-hidden grain">
      <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_72%_45%,rgba(225,29,46,.38),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <motion.div style={{ y }} /* [HE-2] Phone: photo on top, text flows below it. Desktop (md+): photo on the right. */
        className="absolute right-0 top-14 h-[54vh] w-full md:top-auto md:bottom-0 md:h-[92vh] md:w-[55%] flex justify-center md:justify-end items-start md:items-end pointer-events-none">
        <Portrait priority className="h-full w-auto object-contain object-top md:object-bottom" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-[61vh] md:pt-36 pb-16 md:pb-24 flex flex-col justify-start md:justify-center min-h-screen">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent font-semibold tracking-[0.4em] text-xs mb-4">
          S1 · THE SERIES
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-[18vw] md:text-[10rem] leading-[0.85]">
          PVU<br />DIVAKAR
        </motion.h1>
        <p className="mt-6 max-w-xl text-lg text-ink/90">{profile.headline}</p>
        <p className="mt-3 max-w-xl text-mute">{profile.intro}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onPlay} className="flex items-center gap-2 bg-ink text-black font-semibold px-7 py-3 rounded-md hover:bg-accent hover:text-white transition-colors">
            <span aria-hidden>▶</span> Play Intro
          </button>
          <button onClick={() => document.getElementById('originals')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/15 backdrop-blur px-7 py-3 rounded-md font-semibold hover:bg-white/25 transition-colors">
            ⓘ More Info
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <motion.span key={c} animate={{ y: [0, -4, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }} className="text-xs border border-accent/60 text-accent-soft rounded-full px-3 py-1">
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </header>
  )
}
