'use client'

import { useState } from 'react'
import { scenarios, type Scenario, type ChoiceQuality } from '@/lib/scenarios'

const qualityConfig: Record<ChoiceQuality, { badge: string; label: string }> = {
  strong: {
    badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    label: 'STRONG APPROACH',
  },
  partial: {
    badge: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    label: 'PARTIAL APPROACH',
  },
  weak: {
    badge: 'bg-red-500/20 text-red-400 border border-red-500/30',
    label: 'WEAK APPROACH',
  },
}

export function ScenarioSection() {
  const [view, setView] = useState<'list' | 'play'>('list')
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null)
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null)

  function handleStartScenario(scenario: Scenario) {
    setActiveScenario(scenario)
    setSelectedChoiceId(null)
    setView('play')
  }

  function handleSelectChoice(choiceId: string) {
    if (selectedChoiceId !== null) return
    setSelectedChoiceId(choiceId)
  }

  function handleReplay() {
    setSelectedChoiceId(null)
  }

  function handleBackToList() {
    setView('list')
    setActiveScenario(null)
    setSelectedChoiceId(null)
  }

  function renderList() {
    return (
      <section id="scenario" className="border-t border-white/10 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Interactive Scenario
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
            문제 해결 방식을 직접 체험하세요
          </h2>
          <p className="mt-3 leading-7 text-muted">
            실제 운영 상황을 선택하고, 사고 접근법에 대한 피드백을 받아보세요.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleStartScenario(scenario)}
              className="rounded-2xl border border-white/10 bg-panel p-6 shadow-panel cursor-pointer hover:border-accent/40 transition-colors text-left"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                // INCIDENT
              </p>
              <h3 className="mt-2 text-lg font-semibold">{scenario.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted line-clamp-3">
                {scenario.situation}
              </p>
              <p className="mt-4 text-sm font-semibold text-accent">시작하기 →</p>
            </button>
          ))}
        </div>
      </section>
    )
  }

  function renderPlay(scenario: Scenario) {
    const selectedChoice = scenario.choices.find((c) => c.id === selectedChoiceId) ?? null

    return (
      <section id="scenario" className="border-t border-white/10 py-12">
        <button
          onClick={handleBackToList}
          className="mb-6 text-sm text-muted hover:text-white transition-colors"
        >
          ← 다른 시나리오
        </button>

        <div className="mb-6 rounded-2xl border border-white/10 bg-panel p-6 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            // INCIDENT
          </p>
          <p className="mt-3 leading-7">{scenario.situation}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {scenario.choices.map((choice) => {
            const isSelected = choice.id === selectedChoiceId
            const hasSelection = selectedChoiceId !== null

            let buttonClass =
              'rounded-xl border p-4 text-left text-sm leading-6 transition-colors'

            if (!hasSelection) {
              buttonClass +=
                ' border-white/10 bg-panel hover:border-white/20 cursor-pointer'
            } else if (isSelected) {
              const colors = {
                strong: ' border-emerald-500/50 bg-emerald-500/10',
                partial: ' border-yellow-500/50 bg-yellow-500/10',
                weak: ' border-red-500/50 bg-red-500/10',
              }
              buttonClass += colors[choice.quality]
            } else {
              buttonClass += ' border-white/10 bg-panel opacity-50 cursor-default'
            }

            return (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice.id)}
                disabled={hasSelection && !isSelected}
                className={buttonClass}
              >
                {choice.label}
              </button>
            )
          })}
        </div>

        {selectedChoice && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-panel p-6 shadow-panel animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                // INCIDENT REPORT
              </p>
              <span
                className={`rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.14em] ${qualityConfig[selectedChoice.quality].badge}`}
              >
                {qualityConfig[selectedChoice.quality].label}
              </span>
            </div>
            <p className="font-mono text-sm leading-7 text-muted">{selectedChoice.feedback}</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleReplay}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-white/20 transition-colors"
              >
                다시 플레이
              </button>
              <button
                onClick={handleBackToList}
                className="rounded-lg border border-accent/40 px-4 py-2 text-sm text-accent hover:bg-accent/10 transition-colors"
              >
                다른 시나리오
              </button>
            </div>
          </div>
        )}
      </section>
    )
  }

  return view === 'list' ? renderList() : activeScenario ? renderPlay(activeScenario) : null
}
