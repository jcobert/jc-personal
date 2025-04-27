import type { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

/** Generates Radix CSS color var references. */
export const getColorScale = (name: string) => {
  const scale: Record<string, string> = {}
  for (let i = 1; i <= 12; i++) {
    scale[i] = `var(--${name}-${i})`
    scale[`a${i}`] = `var(--${name}-a${i})`
  }
  scale['contrast'] = `var(--${name}-contrast)`
  scale['surface'] = `var(--${name}-surface)`
  scale['indicator'] = `var(--${name}-indicator)`
  scale['track'] = `var(--${name}-track)`
  return scale
}

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'selector',
  future: { hoverOnlyWhenSupported: true },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      orange: twColors.orange,
      amber: twColors.amber,
      red: twColors.red,
      rose: twColors.rose,
      blue: twColors.blue,
    },
    extend: {
      fontFamily: {
        body: ['var(--font-quicksand-sans)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-quicksand-sans)', ...defaultTheme.fontFamily.sans],
        heading: [
          'var(--font-flamenco-serif)',
          ...defaultTheme.fontFamily.serif,
        ],
      },
      colors: {
        // Brand
        brand: getColorScale('blue'),
        'brand-extra-light': 'var(--blue-8)',
        'brand-light': 'var(--blue-11)',
        'brand-primary': 'var(--blue-9)',
        'brand-dark': 'var(--blue-10)',
        'brand-extra-dark': 'var(--blue-12)',
        // Generic
        gray: getColorScale('gray'),
        black: '#1F2023',
        white: '#FDFDFF',
        background: '#FDFDFF',
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.gray.5'),
      }),
      fontSize: {
        '2xs': ['0.625rem', '0.75rem'],
      },
      width: { layout: '90rem' },
      maxWidth: ({ theme }) => ({
        layout: theme('width.layout'),
      }),
      screens: {
        '2xl': '1440px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.950'),
            strong: {
              color: theme('colors.gray.950'),
            },
            blockquote: {
              color: theme('colors.gray.700'),
            },
            pre: {
              padding: 0,
            },
            li: {
              color: theme('colors.gray.950'),
              '&::marker': {
                color: theme('colors.gray.800'),
              },
            },
            a: {
              color: theme('colors.blue.700'),
              '&:visited': {
                color: theme('colors.brand.9'),
              },
              '&:hover': {
                color: theme('colors.blue.600'),
              },
            },
            p: {
              // marginTop: '0',
              // marginBottom: '0',
              textWrap: 'pretty',
            },
            h1: {
              fontSize: theme('fontSize.5xl'),
              fontWeight: theme('fontWeight.bold'),
              fontFamily: theme('fontFamily.heading')[0],
              color: theme('colors.brand-primary'),
              marginTop: '0',
              marginBottom: '1rem',
              textWrap: 'balance',
            },
            h2: {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
              marginTop: '0',
              textWrap: 'balance',
            },
            h3: {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
              marginTop: '0',
              textWrap: 'balance',
            },
            h4: {
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.bold'),
              // marginTop: '0',
              color: theme('colors.brand-dark'),
              textWrap: 'balance',
            },
            h5: {
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.bold'),
              // marginTop: '0',
              textWrap: 'pretty',
            },
            h6: {
              fontSize: theme('fontSize.base'),
              fontWeight: theme('fontWeight.bold'),
              // marginTop: '0',
              textWrap: 'pretty',
            },
          },
        },
      }),
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        slowPing: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        collapseDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        collapseUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        accordionDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        accordionUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromRight: {
          from: { opacity: '0', transform: 'translateX(10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromLeft: {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        ping: 'slowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        collapseDown: 'collapseDown 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        collapseUp: 'collapseUp 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        accordionDown: 'accordionDown 150ms ease-in-out',
        accordionUp: 'accordionUp 150ms ease-in-out',
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        slideInFromLeft: 'slideInFromLeft 250ms ease',
        slideInFromRight: 'slideInFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      })
    }),
    plugin(({ addVariant, matchVariant }) => {
      // Hover media queries
      addVariant('has-hover', '@media (hover: hover) and (pointer: fine)')
      addVariant(
        'no-hover',
        '@media not all and (hover: hover) and (pointer: fine)',
      )

      // Applied on hover if supported, never applied otherwise
      addVariant(
        'hover-never',
        '@media (hover: hover) and (pointer: fine) { &:hover }',
      )
      matchVariant(
        'group-hover-never',
        (_, { modifier }) =>
          `@media (hover: hover) and (pointer: fine) { :merge(.group${modifier ? '\\/' + modifier : ''}):hover & }`,
        { values: { DEFAULT: '' } },
      )
      matchVariant(
        'peer-hover-never',
        (_, { modifier }) =>
          `@media (hover: hover) and (pointer: fine) { :merge(.peer${modifier ? '\\/' + modifier : ''}):hover & }`,
        { values: { DEFAULT: '' } },
      )

      // Applied on hover if supported, always applied otherwise
      addVariant('hover-always', [
        '@media (hover: hover) and (pointer: fine) { &:hover }',
        '@media not all and (hover: hover) and (pointer: fine)',
      ])
      matchVariant(
        'group-hover-always',
        (_, { modifier }) => [
          `@media (hover: hover) and (pointer: fine) { :merge(.group${modifier ? '\\/' + modifier : ''}):hover & }`,
          '@media not all and (hover: hover) and (pointer: fine)',
        ],
        { values: { DEFAULT: '' } },
      )
      matchVariant(
        'peer-hover-always',
        (_, { modifier }) => [
          `@media (hover: hover) and (pointer: fine) { :merge(.peer${modifier ? '\\/' + modifier : ''}):hover & }`,
          '@media not all and (hover: hover) and (pointer: fine)',
        ],
        { values: { DEFAULT: '' } },
      )
    }),
  ],
} satisfies Config
