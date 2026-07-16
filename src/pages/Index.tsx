import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { LiquidCursor } from '@/components/LiquidCursor'
import { ShaderBackground } from '@/components/ShaderBackground'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Work } from '@/components/Work'
import { Education } from '@/components/Education'
import { GithubStats } from '@/components/GithubStats'
import { Contact } from '@/components/Contact'

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ShaderBackground />
      <LiquidCursor />
      <GrainOverlay />
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

