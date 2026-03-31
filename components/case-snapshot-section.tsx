import type { CaseSnapshotContent } from '@/data/portfolio'

interface CaseSnapshotSectionProps {
  content: CaseSnapshotContent
}

export function CaseSnapshotSection({ content }: CaseSnapshotSectionProps) {
  return (
    <section id="cases" className="rounded-3xl border border-white/10 bg-panel p-6 shadow-panel">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">{content.eyebrow}</p>
      <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em]">{content.title}</h3>
      <ul className="mt-5 space-y-3 text-muted">
        {content.items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  )
}
