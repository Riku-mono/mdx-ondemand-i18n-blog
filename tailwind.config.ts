import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contents/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: 'var(--color-neutral-500)',
              '&:hover': {
                color: 'var(--color-neutral-600)',
              },
              code: { color: 'var(--color-neutral-400)' },
            },
            'h1, h2': {
              fontWeight: '700',
              paddingBottom: 'calc(var(--spacing) * 2)',
              borderBottomWidth: '1px',
              letterSpacing: 'var(--tracking-tight)',
            },
            h3: {
              fontWeight: '700',
              letterSpacing: 'var(--tracking-tight)',
            },
            h4: {
              fontWeight: '600',
            },
            pre: {
              color: 'inherit',
              backgroundColor: 'inherit',
              fontWeight: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              marginTop: 'inherit',
              marginBottom: 'inherit',
              borderRadius: 'inherit',
              paddingTop: 'inherit',
              paddingInlineEnd: 'inherit',
              paddingBottom: 'inherit',
              paddingInlineStart: 'inherit',
            },
            code: {
              backgroundColor: 'inherit',
              fontSize: 'var(--text-sm)',
              fontWeight: 'inherit',
              color: 'inherit',
              lineHeight: 'inherit',
              borderWidth: '1.5px',
              padding: 'var(--spacing)',
              borderRadius: 'var(--radius)',
            },
            'pre code': {
              color: 'inherit',
              backgroundColor: 'inherit',
              padding: '0',
              borderRadius: '0',
              borderColor: 'inherit',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
        invert: {
          css: {
            a: {
              color: 'var(--color-neutral-100)',
              '&:hover': {
                color: 'var(--color-neutral-200)',
              },
              code: { color: 'var(--color-neutral-200)' },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: 'var(--color-gray-100)',
            },
          },
        },
      },
    },
  },
} satisfies Config;
