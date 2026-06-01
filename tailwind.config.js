/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': 'var(--color-void)',
        'void-2': 'var(--color-void-2)',
        'void-3': 'var(--color-void-3)',
        'off-white': 'var(--color-off-white)',
        'dim': 'var(--color-dim)',
        'electric': 'var(--color-electric)',
        'cyan': 'var(--color-cyan)',
        'accent': 'var(--color-electric)',
        'brutalist-yellow': '#FFE500',
        'brutalist-red': '#FF3B00',
        'brutalist-blue': '#0037FF',
        'brutalist-bg': '#F5F0EB',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
        'syne': ['Space Grotesk', 'sans-serif'],
        'poppins': ['IBM Plex Mono', 'monospace'],
      },
      letterSpacing: {
        'ultra': '0.15em',
        'mega': '0.25em',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
