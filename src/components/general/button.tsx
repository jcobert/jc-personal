import { ComponentPropsWithRef, forwardRef } from 'react'

import { cn } from '@/utils/style'

import Spinner from '@/components/general/spinner'

export type StyleVariant = 'primary' | 'secondary' | 'tertiary'

export type ButtonColor = 'danger' | 'brand' | 'general'

export type AdditionalButtonProps = {
  variant?: StyleVariant
  color?: ButtonColor
  unstyled?: boolean
  loading?: boolean
}

export type ButtonProps = ComponentPropsWithRef<'button'> &
  AdditionalButtonProps

export const buttonVariantClassNames: { [x in StyleVariant]: string } = {
  primary: 'btn',
  secondary: 'btn-outline',
  tertiary: 'btn-text',
}

export const buttonColorClassNames: {
  [x in ButtonColor]: Partial<typeof buttonVariantClassNames>
} = {
  brand: {},
  danger: {
    primary:
      'border-rose-600 bg-rose-600 hover:bg-rose-700 disabled:border-rose-600/25 disabled:bg-rose-600/70',
    secondary:
      'border-rose-600 text-rose-600 hover:border-rose-700 [&:not(:disabled)]:hover:bg-rose-500/5 hover:text-rose-700 disabled:border-rose-600/25 disabled:text-rose-600/60',
    tertiary:
      'text-rose-600 hover:text-rose-700 disabled:text-rose-600/60 [&:not(:disabled)]:hover:bg-rose-600/5',
  },
  general: {
    primary:
      'border-gray-10 bg-gray-10 hover:bg-gray-11 disabled:border-gray-10/25 disabled:bg-gray-10/70',
    secondary:
      'border-gray-10 text-gray-10 hover:border-gray-11 [&:not(:disabled)]:hover:bg-gray-9/5 hover:text-gray-11 disabled:border-gray-10/25 disabled:text-gray-10/60',
    tertiary:
      'text-gray-10 hover:text-gray-11 disabled:text-gray-10/60 [&:not(:disabled)]:hover:bg-gray-10/5',
  },
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      color = 'brand',
      className = '',
      type = 'button',
      unstyled = false,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const variantStyle =
      buttonVariantClassNames?.[variant] || buttonVariantClassNames?.primary

    const emphasisStyle = color ? buttonColorClassNames?.[color]?.[variant] : ''

    return (
      <>
        <button
          className={cn([
            !unstyled && variantStyle,
            !unstyled && emphasisStyle,
            'flex items-center',
            className,
          ])}
          type={type}
          {...props}
          ref={ref}
        >
          {loading ? (
            <Spinner
              className={cn({
                'fill-white': variant === 'primary',
                'fill-brand-primary':
                  (variant === 'secondary' || variant === 'tertiary') &&
                  color === 'brand',
                'fill-rose-600':
                  (variant === 'secondary' || variant === 'tertiary') &&
                  color === 'danger',
              })}
            />
          ) : (
            children
          )}
        </button>
      </>
    )
  },
)

export default Button
