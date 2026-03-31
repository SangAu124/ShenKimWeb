'use client'

import { useEffect, useState } from 'react'
import { PersonaChatSection } from '@/components/persona-chat-section'
import { SidebarShell } from '@/components/sidebar-shell'
import { WorldRoomCanvas } from '@/components/world-room-canvas'
import { portfolioContent } from '@/data/portfolio'

const SANS = 'Arial, Helvetica, sans-serif'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (const word of words) {
    const testLine = line + word + ' '
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY)
      line = word + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line.trim(), x, currentY)
  return currentY
}

function buildMonitorCanvas(): HTMLCanvasElement {
  const W = 1280
  const H = 720
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  const SW = 280 // sidebar width
  const MX = SW  // main content x start

  // ── full background ──────────────────────────────────────────
  ctx.fillStyle = '#0b1020'
  ctx.fillRect(0, 0, W, H)

  // ── SIDEBAR ──────────────────────────────────────────────────
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, SW, H)

  // sidebar border
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.fillRect(SW, 0, 1, H)

  // workspace label
  ctx.fillStyle = '#7dd3fc'
  ctx.font = `700 11px ${SANS}`
  ctx.fillText('WORKSPACE', 24, 54)

  // brand
  ctx.fillStyle = '#f4f7fb'
  ctx.font = `700 22px ${SANS}`
  ctx.fillText('KimSangeun.exe', 24, 90)

  // ONLINE badge
  ctx.beginPath()
  ctx.roundRect(24, 106, 68, 24, 12)
  ctx.fillStyle = 'rgba(74,222,128,0.1)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(74,222,128,0.25)'
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.fillStyle = '#86efac'
  ctx.font = `700 11px ${SANS}`
  ctx.fillText('ONLINE', 38, 122)

  // identity summary
  ctx.fillStyle = '#94a3b8'
  ctx.font = `13px ${SANS}`
  wrapText(ctx, portfolioContent.knowledgeBase.identity.summary, 24, 162, SW - 48, 20)

  // nav items
  ;['terminal', 'about', 'projects'].forEach((item, i) => {
    const ny = 268 + i * 52
    ctx.beginPath()
    ctx.roundRect(24, ny, SW - 48, 40, 14)
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = '#cbd5e1'
    ctx.font = `14px ${SANS}`
    ctx.fillText(item, 42, ny + 26)
  })

  // ── MAIN SECTION ─────────────────────────────────────────────

  // header bar
  ctx.fillStyle = '#0b1020'
  ctx.fillRect(MX, 0, W - MX, 110)
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.fillRect(MX, 110, W - MX, 1)

  ctx.fillStyle = '#7dd3fc'
  ctx.font = `700 11px ${SANS}`
  ctx.fillText('AI PERSONA TERMINAL', MX + 28, 44)

  ctx.fillStyle = '#f4f7fb'
  ctx.font = `700 38px ${SANS}`
  ctx.fillText('김상은 AI 터미널', MX + 28, 88)

  // terminal body bg
  ctx.fillStyle = '#050816'
  ctx.fillRect(MX, 111, W - MX, H - 111 - 68)

  // terminal messages
  const msgs = [
    { time: '21:10:31', from: '[김상은]', text: '터미널이 준비되었습니다.', color: '#cbd5e1' },
    { time: '21:10:31', from: '[김상은]', text: 'quick: help · play · about · skills · projects', color: '#cbd5e1' },
    { time: '21:10:34', from: '[❯]',     text: 'play', color: '#f4f7fb' },
    { time: '21:10:35', from: '[김상은]', text: '이 화면이 3D 룸의 모니터 텍스처입니다.', color: '#7dd3fc' },
  ]
  msgs.forEach((msg, i) => {
    const my = 152 + i * 38
    ctx.font = `15px ${MONO}`
    ctx.fillStyle = 'rgba(255,255,255,0.28)'
    ctx.fillText(msg.time, MX + 28, my)
    ctx.fillText(msg.from, MX + 118, my)
    ctx.fillStyle = msg.color
    ctx.fillText(msg.text, MX + 218, my)
  })

  // input bar
  const IY = H - 68
  ctx.fillStyle = '#0b1020'
  ctx.fillRect(MX, IY, W - MX, 68)
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.fillRect(MX, IY, W - MX, 1)

  ctx.beginPath()
  ctx.roundRect(MX + 20, IY + 13, W - MX - 40, 42, 16)
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.fillStyle = '#7dd3fc'
  ctx.font = `15px ${MONO}`
  ctx.fillText('❯', MX + 38, IY + 40)

  ctx.fillStyle = 'rgba(255,255,255,0.38)'
  ctx.font = `14px ${SANS}`
  ctx.fillText('help, goto about, projects, ask 어떤 개발자인가요?', MX + 62, IY + 40)

  return canvas
}

