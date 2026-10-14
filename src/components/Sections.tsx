import { motion } from 'framer-motion'
import { profile, quote, seasons, topPicks, skillCategories, skillEvidence, achievements, certifications } from '../data/portfolio'
import { useState, type ReactNode } from 'react'

/* [S-1] Shared section wrapper with a reveal animation. */
export function Section({ id, title, kicker, children }: { id: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-16 sm:py-24 scroll-mt-16">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
        {kicker && <p className="text-accent text-xs tracking-[0.4em] font-semibold mb-2">{kicker.toUpperCase()}</p>}
        <h2 className="font-display text-5xl sm:text-6xl mb-8">{title}</h2>
        {children}
      </motion.div>
    </section>
  )
}

/* [S-2] ABOUT — "The Pilot" */
export function About() {
  return (
    <Section id="about" title="The Pilot" kicker="Episode 1">
      <div className="grid md:grid-cols-3 gap-8">
        <p className="md:col-span-2 text-lg text-ink/90 leading-relaxed">
          {profile.intro} I work across offensive security, application security, incident response and security governance, and I turn what the field teaches me into platforms.
          <span className="block mt-4 text-accent-soft font-display text-3xl">{profile.tagline}</span>
        </p>
        <div className="space-y-3 text-sm">
          <div className="bg-surface rounded-lg p-4 border border-white/5"><p className="text-mute">Based in</p><p>{profile.location}</p></div>
          <div className="bg-surface rounded-lg p-4 border border-white/5"><p className="text-mute">Currently</p><p>Information Security Manager · Builder of the Xefence platforms</p></div>
        </div>
      </div>
    </Section>
  )
}

