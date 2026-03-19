export function AboutSection() {
  return (
    <section className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-2">
      <article className="rounded-3xl border border-white/10 bg-panel p-6 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">About</p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em]">설명보다 실행 흐름이 먼저 보이는 사람</h3>
        <p className="mt-4 leading-8 text-muted">
          KimSangeun.exe는 예쁜 포트폴리오보다 실제 상황에서 어떤 판단을 내리고 어떤 순서로 움직이는지 보여주는 페이지를 지향합니다.
        </p>
      </article>
      <article className="rounded-3xl border border-white/10 bg-panel p-6 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Summary</p>
        <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em]">Build · Operate · Improve</h3>
        <p className="mt-4 leading-8 text-muted">
          문제 정의, 빠른 MVP 구현, 운영 안정화, 재발 방지까지 하나의 흐름으로 연결하는 방식을 기본 태도로 삼습니다.
        </p>
      </article>
    </section>
  )
}
