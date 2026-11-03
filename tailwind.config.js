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
        'void': '#0a0a0a',
        'void-2': '#121212',
        'void-3': '#181818',
        'off-white': '#FFFFFF',
        'dim': '#A0A0A0',
        'faint': '#6B6B6B',
        'line': '#1F1F1F',
        'crimson': {
          DEFAULT: '#D3121F',
          dark: '#8B0A12',
          deep: '#2A0508',
        },
        'accent-start': '#D3121F',
        'accent-end': '#8B0A12',
        'accent-hover': '#FF1F30',
        'border-subtle': '#1F1F1F',
        'card-bg': '#121212',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Anton', 'Impact', 'sans-serif'],
        'anton': ['Anton', 'Impact', 'sans-serif'],
        'allura': ['Allura', 'cursive'],
        'script': ['Allura', 'cursive'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      letterSpacing: {
        'ultra': '0.15em',
        'mega': '0.25em',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        'glow-red': '0 0 25px -3px rgba(211, 18, 31, 0.45)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
