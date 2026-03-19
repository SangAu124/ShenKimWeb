import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KimSangeun.exe',
  description: '문제 해결 시뮬레이터 + AI 페르소나 기반 실무형 개발자 랜딩페이지 MVP',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
