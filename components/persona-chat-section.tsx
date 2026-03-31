'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { resolvePersonaResponse } from '@/lib/chat-resolver'
import { EXAMPLE_QUESTIONS } from '@/lib/persona-responses'
import {
  parseTerminalCommand,
  TERMINAL_COMMANDS,
  type TerminalSectionId,
} from '@/lib/terminal-commands'
import { portfolioContent } from '@/data/portfolio'
import type { PersonaSectionContent } from '@/data/portfolio'

type TerminalMessage = {
  type: 'command' | 'system' | 'assistant' | 'error'
  content: string
  timestamp: string
  cta?: {
    label: string
    href: string
  }
}

interface PersonaChatSectionProps {
  content: PersonaSectionContent
}

const QUICK_COMMANDS = ['help', 'about', 'skills', 'projects', 'resume', 'contact']

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

function createMessage(
  type: TerminalMessage['type'],
  content: string,
  cta?: TerminalMessage['cta'],
): TerminalMessage {
  return {
    type,
    content,
    timestamp: formatTimestamp(),
    cta,
  }
}

export function PersonaChatSection({ content }: PersonaChatSectionProps) {
  const initialMessages = useMemo<TerminalMessage[]>(
    () => content.terminalBoot.map((line) => createMessage('system', line)),
    [content.terminalBoot],
  )

  const [messages, setMessages] = useState<TerminalMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [draftInput, setDraftInput] = useState('')
  const logContainerRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    const raw = input.toLowerCase()
    const trimmed = raw.trim()
    const projectSlugs = portfolioContent.profileAssets.projects.map((project) => project.slug)

    if (!trimmed) return QUICK_COMMANDS

    if (trimmed === 'open') return ['open']
    if (raw.endsWith('open ')) return projectSlugs.map((slug) => `open ${slug}`).slice(0, 5)
    if (trimmed.startsWith('open ')) {
      const query = trimmed.replace(/^open\s+/, '')
      return projectSlugs
        .filter((slug) => slug.startsWith(query))
        .map((slug) => `open ${slug}`)
        .slice(0, 5)
    }

    if ('search'.startsWith(trimmed)) return ['search']
    if (raw === 'search ') return projectSlugs.map((slug) => `search ${slug}`).slice(0, 5)
    if (trimmed.startsWith('search ')) {
      const query = trimmed.replace(/^search\s+/, '')
      return projectSlugs
        .filter((slug) => slug.includes(query))
        .map((slug) => `search ${slug}`)
        .slice(0, 5)
    }

    return TERMINAL_COMMANDS.filter((command) => !command.includes('<') && command.startsWith(trimmed)).slice(0, 5)
  }, [input])

  const introLines = useMemo(
    () => [
      createMessage('system', content.emptyState),
      createMessage('system', `quick commands: ${QUICK_COMMANDS.join(' · ')}`),
      createMessage('system', `example prompts: ${EXAMPLE_QUESTIONS.map((q) => `ask ${q}`).join(' · ')}`),
    ],
    [content.emptyState],
  )

  useEffect(() => {
    const container = logContainerRef.current
    if (!container) return
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  function navigateToSection(section: TerminalSectionId) {
    const selector = SECTION_SELECTOR[section]
    const target = selector === 'main' ? document.querySelector('main') : document.querySelector(selector)
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  async function appendOutput(message: TerminalMessage) {
    await new Promise((resolve) => setTimeout(resolve, 120))
    setMessages((prev) => [...prev, message])
  }

  async function runTerminalInput(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    setMessages((prev) => [...prev, createMessage('command', trimmed)])
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
      await appendOutput(createMessage('system', commandResult.content, commandResult.cta))
      if (commandResult.navigateTo) navigateToSection(commandResult.navigateTo)
      return
    }

    if (commandResult?.type === 'unknown') {
      await appendOutput(
        createMessage('error', `${commandResult.content}\ntry: ${commandResult.suggestions.join(' | ')}`),
      )
      return
    }

    setIsLoading(true)

    try {
      const question = explicitAsk ? trimmed.slice(4).trim() : trimmed
      const response = await resolvePersonaResponse(question)
      await appendOutput(createMessage('assistant', response))
    } catch {
      await appendOutput(
        createMessage('error', 'request failed. try again with a different command or question.'),
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
      if (suggestion === 'open') {
        setInput('open ')
      } else if (suggestion === 'search') {
        setInput('search ')
      } else {
        setInput(suggestion.includes('<question>') ? 'ask ' : suggestion)
      }
      return
    }
  }

  function handleInputChange(value: string) {
    if (historyIndex === null) setDraftInput(value)
    setHistoryIndex(null)
    setInput(value)
  }

  function linePrefix(type: TerminalMessage['type']) {
    switch (type) {
      case 'command':
        return '❯'
      case 'assistant':
        return 'AI'
      case 'error':
        return 'ERR'
      default:
        return '김상은'
    }
  }

  function lineColor(type: TerminalMessage['type']) {
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
    <section id="persona" className="flex h-full min-h-0 flex-col rounded-[20px] border border-white/10 bg-[#050816]">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {content.eyebrow}
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-white md:text-3xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{content.description}</p>
          </div>
          <div className="hidden text-right text-[11px] uppercase tracking-[0.14em] text-white/35 xl:block">
            <div>session active</div>
            <div className="mt-1">command + natural language</div>
          </div>
        </div>
      </div>

      <div ref={logContainerRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5 font-mono text-sm leading-7">
        <div className="space-y-2">
          {[...introLines, ...messages].map((msg, idx) => (
            <div key={`${msg.type}-${idx}-${msg.timestamp}`} className={`whitespace-pre-wrap break-words ${lineColor(msg.type)}`}>
              <div>
                <span className="mr-3 text-white/35">{msg.timestamp}</span>
                <span className="mr-3 uppercase text-white/35">[{linePrefix(msg.type)}]</span>
                <span>{msg.content}</span>
              </div>
              {msg.cta && (
                <div className="mt-2 ml-[92px]">
                  <Link
                    href={msg.cta.href}
                    className="inline-flex rounded-full border border-accent/40 px-3 py-1 text-xs text-accent transition-colors hover:bg-accent/10"
                  >
                    {msg.cta.label}
                  </Link>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="text-accent whitespace-pre-wrap">
              <span className="mr-3 text-white/35">{formatTimestamp()}</span>
              <span className="mr-3 uppercase text-white/35">[AI]</span>
              <span>thinking...</span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20 px-5 py-4">
        <div className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-[#0b1020] px-4 py-3">
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
              onClick={() => {
                if (suggestion === 'open') setInput('open ')
                else if (suggestion === 'search') setInput('search ')
                else setInput(suggestion.includes('<question>') ? 'ask ' : suggestion)
              }}
              className="rounded-full border border-white/10 px-2.5 py-1 transition-colors hover:border-accent/40 hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="mt-3 text-[11px] uppercase tracking-[0.14em] text-white/30">
          ↑/↓ history · tab autocomplete (incl. open/search project slugs) · enter run
        </div>
      </div>
    </section>
  )
}
