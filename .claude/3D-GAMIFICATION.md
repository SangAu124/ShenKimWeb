# 3D 게이미피케이션 기획 문서

> 상태: 아이디어 단계 (미확정). 구현 전 방향 확정 필요.
> 핵심 전제: **터미널로 웹사이트를 돌아다니다가 Three.js 게이미피케이션 요소와 자연스럽게 연결되는 경험**

---

## 현재 3D 구현 상태

- 3D 룸 안에 모니터가 있고, 모니터 화면에 터미널 UI가 텍스처로 매핑됨
- 카메라가 "들어가기" → 모니터 close-up, "나오기" → 룸 전경
- OrbitControls로 룸 탐색 가능
- **한계**: 3D 공간이 배경 역할에 그침. 인터랙션 없음.

---

## 방향 A: 터미널 명령어 → 3D 공간 이동 (추천)

### 컨셉
터미널의 `goto` / `open` / 커스텀 명령어가 3D 씬의 카메라를 특정 위치로 이동시킴.
웹사이트의 각 섹션이 3D 룸의 서로 다른 구역(Zone)에 대응됨.

### 룸 구성 예시
```
[서버실 구역]          [데스크 구역]           [화이트보드 구역]
  projects               terminal/chat             about/skills
  → 서버 랙 모델          → 모니터 + 키보드          → 화이트보드에 스킬 표시
  → 클릭 시 프로젝트 열림  → 현재 구현된 터미널        → "벽에 쓰인" 경험
```

### 명령어 연동
```bash
goto projects   # 카메라가 서버 랙 구역으로 이동
goto about      # 화이트보드 구역으로 이동
open infra-cost # 해당 프로젝트 서버 랙이 highlight
```

### 구현 포인트
- `terminal-commands.ts`의 `goto` 명령어에 3D 카메라 목표 좌표 추가
- `HomeWorldDemo`에서 이벤트로 받아 `WorldRoomCanvas`에 전달
- 각 Zone에 `Mesh`와 클릭 핸들러 (`@react-three/fiber`의 `onClick`)
- 카메라 이동은 기존 easeOutExpo 애니메이션 재활용

---

## 방향 B: 인시던트 시뮬레이터 → 3D 시각화

### 컨셉
인시던트 시나리오 진행 중 3D 씬에서 "서버 상태"가 시각적으로 반영됨.

### 시각화 아이디어
- 시나리오 시작 → 서버 랙 mesh가 빨간 점멸 시작
- 선택지 선택 → 상태 변화 (빨강 → 주황 → 초록)
- "strong" 선택 → 파티클 이펙트 또는 초록 glow
- "weak" 선택 → 화면 미세 shake 또는 추가 에러 표시

### 구현 포인트
- ScenarioSection에서 선택 이벤트를 상위(HomeWorldDemo)로 emit
- WorldRoomCanvas에서 상태 기반 material color 변경
- `useRef` + `useFrame`으로 점멸/glow 애니메이션

---

## 방향 C: Easter Egg 수집형 게이미피케이션

### 컨셉
터미널에서 특정 명령어를 입력하거나 숨겨진 커맨드를 발견하면
3D 룸에 오브젝트가 추가되거나 변화가 생김.

### 예시
```bash
whoami        # 룸에 프로필 사진 액자 추가
help --secret # 숨겨진 명령어 목록 + 3D 이스터에그 힌트
konami        # 방 조명 색상 변경 또는 특별 오브젝트 등장
```

### 구현 포인트
- `terminal-commands.ts`에 숨겨진 커맨드 추가
- `HomeWorldDemo` 상태: `unlockedItems: string[]`
- `WorldRoomCanvas`에서 unlockedItems 기반 조건부 렌더링

---

## 방향 D: 3D를 별도 "월드 페이지"로 분리

### 컨셉
메인 터미널과 3D 월드를 완전히 분리.
`/world` 라우트에서 독립적인 3D 포트폴리오 공간 제공.

### 장점
- 현재 home-world-demo.tsx의 복잡도 해결
- 3D 독립 기획 가능
- 터미널에서 `goto world` 명령어로 진입

### 단점
- 터미널 ↔ 3D 연동이 약해짐
- 두 가지 경험을 별개로 유지해야 함

---

## 기술적 고려사항

### 성능
- Three.js 씬은 `Suspense` + lazy load로 초기 로딩 분리
- 모바일에서 3D 비활성화 또는 단순화 필요 (`isMobile` 감지)
- `html2canvas` 캡처는 비용이 크므로 호출 최소화

### 현재 코드 재활용 가능 부분
| 현재 코드 | 재활용 방법 |
|---|---|
| `world-room-canvas.tsx` 카메라 애니메이션 | Zone 이동에 그대로 재활용 |
| `home-world-demo.tsx` canvas 캡처 파이프라인 | 유지, 모니터 텍스처로 계속 사용 |
| `terminal-commands.ts` goto 명령어 | 3D 좌표 매핑 추가 |
| OrbitControls 설정 | Zone별 카메라 제한 추가 |

### 추가 필요 라이브러리
- 없음 — 현재 스택으로 구현 가능
- 필요 시 `@react-three/postprocessing` (bloom/glow 이펙트)

---

## 결정해야 할 것

기획 확정 전 Claude에게 다음을 명확히 해줘야 함:

1. **3D 씬이 메인 경험인가, 보조 경험인가?**
   - 메인: 방향 A 또는 D 선택
   - 보조: 방향 B 또는 C 선택

2. **터미널 명령어와 3D가 실시간으로 연동되어야 하는가?**
   - Yes → 방향 A (가장 임팩트 큼)
   - No → 방향 C (구현 난이도 낮음)

3. **모바일 지원 필요한가?**
   - 3D는 데스크톱 전용으로 처리할지 결정 필요

---

## 현재 권장 방향

**방향 A + C 조합** (단계적 구현):

1. Phase 1: 방향 C (Easter Egg) — 터미널 명령어 → 3D 오브젝트 변화 (간단히 시작)
2. Phase 2: 방향 A (Zone 이동) — goto 명령어 → 카메라 이동으로 확장
3. Phase 3: 방향 B (인시던트 시각화) — 선택적으로 추가

이렇게 하면 현재 3D 구조를 크게 바꾸지 않고 단계적으로 확장 가능.
