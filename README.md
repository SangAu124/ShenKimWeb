# KimSangeun.exe

터미널 기반 개발자 포트폴리오. 인시던트 시뮬레이터 + AI 페르소나 챗봇 + Three.js 3D 월드.

## 컨셉

다크 테마, 터미널/incident console 감성. 명령어를 입력하거나 4지선다 시나리오를 풀며 포트폴리오를 탐색.

## 기술 스택

- **Next.js 15** (static export)
- **TypeScript 5.8**
- **Tailwind CSS 3.4**
- **Three.js** + @react-three/fiber + @react-three/drei
- **html2canvas** (터미널 UI → Three.js 모니터 텍스처)

## 실행

```bash
npm install
npm run dev
```

```bash
npm run build   # 정적 빌드 (out/ 디렉토리)
```

## 주요 기능

### 터미널 인터페이스
`/` 메인 페이지 하단 터미널에서 명령어 입력:

| 명령어 | 설명 |
|---|---|
| `help` | 사용 가능한 명령어 목록 |
| `about` | 개발자 소개 |
| `skills` | 기술 스택 |
| `projects` | 프로젝트 목록 |
| `resume` | 이력서 |
| `contact` | 연락처 |
| `search <키워드>` | 키워드 검색 |
| `open <slug>` | 프로젝트 상세 열기 |
| `goto <섹션>` | 페이지 이동 |
| `ask <질문>` | 자연어 질문 |

키보드: `↑↓` 히스토리, `Tab` 자동완성

### 인시던트 시뮬레이터
실제 운영 장애 시나리오 (서버 다운, nginx 502 등)에 대해 4지선다로 대응.
선택 결과에 따라 `strong / partial / weak` 피드백 제공.

### 3D 월드 모드
터미널 UI 위 버튼으로 진입. Three.js 룸 씬 안 모니터에 터미널 화면이 텍스처로 매핑됨.
카메라 enter/exit 애니메이션, OrbitControls 탐색 지원.

## 디렉토리 구조

```
app/                    # Next.js App Router
├── page.tsx            # / (메인)
├── about/page.tsx      # /about
└── projects/           # /projects, /projects/[slug]

components/             # UI 컴포넌트
data/portfolio.ts       # 콘텐츠 단일 소스 (여기서만 수정)
lib/                    # 비즈니스 로직 (chat-resolver, terminal-commands, scenarios)
```

## 문서

- `.claude/ARCHITECTURE.md` — 컴포넌트 구조 및 데이터 흐름
- `.claude/3D-GAMIFICATION.md` — 3D 게이미피케이션 기획
- `.claude/ROADMAP.md` — 개발 로드맵
- `.claude/CLAUDE.md` — AI 작업 지침
