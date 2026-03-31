import { portfolioContent } from '@/data/portfolio'

const quickSections = [
  { label: 'about', href: '#about' },
  { label: 'scenario', href: '#scenario' },
  { label: 'cases', href: '#cases' },
  { label: 'terminal', href: '#persona' },
]

const suggestedCommands = ['help', 'about', 'skills', 'projects', 'goto scenario', 'ask 어떤 개발자인가요?']

export function SidebarShell() {
  const { header, hero, knowledgeBase, workspace } = portfolioContent

  return (
    <aside className="flex h-full flex-col gap-4 rounded-[28px] border border-white/10 bg-[#0b1020]/90 p-4 shadow-panel backdrop-blur">
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
        <p className="mt-3 text-sm leading-6 text-muted">{workspace.statusLine}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">session</p>
        <div className="mt-3 space-y-2 text-sm text-slate-200">
          <p>{workspace.shellName}</p>
          <p className="text-muted">{workspace.modelLabel}</p>
          <p className="text-muted">{workspace.runtimeLabel}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">identity</p>
        <p className="mt-3 text-sm leading-7 text-slate-200">{knowledgeBase.identity.summary}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">recent activity</p>
        <div className="mt-3 space-y-3">
          {workspace.recentActivity.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-sm leading-6 text-slate-200">{item.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/35">{item.time}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">navigation</p>
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">suggested commands</p>
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
