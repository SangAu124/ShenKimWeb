const mockMessages = [
  { role: 'user', text: '지금 장애 대응에서 어디부터 봐야 하지?' },
  { role: 'ai', text: '로그, 재현 경로, 현재 리스크부터 짧게 정리하겠습니다.' },
  { role: 'user', text: '설명은 짧고, 실행은 빠르게 해줘.' },
  { role: 'ai', text: '좋습니다. 원인 파악 → 임시 복구 → 재발 방지 순서로 갑니다.' },
]

export function PersonaChatSection() {
  return (
    <section id="persona" className="grid gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">AI Persona Chat</p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">김비서 같은 실행형 페르소나를 체험하는 공간</h2>
        <p className="mt-4 leading-8 text-muted">
          현재는 mock 응답이지만, 이후에는 문제 유형별 대응 전략과 실행 흐름을 실제 인터랙션으로 확장할 예정입니다.
        </p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-panel p-5 shadow-panel">
        <div className="space-y-4">
          {mockMessages.map((message, idx) => (
            <div key={idx} className={`rounded-2xl p-4 ${message.role === 'ai' ? 'border border-white/10 bg-white/5' : 'border border-white/5 bg-black/20'}`}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{message.role === 'ai' ? 'KimSangeun.exe' : 'User'}</p>
              <p className="leading-7 text-slate-200">{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
