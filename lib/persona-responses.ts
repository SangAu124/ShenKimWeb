import { portfolioContent } from '@/data/portfolio'

export interface PersonaResponseCategory {
  id: string
  keywords: string[]
  response: string
}

const { knowledgeBase } = portfolioContent

export const personaResponseCategories: PersonaResponseCategory[] = [
  {
    id: 'identity',
    keywords: ['어떤 개발자', '어떤 개발', '자기소개', '소개', '누구', '설명해줘'],
    response: [knowledgeBase.identity.summary, knowledgeBase.identity.detail].join(' '),
  },
  {
    id: 'strengths',
    keywords: ['강점', '잘하는', '강한 점', '왜 뽑아', '차별점'],
    response: `핵심 강점은 ${knowledgeBase.strengths.join(', ')} 입니다.`,
  },
  {
    id: 'decision-making',
    keywords: ['왜 저 선택', '왜 그 선택', '판단 기준', '선택 이유', '왜 더 낫'],
    response: `판단 기준은 ${knowledgeBase.operatingPrinciples[0]} 입니다. 특히 ${knowledgeBase.operatingPrinciples[1]} 원칙으로 문제 범위를 빠르게 좁힙니다.`,
  },
  {
    id: 'operations',
    keywords: ['운영 이슈', '장애', '먼저 보는', '처음에', '첫 번째', '모니터링'],
    response: `운영 이슈에서는 ${knowledgeBase.operatingPrinciples[1]}. 그리고 ${knowledgeBase.operatingPrinciples[2]}.`,
  },
  {
    id: 'collaboration',
    keywords: ['협업', '팀', '같이 일', '스타일', '커뮤니케이션'],
    response: `협업에서는 ${knowledgeBase.collaborationStyle[0]}. 또한 ${knowledgeBase.collaborationStyle[1]}.`,
  },
  {
    id: 'technical-focus',
    keywords: ['백엔드', '프론트엔드', '성향', '풀스택', '기술 스택', '기술'],
    response: `기술 성향은 ${knowledgeBase.technicalFocus[0]}. 그리고 ${knowledgeBase.technicalFocus[1]}.`,
  },
  {
    id: 'projects',
    keywords: ['프로젝트', '최근 작업', '무슨 프로젝트', '경험', '포트폴리오'],
    response: `최근에는 ${knowledgeBase.projectSnapshots.join(', ')} 같은 작업을 다뤘습니다.`,
  },
  {
    id: 'debugging',
    keywords: ['로그', '디버깅', '추적', '원인 분석'],
    response: `${knowledgeBase.technicalFocus[1]}. 그래서 ${knowledgeBase.operatingPrinciples[2]}.`,
  },
]

export const EXAMPLE_QUESTIONS = knowledgeBase.seedQuestions

export const FALLBACK_RESPONSE =
  '질문을 조금만 더 구체화해주시면 좋겠습니다. 예를 들면 “어떤 문제를 잘 푸나요?”, “운영 이슈는 어떻게 접근하나요?”, “최근 프로젝트는 뭐였나요?”처럼 물어보시면 더 정확히 답할 수 있습니다.'
