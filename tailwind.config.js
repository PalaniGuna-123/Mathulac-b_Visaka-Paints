/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        magenta: 'var(--color-magenta, #E6007E)',
        hotpink: 'var(--color-hotpink, #FF1493)',
        electric: 'var(--color-electric, #146BFF)',
        cyan: 'var(--color-cyan, #00C8FF)',
        leaf: 'var(--color-leaf, #67D600)',
        sun: 'var(--color-sun, #FFD400)',
        flame: 'var(--color-flame, #FF7A00)',
        ember: 'var(--color-ember, #F51B24)',
        violet: 'var(--color-violet, #7B2CFF)',
        ink: 'var(--color-ink, #0B1020)',
        midnight: 'var(--color-midnight, #131A31)',
        cream: 'var(--color-cream, #FFF8F1)',
      },
      fontFamily: {
        display: ['var(--font-display)', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -16px) scale(1.05)' },
        },
        'gradient-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '300% 50%' },
        },
      },
    },
  },
  plugins: [],
};
