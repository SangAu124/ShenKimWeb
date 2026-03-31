'use client'

import { portfolioContent } from '@/data/portfolio'

export function MonitorSurfaceCapture() {
  return (
    <div
      id="monitor-capture-surface"
      style={{
        width: 1280,
        height: 720,
        background: '#0b1020',
        color: 'white',
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        border: '2px solid #111827',
        borderRadius: 24,
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <aside style={{ padding: 24, borderRight: '1px solid rgba(255,255,255,0.08)', background: '#0f172a' }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7dd3fc', fontWeight: 700 }}>workspace</div>
        <div style={{ marginTop: 10, fontSize: 28, fontWeight: 700 }}>{portfolioContent.header.brand}</div>
        <div style={{ marginTop: 16, display: 'inline-flex', padding: '6px 10px', borderRadius: 999, border: '1px solid rgba(74, 222, 128, 0.2)', background: 'rgba(74, 222, 128, 0.1)', color: '#86efac', fontSize: 11, fontWeight: 700 }}>ONLINE</div>
        <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.7, color: '#94a3b8' }}>{portfolioContent.knowledgeBase.identity.summary}</p>
        <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
          {['terminal', 'about', 'projects'].map((item) => (
            <div key={item} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '12px 14px', fontSize: 14, color: '#cbd5e1', background: 'rgba(0,0,0,0.2)' }}>{item}</div>
          ))}
        </div>
      </aside>

      <section style={{ display: 'flex', flexDirection: 'column', minWidth: 0, background: '#050816' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0b1020' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7dd3fc', fontWeight: 700 }}>
            ai persona terminal
          </div>
          <div style={{ marginTop: 14, fontSize: 42, fontWeight: 700, letterSpacing: '-0.04em' }}>김상은 AI 터미널</div>
          <div style={{ marginTop: 14, fontSize: 15, color: '#94a3b8' }}>명령어로 섹션을 이동하고, 자연어로 질문하면서 포트폴리오를 탐색하세요.</div>
        </div>

        <div style={{ padding: '24px 28px', flex: 1, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 15, lineHeight: 1.9, color: '#cbd5e1' }}>
          <div><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>21:10:31</span><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>[김상은]</span>터미널이 준비되었습니다. help 를 입력하거나 아래 명령어를 눌러 시작하세요.</div>
          <div><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>21:10:31</span><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>[김상은]</span>quick commands: help · play · about · skills · projects · resume · contact</div>
          <div><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>21:10:34</span><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>[❯]</span>play</div>
          <div style={{ color: '#7dd3fc' }}><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>21:10:35</span><span style={{ color: 'rgba(255,255,255,0.35)', marginRight: 10 }}>[김상은]</span>이제 이 화면은 room 안의 monitor surface로 렌더됩니다.</div>
        </div>

        <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.08)', background: '#0b1020' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '14px 16px', color: '#cbd5e1' }}>
            <span style={{ color: '#7dd3fc' }}>❯</span>
            <span style={{ opacity: 0.55 }}>help, goto about, projects, ask 어떤 개발자인가요?</span>
            <span style={{ marginLeft: 'auto', border: '1px solid rgba(125,211,252,0.25)', borderRadius: 10, padding: '6px 12px', color: '#7dd3fc', fontSize: 12, fontWeight: 700 }}>RUN</span>
          </div>
        </div>
      </section>
    </div>
  )
}
