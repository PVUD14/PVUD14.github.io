import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, type Project } from '../data/portfolio'
import { useEscape, useScrollLock } from '../hooks'
import { Section } from './Sections'

/* [OR-1] ORIGINALS — swipe rail of projects, click opens a shared-element overlay. */
export default function Originals() {
  const [sel, setSel] = useState<Project | null>(null)
  return (
    <Section id="originals" title="Originals" kicker="Projects & Products">
      <div className="rail">
        {projects.map(p => (
          <motion.button
            key={p.id} layoutId={`card-${p.id}`} onClick={() => setSel(p)} whileHover={{ y: -8, scale: 1.02 }}
            className="w-72 h-96 text-left rounded-xl overflow-hidden relative border border-white/10 hover:border-accent transition-colors bg-gradient-to-br from-accent/30 via-surface to-black p-6 flex flex-col justify-end"
          >
            <span className="absolute top-4 left-4 text-[10px] tracking-widest bg-black/60 px-2 py-1 rounded">{p.status.toUpperCase()}</span>
            <span className="absolute top-4 right-5 font-display text-5xl text-white/10">{p.title.slice(0, 2).toUpperCase()}</span>
            <p className="text-xs text-accent-soft tracking-widest">{p.kind.toUpperCase()}</p>
            <h3 className="font-display text-5xl leading-none mt-1">{p.title}</h3>
            <p className="text-sm text-mute mt-2">{p.tagline}</p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>{sel && <Modal key={sel.id} p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </Section>
  )
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  useScrollLock(true)
  useEscape(onClose)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div layoutId={`card-${p.id}`} onClick={e => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-accent/40 p-8">
        <button onClick={onClose} className="absolute right-5 top-4 text-2xl text-mute hover:text-ink" aria-label="Close">✕</button>
        <p className="text-xs tracking-widest text-accent-soft">{p.kind.toUpperCase()} · {p.status.toUpperCase()}</p>
        <h3 className="font-display text-6xl mt-1">{p.title}</h3>
        <p className="text-mute mt-1">{p.tagline}</p>
        {p.credit && <p className="mt-3 text-xs text-accent-soft">{p.credit}</p>}
        <p className="mt-6 leading-relaxed">{p.summary}</p>
        <ul className="mt-5 space-y-2 text-sm text-ink/90">
          {p.highlights.map(h => <li key={h} className="flex gap-2"><span className="text-accent">▸</span>{h}</li>)}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map(t => <span key={t} className="text-xs border border-white/15 rounded-full px-3 py-1 text-mute">{t}</span>)}
        </div>
        {p.link && <a href={p.link.href} target="_blank" rel="noreferrer" className="inline-block mt-7 bg-accent px-6 py-3 rounded-md font-semibold hover:bg-accent-soft transition-colors">{p.link.label} ↗</a>}
      </motion.div>
    </motion.div>
  )
}
