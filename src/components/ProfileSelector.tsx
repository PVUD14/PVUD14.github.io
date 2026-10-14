import { motion } from 'framer-motion'
import { viewerProfiles } from '../data/portfolio'

/* [PS-1] "Who's watching?" Choosing a profile only changes section order. */
export default function ProfileSelector({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center px-6">
      <h2 className="font-display text-5xl sm:text-7xl mb-10">Who's watching?</h2>
      <div className="flex flex-wrap items-start justify-center gap-6">
        {viewerProfiles.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }} onClick={() => onPick(p.id)}
            className="group w-36 sm:w-44 text-center"
          >
            <div className="aspect-square rounded-md bg-surface-2 border-2 border-transparent group-hover:border-accent flex items-center justify-center font-display text-6xl text-accent transition-colors">
              {p.mark ?? p.name[0]}
            </div>
            <p className="mt-3 text-lg text-mute group-hover:text-ink">{p.name}</p>
            <p className="text-xs text-mute/70">{p.blurb}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
