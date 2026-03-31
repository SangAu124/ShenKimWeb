import type { FooterCtaContent } from '@/data/portfolio'

interface FooterCtaSectionProps {
  content: FooterCtaContent
}

export function FooterCtaSection({ content }: FooterCtaSectionProps) {
  return (
    <footer className="mt-12 border-t border-white/10 pt-8">
      <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-panel p-6 shadow-panel md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">{content.eyebrow}</p>
          <h4 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{content.title}</h4>
        </div>
        <a href={content.cta.href} className="inline-flex rounded-full bg-gradient-to-r from-accent to-accent2 px-5 py-3 text-sm font-bold text-white shadow-panel">
          {content.cta.label}
        </a>
      </div>
    </footer>
  )
}
