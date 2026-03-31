import { PersonaChatSection } from '@/components/persona-chat-section'
import { SidebarShell } from '@/components/sidebar-shell'
import { portfolioContent } from '@/data/portfolio'

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-bg text-text">
      <div className="mx-auto flex h-screen w-full max-w-[1520px] flex-col px-4 py-4 md:px-6 xl:px-8">
        <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarShell />

          <section className="min-h-0">
            <div className="h-full rounded-[24px] border border-white/10 bg-[#0b1020]/90 shadow-panel backdrop-blur px-5 py-4">
              <PersonaChatSection content={portfolioContent.persona} />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
