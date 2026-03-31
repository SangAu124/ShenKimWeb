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
        return '> '
      case 'assistant':
        return 'ai'
      case 'error':
        return 'error'
      default:
        return 'system'
    }
  }

  function messageClassName(type: TerminalMessage['type']) {
    switch (type) {
      case 'command':
        return 'text-slate-100'
      case 'assistant':
        return 'text-accent2'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-muted'
    }
  }

  return (
    <section
      id="persona"
      className="grid gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.78fr_1.22fr]"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          {content.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">{content.title}</h2>
        <p className="mt-4 leading-8 text-muted">{content.description}</p>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {content.quickCommandsLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_COMMANDS.map((command) => (
              <button
                key={command}
                onClick={() => runTerminalInput(command)}
                disabled={isLoading}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {command}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {content.exampleQuestionsLabel}
          </p>
          <div className="flex flex-col gap-2">
            {EXAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => runTerminalInput(`ask ${q}`)}
                disabled={isLoading}
                className="rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-muted transition-colors hover:border-accent/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                ask {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-panel shadow-panel">
        <div className="border-b border-white/10 bg-black/20 px-5 py-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 font-mono">session://persona-terminal</span>
          </div>
        </div>

        <div className="max-h-[560px] min-h-[360px] overflow-y-auto bg-[#050816] px-5 py-4 font-mono text-sm leading-7">
          {messages.length === 0 && (
            <p className="text-sm text-muted">{content.emptyState}</p>
          )}

          {messages.map((msg, idx) => (
            <div key={`${msg.type}-${idx}`} className="mb-3 whitespace-pre-wrap break-words">
              <span className={`mr-2 uppercase tracking-[0.14em] ${messageClassName(msg.type)}`}>
                {messageLabel(msg.type)}
              </span>
              <span className="text-slate-200">{msg.content}</span>
            </div>
          ))}

          {isLoading && (
            <div className="mb-3 flex items-center gap-2 text-accent">
              <span className="uppercase tracking-[0.14em]">ai</span>
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
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/10 bg-black/30 px-4 py-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <span className="font-mono text-sm text-accent">&gt;</span>
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
            <span className="uppercase tracking-[0.14em] text-white/40">suggest</span>
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

          <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/30">
            ↑/↓ history · tab autocomplete · enter run
          </div>
        </div>
      </div>
    </section>
  )
}
