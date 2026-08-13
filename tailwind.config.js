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
        'surface-dark': 'var(--color-surface-dark, #1A0B2E)',
        'surface-deep': 'var(--color-surface-deep, #0A1525)',
        'surface-card': 'var(--color-surface-card, #151B2E)',
        'surface-panel': 'var(--color-surface-panel, #0B0F19)',
      },
      fontFamily: {
        display: ['var(--font-display)', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        md: '12px',
        lg: '14px',
        xl: '16px',
        '2xl': '16px',
        '3xl': '16px',
        box: '16px',
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '0.9rem' }],
        xs: ['0.75rem', { lineHeight: '1.05rem' }],
        sm: ['0.85rem', { lineHeight: '1.25rem' }],
        base: ['0.925rem', { lineHeight: '1.45rem' }],
        lg: ['1.05rem', { lineHeight: '1.55rem' }],
        xl: ['1.2rem', { lineHeight: '1.65rem' }],
        '2xl': ['1.45rem', { lineHeight: '1.85rem' }],
        '3xl': ['1.75rem', { lineHeight: '2.15rem' }],
        '4xl': ['2.15rem', { lineHeight: '2.45rem' }],
        '5xl': ['2.65rem', { lineHeight: '2.95rem' }],
        '6xl': ['3.25rem', { lineHeight: '3.45rem' }],
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
