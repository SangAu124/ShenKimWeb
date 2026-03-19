import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#070b12',
        panel: '#0d1320',
        line: 'rgba(255,255,255,0.08)',
        text: '#f4f7fb',
        muted: '#98a2b3',
        accent: '#6ea8fe',
        accent2: '#9b7bff',
      },
      boxShadow: {
        panel: '0 20px 60px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
} satisfies Config
