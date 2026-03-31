import { SidebarShell } from '@/components/sidebar-shell'
import { portfolioContent } from '@/data/portfolio'

export default function AboutPage() {
  const { aboutCards, knowledgeBase, profileAssets } = portfolioContent

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-3 py-3 sm:px-4 md:px-6 xl:px-8">
        <div className="grid min-h-[calc(100vh-1.5rem)] gap-3 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-4">
          <SidebarShell />

          <section className="rounded-[18px] border border-white/10 bg-[#0b1020]/90 p-4 shadow-panel backdrop-blur sm:p-5 md:rounded-[24px] md:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">about</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white">ShenKim.exe Profile</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{profileAssets.profileNarrative.intro}</p>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-4">
                {aboutCards.map((card) => (
                  <article key={card.title} className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{card.eyebrow}</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">{card.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted">{card.description}</p>
                  </article>
                ))}

                <article className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Working Style</p>
                  <p className="mt-3 text-sm leading-7 text-muted">{profileAssets.profileNarrative.workingStyle}</p>
                </article>
              </div>

              <div className="grid gap-4">
                <article className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Core Strengths</p>
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-muted">
                    {knowledgeBase.strengths.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Current Focus</p>
                  <p className="mt-3 text-sm leading-7 text-muted">{profileAssets.profileNarrative.currentFocus}</p>
                </article>

                <article className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Contact</p>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-muted">
                    <p>{profileAssets.contact.email}</p>
                    <p>{profileAssets.contact.website}</p>
                    <p>{profileAssets.contact.note}</p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
