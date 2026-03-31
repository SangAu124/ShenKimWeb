import { ContextPanels } from '@/components/context-panels'
import { PersonaChatSection } from '@/components/persona-chat-section'
import { SidebarShell } from '@/components/sidebar-shell'
import { portfolioContent } from '@/data/portfolio'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1680px] flex-col px-4 py-4 md:px-6 xl:px-8">
        <div className="grid min-h-[calc(100vh-2rem)] gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
          <SidebarShell />

          <section className="flex min-h-0 flex-col gap-4">
            <div className="rounded-[28px] border border-white/10 bg-[#0b1020]/90 shadow-panel backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">AI workspace</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-white">
                    {portfolioContent.workspace.shellName}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{portfolioContent.workspace.runtimeLabel}</p>
                </div>

                <div className="grid gap-2 text-right text-xs text-muted sm:text-sm">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2">
                    {portfolioContent.workspace.modelLabel}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-2">
                    {portfolioContent.hero.description}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-5 py-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                <PersonaChatSection content={portfolioContent.persona} />

                <aside className="flex flex-col gap-4">
                  <div className="rounded-[24px] border border-white/10 bg-[#0f172a] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">tips for getting started</p>
                    <div className="mt-3 space-y-2 text-sm leading-7 text-muted">
                      <p>Run <span className="text-slate-100">help</span> to inspect available commands.</p>
                      <p>Use <span className="text-slate-100">goto about</span> or <span className="text-slate-100">goto cases</span> to move across context panels.</p>
                      <p>Ask natural language questions when you want the persona engine to explain context directly.</p>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-[#0f172a] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">recent activity</p>
                    <div className="mt-3 space-y-3">
                      {portfolioContent.workspace.recentActivity.map((item) => (
                        <div key={item.title} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                          <p className="text-sm leading-6 text-slate-200">{item.title}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/35">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <ContextPanels />
          </section>
        </div>
      </div>
    </main>
  )
}
