const snapshots = [
  '개인 도메인과 서비스 배포 구조 설계 및 운영',
  '실행 누락 문제를 다루는 서비스 아이데이션과 MVP 설계',
  '문제 해결 과정을 체험형 랜딩 구조로 재해석',
]

export function CaseSnapshotSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-panel p-6 shadow-panel">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Case Snapshot</p>
      <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em]">최근 다뤄온 문제와 방식</h3>
      <ul className="mt-5 space-y-3 text-muted">
        {snapshots.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  )
}
