'use client'

import { useState } from 'react'
import { portfolioContent } from '@/data/portfolio'

const quickSections = [
  { label: 'terminal', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'projects', href: '/projects' },
]

const suggestedCommands = ['help', 'about', 'projects', 'resume', 'contact']

function SidebarContent() {
  const { header, hero, knowledgeBase } = portfolioContent

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 md:p-4">
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

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 md:p-4">
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

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-3 md:p-4">
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
    </>
  )
}

export function SidebarShell() {
  const { header } = portfolioContent
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between rounded-[18px] border border-white/10 bg-[#0b1020]/90 px-3 py-3 shadow-panel backdrop-blur xl:hidden">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">workspace</p>
          <p className="mt-1 text-sm font-semibold text-white">{header.brand}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted"
        >
          ☰ menu
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <button
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="absolute left-0 top-0 h-full w-[84vw] max-w-[320px] border-r border-white/10 bg-[#0b1020] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">menu</p>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 px-3 py-2 text-xs text-muted"
              >
                close
              </button>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto pb-6">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      <aside className="hidden min-h-0 flex-col gap-4 rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-4 shadow-panel backdrop-blur xl:flex xl:h-full">
        <SidebarContent />
      </aside>
    </>
  )
}
