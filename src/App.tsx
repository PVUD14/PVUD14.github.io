import { useState, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { viewerProfiles, type SectionId } from './data/portfolio'
import { useSmoothScroll } from './hooks'
import Opening from './components/Opening'
import ProfileSelector from './components/ProfileSelector'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PlayIntro from './components/PlayIntro'
import Originals from './components/Originals'
import { About, Seasons, TopPicks, Skills, Achievements, FinalCTA, QuoteBanner } from './components/Sections'

type Stage = 'opening' | 'profile' | 'home'

/* [A-1] SECTION MAP — add a new section component here and in portfolio.ts SectionId. */
const SECTIONS: Record<SectionId, () => ReactNode> = {
  about: () => <About />,
  seasons: () => <Seasons />,
  originals: () => <Originals />,
  topPicks: () => <TopPicks />,
  skills: () => <Skills />,
  achievements: () => <Achievements />,
}

export default function App() {
  const [stage, setStage] = useState<Stage>('opening')
  const [profileId, setProfileId] = useState(viewerProfiles[0].id)
  const [intro, setIntro] = useState(false)
  useSmoothScroll(stage === 'home' && !intro)

  const order = (viewerProfiles.find(p => p.id === profileId) ?? viewerProfiles[0]).order

  return (
    <>
      {stage === 'opening' && <Opening onDone={() => setStage('profile')} />}
      {stage === 'profile' && <ProfileSelector onPick={id => { setProfileId(id); setStage('home') }} />}
      {stage === 'home' && (
        <main>
          <Navbar order={order} profileId={profileId} onSwitch={setProfileId} />
          <Hero onPlay={() => setIntro(true)} />
          <QuoteBanner />
          {order.map(id => <div key={id}>{SECTIONS[id]()}</div>)}
          <FinalCTA />
        </main>
      )}
      <AnimatePresence>{intro && <PlayIntro onClose={() => setIntro(false)} />}</AnimatePresence>
    </>
  )
}
