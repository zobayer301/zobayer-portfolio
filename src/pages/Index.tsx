import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { FluidCursor } from '@/components/FluidCursor'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Work } from '@/components/Work'
import { Education } from '@/components/Education'
import { GithubStats } from '@/components/GithubStats'
import { Contact } from '@/components/Contact'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Index() {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      {!isMobile && <FluidCursor />}
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Education />
        <GithubStats />
        <Contact />
      </main>
    </div>
  )
}