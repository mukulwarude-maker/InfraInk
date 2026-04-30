/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        // DevOps-themed deep palette
        terminal: {
          DEFAULT: '#0d1117',
          50: '#f0f6ff',
          100: '#e6f0fd',
          200: '#c5d9f9',
          300: '#93b8f5',
          400: '#5a8dee',
          500: '#2f6de8',
          600: '#1a50d4',
          700: '#1640ac',
          800: '#17368c',
          900: '#182f72',
        },
        neon: {
          green: '#39d353',
          blue: '#58a6ff',
          purple: '#bc8cff',
          orange: '#ff7b72',
          yellow: '#e3b341',
          cyan: '#56d364',
        },
        slate: {
          900: '#0d1117',
          800: '#161b22',
          700: '#21262d',
          600: '#30363d',
          500: '#484f58',
          400: '#6e7681',
          300: '#8b949e',
          200: '#b1bac4',
          100: '#c9d1d9',
          50: '#f0f6fc',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(88, 166, 255, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(88, 166, 255, 0.03) 1px, transparent 1px)`,
        'hero-gradient': `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(88, 166, 255, 0.15) 0%, transparent 60%)`,
        'card-gradient': `linear-gradient(135deg, rgba(22, 27, 34, 0.9), rgba(13, 17, 23, 0.95))`,
        'cta-gradient': `linear-gradient(135deg, #1a50d4 0%, #1640ac 50%, #182f72 100%)`,
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(88, 166, 255, 0.3)',
        'neon-green': '0 0 20px rgba(57, 211, 83, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 48px rgba(88, 166, 255, 0.15)',
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#b1bac4',
            '--tw-prose-headings': '#f0f6fc',
            '--tw-prose-lead': '#8b949e',
            '--tw-prose-links': '#58a6ff',
            '--tw-prose-bold': '#f0f6fc',
            '--tw-prose-counters': '#6e7681',
            '--tw-prose-bullets': '#484f58',
            '--tw-prose-hr': '#21262d',
            '--tw-prose-quotes': '#b1bac4',
            '--tw-prose-quote-borders': '#30363d',
            '--tw-prose-captions': '#8b949e',
            '--tw-prose-code': '#ff7b72',
            '--tw-prose-pre-code': '#c9d1d9',
            '--tw-prose-pre-bg': '#161b22',
            '--tw-prose-th-borders': '#30363d',
            '--tw-prose-td-borders': '#21262d',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
