export function HeroSection() {
  return (
    <section className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Incident Console</p>
        <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
          문제를
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent"> 체험하게 </span>
          만드는<br />KimSangeun.exe
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted md:text-lg">
          단순 소개 페이지가 아니라, 문제를 어떻게 해석하고 우선순위를 정하고 실행하는지
          보여주는 실무형 랜딩페이지 MVP입니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#scenario" className="rounded-full bg-gradient-to-r from-accent to-accent2 px-5 py-3 text-sm font-bold text-white shadow-panel">시뮬레이터 보기</a>
          <a href="#persona" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-text">AI Persona 보기</a>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-panel p-5 shadow-panel">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-4 flex items-center gap-2 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2">runtime://kimsangeun.exe</span>
          </div>
          <div className="space-y-3 font-mono text-sm leading-7 text-slate-200">
            <p><span className="text-accent">&gt;</span> boot incident profile</p>
            <p><span className="text-accent">&gt;</span> mode: diagnose → prioritize → execute</p>
            <p><span className="text-accent">&gt;</span> surface: product / infra / ops</p>
            <p><span className="text-accent">&gt;</span> status: ready</p>
          </div>
        </div>
      </div>
    </section>
  )
}
