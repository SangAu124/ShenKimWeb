'use client'

import { useEffect, useState } from 'react'
import { PersonaChatSection } from '@/components/persona-chat-section'
import { SidebarShell } from '@/components/sidebar-shell'
import { WorldRoomCanvas } from '@/components/world-room-canvas'
import { portfolioContent } from '@/data/portfolio'

export function HomeWorldDemo() {
  const [worldMode, setWorldMode] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('world') === '1') setWorldMode(true)
  }, [])

  return (
    <main className="h-screen overflow-hidden bg-[#060913] text-text">
      <div className="relative h-full w-full overflow-hidden [perspective:1800px]">
        <div className={`absolute inset-0 transition-all duration-1000 ${worldMode ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          <WorldRoomCanvas />

          <div className="absolute left-10 top-10 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted">
            world://shenkim-exe-room
          </div>
          <div className="absolute right-10 top-10 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted">
            three.js room demo · monitor prototype
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-muted">
            play를 치면 이 웹사이트 전체가 room 안의 모니터 화면이었다는 데모입니다.
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-all duration-1000 [transform-style:preserve-3d] ${worldMode ? 'scale-[0.44] translate-y-[-8%] translate-x-[6%] rotate-y-[-24deg] rotate-x-[8deg]' : 'scale-100 translate-y-0 translate-x-0 rotate-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          <div className="h-full w-full p-4 md:p-6 xl:p-8">
            <div className="relative h-full rounded-[32px] border border-white/10 bg-[#0b1020]/95 shadow-2xl backdrop-blur">
              {worldMode && (
                <>
                  <div className="absolute inset-x-[2.5%] top-[2.5%] bottom-[10%] rounded-[28px] border border-white/10 pointer-events-none" />
                  <div className="absolute left-1/2 top-[3.8%] h-3 w-3 -translate-x-1/2 rounded-full bg-white/20 pointer-events-none" />
                  <div className="absolute inset-x-1/2 bottom-[3%] h-5 w-28 -translate-x-1/2 rounded-full bg-white/10 blur-[1px] pointer-events-none" />
                </>
              )}

              <div className="mx-auto flex h-full w-full max-w-[1520px] flex-col px-4 py-4 md:px-6 xl:px-8">
                <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
                  <SidebarShell />

                  <section className="min-h-0">
                    <div className="h-full rounded-[24px] border border-white/10 bg-[#0b1020]/90 shadow-panel backdrop-blur px-5 py-4">
                      <PersonaChatSection content={portfolioContent.persona} onPlay={() => setWorldMode(true)} />
                    </div>
                  </section>
                </div>
              </div>
            </div>
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
      </div>
    </main>
  )
}
