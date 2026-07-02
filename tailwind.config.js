/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#EEF1FE',
          100: '#D8DDFD',
          200: '#B3BDFB',
          300: '#8A9AF8',
          400: '#6A7EF9',
          500: '#4F6EF7',
          600: '#3D53C5',
          700: '#2D3E94',
          800: '#1E2A62',
          900: '#101531',
        },
        success: '#34C759',
        warning: '#FF6B6B',
        surface: '#F5F7FA',
        card: '#FFFFFF',
        'text-primary': '#1A1A2E',
        'text-secondary': '#8E8E93',
      },
      fontFamily: {
        sans: ['"DM Sans"', '"Noto Sans SC"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Noto Sans SC"', 'sans-serif'],
      },
      borderRadius: {
        '2lg': '16px',
        '3lg': '24px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.10)',
        'float': '0 20px 60px rgba(79,110,247,0.12)',
        'glow': '0 0 40px rgba(79,110,247,0.20)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79,110,247,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(79,110,247,0.30)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};