export function HomeWorldDemo() {
  const [worldMode, setWorldMode] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [captureCanvas, setCaptureCanvas] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('world') === '1') setWorldMode(true)
    if (params.get('debug') === '1') setDebugMode(true)
  }, [])

  function enterWorldMode() {
    const canvas = buildMonitorCanvas()
    setCaptureCanvas(canvas)
    setTransitioning(true)
  }

  function handleEnterComplete() {
    setWorldMode(true)
    setTransitioning(false)
  }

  function exitWorldMode() {
    setExiting(true)
  }

  function handleExitComplete() {
    setWorldMode(false)
    setExiting(false)
    setCaptureCanvas(null)
  }

  // determine current camera direction for WorldRoomCanvas
  const cameraDirection = transitioning ? 'in' : exiting ? 'out' : null

  const showWorld = transitioning || worldMode || exiting

  return (
    <main className="h-screen overflow-hidden bg-[#060913] text-text">
      <div className="relative h-full w-full overflow-hidden">
        {/* 3D World — mounted as soon as transitioning/exiting starts */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${showWorld ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
          {showWorld && (
            <WorldRoomCanvas
              captureCanvas={captureCanvas}
              cameraDirection={cameraDirection}
              onAnimationComplete={transitioning ? handleEnterComplete : exiting ? handleExitComplete : undefined}
            />
          )}

          {worldMode && !exiting && (
            <>
              <div className="absolute left-3 top-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-muted md:left-10 md:top-10 md:px-4 md:py-3 md:text-sm">
                world://shenkim-exe-room
              </div>
              <div className="absolute right-3 top-3 max-w-[48vw] rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-right text-xs text-muted md:right-10 md:top-10 md:max-w-none md:px-4 md:py-3 md:text-sm">
                render-to-texture prototype
              </div>
              <div className="absolute bottom-4 left-1/2 w-[calc(100%-24px)] max-w-[720px] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center text-xs text-muted md:bottom-10 md:w-auto md:text-sm">
                UI를 캔버스로 캡처해 모니터 표면 텍스처로 붙이는 데모입니다.
              </div>
            </>
          )}
        </div>

        {/* CSS Terminal — fades out when entering world, fades in when exit animation completes */}
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            showWorld ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
          <div className="h-full w-full p-2 sm:p-3 md:p-6 xl:p-8">
            <div className="relative h-full rounded-[20px] border border-white/10 bg-[#0b1020]/95 shadow-2xl backdrop-blur md:rounded-[32px]">
              <div className="mx-auto flex h-full w-full max-w-[1520px] flex-col px-3 py-3 md:px-6 xl:px-8">
                <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-4">
                  <SidebarShell />

                  <section className="min-h-0">
                    <div className="h-full rounded-[18px] border border-white/10 bg-[#0b1020]/90 shadow-panel backdrop-blur px-3 py-3 sm:px-4 sm:py-4 md:rounded-[24px] md:px-5">
                      <PersonaChatSection content={portfolioContent.persona} onPlay={enterWorldMode} />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        {worldMode && !exiting && (
          <button
            onClick={exitWorldMode}
            className="absolute bottom-4 right-4 z-20 rounded-full border border-accent/40 bg-[#0b1020]/80 px-3 py-2 text-xs text-accent transition-colors hover:bg-accent/10 md:bottom-6 md:right-6 md:px-4 md:text-sm"
          >
            터미널로 돌아가기
          </button>
        )}

        {debugMode && (
          <div className="absolute left-3 bottom-3 z-30 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl border border-white/10 bg-black/80 p-3 text-xs text-muted">
            <div className="mb-2 font-semibold text-white">debug://capture</div>
            <div>worldMode: {String(worldMode)}</div>
            <div>transitioning: {String(transitioning)}</div>
            <div>exiting: {String(exiting)}</div>
            <div>canvas: {captureCanvas ? `${captureCanvas.width}x${captureCanvas.height}` : 'null'}</div>
            {captureCanvas && (
              <img
                src={captureCanvas.toDataURL('image/png')}
                alt="capture debug"
                className="mt-3 w-full rounded-lg border border-white/10"
              />
            )}
          </div>
        )}
      </div>
    </main>
  )
}
