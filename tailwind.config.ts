import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import typographyPlugin from '@tailwindcss/typography';
import { PluginAPI } from 'tailwindcss/types/config';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        typoPrimary: colors.neutral,
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      typography: (theme: PluginAPI['theme']) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.typoPrimary.500'),
              '&:hover': {
                color: `${theme('colors.typoPrimary.600')}`,
              },
              code: { color: theme('colors.typoPrimary.400') },
            },
            'h2, h3': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h4: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.accent.foreground'),
              backgroundColor: theme('colors.card.DEFAULT'),
              padding: theme('spacing.1'),
              borderRadius: theme('borderRadius.DEFAULT'),
              borderWidth: '1.5px',
              fontSize: theme('fontSize.xs'),
              borderColor: theme('colors.border'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.typoPrimary.100'),
              '&:hover': {
                color: `${theme('colors.typoPrimary.200')}`,
              },
              code: { color: theme('colors.typoPrimary.200') },
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
