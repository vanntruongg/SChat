/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '28px',
        28: '28px',
        32: '32px',
        36: '36px',
        48: '48px',
        56: '56px',
      },
      colors: {
        primary: '#580EF6',
        secondary: '#F7F7F7',
        tertiary: '#3D3A50',
        quaternary: '#1A1C22',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
