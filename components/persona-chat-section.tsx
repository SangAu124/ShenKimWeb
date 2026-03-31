'use client'

import { useState, useRef, useEffect } from 'react'
import { resolvePersonaResponse } from '@/lib/chat-resolver'
import { EXAMPLE_QUESTIONS } from '@/lib/persona-responses'
import type { PersonaSectionContent } from '@/data/portfolio'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface PersonaChatSectionProps {
  content: PersonaSectionContent
}

export function PersonaChatSection({ content }: PersonaChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setInput('')
    setIsLoading(true)

    try {
      const response = await resolvePersonaResponse(trimmed)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <section
      id="persona"
      className="grid gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.8fr_1.2fr]"
    >
      {/* Left: description + example questions */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          {content.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
          {content.title}
        </h2>
        <p className="mt-4 leading-8 text-muted">
          {content.description}
        </p>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {content.exampleQuestionsLabel}
          </p>
          <div className="flex flex-col gap-2">
            {EXAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-muted transition-colors hover:border-accent/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: chat panel */}
      <div className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel shadow-panel">
        {/* Messages */}
        <div className="max-h-[480px] min-h-[300px] flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted">{content.emptyState}</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 ${
                msg.role === 'assistant'
                  ? 'border border-white/10 bg-white/5'
                  : 'border border-white/5 bg-black/20'
              }`}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {msg.role === 'assistant' ? 'KimSangeun.exe' : 'You'}
              </p>
              <p className="leading-7 text-slate-200">{msg.content}</p>
            </div>
          ))}

          {isLoading && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                KimSangeun.exe
              </p>
              <div className="flex items-center gap-1">
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3 border-t border-white/10 p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={content.inputPlaceholder}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm placeholder:text-white/30 transition-colors focus:border-accent/40 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="rounded-xl border border-accent/40 px-4 py-2.5 text-sm text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            전송
          </button>
        </div>
      </div>
    </section>
  )
}
