import { portfolioContent } from '@/data/portfolio'

export function ContextPanels() {
  const { aboutCards, caseSnapshots } = portfolioContent

  return (
    <section className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <div id="about" className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-5 shadow-panel">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">about</p>
        <div className="mt-4 grid gap-4">
          {aboutCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{card.eyebrow}</p>
              <h4 className="mt-2 text-lg font-semibold tracking-[-0.03em]">{card.title}</h4>
              <p className="mt-3 text-sm leading-7 text-muted">{card.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div id="cases" className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-5 shadow-panel">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">projects</p>
        <div className="mt-4 space-y-3">
          {caseSnapshots.items.map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">item {index + 1}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
