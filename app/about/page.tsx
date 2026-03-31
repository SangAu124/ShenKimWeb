import { SidebarShell } from '@/components/sidebar-shell'
import { portfolioContent } from '@/data/portfolio'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-4 py-4 md:px-6 xl:px-8">
        <div className="grid min-h-[calc(100vh-2rem)] gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarShell />

          <section className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-6 shadow-panel backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">about</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white">ShenKim.exe Profile</h1>
            <div className="mt-6 grid gap-4">
              {portfolioContent.aboutCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{card.eyebrow}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{card.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
