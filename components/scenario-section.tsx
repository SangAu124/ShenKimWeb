const scenarioSteps = [
  '문제를 입력받고 상황을 가장 작은 실행 단위로 분해합니다.',
  '리스크와 우선순위를 빠르게 재배치합니다.',
  '지금 당장 실행할 액션과 운영 체크포인트를 보여줍니다.',
]

export function ScenarioSection() {
  return (
    <section id="scenario" className="grid gap-6 border-t border-white/10 py-12 lg:grid-cols-3">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Interactive Scenario</p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">문제 해결 시뮬레이터의 기본 흐름</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:col-span-2">
        {scenarioSteps.map((step, idx) => (
          <article key={step} className="rounded-2xl border border-white/10 bg-panel p-5 shadow-panel">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">STEP 0{idx + 1}</span>
            <p className="mt-4 leading-7 text-muted">{step}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
