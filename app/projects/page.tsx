import Link from 'next/link'
import { SidebarShell } from '@/components/sidebar-shell'
import { portfolioContent } from '@/data/portfolio'

export default function ProjectsPage() {
  const { projects } = portfolioContent.profileAssets

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-4 py-4 md:px-6 xl:px-8">
        <div className="grid min-h-[calc(100vh-2rem)] gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarShell />

          <section className="rounded-[24px] border border-white/10 bg-[#0b1020]/90 p-6 shadow-panel backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">projects</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white">Project Registry</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
              단순한 작업 목록이 아니라, 어떤 문제를 왜 풀었고 어떤 방식으로 접근했는지를 중심으로 정리한 프로젝트 아카이브입니다.
            </p>

            <div className="mt-8 grid gap-5">
              {projects.map((project, index) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                  <article className="rounded-2xl border border-white/10 bg-[#0f172a] p-6 transition-colors group-hover:border-accent/40 group-hover:bg-[#121b33]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">project {index + 1}</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">{project.title}</h2>
                        <p className="mt-1 text-sm text-white/35">{project.slug}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-200">{project.summary}</p>

                    <div className="mt-6 grid gap-4 xl:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Problem</p>
                        <p className="mt-3 text-sm leading-7 text-muted">{project.problem}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Approach</p>
                        <p className="mt-3 text-sm leading-7 text-muted">{project.approach}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Outcome</p>
                        <p className="mt-3 text-sm leading-7 text-muted">{project.outcome}</p>
                      </div>
                    </div>

                    <div className="mt-5 text-sm font-medium text-accent">프로젝트 상세 보기 →</div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
