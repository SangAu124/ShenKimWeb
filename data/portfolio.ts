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
  terminalBoot: string[]
  quickCommandsLabel: string
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
    eyebrow: 'AI Persona Terminal',
    title: '김상은과 실제 터미널처럼 상호작용하세요',
    description: '명령어로 섹션을 이동하고, 자연어로 질문하면서 포트폴리오를 탐색하세요.',
    emptyState: '터미널이 준비되었습니다. help 를 입력하거나 아래 명령어를 눌러 시작하세요.',
    inputPlaceholder: 'help, goto about, projects, ask 어떤 개발자인가요?',
    exampleQuestionsLabel: '// example prompts',
    quickCommandsLabel: '// quick commands',
    terminalBoot: [
      '[boot] KimSangeun.exe terminal initialized.',
      '[boot] portfolio knowledge base mounted.',
      '[hint] type "help" to inspect available commands.',
      '[hint] natural language questions are also supported.',
    ],
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
      detail:
        '에러 메시지 자체보다 어디서 왜 흐름이 끊겼는지를 먼저 찾고, 문제 정의부터 운영 안정화와 재발 방지까지 하나의 흐름으로 보는 개발자입니다.',
    },
    strengths: [
      '운영 이슈를 변경점과 타임라인 중심으로 좁혀가는 문제 해결 방식',
      'MVP 구현 이후 안정화와 재발 방지까지 연결하는 실행 중심 사고',
      '백엔드, 인프라, 서비스 운영 레이어를 함께 보는 시스템 관점',
    ],
    technicalFocus: [
      '백엔드 성향이 강하고 데이터 흐름, 서비스 구조, 인프라 레이어를 함께 보는 편',
      '로그와 변경 이력을 증거로 삼아 장애 원인을 추적하는 디버깅 방식',
      '프론트엔드는 필요 기능 중심으로 접근하되 데이터 구조와 인터페이스를 먼저 설계',
    ],
    collaborationStyle: [
      '결론만이 아니라 현재 상태, 시도한 것, 아직 모르는 것을 함께 공유',
      '운영 이슈일수록 맥락을 명확히 전달해서 다음 판단이 이어지게 만드는 편',
    ],
    operatingPrinciples: [
      '빠른 재시작보다 원인 파악과 재발 방지를 우선',
      '운영 이슈에서는 최근 배포·설정 변경·트래픽 변화 같은 변경점을 먼저 확인',
      '에러 로그만이 아니라 에러 직전 맥락 로그를 더 중요하게 봄',
    ],
    projectSnapshots: [
      '개인 도메인과 서비스 배포 구조를 직접 설계하고 운영',
      '실행 누락 문제를 다루는 서비스 아이데이션과 MVP 설계',
      '문제 해결 과정을 체험형 랜딩 구조로 재해석하는 포트폴리오 실험',
    ],
    seedQuestions: [
      '어떤 개발자인가요?',
      '왜 저 선택이 더 낫나요?',
      '운영 이슈를 볼 때 가장 먼저 보는 건?',
      '협업 스타일은 어떤가요?',
      '백엔드 성향이 강한가요?',
      '최근 어떤 프로젝트를 했나요?',
    ],
  },
} as const
