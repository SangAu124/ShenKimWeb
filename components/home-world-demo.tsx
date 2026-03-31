'use client'

import { useState } from 'react'
import { PersonaChatSection } from '@/components/persona-chat-section'
import { SidebarShell } from '@/components/sidebar-shell'
import { portfolioContent } from '@/data/portfolio'

export function HomeWorldDemo() {
  const [worldMode, setWorldMode] = useState(false)

  return (
    <main className="h-screen overflow-hidden bg-bg text-text">
      <div className="mx-auto flex h-screen w-full max-w-[1520px] flex-col px-4 py-4 md:px-6 xl:px-8">
        <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarShell />

          <section className="relative min-h-0 overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1020]/90 shadow-panel backdrop-blur">
            <div
              className={`absolute inset-0 transition-all duration-1000 ${worldMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              style={{
                background:
                  'radial-gradient(circle at center, rgba(90,110,255,0.18), transparent 22%), linear-gradient(180deg, #070b12 0%, #0c1220 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
                <div className="relative h-[78%] w-[82%] rounded-[32px] border border-white/10 bg-[#080d17] shadow-2xl">
                  <div className="absolute left-1/2 top-[8%] h-[14px] w-[14px] -translate-x-1/2 rounded-full bg-white/20" />
                  <div className="absolute inset-x-[8%] top-[12%] bottom-[18%] rounded-[28px] border border-white/10 bg-[#050816] shadow-inner" />
                  <div className="absolute inset-x-1/2 bottom-[8%] h-[28px] w-[120px] -translate-x-1/2 rounded-full bg-white/10 blur-[1px]" />
                </div>
              </div>

              <div className="absolute left-10 top-10 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted">
                world://shenkim-exe
              </div>
              <div className="absolute right-10 top-10 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted">
                move demo · inspect mode
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-muted">
                터미널이 모니터였고, 지금은 그 바깥 world에 나와 있는 컨셉 데모입니다.
              </div>
            </div>

            <div className={`absolute inset-0 transition-all duration-1000 [transform-style:preserve-3d] ${worldMode ? 'scale-[0.42] translate-y-[-12%] translate-x-[8%] rotate-y-[-22deg] rotate-x-[10deg]' : 'scale-100 translate-y-0 translate-x-0 rotate-0'}`}>
              <div className="h-full p-5">
                <PersonaChatSection content={portfolioContent.persona} onPlay={() => setWorldMode(true)} />
              </div>
            </div>

            {worldMode && (
              <button
                onClick={() => setWorldMode(false)}
                className="absolute bottom-6 right-6 z-20 rounded-full border border-accent/40 bg-[#0b1020]/80 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/10"
              >
                터미널로 돌아가기
              </button>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
