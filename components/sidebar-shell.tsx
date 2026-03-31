import { portfolioContent } from '@/data/portfolio'

const quickSections = [
  { label: 'about', href: '#about' },
  { label: 'cases', href: '#cases' },
  { label: 'terminal', href: '#persona' },
]

const suggestedCommands = ['help', 'about', 'projects', 'resume', 'contact']

export function SidebarShell() {
  const { header, hero, knowledgeBase } = portfolioContent

  return (
    <aside className="flex h-full flex-col gap-4 rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-4 shadow-panel backdrop-blur">
      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">workspace</p>
            <h1 className="mt-2 text-lg font-bold tracking-[-0.04em] text-white">{header.brand}</h1>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {hero.status}
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{knowledgeBase.identity.summary}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">navigate</p>
        <div className="mt-3 grid gap-2">
          {quickSections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-white"
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">commands</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestedCommands.map((command) => (
            <span
              key={command}
              className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-muted"
            >
              {command}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
