import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        container: 'var(--container)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'border-default': 'var(--border-default)',
        'border-light': 'var(--border-light)',
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-50': 'var(--brand-primary-50)',
        'link-blue': 'var(--link-blue)',
      },
      fontFamily: {
        wix: ['var(--font-wix)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
