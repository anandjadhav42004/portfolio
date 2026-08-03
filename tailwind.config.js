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
        'accent-start': 'var(--color-accent-start)',
        'accent-end': 'var(--color-accent-end)',
        'accent-hover': 'var(--color-accent-hover)',
        'cyan': 'var(--color-cyan)',
        'border-subtle': 'var(--color-border-subtle)',
        'card-bg': 'var(--color-card-bg)',
        'brutalist-yellow': 'var(--color-accent)',
        'brutalist-red': '#EF4444',
        'brutalist-blue': '#6366F1',
        'brutalist-bg': 'var(--color-void)',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['Outfit', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
        'syne': ['Outfit', 'sans-serif'],
        'poppins': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.15em',
        'mega': '0.25em',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
