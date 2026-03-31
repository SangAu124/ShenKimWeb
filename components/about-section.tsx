import type { AboutCard } from '@/data/portfolio'

interface AboutSectionProps {
  cards: AboutCard[]
}

export function AboutSection({ cards }: AboutSectionProps) {
  return (
    <section id="about" className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-2">
      {cards.map((card) => (
        <article key={card.title} className="rounded-3xl border border-white/10 bg-panel p-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">{card.eyebrow}</p>
          <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em]">{card.title}</h3>
          <p className="mt-4 leading-8 text-muted">{card.description}</p>
        </article>
      ))}
    </section>
  )
}
