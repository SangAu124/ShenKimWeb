export type ChoiceQuality = 'strong' | 'partial' | 'weak'

export interface Choice {
  id: string
  label: string
  feedback: string
  quality: ChoiceQuality
}

export interface Scenario {
  id: string
  title: string
  situation: string
  choices: Choice[]
}

export const scenarios: Scenario[] = [
  {
    id: 'server-outage',
    title: '서버 장애 복구',
    situation:
      '새벽 2시, 슬랙 알림 — 결제 서비스 응답 없음. 고객 CS 접수 시작. 당신이 처음으로 받은 알림입니다. 가장 먼저 무엇을 합니까?',
    choices: [
      {
        id: 'restart',
        label: '서버를 즉시 재시작한다',
        quality: 'weak',
        feedback:
          '임시 복구엔 도움되지만, 원인 파악 없이는 동일한 장애가 재발할 수 있습니다.',
      },
      {
        id: 'check-logs',
        label: '로그를 먼저 확인한다',
        quality: 'strong',
        feedback:
          '증상보다 요청 흐름을 먼저 보는 접근입니다. 원인 경로가 로그에서 드러납니다.',
      },
      {
        id: 'notify-team',
        label: '팀에 알리고 대기한다',
        quality: 'partial',
        feedback:
          '에스컬레이션 자체는 맞지만, 아무것도 보지 않은 채로 기다리는 건 아깝습니다.',
      },
      {
        id: 'check-deploy',
        label: '최근 배포 이력을 확인한다',
        quality: 'strong',
        feedback:
          '변경점과 타임라인을 함께 보는 운영 접근입니다. 배포 직후 장애의 가장 빠른 경로입니다.',
      },
    ],
  },
  {
    id: 'nginx-502',
    title: 'Nginx 이상 현상',
    situation:
      '특정 경로(/api/payments)만 간헐적으로 502를 반환합니다. 다른 경로는 정상입니다. 최근 Nginx 설정 변경이 있었습니다. 어디서부터 확인합니까?',
    choices: [
      {
        id: 'restart-nginx',
        label: 'Nginx를 재시작한다',
        quality: 'weak',
        feedback:
          '재시작은 증상을 잠시 숨길 수 있지만 원인을 파악하지 못합니다. 502가 다시 돌아옵니다.',
      },
      {
        id: 'nginx-error-log',
        label: 'Nginx error.log를 확인한다',
        quality: 'strong',
        feedback:
          '경로 수준 에러는 로그에서 먼저 보입니다. 설정 변경 이후 첫 번째 확인 지점입니다.',
      },
      {
        id: 'upstream-status',
        label: '업스트림 서버 상태를 확인한다',
        quality: 'strong',
        feedback:
          '502는 보통 업스트림 문제입니다. 프록시 대상을 확인하는 올바른 접근입니다.',
      },
      {
        id: 'dns-check',
        label: 'DNS 설정을 확인한다',
        quality: 'weak',
        feedback:
          '특정 경로만 문제라면 DNS가 원인일 가능성은 낮습니다. 범위를 좁히는 판단이 먼저입니다.',
      },
    ],
  },
]
