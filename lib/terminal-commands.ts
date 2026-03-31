import { portfolioContent } from '@/data/portfolio'

export type TerminalRouteId = 'home' | 'about' | 'projects'

export type TerminalCommandResult =
  | {
      type: 'clear'
    }
  | {
      type: 'output'
      content: string
      navigateTo?: string
      cta?: {
        label: string
        href: string
      }
    }
  | {
      type: 'unknown'
      content: string
      suggestions: string[]
    }

const routeDescriptions: Record<TerminalRouteId, string> = {
  home: 'terminal home',
  about: 'about page',
  projects: 'projects page',
}

export const TERMINAL_COMMANDS = [
  'help',
  'clear',
  'about',
  'skills',
  'projects',
  'search <keyword>',
  'open <project>',
  'resume',
  'contact',
  'goto home',
  'goto about',
  'goto projects',
  'ask <question>',
] as const

function formatProject(project: (typeof portfolioContent.profileAssets.projects)[number]) {
  return [
    `${project.title}`,
    `${project.summary}`,
    `tags: ${project.tags.join(', ')}`,
  ].join('\n')
}

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
        '- help',
        '- clear',
        '- about',
        '- skills',
        '- projects',
        '- search <keyword>',
        '- open <project>',
        '- resume',
        '- contact',
        '- goto <home|about|projects>',
        '- ask <question>',
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
      cta: {
        label: 'about 페이지 열기',
        href: '/about',
      },
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
        'Project registry:',
        ...portfolioContent.profileAssets.projects.map((project) => `- ${project.slug}: ${project.title}`),
        '',
        'tip: use `open <project>` for details',
      ].join('\n'),
      cta: {
        label: 'projects 페이지 열기',
        href: '/projects',
      },
    }
  }

  if (normalized === 'resume') {
    return {
      type: 'output',
      content: [
        'Resume summary:',
        ...portfolioContent.profileAssets.resumeSummary.map((item) => `- ${item}`),
      ].join('\n'),
      cta: {
        label: 'about 페이지 열기',
        href: '/about',
      },
    }
  }

  if (normalized === 'contact') {
    const { contact } = portfolioContent.profileAssets
    return {
      type: 'output',
      content: [
        'Contact:',
        `email: ${contact.email}`,
        `website: ${contact.website}`,
        `${contact.note}`,
      ].join('\n'),
      cta: {
        label: 'website 열기',
        href: contact.website,
      },
    }
  }

  if (normalized.startsWith('search ')) {
    const keyword = normalized.replace(/^search\s+/, '').trim()
    const projectMatches = portfolioContent.profileAssets.projects.filter((project) => {
      const haystack = `${project.slug} ${project.title} ${project.summary} ${project.tags.join(' ')}`.toLowerCase()
      return haystack.includes(keyword)
    })

    const knowledgeMatches = [
      ...portfolioContent.knowledgeBase.strengths,
      ...portfolioContent.knowledgeBase.technicalFocus,
      ...portfolioContent.knowledgeBase.projectSnapshots,
    ].filter((item) => item.toLowerCase().includes(keyword))

    if (projectMatches.length === 0 && knowledgeMatches.length === 0) {
      return {
        type: 'unknown',
        content: `no results for: ${keyword}`,
        suggestions: ['projects', 'skills', 'about'],
      }
    }

    return {
      type: 'output',
      content: [
        `Search results for: ${keyword}`,
        ...(projectMatches.length > 0
          ? ['', 'Projects:', ...projectMatches.map((project) => `- ${project.slug}: ${project.title}`)]
          : []),
        ...(knowledgeMatches.length > 0
          ? ['', 'Knowledge:', ...knowledgeMatches.map((item) => `- ${item}`)]
          : []),
      ].join('\n'),
      cta: projectMatches.length > 0 ? { label: 'projects 페이지 열기', href: '/projects' } : undefined,
    }
  }

  if (normalized.startsWith('open ')) {
    const target = normalized.replace(/^open\s+/, '').trim()
    const project = portfolioContent.profileAssets.projects.find(
      (item) => item.slug === target || item.title.toLowerCase() === target,
    )

    if (!project) {
      return {
        type: 'unknown',
        content: `project not found: ${target}`,
        suggestions: portfolioContent.profileAssets.projects.map((item) => `open ${item.slug}`).slice(0, 4),
      }
    }

    return {
      type: 'output',
      content: formatProject(project),
      cta: {
        label: '프로젝트 상세 열기',
        href: `/projects/${project.slug}`,
      },
    }
  }

  if (normalized.startsWith('goto ')) {
    const target = normalized.replace(/^goto\s+/, '').trim() as TerminalRouteId
    const validTargets: TerminalRouteId[] = ['home', 'about', 'projects']

    if (validTargets.includes(target)) {
      const href = target === 'home' ? '/' : `/${target}`

      return {
        type: 'output',
        content: `navigating to ${routeDescriptions[target]}...\ndone.`,
        navigateTo: href,
      }
    }

    return {
      type: 'unknown',
      content: 'unknown route. use: home, about, projects',
      suggestions: ['goto home', 'goto about', 'goto projects'],
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
