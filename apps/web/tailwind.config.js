/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          '50': '#eff8ff',
          '100': '#dff0ff',
          '200': '#b8e2ff',
          '300': '#78cbff',
          '400': '#26acff',
          '500': '#0696f1',
          '600': '#0077ce',
          '700': '#005ea7',
          '800': '#02508a',
          '900': '#084372',
          '950': '#062a4b',
        },
        'emerald': {
          '50': '#eefff7',
          '100': '#d6ffef',
          '200': '#b0ffe1',
          '300': '#73ffca',
          '400': '#30f8ab',
          '500': '#05d686',
          '600': '#00bc72',
          '700': '#02935c',
          '800': '#08734c',
          '900': '#095e40',
          '950': '#003522',
        },
        'mint': {
          '50': '#eefffb',
          '100': '#c6fff5',
          '200': '#8effee',
          '300': '#4dfbe4',
          '400': '#19e8d3',
          '500': '#00c3b2',
          '600': '#00a49a',
          '700': '#02837c',
          '800': '#086763',
          '900': '#0c5552',
          '950': '#003434',
        },
        'gray': {
          '50': '#f7f7f7',
          '100': '#ecedec',
          '200': '#dedfde',
          '300': '#c5c7c5',
          '400': '#acaeac',
          '500': '#979a97',
          '600': '#868a87',
          '700': '#797c79',
          '800': '#656865',
          '900': '#535553',
          '950': '#353635',
        }
      },
      scale: {
        "100": "1.0",
        "110": "1.1",
        "120": "1.2",
      },
      transitionProperty: {
        'size': 'transform',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.hover-grow': {
          transition: 'transform 200ms ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
}

