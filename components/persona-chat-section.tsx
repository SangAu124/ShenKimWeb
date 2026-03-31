'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { resolvePersonaResponse } from '@/lib/chat-resolver'
import { EXAMPLE_QUESTIONS } from '@/lib/persona-responses'
import {
  parseTerminalCommand,
  TERMINAL_COMMANDS,
  type TerminalSectionId,
} from '@/lib/terminal-commands'
import type { PersonaSectionContent } from '@/data/portfolio'

type TerminalMessage = {
  type: 'command' | 'system' | 'assistant' | 'error'
  content: string
}

interface PersonaChatSectionProps {
  content: PersonaSectionContent
}

const QUICK_COMMANDS = ['help', 'about', 'skills', 'projects', 'goto scenario', 'goto about']

const SECTION_SELECTOR: Record<TerminalSectionId, string> = {
  hero: 'main',
  scenario: '#scenario',
  persona: '#persona',
  about: '#about',
  cases: '#cases',
}

function formatTimestamp() {
  return new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export function PersonaChatSection({ content }: PersonaChatSectionProps) {
  const initialMessages = useMemo<TerminalMessage[]>(
    () => content.terminalBoot.map((line) => ({ type: 'system', content: `${formatTimestamp()} ${line}` })),
    [content.terminalBoot],
  )

  const [messages, setMessages] = useState<TerminalMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [draftInput, setDraftInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return QUICK_COMMANDS
    return TERMINAL_COMMANDS.filter((command) => command.startsWith(trimmed)).slice(0, 5)
  }, [input])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  function navigateToSection(section: TerminalSectionId) {
    const selector = SECTION_SELECTOR[section]
    const target = selector === 'main' ? document.querySelector('main') : document.querySelector(selector)
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  async function appendOutput(type: TerminalMessage['type'], content: string) {
    await new Promise((resolve) => setTimeout(resolve, 120))
    setMessages((prev) => [...prev, { type, content }])
  }

  async function runTerminalInput(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    setMessages((prev) => [...prev, { type: 'command', content: trimmed }])
    setHistory((prev) => [trimmed, ...prev.filter((item) => item !== trimmed)].slice(0, 20))
    setHistoryIndex(null)
    setDraftInput('')
    setInput('')

    const explicitAsk = trimmed.toLowerCase().startsWith('ask ')
    const commandResult = explicitAsk ? null : parseTerminalCommand(trimmed)

    if (commandResult?.type === 'clear') {
      setMessages(initialMessages)
      return
    }

    if (commandResult?.type === 'output') {
      await appendOutput('system', commandResult.content)
      if (commandResult.navigateTo) {
        navigateToSection(commandResult.navigateTo)
      }
      return
    }

    if (commandResult?.type === 'unknown') {
      await appendOutput(
        'error',
        `${commandResult.content}\ntry: ${commandResult.suggestions.join(' | ')}`,
      )
      return
    }

    setIsLoading(true)

    try {
      const question = explicitAsk ? trimmed.slice(4).trim() : trimmed
      const response = await resolvePersonaResponse(question)
      await appendOutput('assistant', response)
    } catch {
      await appendOutput(
        'error',
        'request failed. try again with a different command or question.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      runTerminalInput(input)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return

      setHistoryIndex((prev) => {
        const nextIndex = prev === null ? 0 : Math.min(prev + 1, history.length - 1)
        if (prev === null) setDraftInput(input)
        setInput(history[nextIndex])
        return nextIndex
      })
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (history.length === 0) return

      setHistoryIndex((prev) => {
        if (prev === null) return null
        const nextIndex = prev - 1
        if (nextIndex < 0) {
          setInput(draftInput)
          return null
        }
        setInput(history[nextIndex])
        return nextIndex
      })
      return
    }

    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault()
      const suggestion = suggestions[0]
      if (suggestion.includes('<question>')) {
        setInput('ask ')
      } else {
        setInput(suggestion)
      }
    }
  }

  function handleInputChange(value: string) {
    if (historyIndex === null) {
      setDraftInput(value)
    }
    setHistoryIndex(null)
    setInput(value)
  }

  function messageLabel(type: TerminalMessage['type']) {
    switch (type) {
      case 'command':
        return 'user'
      case 'assistant':
        return 'assistant'
      case 'error':
        return 'error'
      default:
        return 'system'
    }
  }

  function messageClassName(type: TerminalMessage['type']) {
    switch (type) {
      case 'command':
        return 'border-white/10 bg-white/5'
      case 'assistant':
        return 'border-accent/20 bg-accent/5'
      case 'error':
        return 'border-red-500/20 bg-red-500/5'
      default:
        return 'border-white/10 bg-black/20'
    }
  }

  return (
    <section id="persona" className="flex min-h-[640px] flex-col rounded-[24px] border border-white/10 bg-[#050816] shadow-panel">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {content.eyebrow}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
              {content.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{content.description}</p>
          </div>
          <div className="grid gap-2 text-right text-[11px] uppercase tracking-[0.14em] text-white/35">
            <span>session active</span>
            <span>command + natural language</span>
            <span>static persona mode</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-b border-white/10 bg-black/20 px-5 py-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">welcome</p>
          <p className="mt-3 text-sm leading-7 text-muted">{content.emptyState}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">launch prompts</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_COMMANDS.map((command) => (
              <button
                key={command}
                onClick={() => runTerminalInput(command)}
                disabled={isLoading}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {command}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 font-mono text-sm leading-7">
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={`${msg.type}-${idx}`}
              className={`rounded-2xl border p-4 whitespace-pre-wrap break-words ${messageClassName(msg.type)}`}
            >
              <div className="mb-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-white/35">
                <span>{messageLabel(msg.type)}</span>
                <span>{formatTimestamp()}</span>
              </div>
              <div className="text-slate-200">{msg.type === 'command' ? `> ${msg.content}` : msg.content}</div>
            </div>
          ))}

          {isLoading && (
            <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-white/35">
                <span>assistant</span>
                <span>{formatTimestamp()}</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
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
        </div>

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-white/10 bg-black/20 px-5 py-4">
        <div className="rounded-[20px] border border-white/10 bg-[#0b1020] p-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-accent">❯</span>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={content.inputPlaceholder}
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-white/30 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => runTerminalInput(input)}
              disabled={!input.trim() || isLoading}
              className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              run
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion.includes('<question>') ? 'ask ' : suggestion)}
                className="rounded-full border border-white/10 px-2.5 py-1 transition-colors hover:border-accent/40 hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="mt-3 text-[11px] uppercase tracking-[0.14em] text-white/30">
            ↑/↓ history · tab autocomplete · enter run
          </div>
        </div>
      </div>
    </section>
  )
}
