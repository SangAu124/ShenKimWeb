import { AboutSection } from '@/components/about-section'
import { CaseSnapshotSection } from '@/components/case-snapshot-section'
import { FooterCtaSection } from '@/components/footer-cta-section'
import { HeroSection } from '@/components/hero-section'
import { PersonaChatSection } from '@/components/persona-chat-section'
import { ScenarioSection } from '@/components/scenario-section'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-20 pt-8 md:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5 text-sm text-muted">
          <span className="font-semibold tracking-[0.18em] text-accent">KIMSANGEUN.EXE</span>
          <span>Problem Solver / Operator / Builder</span>
        </header>

        <HeroSection />
        <ScenarioSection />
        <PersonaChatSection />
        <AboutSection />
        <CaseSnapshotSection />
        <FooterCtaSection />
      </div>
    </main>
  )
}