/* [S-3] SEASONS — My Journey */
export function Seasons() {
  const [active, setActive] = useState(0)
  const s = seasons[active]
  return (
    <Section id="seasons" title="My Journey" kicker="Seasons & Episodes">
      <div className="flex gap-2 mb-6 flex-wrap">
        {seasons.map((x, i) => (
          <button key={x.number} onClick={() => setActive(i)} className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${i === active ? 'bg-accent text-white' : 'bg-surface-2 text-mute hover:text-ink'}`}>
            Season {x.number}
          </button>
        ))}
      </div>
      <h3 className="font-display text-3xl">{s.title} <span className="text-mute text-lg font-sans">— {s.tagline}</span></h3>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {s.episodes.map((e, i) => (
          <motion.article key={e.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -6 }} className="bg-surface rounded-lg p-5 border border-white/5 hover:border-accent/60 transition-colors">
            <p className="text-accent font-display text-4xl">E{i + 1}</p>
            <h4 className="font-semibold mt-1">{e.title}</h4>
            <p className="text-sm text-mute mt-2">{e.summary}</p>
            <span className="inline-block mt-3 text-[10px] tracking-widest text-accent-soft border border-accent/40 rounded px-2 py-0.5">{e.tag}</span>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

/* [S-4] TOP 10 row */
export function TopPicks() {
  return (
    <Section id="topPicks" title="Top 10 Capabilities" kicker="Most watched">
      <div className="rail">
        {topPicks.map(p => (
          <div key={p.rank} className="relative w-56 pl-14 pr-3 py-6 bg-surface rounded-lg border border-white/5">
            <span className="absolute left-1 bottom-1 font-display text-[7rem] leading-none text-transparent [-webkit-text-stroke:2px_#e11d2e] select-none">{p.rank}</span>
            <div className="relative ml-6">
              <h4 className="font-semibold leading-tight">{p.title}</h4>
              <p className="text-xs text-mute mt-2">{p.blurb}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* [S-5] SKILLS — each card explains where the skill shows up. */
export function Skills() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <Section id="skills" title="Skills" kicker="Genres">
      <div className="space-y-8">
        {skillCategories.map(c => (
          <div key={c.genre}>
            <h3 className="text-mute text-sm tracking-widest mb-3">{c.genre.toUpperCase()}</h3>
            <div className="flex flex-wrap gap-3">
              {c.skills.map(sk => (
                <button key={sk} onClick={() => setOpen(open === sk ? null : sk)} className={`text-left px-4 py-3 rounded-lg border transition-colors ${open === sk ? 'border-accent bg-accent/10' : 'border-white/10 bg-surface hover:border-accent/50'}`}>
                  <span className="font-medium">{sk}</span>
                  {open === sk && <span className="block text-xs text-mute mt-1">{skillEvidence[sk] ?? 'Applied across my security work.'}</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* [S-6] ACHIEVEMENTS + certification rail */
export function Achievements() {
  return (
    <Section id="achievements" title="Awards & Credentials" kicker="Proof">
      <div className="grid md:grid-cols-2 gap-5">
        {achievements.map(a => (
          <a key={a.title} href={a.href} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/25 to-surface p-7 border border-accent/30 hover:border-accent transition-colors">
            <p className="text-xs tracking-widest text-accent-soft">{a.subtitle.toUpperCase()}</p>
            <h3 className="font-display text-5xl mt-2">{a.title}</h3>
            <p className="text-mute mt-3 text-sm">{a.detail}</p>
            <span className="absolute right-5 bottom-4 text-accent group-hover:translate-x-1 transition-transform">↗</span>
          </a>
        ))}
      </div>
      <div className="rail mt-6">
        {certifications.map(c => (
          <div key={c.name} className="w-40 bg-surface rounded-lg p-4 border border-white/5">
            <p className="font-display text-3xl text-accent">{c.name}</p>
            <p className="text-xs text-mute">{c.issuer}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* [S-7] FINAL CTA */
export function FinalCTA() {
  const l = profile.links
  const items = [
    { label: 'LinkedIn', href: l.linkedin },
    { label: 'GitHub', href: l.github },
    { label: 'Xefence', href: l.xefence },
    ...(profile.email ? [{ label: 'Email', href: `mailto:${profile.email}` }] : []),
  ]
  return (
    <footer className="relative px-5 py-28 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(225,29,46,.3),transparent_70%)]" />
      <p className="relative text-accent tracking-[0.4em] text-xs mb-3">NEXT EPISODE</p>
      <h2 className="relative font-display text-6xl sm:text-8xl">TO BE CONTINUED…</h2>
      <div className="relative mt-10 flex flex-wrap justify-center gap-3">
        {items.map(i => (
          <a key={i.label} href={i.href} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-md bg-white/10 hover:bg-accent transition-colors font-semibold">{i.label}</a>
        ))}
        {profile.resumeUrl && <a href={profile.resumeUrl} download className="px-6 py-3 rounded-md bg-ink text-black font-semibold hover:bg-accent hover:text-white transition-colors">Download Resume</a>}
      </div>
      <p className="relative mt-12 text-xs text-mute/70">© {new Date().getFullYear()} {profile.fullName}. A personal portfolio with a fictional series look; not affiliated with any streaming service.</p>
    </footer>
  )
}

/* [S-8] SIGNATURE QUOTE banner — sits right under the hero. Text lives in portfolio.ts block [9]. */
export function QuoteBanner() {
  return (
    <section aria-label="Signature quote" className="relative overflow-hidden border-y border-white/5 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_50%,rgba(225,29,46,.18),transparent_70%)]" />
      <motion.figure
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9 }}
        className="relative mx-auto max-w-5xl px-5 py-20 sm:py-28 text-center"
      >
        <p className="text-accent text-xs tracking-[0.5em] font-semibold">{quote.kicker.toUpperCase()}</p>
        <div className="mx-auto mt-4 h-px w-16 bg-accent" />
        <blockquote lang="sa" className="font-telugu mt-8 text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.35] text-ink">
          {quote.script.map(line => <span key={line} className="block">{line}</span>)}
        </blockquote>
        <figcaption className="mt-8">
          <p className="text-sm sm:text-base tracking-wide text-mute italic">{quote.transliteration}</p>
        </figcaption>
      </motion.figure>
    </section>
  )
}
