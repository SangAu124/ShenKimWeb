import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SidebarShell } from '@/components/sidebar-shell'
import { portfolioContent } from '@/data/portfolio'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return portfolioContent.profileAssets.projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = portfolioContent.profileAssets.projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-4 py-4 md:px-6 xl:px-8">
        <div className="grid min-h-[calc(100vh-2rem)] gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarShell />

          <section className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-6 shadow-panel backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">project detail</p>
                <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white">{project.title}</h1>
                <p className="mt-2 text-sm text-white/35">{project.slug}</p>
              </div>
              <Link href="/projects" className="rounded-full border border-white/10 px-3 py-2 text-sm text-muted hover:border-accent/40 hover:text-white">
                ← projects로 돌아가기
              </Link>
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-200">{project.summary}</p>

            <div className="mt-8 grid gap-4 xl:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Problem</p>
                <p className="mt-3 text-sm leading-7 text-muted">{project.problem}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Approach</p>
                <p className="mt-3 text-sm leading-7 text-muted">{project.approach}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Outcome</p>
                <p className="mt-3 text-sm leading-7 text-muted">{project.outcome}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
              <article className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Notes</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  이 영역은 나중에 김 대표님이 각 프로젝트별로 더 깊은 배경, 의사결정, 기술적 trade-off, 시행착오, 결과 해석을 직접 채워넣는 상세 narrative 공간입니다.
                </p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
