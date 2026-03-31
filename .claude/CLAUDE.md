# KimSangeun.exe — Claude 작업 지침

## 작업 원칙

- MVP 단위로 나눠 작업. 한 번에 모든 기능 구현 금지
- 각 단계 완료 후 `npm run build` 통과 상태 유지
- 각 단계는 독립적으로 커밋 가능해야 한다
- 새 파일 생성보다 기존 파일 수정 우선
- 불필요한 추상화, 유틸리티 함수 금지 — 실제 필요한 것만

## 프로젝트 개요

**프로젝트명**: KimSangeun.exe
**컨셉**: 문제 해결 시뮬레이터 + AI 페르소나 챗봇 + 실무형 개발자 브랜딩
**톤**: 다크 테마, 터미널/incident console 감성, 과장되지 않은 신뢰감

**기술 스택**:
- Next.js 15 (static export)
- TypeScript 5.8
- Tailwind CSS 3.4
- Three.js + @react-three/fiber + @react-three/drei
- html2canvas (canvas-to-texture)

## 데이터 구조 원칙

- `data/portfolio.ts` — 모든 콘텐츠의 단일 소스 (수정 시 여기서만)
- `lib/` — 비즈니스 로직 (chat resolver, terminal commands, scenarios)
- `components/` — UI 렌더링 전용, 상태 최소화
- `app/` — Next.js 라우팅 레이어

## 핵심 인터랙션

1. **터미널 인터페이스** (`persona-chat-section.tsx`)
   - 명령어 파싱 + 자연어 쿼리 (ask prefix)
   - 키보드: Up/Down (히스토리), Tab (자동완성), Enter
   - 카테고리: help / about / skills / projects / resume / contact / search / open / goto / ask

2. **인시던트 시뮬레이터** (`scenario-section.tsx`)
   - 4지선다 선택 → quality 피드백 (strong/partial/weak)

3. **3D 월드 모드** (`home-world-demo.tsx` + `world-room-canvas.tsx`)
   - 터미널 UI → canvas 캡처 → Three.js 모니터 텍스처로 매핑
   - 카메라 애니메이션: 모니터 접근(enter) / 풀백(exit)
   - 현재 상태: 데모 수준, 기획 확정 전

## 3D 기획 방향 (미확정)

자세한 내용은 `3D-GAMIFICATION.md` 참조.
핵심 컨셉: **터미널로 웹사이트를 돌아다니다가 Three.js 게이미피케이션 요소와 연결**

- 터미널 명령어 → 3D 공간 이동 트리거
- 현재 3D 룸은 프로토타입 상태
- 확정 기획 전까지 3D 관련 코드 대규모 리팩터링 금지

## 참고 문서

- `ARCHITECTURE.md` — 컴포넌트 구조 및 데이터 흐름
- `3D-GAMIFICATION.md` — 3D 게이미피케이션 아이디어 및 구현 방향
- `ROADMAP.md` — 개발 단계별 로드맵
