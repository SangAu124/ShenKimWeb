import { portfolioContent } from '@/data/portfolio'

export type TerminalSectionId = 'hero' | 'scenario' | 'persona' | 'about' | 'cases'

export type TerminalCommandResult =
  | {
      type: 'clear'
    }
  | {
      type: 'output'
      content: string
      navigateTo?: TerminalSectionId
    }
  | {
      type: 'unknown'
      content: string
      suggestions: string[]
    }

const sectionDescriptions: Record<TerminalSectionId, string> = {
  hero: 'hero section',
  scenario: 'interactive scenario section',
  persona: 'persona terminal section',
  about: 'about summary section',
  cases: 'case snapshot section',
}

export const TERMINAL_COMMANDS = [
  'help',
  'clear',
  'about',
  'skills',
  'projects',
  'goto hero',
  'goto scenario',
  'goto persona',
  'goto about',
  'goto cases',
  'ask <question>',
] as const

export function parseTerminalCommand(input: string): TerminalCommandResult | null {
  const trimmed = input.trim()
  const normalized = trimmed.toLowerCase()

  if (!trimmed) return null

  if (normalized === 'clear') {
    return { type: 'clear' }
  }

  if (normalized === 'help') {
    return {
      type: 'output',
      content: [
        'Available commands:',
        '- help : show available terminal commands',
        '- clear : clear terminal history',
        '- about : explain the operator profile',
        '- skills : show core strengths and technical focus',
        '- projects : show recent project snapshots',
        '- goto <hero|scenario|persona|about|cases> : navigate to a section',
        '- ask <question> : ask a natural language question explicitly',
      ].join('\n'),
    }
  }

  if (normalized === 'about') {
    return {
      type: 'output',
      content: [
        portfolioContent.knowledgeBase.identity.summary,
        portfolioContent.knowledgeBase.identity.detail,
      ].join(' '),
    }
  }

  if (normalized === 'skills') {
    return {
      type: 'output',
      content: [
        'Core strengths:',
        ...portfolioContent.knowledgeBase.strengths.map((item) => `- ${item}`),
        '',
        'Technical focus:',
        ...portfolioContent.knowledgeBase.technicalFocus.map((item) => `- ${item}`),
      ].join('\n'),
    }
  }

  if (normalized === 'projects') {
    return {
      type: 'output',
      content: [
        'Recent project snapshots:',
        ...portfolioContent.knowledgeBase.projectSnapshots.map((item) => `- ${item}`),
      ].join('\n'),
      navigateTo: 'cases',
    }
  }

  if (normalized.startsWith('goto ')) {
    const target = normalized.replace(/^goto\s+/, '').trim() as TerminalSectionId
    const validTargets: TerminalSectionId[] = ['hero', 'scenario', 'persona', 'about', 'cases']

    if (validTargets.includes(target)) {
      return {
        type: 'output',
        content: `navigating to ${sectionDescriptions[target]}...\ndone.`,
        navigateTo: target,
      }
    }

    return {
      type: 'unknown',
      content: 'unknown section. use: hero, scenario, persona, about, cases',
      suggestions: ['goto hero', 'goto scenario', 'goto about'],
    }
  }

  if (/^[a-z]+/.test(normalized) && !normalized.startsWith('ask ')) {
    const suggestions = TERMINAL_COMMANDS.filter((command) => command.startsWith(normalized)).slice(0, 4)
    return {
      type: 'unknown',
      content: `unknown command: ${trimmed}`,
      suggestions: suggestions.length > 0 ? suggestions : ['help', 'about', 'projects'],
    }
  }

  return null
}
