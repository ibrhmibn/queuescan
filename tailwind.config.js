/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brutal: {
          yellow: '#FFD400', // kuning dominan
          blue: '#3B6FE8',   // biru elektrik
          pink: '#FF8FAB',   // pink salmon
          green: '#5DB77B',  // hijau stabilo
          cream: '#FFF6D6',  // background lembut
          black: '#000000',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        heading: ['"Archivo Black"', 'Impact', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal-sm': '3px 3px 0px 0px #000',
        brutal: '6px 6px 0px 0px #000',
        'brutal-lg': '10px 10px 0px 0px #000',
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        retro: '6px', // rounded tipis ala retro
      },
    },
  },
  plugins: [],
};