/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        magenta: '#E6007E',
        hotpink: '#FF1493',
        electric: '#146BFF',
        cyan: '#00C8FF',
        leaf: '#67D600',
        sun: '#FFD400',
        flame: '#FF7A00',
        ember: '#F51B24',
        violet: '#7B2CFF',
        ink: '#0B1020',
        cream: '#FFF8F1',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
};
