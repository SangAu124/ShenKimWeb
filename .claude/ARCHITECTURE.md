# 아키텍처 문서

## 디렉토리 구조

```
app/                    # Next.js App Router (static export)
├── layout.tsx          # 루트 레이아웃
├── page.tsx            # / → HomeWorldDemo 렌더링
├── about/page.tsx      # /about
└── projects/
    ├── page.tsx        # /projects (목록)
    └── [slug]/page.tsx # /projects/:slug (상세, generateStaticParams)

components/             # UI 컴포넌트
├── index.ts            # 배럴 익스포트
├── home-world-demo.tsx # 오케스트레이터 (3D ↔ 터미널 전환 상태 관리)
├── world-room-canvas.tsx       # Three.js 씬
├── persona-chat-section.tsx    # 터미널 인터페이스 (메인 인터랙션)
├── scenario-section.tsx        # 인시던트 시뮬레이터
├── sidebar-shell.tsx           # 사이드바 네비게이션
├── hero-section.tsx
├── about-section.tsx
├── case-snapshot-section.tsx
└── footer-cta-section.tsx

lib/                    # 비즈니스 로직
├── chat-resolver.ts    # 키워드 매칭 → 응답 결정 (API 교체 가능 구조)
├── persona-responses.ts # 8개 카테고리 응답 템플릿 + 키워드
├── terminal-commands.ts # 명령어 파싱 (결과 타입: clear / output / unknown)
└── scenarios.ts        # 인시던트 시나리오 데이터 (독립적)

data/
└── portfolio.ts        # 단일 소스 — 모든 콘텐츠 정의
```

## 데이터 흐름

```
data/portfolio.ts
    ↓ import
lib/persona-responses.ts    → chat-resolver.ts → PersonaChatSection
lib/terminal-commands.ts                       → PersonaChatSection
lib/scenarios.ts                               → ScenarioSection
app/about/page.tsx
app/projects/page.tsx + [slug]/page.tsx
components/* (직접 import)
```

## 컴포넌트 책임 분리

| 컴포넌트 | 역할 | 상태 |
|---|---|---|
| `HomeWorldDemo` | 3D ↔ 터미널 전환 오케스트레이션, canvas 캡처 | Client |
| `WorldRoomCanvas` | Three.js 씬 렌더링, 카메라 애니메이션 | Client |
| `PersonaChatSection` | 터미널 UI, 명령어 처리, 메시지 히스토리 | Client |
| `ScenarioSection` | 인시던트 게임 UI | Client |
| `SidebarShell` | 네비게이션, 반응형 메뉴 | Client |
| 나머지 섹션들 | 정적 콘텐츠 렌더링 | Server |

## 3D 구현 현황

### canvas-to-texture 파이프라인
```
PersonaChatSection DOM
    ↓ html2canvas (캡처)
HTMLCanvasElement (1280×720)
    ↓ THREE.CanvasTexture
모니터 mesh Material
    ↓ Three.js 씬
WorldRoomCanvas
```

### 카메라 애니메이션
- **Enter**: 자유 위치 → 모니터 앞 close-up (easeOutExpo)
- **Exit**: 모니터 close-up → 룸 전경 (easeInExpo)
- OrbitControls: pan 비활성, zoom/rotate 가능

## 스타일 시스템

### Tailwind 커스텀 색상
| 토큰 | 값 | 용도 |
|---|---|---|
| `bg` | `#070b12` | 전체 배경 |
| `panel` | `#0d1320` | 카드/패널 배경 |
| `line` | `rgba(255,255,255,0.08)` | 구분선/보더 |
| `text` | `#f4f7fb` | 주요 텍스트 |
| `muted` | `#98a2b3` | 보조 텍스트 |
| `accent` | `#6ea8fe` | 파란색 강조 |
| `accent2` | `#9b7bff` | 보라색 강조 |

### 애니메이션
- `fadeUp`, `fadeUp-delay`, `fadeUp-delay2` (0.55s, CSS keyframes)
- 반응형 브레이크포인트: `xl` (1280px) 기준 모바일/데스크톱 전환

## 빌드 설정
- `next.config.ts`: `output: 'export'`, `trailingSlash: true`
- 정적 호스팅 가능 (서버 불필요)
- `generateStaticParams()` 로 동적 라우트 사전 생성
