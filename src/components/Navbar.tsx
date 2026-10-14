import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, viewerProfiles, type SectionId } from '../data/portfolio'

const LABELS: Record<SectionId, string> = {
  about: 'The Pilot', seasons: 'Journey', originals: 'Originals', topPicks: 'Top 10', skills: 'Skills', achievements: 'Awards',
}

/* [N-1] Hides on scroll down, returns on scroll up. Includes profile switcher. */
export default function Navbar({ order, profileId, onSwitch }: { order: SectionId[]; profileId: string; onSwitch: (id: string) => void }) {
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const h = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      setSolid(y > 30)
      last = y
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav animate={{ y: hidden ? -90 : 0 }} transition={{ duration: 0.3 }} className={`fixed top-0 inset-x-0 z-30 transition-colors ${solid ? 'bg-bg/90 backdrop-blur' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-display text-3xl text-accent tracking-wider">{profile.name.split(' ').pop()?.toUpperCase()}</button>
        <div className="hidden md:flex items-center gap-6 text-sm text-mute">
          {order.filter(s => s !== 'about').map(s => (
            <button key={s} onClick={() => go(s)} className="hover:text-ink transition-colors">{LABELS[s]}</button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <select value={profileId} onChange={e => onSwitch(e.target.value)} aria-label="Viewer profile" className="bg-surface-2 text-xs rounded px-2 py-1.5 border border-white/10">
            {viewerProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button className="md:hidden text-2xl" aria-label="Menu" onClick={() => setOpen(o => !o)}>☰</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-bg border-t border-white/10 px-5 py-3 flex flex-col gap-3 text-mute">
          {order.filter(s => s !== 'about').map(s => <button key={s} onClick={() => go(s)} className="text-left py-1">{LABELS[s]}</button>)}
        </div>
      )}
    </motion.nav>
  )
}
