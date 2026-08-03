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
        'void': '#07111E',
        'void-2': '#0B192C',
        'void-3': '#0F2338',
        'off-white': '#F8FAFC',
        'dim': '#94A3B8',
        'accent-start': '#38BDF8',
        'accent-end': '#34D399',
        'accent-hover': '#059669',
        'cyan': '#38BDF8',
        'border-subtle': 'rgba(52, 211, 153, 0.18)',
        'card-bg': 'rgba(11, 25, 44, 0.78)',
        'brutalist-yellow': '#34D399',
        'brutalist-red': '#EF4444',
        'brutalist-blue': '#6366F1',
        'brutalist-bg': '#07111E',
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
