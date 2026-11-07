/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#e8eaf0', surface: '#e8eaf0', 'surface-variant': '#dcdee4',
        'surface-container-lowest': '#f0f2f8', 'surface-container-low': '#e5e7ed',
        'surface-container': '#e2e4ea', 'surface-container-high': '#dcdee4',
        'surface-container-highest': '#d6d8de', 'surface-bright': '#edeef4', 'surface-dim': '#d4d6dc',
        'surface-tint': '#6366f1', 'on-surface': '#2e3040', 'on-surface-variant': '#585a68',
        'on-background': '#2e3040', outline: '#8a8c9a', 'outline-variant': '#d0d2dc',
        primary: '#6366f1', 'on-primary': '#ffffff', 'primary-container': '#818cf8',
        'on-primary-container': '#e0e2ff', 'primary-fixed': '#e0e2ff', 'primary-fixed-dim': '#a5b4fc',
        'inverse-primary': '#a5b4fc', secondary: '#6c6e7e', 'secondary-container': '#d8dae6',
        'secondary-fixed': '#d8dae6', 'secondary-fixed-dim': '#b8baca', 'on-secondary-fixed': '#1a1b26',
        'on-secondary-container': '#585a68', tertiary: '#7c3aed', 'tertiary-container': '#a78bfa',
        'tertiary-fixed': '#ede9fe', error: '#dc2626', 'error-container': '#fee2e2',
        'on-error-container': '#991b1b', 'inverse-surface': '#2e3040',
      },
      borderRadius: { DEFAULT: '0.75rem', lg: '1rem', xl: '1.5rem', '2xl': '1.75rem', full: '9999px' },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      fontSize: {
        caption: ['12.5px', { lineHeight: '20px', letterSpacing: '0.04em', fontWeight: '500' }],
        'body-sm': ['14.5px', { lineHeight: '24px', letterSpacing: '0.01em', fontWeight: '500' }],
        'body-md': ['16.5px', { lineHeight: '28px', fontWeight: '500' }],
        'body-lg': ['18.5px', { lineHeight: '30px', fontWeight: '500' }],
        'label-sm': ['13.5px', { lineHeight: '20px', letterSpacing: '0.03em', fontWeight: '600' }],
        'label-md': ['15.5px', { lineHeight: '22px', letterSpacing: '0.01em', fontWeight: '600' }],
        'title-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-sm': ['22px', { lineHeight: '30px', fontWeight: '600' }],
        'headline-md': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-lg': ['38px', { lineHeight: '48px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'headline-xl': ['54px', { lineHeight: '62px', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
