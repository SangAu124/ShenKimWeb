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

export interface ActivityItem {
  title: string
  time: string
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
    brand: 'KimSangeun.exe',
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
    title: '김상은 AI 터미널',
    description: '명령어로 섹션을 이동하고, 자연어로 질문하면서 포트폴리오를 탐색하세요.',
    emptyState: '터미널이 준비되었습니다. help 를 입력하거나 아래 명령어를 눌러 시작하세요.',
    inputPlaceholder: 'help, goto projects, open shenkim-com, ask 어떤 개발자인가요?',
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
  workspace: {
    shellName: 'KimSangeun.exe Workspace',
    modelLabel: 'Persona Engine · static knowledge mode',
    runtimeLabel: 'Next.js 15 · terminal shell · portfolio context',
    statusLine: 'online · low latency · command + natural language',
    recentActivity: [
      { title: 'landing content refactored into reusable portfolio data', time: 'just now' },
      { title: 'persona terminal upgraded with command parsing', time: 'recently' },
      { title: 'AI portfolio shell layout introduced', time: 'recently' },
    ],
  },
  profileAssets: {
    resumeSummary: [
      'Problem Solver / Operator / Builder',
      '백엔드, 인프라, 운영을 하나의 흐름으로 보는 개발자',
      'MVP 구현부터 안정화와 재발 방지까지 연결하는 실행 중심 성향',
    ],
    profileNarrative: {
      intro:
        '저는 예쁜 결과물 자체보다, 어떤 문제를 어떤 순서로 진단하고 해결하는지가 더 중요하다고 봅니다. 그래서 이 포트폴리오도 결과보다 실행 흐름을 보여주는 구조로 만들고 있습니다.',
      workingStyle:
        '제품 기획, MVP 구현, 운영 안정화, 재발 방지를 하나의 시스템으로 연결해서 보는 편입니다. 특히 운영 이슈에서는 최근 변경점과 실제 로그를 먼저 확인해 원인을 좁혀갑니다.',
      currentFocus:
        '지금은 AI 인터페이스와 포트폴리오를 결합해서, 방문자가 저를 읽는 대신 직접 질문하고 탐색할 수 있는 경험을 만드는 데 집중하고 있습니다.',
    },
    contact: {
      email: 'dev.sangau20@gmail.com',
      website: 'https://shenkim.com',
      note: '협업, 제품 실험, 운영 자동화, AI 포트폴리오 구축 관련 대화를 환영합니다.',
    },
    projects: [
      {
        slug: 'shenkim-com',
        title: 'shenkim.com',
        summary: 'AI 포트폴리오 셸과 체험형 랜딩 구조를 실험하는 개인 사이트',
        problem: '정적인 포트폴리오 페이지는 사람을 충분히 설명하지 못하고, 방문자가 능동적으로 탐색할 여지가 적었습니다.',
        approach: '랜딩페이지를 AI 셸처럼 재구성하고, 터미널 인터페이스를 통해 사람과 작업 방식을 직접 탐색하는 구조를 설계했습니다.',
        outcome: '홈을 AI 터미널 허브로 만들고, about / projects 라우팅 및 명령어 기반 탐색 흐름까지 연결했습니다.',
        tags: ['nextjs', 'portfolio', 'ux', 'ai-shell'],
      },
      {
        slug: 'deployment-ops',
        title: 'Deployment & Ops',
        summary: '개인 도메인, 배포 구조, 운영 흐름을 직접 설계하고 유지보수한 작업들',
        problem: '서비스를 만들고 나서도 배포 구조, 환경 설정, 라우팅, 운영 안정화까지 한 번에 풀어야 했습니다.',
        approach: 'Cloudflare, 정적 배포, 버전 설정, 라우팅 이슈 등을 실제 운영 관점에서 확인하고 수정하는 방식으로 접근했습니다.',
        outcome: '배포 구조와 운영 흐름을 직접 다듬으면서, 서비스 변경이 실제 사용자 경험에 어떻게 반영되는지 빠르게 검증할 수 있게 했습니다.',
        tags: ['cloudflare', 'deploy', 'ops', 'infra'],
      },
      {
        slug: 'execution-mvp',
        title: 'Execution MVP',
        summary: '실행 누락 문제를 다루는 서비스 아이데이션과 MVP 설계 실험',
        problem: '사람들이 실행력 부족이 아니라 실행 흐름 설계 부족 때문에 멈추는 경우가 많다는 문제를 다루고 싶었습니다.',
        approach: '실행 누락을 줄이는 제품 가설을 세우고, 작은 흐름과 UX 단위로 MVP를 설계하는 방식으로 접근했습니다.',
        outcome: '문제 정의 → 행동 유도 → 반복 개선이라는 제품 사고 흐름을 더 분명하게 가져가는 기반 실험이 되었습니다.',
        tags: ['product', 'mvp', 'service-design'],
      },
    ],
  },
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
