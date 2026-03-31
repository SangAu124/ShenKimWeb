# 개발 로드맵

> 마지막 업데이트: 2026-03-31
> 현재 브랜치: develop / 메인: master

---

## 완료된 것 (현재 상태)

### 터미널 인터페이스
- [x] 명령어 파싱 (help / about / skills / projects / resume / contact / search / open / goto / ask)
- [x] Up/Down 히스토리 네비게이션 (최대 20개)
- [x] Tab 자동완성
- [x] 키워드 기반 AI 페르소나 응답 (8개 카테고리)
- [x] 빠른 명령어 버튼 (퀵 액션)

### 페이지
- [x] 메인 랜딩 (`/`)
- [x] About 페이지 (`/about`)
- [x] Projects 목록 (`/projects`)
- [x] Project 상세 (`/projects/[slug]`)

### 인시던트 시뮬레이터
- [x] 2개 시나리오 (서버 다운, nginx 502)
- [x] 4지선다 + quality 피드백 (strong/partial/weak)

### 3D
- [x] Three.js 룸 씬 + 모니터 mesh
- [x] html2canvas → CanvasTexture 파이프라인
- [x] 카메라 enter/exit 애니메이션
- [x] OrbitControls (pan 비활성)
- [x] 터미널에서 3D로 zoom-in 진입 기능

---

## Phase 1: 콘텐츠 및 UX 완성 (다음 우선순위)

### 콘텐츠
- [ ] `data/portfolio.ts` 실제 프로젝트 데이터 보강 (현재 3개 → 확장)
- [ ] 인시던트 시나리오 추가 (현재 2개 → 목표 5개)
- [ ] 페르소나 응답 템플릿 보강 (edge case 커버리지)

### UX
- [ ] 모바일에서 3D 비활성화 처리 (isMobile 감지)
- [ ] 프로젝트 상세 페이지 디자인 완성 (현재 notes 영역 미구현)
- [ ] `goto` 명령어로 페이지 간 실제 라우팅 개선

---

## Phase 2: 3D 게이미피케이션 (기획 확정 후 진행)

> 방향 확정 필요. `3D-GAMIFICATION.md` 참조.

### Option A: 터미널 명령어 → Zone 이동 (추천)
- [ ] 3D 룸에 섹션별 Zone 정의 (projects / about / terminal)
- [ ] `goto` 명령어에 3D 카메라 좌표 매핑
- [ ] Zone별 클릭 인터랙션 추가

### Option C: Easter Egg 수집 (빠른 구현)
- [ ] 숨겨진 터미널 명령어 추가
- [ ] 명령어 발견 시 3D 룸 오브젝트 변화
- [ ] unlock 상태 관리 (HomeWorldDemo 레벨)

---

## Phase 3: AI 연동 (선택적)

- [ ] `lib/chat-resolver.ts`를 실제 Claude API로 교체
  - 현재 구조: async 지원, API 교체 용이하게 설계됨
  - 고려사항: 정적 export → API route 또는 외부 엔드포인트 필요
- [ ] 스트리밍 응답 지원 (optional)

---

## Phase 4: 배포 및 SEO

- [ ] 커스텀 도메인 연결 (shenkim.com 또는 kimsangeun.dev)
- [ ] OG 메타태그 / SEO 메타데이터 추가
- [ ] Lighthouse 성능 최적화
- [ ] 에러 페이지 (404) 추가

---

## 기술 부채

| 항목 | 위치 | 우선순위 |
|---|---|---|
| `monitor-surface-capture.tsx` 미사용 파일 | `components/` | 낮음 (삭제 고려) |
| html2canvas 호출 최적화 | `home-world-demo.tsx` | 중간 |
| Three.js 씬 모바일 성능 | `world-room-canvas.tsx` | 높음 |
| 페르소나 응답 fallback 품질 개선 | `lib/persona-responses.ts` | 중간 |

---

## 결정 대기 중

- [ ] 3D 월드 최종 방향 결정 (A/B/C/D 중 택일 또는 조합)
- [ ] AI API 연동 여부 및 시점
- [ ] 모바일에서 3D 경험을 어떻게 처리할지
