import { portfolioContent } from '@/data/portfolio'

export function ContextPanels() {
  const { aboutCards, caseSnapshots, knowledgeBase } = portfolioContent

  return (
    <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="grid gap-4">
        <div id="about" className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-5 shadow-panel">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">profile context</p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">operator profile cards</h3>
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-white/40">
              mounted
            </span>
          </div>
          <div className="grid gap-4">
            {aboutCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{card.eyebrow}</p>
                <h4 className="mt-2 text-lg font-semibold tracking-[-0.03em]">{card.title}</h4>
                <p className="mt-3 text-sm leading-7 text-muted">{card.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="scenario" className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-5 shadow-panel">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">operator notes</p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">decision and incident heuristics</h3>
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-white/40">
              live context
            </span>
          </div>
          <div className="grid gap-3">
            {knowledgeBase.operatingPrinciples.map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#0f172a] p-4 text-sm leading-7 text-muted">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                  heuristic {index + 1}
                </p>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="cases" className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-5 shadow-panel">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">project feed</p>
            <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">recent execution traces</h3>
          </div>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-white/40">
            synced
          </span>
        </div>
        <div className="space-y-3">
          {caseSnapshots.items.map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">trace {index + 1}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
