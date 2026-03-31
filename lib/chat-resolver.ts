import { FALLBACK_RESPONSE, personaResponseCategories } from './persona-responses'

export interface ChatContext {
  lastScenarioId?: string
}

function scoreCategoryMatch(input: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => {
    return input.includes(keyword) ? score + Math.max(keyword.length, 1) : score
  }, 0)
}

// Async signature makes this easy to swap with an API route or server action later
export async function resolvePersonaResponse(
  input: string,
  _context: ChatContext = {},
): Promise<string> {
  const normalized = input.toLowerCase().trim()

  const ranked = personaResponseCategories
    .map((category) => ({
      category,
      score: scoreCategoryMatch(normalized, category.keywords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  if (ranked.length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 300))
    return ranked[0].category.response
  }

  await new Promise((resolve) => setTimeout(resolve, 350))
  return FALLBACK_RESPONSE
}
