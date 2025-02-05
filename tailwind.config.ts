import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import typographyPlugin from '@tailwindcss/typography';
import { PluginAPI } from 'tailwindcss/types/config';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.neutral,
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: (theme: PluginAPI['theme']) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.yellow.400'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.100'),
              '&:hover': {
                color: `${theme('colors.primary.200')}`,
              },
              code: { color: theme('colors.primary.200') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;
