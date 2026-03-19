import { personaResponses, FALLBACK_RESPONSE } from './persona-responses'

export interface ChatContext {
  lastScenarioId?: string
}

// Async signature makes this easy to swap with an API route or server action later
export async function resolvePersonaResponse(
  input: string,
  _context: ChatContext = {},
): Promise<string> {
  const normalized = input.toLowerCase()

  for (const entry of personaResponses) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 400))
      return entry.response
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 400))
  return FALLBACK_RESPONSE
}
