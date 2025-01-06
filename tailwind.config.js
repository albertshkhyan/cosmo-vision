/** @type {import('tailwindcss').Config} */
export default {
  // Enable class-based dark mode (so you can add `class="dark"` to <html> or <body>)
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      // 1) Color Palette
      //    A typical pattern is to define a custom "brand" color
      //    with multiple shades, plus an "accent" color.
      colors: {
        brand: {
          50: '#f2f8ff',
          100: '#e6f0ff',
          200: '#bfd9ff',
          300: '#99c1ff',
          400: '#4f93ff',
          500: '#1e40af', // your primary brand color
          600: '#1a399e',
          700: '#142c7a',
          800: '#0f2056',
          900: '#0b1740',
        },
        accent: {
          50: '#fffce6',
          100: '#fff9cc',
          200: '#fff399',
          300: '#ffee66',
          400: '#ffe833',
          500: '#ffe200',
          600: '#e6cb00',
          700: '#b39b00',
          800: '#807000',
          900: '#4d4500',
        },
      },

      // 2) Fonts
      //    Extend or override the default Tailwind fonts.
      //    You can also import from Google Fonts, e.g. in your index.html or src/index.css
      fontFamily: {
        // e.g. "sans": ['Roboto', 'Helvetica', 'Arial', 'sans-serif']
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },

      // 3) Spacing / Sizing
      //    If you want a custom spacing scale or bigger container widths, you can define them here
      spacing: {
        128: '32rem', // example: for something extra large
        144: '36rem',
      },

      // 4) Border Radius
      borderRadius: {
        xl: '1rem',
      },

      // 5) Box Shadows
      //    For consistent shadow styles used across the app, define them here
      boxShadow: {
        'brand-sm': '0 1px 2px 0 rgba(30,64,175,0.05)',
        'brand-md': '0 4px 6px -1px rgba(30,64,175,0.1), 0 2px 4px -1px rgba(30,64,175,0.06)',
        'brand-lg': '0 10px 15px -3px rgba(30,64,175,0.1), 0 4px 6px -2px rgba(30,64,175,0.05)',
      },

      // 6) Z-Index
      zIndex: {
        auto: 'auto',
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
        dropdown: '1000', // For dropdowns or menus
        modal: '1050', // For modals
        popover: '1070', // For tooltips or popovers
        sidebar: '1080', // For sidebars
        overlay: '1090', // For overlays or backdrops
        max: '1100', // For highest priority elements
      },
    },
  },

  plugins: [],
};
