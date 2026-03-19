export function FooterCtaSection() {
  return (
    <footer className="mt-12 border-t border-white/10 pt-8">
      <div className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-panel p-6 shadow-panel md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Footer CTA</p>
          <h4 className="mt-2 text-2xl font-bold tracking-[-0.04em]">문제를 설명하는 대신, 해결 흐름을 보여주는 랜딩페이지</h4>
        </div>
        <a href="#scenario" className="inline-flex rounded-full bg-gradient-to-r from-accent to-accent2 px-5 py-3 text-sm font-bold text-white shadow-panel">
          시나리오 다시 보기
        </a>
      </div>
    </footer>
  )
}
