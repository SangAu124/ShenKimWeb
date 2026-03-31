export interface HeroContent {
  status: string
  badge: string
  headline: string
  highlight: string
  description: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
  runtime: {
    statusLabel: string
    mode: string
    lastResolved: string
    surface: string
  }
}

export interface AboutCard {
  eyebrow: string
  title: string
  description: string
}

export interface PersonaSectionContent {
  eyebrow: string
  title: string
  description: string
  emptyState: string
  inputPlaceholder: string
  exampleQuestionsLabel: string
}

export interface CaseSnapshotContent {
  eyebrow: string
  title: string
  items: string[]
}

export interface FooterCtaContent {
  eyebrow: string
  title: string
  cta: {
    label: string
    href: string
  }
}

export const portfolioContent = {
  header: {
    brand: 'KIMSANGEUN.EXE',
    tagline: 'Problem Solver / Operator / Builder',
  },
  hero: {
    status: 'ONLINE',
    badge: 'ONLINE',
    headline: '장애를 만나면,',
    highlight: '설명이 더 쉬워집니다.',
    description: '증상보다 흐름을 먼저 확인합니다 — 문제 해결 방식을 직접 플레이해보세요.',
    primaryCta: {
      label: '문제 해결 플레이 시작',
      href: '#scenario',
    },
    secondaryCta: {
      label: 'AI 김상은에게 물어보기',
      href: '#persona',
    },
    runtime: {
      statusLabel: 'ONLINE',
      mode: 'diagnose → prioritize → act',
      lastResolved: '증상 뒤 흐름 파악',
      surface: 'product / infra / ops',
    },
  } satisfies HeroContent,
  aboutCards: [
    {
      eyebrow: 'About',
      title: '설명보다 실행 흐름이 먼저 보이는 사람',
      description:
        'KimSangeun.exe는 예쁜 포트폴리오보다 실제 상황에서 어떤 판단을 내리고 어떤 순서로 움직이는지 보여주는 페이지를 지향합니다.',
    },
    {
      eyebrow: 'Summary',
      title: 'Build · Operate · Improve',
      description:
        '문제 정의, 빠른 MVP 구현, 운영 안정화, 재발 방지까지 하나의 흐름으로 연결하는 방식을 기본 태도로 삼습니다.',
    },
  ] satisfies AboutCard[],
  caseSnapshots: {
    eyebrow: 'Case Snapshot',
    title: '최근 다뤄온 문제와 방식',
    items: [
      '개인 도메인과 서비스 배포 구조 설계 및 운영',
      '실행 누락 문제를 다루는 서비스 아이데이션과 MVP 설계',
      '문제 해결 과정을 체험형 랜딩 구조로 재해석',
    ],
  } satisfies CaseSnapshotContent,
  persona: {
    eyebrow: 'AI Persona Chat',
    title: '김상은에게 직접 물어보세요',
    description: '판단 기준, 운영 경험, 협업 방식 — 궁금한 걸 자유롭게 물어보세요.',
    emptyState: '왼쪽 예시 질문을 눌러보거나, 직접 입력하세요.',
    inputPlaceholder: '궁금한 것을 자유롭게 입력하세요...',
    exampleQuestionsLabel: '// 예시 질문',
  } satisfies PersonaSectionContent,
  footerCta: {
    eyebrow: 'Footer CTA',
    title: '문제를 설명하는 대신, 해결 흐름을 보여주는 랜딩페이지',
    cta: {
      label: '시나리오 다시 보기',
      href: '#scenario',
    },
  } satisfies FooterCtaContent,
  knowledgeBase: {
    identity: {
      name: '김상은',
      handle: 'KimSangeun.exe',
      summary:
        '증상보다 흐름을 먼저 보고, 제품·인프라·운영을 하나의 연속된 시스템으로 다루는 개발자입니다.',
    },
    strengths: [
      '운영 이슈를 변경점과 타임라인 중심으로 좁혀가는 문제 해결 방식',
      'MVP 구현 이후 안정화와 재발 방지까지 연결하는 실행 중심 사고',
      '백엔드, 인프라, 서비스 운영 레이어를 함께 보는 시스템 관점',
    ],
    seedQuestions: [
      '어떤 개발자인가요?',
      '왜 저 선택이 더 낫나요?',
      '운영 이슈를 볼 때 가장 먼저 보는 건?',
      '협업 스타일은 어떤가요?',
      '백엔드 성향이 강한가요?',
    ],
  },
} as const
