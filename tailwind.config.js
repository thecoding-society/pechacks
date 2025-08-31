/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-orbitron)', 'sans-serif'],
        secondary: ['var(--font-exo-2)', 'sans-serif'],
        accent: ['var(--font-audiowide)', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
        transformers: ['var(--font-transformers)', 'sans-serif'],
        electrolize: ['var(--font-electrolize)', 'sans-serif'],
        michroma: ['var(--font-michroma)', 'sans-serif'],
        bungee: ['var(--font-bungee)', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        // Keep existing for backward compatibility
        sans: ['var(--font-exo-2)', 'sans-serif'],
        exo: ['var(--font-exo-2)', 'sans-serif'],
      },
      colors: {
        // Space-themed color palette
        'cosmic': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8', // Light blue
          500: '#0ea5e9', // Primary blue
          600: '#0284c7', // Darker blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'space': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7', // Light teal/green
          400: '#34d399', // Primary green
          500: '#10b981', // Darker green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        }
      }
    },
  },
  plugins: [],
}
