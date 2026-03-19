export function HeroSection() {
  return (
    <section className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      {/* Left: Copy */}
      <div>
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          ONLINE
        </div>

        <h1 className="animate-fade-up-delay mt-5 text-5xl font-black leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">
          장애를 만나면,<br />
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            설명이 더 쉬워집니다.
          </span>
        </h1>

        <p className="animate-fade-up-delay mt-6 max-w-lg text-base leading-8 text-muted md:text-lg">
          증상보다 흐름을 먼저 확인합니다 — 문제 해결 방식을 직접 플레이해보세요.
        </p>

        <div className="animate-fade-up-delay2 mt-8 flex flex-wrap gap-3">
          <a
            href="#scenario"
            className="rounded-full bg-gradient-to-r from-accent to-accent2 px-5 py-3 text-sm font-bold text-white shadow-panel"
          >
            문제 해결 플레이 시작
          </a>
          <a
            href="#persona"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-text"
          >
            AI 김상은에게 물어보기
          </a>
        </div>
      </div>

      {/* Right: Terminal panel */}
      <div className="rounded-3xl border border-white/10 bg-panel p-5 shadow-panel">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-4 flex items-center gap-2 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2">runtime://kimsangeun.exe</span>
          </div>
          <div className="space-y-3 font-mono text-sm leading-7 text-slate-200">
            <p>
              <span className="text-accent">&gt;</span> status:{" "}
              <span className="text-green-400">ONLINE</span>{" "}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse align-middle" />
            </p>
            <p>
              <span className="text-accent">&gt;</span> mode: diagnose → prioritize → act
            </p>
            <p>
              <span className="text-accent">&gt;</span> last resolved: 증상 뒤 흐름 파악
            </p>
            <p>
              <span className="text-accent">&gt;</span> surface: product / infra / ops
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
