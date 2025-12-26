/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Telegram Brand Colors
        primary: {
          50: '#f2f9ff',
          100: '#e1f0fe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a8f9',
          500: '#3390ec', // Telegram Blue
          600: '#1d78c9',
          700: '#1660a3',
          800: '#165186',
          900: '#16446e',
        },
        // Telegram Dark Mode Palette
        dark: {
          bg: '#212121',       // Main background
          surface: '#2c2c2c',  // Card/Element background
          input: '#181818',    // Input fields
          border: '#0f0f0f',   // Borders
          text: '#ffffff',
          secondary: '#aaaaaa',
          messageOut: '#2b5278', // Sent message bubble in dark mode
          messageIn: '#182533',  // Received message bubble in dark mode
        }
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    }
  },
  plugins: [],
};
