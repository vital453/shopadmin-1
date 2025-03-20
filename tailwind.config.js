const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      // boxShadow: {
      //   DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      //   md: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
      //   lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
      //   xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
      // },
      // outline: {
      //   blue: '2px solid rgba(0, 112, 244, 0.5)',
      // },
      // fontFamily: {
      //   inter: ['Inter', 'sans-serif'],
      // },
      fontSize: {
        14: '14px',
        10: '10px',
        // xs: ['0.75rem', { lineHeight: '1.5' }],
        // sm: ['0.875rem', { lineHeight: '1.5715' }],
        // base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        // lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        // xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        // '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        // '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        // '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        // '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        // '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'input-color': 'rgb(237, 243, 255)',
        'icon-color': 'rgb(23, 43, 77)',
        'icon-color1': 'rgb(42, 45, 46)',
        'icon-color2': '#007bff',
        'deep_sky_blue': 'rgb(0, 191, 255)',
        'alice_blue-color2': 'rgb(240, 248, 255)',
        'navbgcolor': 'rgb(224, 231, 238)',
        'navbgcolor1': '#ebeef1',
      },
      // screens: {
      //   xs: '480px',
      // },
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        16: '16px',
        500: '500px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
  },
  plugins: [
    // // eslint-disable-next-line global-require
    // require('@tailwindcss/forms'),
    // // add custom variant for expanding sidebar
    // plugin(({ addVariant, e }) => {
    //   addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
    //   });
    // }),
  ],
};
